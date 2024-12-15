const { JobPosting, Skill, Company, Keyword } = require('../models');
const { Op } = require('sequelize');
const { createError } = require('../middlewares/errorHandler');
const { successResponse, errorResponse } = require('../utils/responseHandler');
// 공고 목록 조회 (GET /jobs)
exports.getJobPostings = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, sortby = 'views', keyword, company, position, location, experience, wage, skill } = req.query;
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
    if (sortby === 'wage') {
      order.push([{ model: Company }, 'wage', 'DESC']);
    } else {
      order.push([sortby, 'DESC']);
    }


    const filteredJobPostings = await JobPosting.findAll({
      where,
      include,
      attributes: ['id'],
    });


    if(filteredJobPostings.count==0){
      return errorResponse(res, '해당하는 데이터가 존재하지 않습니다.', 'NO_DATA', 404);
    }
    // 데이터 조회
    const jobPostings = await JobPosting.findAndCountAll({
      where,
      include,
      offset,
      limit: parsedLimit,
      order,
      attributes: ['id', 'companyId', 'title', 'link', 'experience', 'education', 'employmentType', 'salary', 'location', 'deadline','views'],
    });

    if(jobPostings.count==0){
      return errorResponse(res, '해당하는 데이터가 존재하지 않습니다.', 'NO_DATA', 404);
    }

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

    return successResponse(res, transformedJobPostings, {
      currentPage: parseInt(page),
      totalPages: Math.ceil(jobPostings.count / limit),
      totalItems: jobPostings.count,
    });
  } catch (error) {
    console.error('Error retrieving job postings:', error);
    return errorResponse(res, '서버 오류가 발생했습니다.', 'SERVER_ERROR', 500);
  }
};

// 공고 상세 조회 (GET /jobs/:id)
exports.getJobPostingById = async (req, res, next) => {
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

    if (!job) return errorResponse(res, '공고를 찾을 수 없습니다.', 'NOT_FOUND', 404);

    job.views += 1; // 조회수 증가
    await job.save();

    // 관련 공고 추천
    const relatedJobs = await JobPosting.findAll({
      where: { companyId: job.companyId }, // companyId 사용
      limit: 5,
      attributes: ['id', 'title'],
    });
     return successResponse(res, {
      jobPosting:job,
      relatedJobs:relatedJobs
    });
  } catch (error) {
    console.error('Error:', error);  // 오류 출력
    return errorResponse(res, '서버 오류가 발생했습니다.', 'SERVER_ERROR', 500);
  }
};

// 공고 등록 (POST /jobs)
exports.createJobPosting = async (req, res, next) => {
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
      return errorResponse(res, '모든 필드를 입력하셔야합니다.', 'VALIDATION_ERROR');
    }

    // 회사명 확인 및 등록
    let company = await Company.findOne({ where: { name: companyName } });
    if (!company) {
      return errorResponse(res, '회사가 존재하지 않습니다.', 'INVALID_COMPANY');
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
      return errorResponse(res, 'keyword는 배열이어야 합니다.', 'INVALID_KEYWORDS');
    }

    // 기술 스택 저장
    if (skills && Array.isArray(skills)) {
      const skillInstances = await Skill.findAll({ where: { name: skills } });
      await newJobPosting.addSkills(skillInstances);
    } else {
      return errorResponse(res, 'skill는 배열이어야 합니다.', 'INVALID_SKILLS');
    }

    return successResponse(res, {
      message: '공고 등록이 완료되었습니다.',
      jobPosting: newJobPosting,
    }, null);
  } catch (error) {
    return errorResponse(res, '서버 오류가 발생했습니다.', 'SERVER_ERROR', 500);
  }
};

// 공고 수정 (PUT /jobs/:id)
exports.updateJobPosting = async (req, res, next) => {
  try {
    const { id: jobPostingId } = req.params;
    const { id: userId, role } = req.user;

    const jobPosting = await JobPosting.findByPk(jobPostingId);
    if (!jobPosting) return errorResponse(res, '공고가 존재하지 않습니다.', 'NOT_FOUND', 404);
    


    // req.body에 companyName이 있는 경우
    if (req.body.companyName) {
      const { companyName } = req.body;

      // Company 테이블에서 해당 회사명을 확인
      const company = await Company.findOne({ where: { name: companyName } });
      if (!company) {
        return errorResponse(res, '회사가 존재하지 않습니다.', 'INVALID_COMPANY');
      }

      // companyId를 req.body에 추가하고 companyName은 삭제
      req.body.companyId = company.id;
      delete req.body.companyName;
    }

    // 수정 처리
    const updatedJobPosting = await jobPosting.update(req.body);
    return successResponse(res, {
      message: '공고가 성공적으로 수정되었습니다.',
      jobPosting: updatedJobPosting,
    });
  } catch (error) {
    return errorResponse(res, '서버 오류가 발생했습니다.', 'SERVER_ERROR', 500);  }
};

// 공고 삭제 (DELETE /jobs/:id)
exports.deleteJobPosting = async (req, res, next) => {
  try {
    const { id: jobPostingId } = req.params;
    const { id: userId, role } = req.user;
    const jobPosting = await JobPosting.findByPk(jobPostingId);
    if (!jobPosting) {
      return errorResponse(res, '공고가 존재하지 않습니다.', 'NOT_FOUND', 404);
    }

    await jobPosting.destroy();
    return successResponse(res, { message: '공고가 성공적으로 삭제되었습니다.' });
  } catch (error) {
    return errorResponse(res, '서버 오류가 발생했습니다.', 'SERVER_ERROR', 500);
  }
};
