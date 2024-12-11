const { Op } = require('sequelize');
const { Keyword, JobPostingKeyword, JobPosting } = require('./models');

// 예시: "삼성"이라는 회사명으로 검색
const searchCompany = async (companyName) => {
  // '삼성'과 관련된 키워드를 찾습니다.
  const keywords = await Keyword.findAll({
    where: {
      name: {
        [Op.like]: `%${companyName}%` // 회사명 검색
      }
    }
  });

  // 관련된 키워드를 기반으로 JobPostingKeyword 테이블에서 해당 키워드의 jobPostingId를 찾아
  // 해당 JobPosting들을 가져옵니다.
  const jobPostings = await JobPostingKeyword.findAll({
    where: {
      keywordId: {
        [Op.in]: keywords.map(keyword => keyword.id) // 키워드 ID로 매칭
      },
      field: 'company' // 회사 관련 키워드만 필터링
    },
    include: [{
      model: JobPosting,
      include: [Company] // 회사 정보도 함께 포함
    }]
  });

  console.log(jobPostings); // 검색된 게시물 출력
};

// 예시 실행
searchCompany('삼성');
