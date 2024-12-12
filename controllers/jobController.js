const { JobPosting, Skill, Company, Keyword } = require('../models');
const { Op } = require('sequelize');

// 공고 목록 조회 (GET /jobs)
exports.getJobPostings = async (req, res) => {
  try {
    const { page = 1, limit = 20, keyword, company, position, location, experience, wage, skill } = req.query;
    const offset = (page - 1) * limit;
    const parsedLimit = parseInt(limit, 10); 
    const where = {};

    // 기존 필터링 조건
    if (keyword) where.title = { [Op.like]: `%${keyword}%` }; // 키워드 검색
    if (position) where.title = { [Op.like]: `%${position}%` }; // 포지션 검색
    if (location) where.location = { [Op.like]: `%${location}%` }; // 지역 필터링
    if (experience) where.experience = experience; // 경력 필터링

    // 급여 필터링 추가: wage가 요청된 값보다 높은 공고만 조회
    if (wage) where['$Company.wage$'] = { [Op.gt]: wage }; // wage 필터링 (Company 테이블의 wage 필드 기준)

    const include = [];

    // 회사명 및 급여 필터링
    if (company || wage) {
      const companyWhere = {};
      if (company) companyWhere.name = { [Op.like]: `%${company}%` }; // 회사명 검색
      if (wage) companyWhere.wage = { [Op.gt]: wage }; // 급여가 wage보다 큰 공고만 조회
      include.push({
        model: Company,
        where: companyWhere,
        attributes: ['name', 'wage'], // 회사명과 급여 포함
      });
    } else {
      include.push({ model: Company, attributes: ['name', 'wage'] });
    }

    // 기술 스택 필터링
    if (skill) {
      include.push({
        model: Skill,
        where: { name: { [Op.like]: `%${skill}%` } },  // skill 필터링
        attributes: ['name']
      });
    }

    // 키워드 필터링 (JobPostingKeyword 모델을 제외하고 직접 Keyword 모델을 연결)
    if (keyword) {
      include.push({
        model: Keyword,
        where: { name: { [Op.like]: `%${keyword}%` } }, // 키워드 검색
        attributes: ['name']
      });
    }

    // 데이터 조회
    const jobPostings = await JobPosting.findAll({
      where,
      include,
      offset,
      limit: parsedLimit, // limit을 parsedLimit으로 설정

      attributes: ['title', 'experience', 'education', 'location', 'deadline'], // JobPosting에서 필요한 컬럼만 선택
    });

    res.status(200).json(jobPostings);
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
