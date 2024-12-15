const { Application, JobPosting } = require('../models');
const jwt = require('jsonwebtoken');  // JWT 인증
const { createError } = require('../middlewares/errorHandler');
const { successResponse, errorResponse } = require('../utils/responseHandler');
// 지원하기
exports.createApplication = async (req, res, next) => {
  try {
    const { jobId, status } = req.body;
    const { id: userId } = req.user;  // JWT에서 사용자 ID를 추출

    // 중복 지원 체크
    const existingApplication = await Application.findOne({
      where: { userId, jobId },
    });

    if (existingApplication) {
      return errorResponse(res, '이미 해당 공고에 지원한 상태입니다.', 'DUPLICATE_APPLICATION', 400);
    }

    // 지원 정보 저장
    const newApplication = await Application.create({
      userId,
      jobId,
      status: status,  // 기본 상태는 'applied'
      date: new Date(),
    });

    return successResponse(res, newApplication, null, '지원이 완료되었습니다.');
  } catch (error) {
    console.error(error);
    return errorResponse(res, '서버 오류', 'SERVER_ERROR', 500);
  }
};

// 지원 내역 조회
exports.getApplications = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { status } = req.query;

    const whereConditions = { userId };

    if (status) whereConditions.status = status;

    // 지원 내역 조회
    const applications = await Application.findAll({
      where: whereConditions,
      include: [
        { model: JobPosting, attributes: ['title', 'companyId', 'location'] },
      ],
      order: [['date', 'DESC']],  // 날짜별 정렬
    });

    return successResponse(res, applications);
  } catch (error) {
    console.error(error);
    return errorResponse(res, '서버 오류', 'SERVER_ERROR', 500);
  }
};

// 지원 취소
exports.cancelApplication = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // 지원 내역 조회
    const application = await Application.findOne({
      where: { id, userId },
    });

    if (!application) {
      return errorResponse(res, '지원 내역을 찾을 수 없습니다.', 'NOT_FOUND', 404);
    }

    // 취소 가능 여부 확인 (applied 상태에서만 취소 가능)
    if (application.status !== 'applied') {
      return errorResponse(res, '취소할 수 없는 상태입니다.', 'INVALID_STATUS', 400);
    }

    // 상태 업데이트 (canceled로 변경)
    application.status = 'canceled';
    await application.save();

    return successResponse(res, { message: '지원이 취소되었습니다.' });
  } catch (error) {
    console.error(error);
    return errorResponse(res, '서버 오류', 'SERVER_ERROR', 500);
  }
};