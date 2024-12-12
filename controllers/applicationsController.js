const { Application, JobPosting } = require('../models');
const jwt = require('jsonwebtoken');  // JWT 인증

// 지원하기
exports.createApplication = async (req, res) => {
  try {
    const { jobId, status} = req.body;
    const {id:userId} = req.user;  // JWT에서 사용자 ID를 추출

    // 중복 지원 체크
    const existingApplication = await Application.findOne({
      where: { userId, jobId },
    });

    if (existingApplication) {
      return res.status(400).json({ message: '이미 해당 공고에 지원한 상태입니다.' });
    }

    // 지원 정보 저장
    const newApplication = await Application.create({
      userId,
      jobId,
      status: status,  // 기본 상태는 'applied'
      date: new Date(),
    });

    return res.status(201).json(newApplication);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
  }
};

// 지원 내역 조회
exports.getApplications = async (req, res) => {
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

    return res.status(200).json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
  }
};

// 지원 취소
exports.cancelApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // 지원 내역 조회
    const application = await Application.findOne({
      where: { id, userId },
    });

    if (!application) {
      return res.status(404).json({ message: '지원 내역을 찾을 수 없습니다.' });
    }

    // 취소 가능 여부 확인 (applied 상태에서만 취소 가능)
    if (application.status !== 'applied') {
      return res.status(400).json({ message: '취소할 수 없는 상태입니다.' });
    }

    // 상태 업데이트 (canceled로 변경)
    application.status = 'canceled';
    await application.save();

    return res.status(200).json({ message: '지원이 취소되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
  }
};
