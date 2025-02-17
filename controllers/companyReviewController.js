// controllers/companyReviewController.js
const { CompanyReview, Company } = require('../models');
const { createError } = require('../middlewares/errorHandler');
const { successResponse, errorResponse } = require('../utils/responseHandler');
exports.createReview = async (req, res, next) => {
  try {
    const { companyId, review } = req.body; // 요청 본문에서 기업 ID, 리뷰 내용 추출

    // 기업 존재 여부 확인
    const company = await Company.findByPk(companyId);
    if (!company) {
      return errorResponse(res, '해당 기업을 찾을 수 없습니다.', 'NOT_FOUND', 404);
    }

    // 리뷰 생성
    const newReview = await CompanyReview.create({
      companyId,
      review,
    });

    return successResponse(res, newReview, null, '리뷰가 성공적으로 등록되었습니다.');
  } catch (error) {
    console.error(error);
    return errorResponse(res, '서버 오류 발생', 'SERVER_ERROR', 500);
  }
};

exports.getReviews = async (req, res, next) => {
  try {
    const { companyId } = req.query;  // 쿼리 파라미터로 필터링
    const { page = 1, limit = 10 } = req.query;  // 페이지네이션 (기본값: 1페이지, 10개 항목)

    const filter = {};
    const company = await Company.findByPk(companyId);
    if (!company) {
      return errorResponse(res, '해당 기업을 찾을 수 없습니다.', 'NOT_FOUND', 404);
    }
    if (companyId) filter.companyId = companyId;

    // 페이지네이션과 최신순 정렬
    const reviews = await CompanyReview.findAndCountAll({
      where: filter,
      include: [
        {
          model: Company,
          attributes: ['id', 'name'], // 기업 정보
        },
      ],
      order: [['createdAt', 'DESC']],  // 최신순으로 정렬
      offset: (page - 1) * limit,  // 페이지네이션 오프셋
      limit: parseInt(limit,10),  // 한 페이지에 표시할 항목 수
    });

    if (reviews.count === 0) {
      return errorResponse(res, '리뷰를 찾을 수 없습니다.', 'NOT_FOUND', 404);
    }
    return successResponse(res, reviews.rows,{
      totalCount: reviews.count,
      totalPages: Math.ceil(reviews.count / limit),  // 총 페이지 수
      currentPage: page,  // 현재 페이지
    }, null, '리뷰 목록을 성공적으로 조회하였습니다.');
  } catch (error) {
    console.error(error);
    return errorResponse(res, '서버 오류 발생', 'SERVER_ERROR', 500);
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;  // 리뷰 ID

    // 리뷰 조회
    const review = await CompanyReview.findByPk(id);
    if (!review) {
      return successResponse(res, null, null, '리뷰가 삭제되었습니다.');
    }

    // 리뷰 삭제
    await review.destroy();
    return res.status(200).json({ message: '리뷰가 삭제되었습니다.' });
  } catch (error) {
    console.error(error);
    return errorResponse(res, '서버 오류 발생', 'SERVER_ERROR', 500);
  }
};
