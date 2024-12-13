const { JobPosting, Skill, Company, Keyword } = require('../models');
const { Op } = require('sequelize');

// 공고 목록 조회 (GET /jobs)
exports.getJobPostings = async (req, res) => {
  try {
    const { page = 1, limit = 20, sortBy = 'views', keyword, company, position, location, experience, wage, skill } = req.query;
    const offset = (page - 1) * limit;
    const parsedLimit = parseInt(limit, 10);
    const where = {};

    // 기존 필터링 조건
    if (keyword) where.title = { [Op.like]: `%${keyword}%` };
    if (location) where.location = { [Op.like]: `%${location}%` };
    if (experience) where.experience = { [Op.like]: `%${experience}%` };
    if (wage) where['$Company.wage$'] = { [Op.gt]: wage };

    const include = [];

    // 회사명 및 급여 필터링
    if (company || wage) {
      const companyWhere = {};
      if (company) companyWhere.name = { [Op.like]: `%${company}%` };
      if (wage) companyWhere.wage = { [Op.gt]: wage };
      include.push({
        model: Company,
        where: companyWhere,
        attributes: ['name', 'wage'],
      });
    } else {
      include.push({ model: Company, attributes: ['name', 'wage'] });
    }

    // 기술 스택 필터링
    if (skill || position) {
      const skillWhere = {};
      if (skill) skillWhere.name = { [Op.like]: `%${skill}%` };
      if (position) skillWhere.name = { [Op.like]: `%${position}%` };
      include.push({
        model: Skill,
        where: skillWhere,
        attributes: ['name'],
      });
    }

    // 키워드 필터링
    if (keyword) {
      include.push({
        model: Keyword,
        where: { name: { [Op.like]: `%${keyword}%` } },
        attributes: ['name'],
      });
    }
    // 데이터 조회
    const order = [];

    // 정렬 조건
    if (sortBy === 'wage') {
      order.push([{ model: Company }, 'wage', 'DESC']);
    } else {
      order.push([sortBy, 'DESC']);
    }

    // 데이터 조회
    const jobPostings = await JobPosting.findAndCountAll({
      where,
      include,
      offset,
      limit: parsedLimit,
      order,
      attributes: ['id', 'companyId', 'title', 'link', 'experience', 'education', 'employmentType', 'salary', 'location', 'deadline'],
    });

    // 필드 변환
    const transformedJobPostings = jobPostings.rows.map(posting => ({
      id: posting.id,
      companyId: posting.companyId,
      title: posting.title,
      link: posting.link,
      experience: posting.experience,
      education: posting.education,
      employmentType: posting.employmentType,
      salary: posting.salary,
      location: posting.location,
      deadline: posting.deadline,
      companyName: posting.Company?.name || null, // Company.name 포함
      wage: posting.Company?.wage ? `${posting.Company.wage}만원` : null,
    }));

    res.status(200).json({
      filters: { page, limit, sortBy, keyword, company, position, location, experience, wage, skill },
      totalCount: jobPostings.count,
      totalPages: Math.ceil(jobPostings.count / limit),
      currentPage: page,
      jobPostings: transformedJobPostings,
    });
  } catch (error) {
    console.error('Error retrieving job postings:', error);
    res.status(500).json({ message: 'Error retrieving job postings', error });
  }
};




// 공고 상세 조회 (GET /jobs/:id)
exports.getJobPostingById = async (req, res) => {
  try {
    const { id } = req.params; // 채용 공고 ID
    const job = await JobPosting.findByPk(id, {
      attributes: ['id', 'title', 'experience', 'education', 'employmentType', 'location', 'deadline', 'views', 'companyId'],
      include: [
        {
          model: Company,
          attributes: ['name', 'representative', 'category', 'homepage', 'address', 'companyType', 'wage', 'employee']
        },
        {
          model: Skill,
          attributes: ['name']
        },
      ]
    });

    if (!job) return res.status(404).json({ message: 'Job not found' });

    // companyId 확인
    if (!job.companyId) {
      return res.status(400).json({ message: 'Job does not have a valid companyId' });
    }

    job.views += 1; // 조회수 증가
    await job.save();

    // 관련 공고 추천
    const relatedJobs = await JobPosting.findAll({
      where: { companyId: job.companyId }, // companyId 사용
      limit: 5,
      attributes: ['id', 'title'],
    });

    res.status(200).json({ job, relatedJobs });
  } catch (error) {
    console.error('Error:', error);  // 오류 출력
    res.status(500).json({ message: 'Error retrieving job posting details', error });
  }
};




// 공고 등록 (POST /jobs)
exports.createJobPosting = async (req, res) => {
  try {
    const {
      companyName,
      title,
      link,
      experience,
      education,
      employmentType,
      salary,
      location,
      deadline,
      keywords,
      skills,
      
    } = req.body;
    const { id: userId } = req.user;

    // 필수 입력 필드 검증
    if (!link||!companyName || !title || !experience || !education || !employmentType || salary === undefined || !location || !deadline || !keywords || !skills) {
      return res.status(400).json({
        message: 'All fields (companyName, title, experience, education, employmentType, salary, location, deadline, keywords, skills) are required.'
      });
    }

    // 회사명 확인 및 등록
    let company = await Company.findOne({ where: { name: companyName } });
    if (!company) {
      return res.status(400).json({ message: 'Company do not exist' });
    }

    // 공고 등록
    const newJobPosting = await JobPosting.create({
      companyId: company.id,
      title,
      link,
      experience,
      education,
      employmentType,
      salary,
      location,
      deadline,
      userId,
    });

    // 키워드 저장
    if (keywords && Array.isArray(keywords)) {
      const keywordInstances = await Keyword.findAll({ where: { name: keywords } });
      await newJobPosting.addKeywords(keywordInstances);
    } else {
      return res.status(400).json({ message: 'Keywords must be an array and cannot be empty.' });
    }

    // 기술 스택 저장
    if (skills && Array.isArray(skills)) {
      const skillInstances = await Skill.findAll({ where: { name: skills } });
      await newJobPosting.addSkills(skillInstances);
    } else {
      return res.status(400).json({ message: 'Skills must be an array and cannot be empty.' });
    }

    res.status(201).json({
      message: 'Job posting created successfully',
      jobPosting: newJobPosting
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating job posting', error });
  }
};


// 공고 수정 (PUT /jobs/:id)
exports.updateJobPosting = async (req, res) => {
  try {
    const { id: jobPostingId } = req.params;
    const { id: userId, role } = req.user;

    const jobPosting = await JobPosting.findByPk(jobPostingId);
    if (!jobPosting) return res.status(404).json({ message: 'Job posting not found' });
    
    if (jobPosting.userId !== userId && !['admin', 'manager'].includes(role)) {
      return res.status(403).json({ message: 'Unauthorized to update this job posting' });
    }

    // req.body에 companyName이 있는 경우
    if (req.body.companyName) {
      const { companyName } = req.body;

      // Company 테이블에서 해당 회사명을 확인
      const company = await Company.findOne({ where: { name: companyName } });
      if (!company) {
        return res.status(400).json({ message: 'Company does not exist' });
      }

      // companyId를 req.body에 추가하고 companyName은 삭제
      req.body.companyId = company.id;
      delete req.body.companyName;
    }

    // 수정 처리
    const updatedJobPosting = await jobPosting.update(req.body);
    res.status(200).json({ message: 'Job posting updated successfully', job: updatedJobPosting });
  } catch (error) {
    res.status(500).json({ message: 'Error updating job posting', error });
  }
};

// 공고 삭제 (DELETE /jobs/:id)
exports.deleteJobPosting = async (req, res) => {
  try {
    const { id: jobPostingId } = req.params;
    const { id: userId, role } = req.user;
    const jobPosting = await JobPosting.findByPk(jobPostingId);
    if (!jobPosting) {
      return res.status(404).json({ message: 'Job posting not found' });
    }
    if (jobPosting.userId !== userId && !['admin', 'manager'].includes(role)) {
      return res.status(403).json({ message: 'Unauthorized to delete this job posting' });
    }
    await jobPosting.destroy();
    res.status(200).json({ message: 'Job posting deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting job posting', error });
  }
};
