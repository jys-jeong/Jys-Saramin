const fs = require('fs');
const { JobPosting, Company, Keyword, JobPostingKeyword, Skill, JobSkill } = require('./models'); // 모델 경로를 맞춰주세요.

// JSON 파일 읽기 및 파싱
const jsonData = fs.readFileSync('./saramin_jobs.json', 'utf8');
const jobPostings = JSON.parse(jsonData); // JSON 배열로 파싱

async function insertJobPostingData() {
  try {
    // JSON 배열을 순차적으로 처리
    for (const jobPostingData of jobPostings) {
      // 기존 회사가 있는지 확인, 없으면 새로운 회사 데이터 삽입
      const [company, created] = await Company.findOrCreate({
        where: {
          name: jobPostingData["회사명"], // 회사명이 같으면 기존 회사 찾기
        },
        defaults: {
          representative: jobPostingData["대표자명"],
          category: jobPostingData["업종"],
          homepage: jobPostingData["홈페이지"],
          address: jobPostingData["주소"],
          companyType: jobPostingData["기업형태"],
          wage: jobPostingData["평균연봉"]
          ? typeof jobPostingData["평균연봉"] === 'string'
            ? parseInt(jobPostingData["평균연봉"].replace(/,/g, ''), 10)
            : jobPostingData["평균연봉"]
          : 0,
          employee: jobPostingData["사원수"]
        }
      });

      // JobPosting 테이블에 데이터 삽입
      const jobPostingDataForJobPosting = {
        companyId: company.id, // 기존 회사의 ID 사용
        title: jobPostingData["제목"],
        link: jobPostingData["링크"],
        experience: jobPostingData["경력"],
        education: jobPostingData["학력"],
        employmentType: jobPostingData["고용형태"],
        salary: jobPostingData["연봉정보"],
        location: jobPostingData["지역"],
        deadline: jobPostingData["마감일"], // 이 부분도 Date 형식에 맞게 변환 필요
        views: 0, // 기본값
      };

      const jobPosting = await JobPosting.create(jobPostingDataForJobPosting);

      // Keywords를 삽입하고, JobPostingKeyword로 JobPosting과 연결
      // 직무 제목, 지역, 고용형태 등을 키워드로 추가
      const allKeywords = [
        jobPostingData["제목"],    // 제목을 키워드로 추가
        jobPostingData["지역"],    // 지역을 키워드로 추가
        jobPostingData["고용형태"],  // 고용형태를 키워드로 추가
        jobPostingData["연봉정보"],   // 연봉정보를 키워드로 추가
        jobPostingData["회사명"]     // 회사명도 키워드로 추가
      ];

      for (const value of allKeywords) {
        const keywords = value.split(" "); // 여러 단어로 나누어 처리
        for (const name of keywords) {
          const keyword = await Keyword.findOrCreate({
            where: { name }
          });
        
          // JobPostingKeyword가 이미 존재하는지 확인
          const [existingJobPostingKeyword] = await JobPostingKeyword.findAll({
            where: {
              jobPostingId: jobPosting.id,
              keywordId: keyword[0].id
            }
          });
        
          if (!existingJobPostingKeyword) {
            // 중복되지 않으면 삽입
            await JobPostingKeyword.create({
              jobPostingId: jobPosting.id,
              keywordId: keyword[0].id,
            });
          }
        }
      }

      // Skills를 삽입하고, JobPostingSkill로 JobPosting과 연결
      const skills = jobPostingData["직무분야"]; // 예: "React, Node.js, JavaScript"
      const skillNames = skills.split(" "); // 쉼표로 구분된 스킬을 배열로 변환

      for (const skillName of skillNames) {
        const skill = await Skill.findOrCreate({
          where: { name: skillName.trim() } // 불필요한 공백을 제거
        });

        await JobSkill.create({
            jobPostingId: jobPosting.id,
          skillId: skill[0].id
        });
      }
    }

    console.log("모든 데이터 삽입 완료");
  } catch (error) {
    console.error("데이터 삽입 중 오류 발생:", error);
  }
}

// 데이터 삽입 함수 실행
insertJobPostingData();
