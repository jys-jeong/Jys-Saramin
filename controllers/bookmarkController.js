const { Bookmark, JobPosting } = require('../models');
const { createError } = require('../middlewares/errorHandler');
exports.toggleBookmark = async (req, res, next) => {
  try {
    const { jobPostingId } = req.body;  // 요청 본문에서 jobPostingId 추출
    const { id: userId } = req.user;  // JWT에서 사용자 ID 추출

    // 해당 사용자와 구인 공고에 대한 북마크 존재 여부 확인
    const existingBookmark = await Bookmark.findOne({
      where: { userId, jobPostingId },
    });

    if (existingBookmark) {
      // 이미 북마크가 존재하면 삭제
      await existingBookmark.destroy();
      return res.status(200).json({ message: '북마크가 제거되었습니다.' });
    }

    // 북마크가 없다면 새로 추가
    const newBookmark = await Bookmark.create({
      userId,
      jobPostingId,
    });

    return res.status(201).json(newBookmark);
  } catch (error) {
    console.error(error);
    return next(createError(500, '서버 오류'));
  }
};

exports.getBookmarks = async (req, res, next) => {
  try {
    const { id: userId } = req.user; // JWT에서 사용자 ID를 추출
    const { page = 1, limit = 5 } = req.query; // 페이지네이션 설정 (기본값: 1페이지, 5개 항목)

    // 페이지네이션과 최신순 정렬
    const bookmarks = await Bookmark.findAndCountAll({
      where: { userId },
      include: [
        {
          model: JobPosting,
          attributes: ['id', 'title', 'location', 'salary'],  // JobPosting의 필요한 필드만 반환
        },
      ],
      order: [['createdAt', 'DESC']],  // 최신순으로 정렬
      offset: (page - 1) * limit,  // 페이지네이션 오프셋
      limit: parseInt(limit,10),  // 한 페이지에 표시할 항목 수
    });

    if (!bookmarks) {
      return next(createError(404, '북마크가 존재하지 않습니다.'));
    }

    return res.status(200).json({
      totalCount: bookmarks.count,
      totalPages: Math.ceil(bookmarks.count / limit),  // 총 페이지 수
      currentPage: page,  // 현재 페이지
      bookmarks: bookmarks.rows,
    });
  } catch (error) {
    console.error(error);
    return next(createError(500, '서버 오류'));
  }
};