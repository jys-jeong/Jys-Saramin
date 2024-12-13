// controllers/companyReviewController.js
const { CompanyReview, Company } = require('../models');
const { createError } = require('../middlewares/errorHandler');

exports.createReview = async (req, res, next) => {
  try {
    const { companyId, review } = req.body; // 요청 본문에서 기업 ID, 리뷰 내용 추출

    // 기업 존재 여부 확인
    const company = await Company.findByPk(companyId);
    if (!company) {
      return next(createError(404, '해당 기업을 찾을 수 없습니다.'));
    }

    // 리뷰 생성
    const newReview = await CompanyReview.create({
      companyId,
      review,
    });

    return res.status(201).json(newReview);
  } catch (error) {
    console.error(error);
    return next(createError(500, '서버 오류'));
  }
};

exports.getReviews = async (req, res, next) => {
  try {
    const { companyId } = req.query;  // 쿼리 파라미터로 필터링
    const { page = 1, limit = 10 } = req.query;  // 페이지네이션 (기본값: 1페이지, 10개 항목)

    const filter = {};
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
      return next(createError(404, '리뷰를 찾을 수 없습니다.'));
    }

    return res.status(200).json({
      totalCount: reviews.count,
      reviews: reviews.rows,
      totalPages: Math.ceil(reviews.count / limit),  // 총 페이지 수
      currentPage: page,  // 현재 페이지
    });
  } catch (error) {
    console.error(error);
    return next(createError(500, '서버 오류'));
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;  // 리뷰 ID

    // 리뷰 조회
    const review = await CompanyReview.findByPk(id);
    if (!review) {
      return next(createError(404, '리뷰를 찾을 수 없습니다.'));
    }

    // 리뷰 삭제
    await review.destroy();
    return res.status(200).json({ message: '리뷰가 삭제되었습니다.' });
  } catch (error) {
    console.error(error);
    return next(createError(500, '서버 오류'));
  }
};
