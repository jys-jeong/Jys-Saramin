const axios = require("axios");
const cheerio = require("cheerio");
const { Sequelize, DataTypes } = require("sequelize");
const fs = require("fs");
const path = require("path");
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

// Company 모델 정의
const Company = sequelize.define('Company', {
  name: { type: DataTypes.STRING, allowNull: false },
  representative: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  homepage: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: false },
  form: { type: DataTypes.STRING, allowNull: false },
  establish: { type: DataTypes.STRING, allowNull: false },
  wage: { type: DataTypes.INTEGER, allowNull: false },
  employee: { type: DataTypes.INTEGER, allowNull: false },
});

// JobPosting 모델 정의
const JobPosting = sequelize.define('JobPosting', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
  experience: { type: DataTypes.STRING, allowNull: false },
  education: { type: DataTypes.STRING, allowNull: false },
  employmentType: { type: DataTypes.STRING, allowNull: false },
  deadline: { type: DataTypes.DATE, allowNull: false },
  salary: { type: DataTypes.STRING, allowNull: false },
});

// 외래키 관계 설정 (Company와 JobPosting 관계 설정)
JobPosting.belongsTo(Company, { foreignKey: 'companyId' });
Company.hasMany(JobPosting, { foreignKey: 'companyId' });

// MySQL DB에 연결 확인
async function connectDatabase() {
  try {
    await sequelize.authenticate();
    console.log("MySQL 데이터베이스 연결 성공");
  } catch (error) {
    console.error("MySQL 데이터베이스 연결 실패:", error.message);
  }
}

// 회사 정보를 DB에 저장하는 함수
async function saveCompanyToDB(companyData) {
  try {
    const company = await Company.create({
      name: companyData.회사명,
      representative: companyData.대표자명,
      category: companyData.업종,
      homepage: companyData.홈페이지,
      address: companyData.주소,
      form: companyData.기업형태,
      establish: companyData.설립일,
      wage: companyData.평균연봉,
      employee: companyData.사원수,
    });
    console.log(`[완료] 회사 정보 저장 성공: ${company.name}`);
    return company;
  } catch (error) {
    console.error("[에러] 회사 저장 중 에러 발생:", error.message);
    return null;
  }
}

// 채용 정보를 DB에 저장하는 함수
async function saveJobPostingToDB(jobData, companyId) {
  try {
    const jobPosting = await JobPosting.create({
      title: jobData.제목,
      link:jobData.링크,
      location: jobData.지역,
      experience: jobData.경력,
      education: jobData.학력,
      employmentType: jobData.고용형태,
      deadline: jobData.마감일,
      salary: jobData.연봉정보,
      companyId: companyId,  // 외래키 설정
    });
    console.log(`[완료] 채용 공고 저장 성공: ${jobPosting.title}`);
    return jobPosting;
  } catch (error) {
    console.error("[에러] 채용 공고 저장 중 에러 발생:", error.message);
    return null;
  }
}

// 크롤링된 데이터를 DB에 저장하는 함수
async function saveCrawledDataToDB(jobData) {
  for (const job of jobData) {
    const companyData = {
      회사명: job.회사명,
      대표자명: job.대표자명,
      업종: job.업종,
      홈페이지: job.홈페이지,
      주소: job.주소,
      기업형태: job.기업형태,
      설립일: job.설립일,
      평균연봉: job.평균연봉,
      사원수: job.사원수,
    };

    // 회사 정보 저장
    const company = await saveCompanyToDB(companyData);
    if (company) {
      // 채용 공고 정보 저장
      await saveJobPostingToDB(job, company.id);
    }
  }
}
/**
 * 회사 상세 정보를 크롤링하는 함수
 * @param {string} companyUrl - 회사의 상세 페이지 URL
 * @returns {Object} 회사의 상세 정보 객체
 */
async function crawlCompanyDetails(companyUrl) {
  if (!companyUrl) {
    console.log("[경고] 회사 링크가 없습니다.");
    return;
  }

  try {
    console.log(`[알림] 회사 상세 페이지 크롤링 시작: ${companyUrl}`);

    // 헤더에 다른 User-Agent 설정
    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    };
    let representative = "정보 없음";
    let category = "정보 없음";
    let homepage = "정보 없음";
    let address = "정보 없음";
    let form = "정보 없음";
    let establish = "정보 없음";
    let wage = 0;
    let employee = 0;
    const response = await axios.get(companyUrl, { headers });
    if (response.status === 200) {
      const $ = cheerio.load(response.data);

      // company_details_group 정보를 배열로 가져옴
      const companyDetailsArray = [];
      $(".company_details_group .desc").each((index, element) => {
        const title = $(element).prev().text().trim(); // .tit의 텍스트
        const text = $(element).text().trim(); // .desc의 텍스트
        companyDetailsArray.push({ title, text }); // 객체로 배열에 저장
      });

      // 디버깅을 위해 배열을 출력
      console.log("[디버그] company_details_group 배열:", companyDetailsArray);

      // 기본값 설정
      let representative = "정보 없음";
      let category = "정보 없음";
      let homepage = "정보 없음";
      let address = "정보 없음";
      let form = "정보 없음";
      let establish = "정보 없음";
      let wage = 0;
      let employee = 0;

      // 배열에서 .tit 값을 기준으로 조건문을 사용하여 할당
      companyDetailsArray.forEach((item) => {
        const { title, text } = item;

        if (title.includes("대표자명")) {
          representative = text || "정보 없음";
        } else if (title.includes("업종")) {
          category = text || "정보 없음";
        } else if (title.includes("홈페이지")) {
          homepage = text || "정보 없음";
        } else if (title.includes("주소")) {
          tmp = text.replace(" 지도보기", "").trim();
          address = tmp || "정보 없음";
          console.log(address);
        } else if (title.includes("평균 연봉")) {
          wage = parseInt(text.replace(/[^0-9]/g, ""), 10) || 0;
        } else if (title.includes("사원 수")) {
          employee = parseInt(text.replace(/[^0-9]/g, ""), 10) || 0;
        }
      });
      form =
        $(".tooltip_company_type .company_summary_tit").text().trim() ||
        "정보 없음";
      establish =
        $(".company_summary_tit").first().text().trim() || "정보 없음";
      const companyDetails = {
        representative, // 대표자명
        category, // 업종
        homepage, // 홈페이지
        address, // 주소
        form, // 기업 형태
        establish, // 설립일
        wage, // 평균 연봉
        employee, // 전체 사원 수
      };
      console.log("[완료] 회사 상세 정보 크롤링 성공");
      console.log(companyDetails);
      return companyDetails;
    } else {
      console.log(`[알림] 회사 상세 페이지가 없습니다: ${companyUrl}`);
      const companyDetails = {
        representative: representative, // 대표자명
        category: category, // 업종
        homepage: homepage, // 홈페이지
        address: address, // 주소
        form: form, // 기업 형태
        establish: establish, // 설립일
        wage: wage, // 평균 연봉
        employee: employee, // 전체 사원 수
      };
      return companyDetails;
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error("[에러] 404 오류: 페이지가 존재하지 않습니다.");
      const companyDetails = {
        representative: "정보 없음", // 대표자명
        category: "정보 없음", // 업종
        homepage: "정보 없음", // 홈페이지
        address: "정보 없음", // 주소
        form: "정보 없음", // 기업 형태
        establish: "정보 없음", // 설립일
        wage: 0, // 평균 연봉
        employee: 0, // 전체 사원 수
      };
      return companyDetails;
    } else if (error.code === "ECONNRESET") {
      console.error("[에러] ECONNRESET: 서버와 연결이 끊어졌습니다.");
    } else {
      console.error("[에러] 기타 오류:", error.message);
    }
  }
}
/**
 * 채용 정보를 파싱하는 함수
 * @param {Cheerio} $ - cheerio 객체
 * @param {CheerioElement} el - 채용 정보 항목
 * @returns {Object} 파싱된 채용 정보 객체
 */
async function parseJob($, el) {
  const company = $(el).find(".corp_name a");
  const companyName = company.text().trim() || "정보 없음"; // 회사명
  const companyLink = company.attr("href")
    ? `https://www.saramin.co.kr${company.attr("href")}`
    : "정보 없음"; // 회사 링크

  const titleTag = $(el).find(".job_tit a");
  const title = titleTag.text().trim() || "정보 없음";
  const link = titleTag.attr("href")
    ? `https://www.saramin.co.kr${titleTag.attr("href")}`
    : "정보 없음";
  const conditions = $(el).find(".job_condition span");
  const location = $(conditions[0]).text().trim() || "정보 없음";
  const experience = $(conditions[1]).text().trim() || "정보 없음";
  const education = $(conditions[2]).text().trim() || "정보 없음";
  const employmentType = $(conditions[3]).text().trim() || "정보 없음";
  const deadline = $(el).find(".job_date .date").text().trim() || "정보 없음";
  const sector = $(el).find(".job_sector a").text().trim() || "정보 없음";
  const salary = $(el).find(".area_badge .badge").text().trim() || "정보 없음";

  let deadlineDate = "정보 없음";
  if (deadline === "오늘마감") {
    deadlineDate = new Date();
  } else if (deadline === "내일마감") {
    deadlineDate = new Date();
    deadlineDate.setDate(deadlineDate.getDate() + 1);
  } else if (
    deadline === "채용시" ||
    deadline === "상시채용" ||
    deadline === "진행예정"
  ) {
    deadlineDate = new Date();
    deadlineDate.setDate(deadlineDate.getDate() + 365);
  } else if (deadline !== "정보 없음") {
    const regex = /^~ (\d{1,2})\/(\d{1,2})\((.)\)$/; // "~ MM/DD(요일)" 형식의 정규 표현식
    const match = deadline.match(regex);

    if (match) {
      // 현재 연도와 월을 추출
      const currentYear = new Date().getFullYear();
      const month = parseInt(match[1], 10) - 1; // 월은 0부터 시작하므로 1을 빼야 함
      const day = parseInt(match[2], 10);

      // 날짜 객체 생성
      deadlineDate = new Date(currentYear, month, day);

      // 날짜가 유효한지 확인
      if (isNaN(deadlineDate.getTime())) {
        console.log("마감일 출력해줘", deadlineDate.getTime());
        deadlineDate = "정보 없음"; // 유효하지 않으면 "정보 없음"으로 설정
      }
    }
  }
  // 회사 링크를 통해 상세 정보를 크롤링
  const companyDetails =
    companyLink !== "정보 없음" ? await crawlCompanyDetails(companyLink) : {};

  return {
    대표자명: companyDetails.representative,
    업종: companyDetails.category,
    홈페이지: companyDetails.homepage,
    주소: companyDetails.address,
    기업형태: companyDetails.form,
    설립일: companyDetails.establish,
    평균연봉: companyDetails.wage,
    사원수: companyDetails.employee,
    회사명: companyName,
    회사링크: companyLink,
    제목: title,
    링크: link,
    지역: location,
    경력: experience,
    학력: education,
    고용형태: employmentType,
    마감일: deadlineDate,
    직무분야: sector,
    연봉정보: salary,
  };
}
// 크롤링 함수 (이 부분은 기존의 크롤링 함수에 맞춰 구현)
async function crawlSaramin(keyword, pages = 1, delay = 10000) {
  const jobs = [];
  const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  };

  for (let page = 1; page <= pages; page++) {
    const url = `https://www.saramin.co.kr/zf_user/search/recruit?searchType=search&searchword=${encodeURIComponent(keyword)}&recruitPage=${page}`;

    try {
      console.log(`[알림] ${page}페이지 요청 중...`);
      const response = await axios.get(url, { headers });
      const $ = cheerio.load(response.data);

      $(".item_recruit").each(async (_, el) => {
        try {
          const job = await parseJob($, el); // 채용 정보 파싱
          jobs.push(job);
        } catch (err) {
          console.warn("[경고] 항목 파싱 중 에러 발생:", err.message);
        }
      });

      console.log(`[완료] ${page}페이지 크롤링 성공`);
    } catch (err) {
      console.error(`[에러] ${page}페이지 요청 실패: ${err.message}`);
      continue;
    }

    // 요청 간 딜레이
    if (page < pages) {
      console.log(`[알림] ${delay}ms 동안 대기 중...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  return jobs;
}

// 크롤링된 데이터를 DB에 저장하는 실행 함수
(async () => {
  await connectDatabase();  // DB 연결 확인

  const { keyword, pages, delay } = {
    keyword: "python", // 검색 키워드
    pages: 3, // 크롤링할 페이지 수
    delay: 3000, // 페이지 요청 간 딜레이 시간
  };

  console.log(`[알림] '${keyword}' 키워드로 ${pages}페이지 크롤링 시작`);
  const jobData = await crawlSaramin(keyword, pages, delay);
  console.log(jobData);
  // if (jobData.length > 0) {
  //   console.log(`[완료] 총 ${jobData.length}건의 채용 정보 크롤링 완료`);
  //   // 크롤링된 데이터를 DB에 저장
  //   await saveCrawledDataToDB(jobData);
  // } else {
  //   console.log("[알림] 크롤링 결과가 없습니다.");
  // }

  // DB 연결 종료
  await sequelize.close();
})();
