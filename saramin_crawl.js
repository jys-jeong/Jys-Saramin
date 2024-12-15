const axios = require("axios");
const cheerio = require("cheerio");
const { parse } = require("json2csv");
const fs = require("fs");
const path = require("path");
/**
 * 회사 상세 정보를 크롤링하는 함수
 * @param {string} companyUrl - 회사의 상세 페이지 URL
 * @returns {Object} 회사의 상세 정보 객체
 */

async function crawlDynamic(companyUrl) {
  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  };
  const response = await axios.get(companyUrl, { headers });
  if (response.status === 200) {
    try {
      const $ = cheerio.load(response.data);
      // 평균 연봉 추출
      const averageSalary = $(".salaryinfo .average_currency em").text();

      console.log("2023년 평균 연봉:", averageSalary, "만원");
      return averageSalary;
    } catch (error) {
      console.error("크롤링 에러:", error);
    }
  } else {
    console.log(`[알림] 회사 상세 페이지가 없습니다: ${companyUrl}`);
    return 0;
  }
}
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
        }
      });
      $(".col").each((index, element) => {
        // .tit 텍스트 가져오기
        const title = $(element).find(".tit").text().trim();

        // .num 텍스트 가져오기 (이 값을 기준으로 wage와 employee를 설정)
        const text = $(element).find(".num").text().trim();

        if (title === "전체 사원수") {
          employee = parseInt(text.replace(/[^0-9]/g, ""), 10) || 0; // 숫자만 추출
        }
      });
      const link = $("a.BtnType.SizeS.link_content_more").attr("href");
      console.log(link);
      if (link !== undefined) {
        wage = await crawlDynamic(`https://www.saramin.co.kr${link}`);
      }
      form =
        $("li.company_summary_item")
          .filter(function () {
            return (
              $(this).find(".company_summary_desc").text().trim() === "기업형태"
            );
          })
          .find(".tooltip_company_type .company_summary_tit")
          .text()
          .trim() || "정보 없음";

      const companyDetails = {
        representative, // 대표자명
        category, // 업종
        homepage, // 홈페이지
        address, // 주소
        form, // 기업 형태
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
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = String(date.getDate()).padStart(2, "0"); // 일은 1부터 시작하므로 2자리로 포맷팅

  return `${year}-${month}-${day}`;
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
  const salary = $(el).find(".area_badge .badge").text().trim() || "정보 없음";
  const sector = [];
  $(el)
    .find(".job_sector a")
    .each((index, element) => {
      const text = $(element).text().trim();
      if (text) {
        sector.push(text); // 공백 포함하여 각 항목을 배열에 추가
      }
    });

  // 배열을 공백으로 결합하여 하나의 문자열로 만들기
  const sectorString = sector.join(" "); // 공백을 구분자로 합침

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
  if (deadlineDate !== "정보 없음") {
    deadlineDate = formatDate(deadlineDate);
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
    직무분야: sectorString,
    연봉정보: salary,
  };
}

/**
 * 사람인 채용공고를 크롤링하는 함수
 * @param {string} keyword - 검색할 키워드
 * @param {number} pages - 크롤링할 페이지 수
 * @param {number} delay - 페이지 요청 간 딜레이 시간 (ms)
 * @returns {Promise<Array>} 크롤링된 채용 정보 배열
 */
async function crawlSaramin(keyword, pages = 1, delay = 10000) {
  const jobs = [];
  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  };

  for (let page = 1; page <= pages; page++) {
    const url = `https://www.saramin.co.kr/zf_user/search/recruit?searchType=search&searchword=${encodeURIComponent(
      keyword
    )}&recruitPage=${page}`;

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
      console.error(`[에러 상세]`, err.response?.data || err.stack);
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

/**
 * 크롤링된 데이터를 CSV 파일로 저장하는 함수
 * @param {Array} data - 크롤링된 데이터
 * @param {string} filePath - 저장할 파일 경로
 */
function saveToJSON(newData, filePath) {
  let existingData = [];

  // 파일이 존재하면 기존 데이터를 읽어옵니다.
  if (fs.existsSync(filePath)) {
    const rawData = fs.readFileSync(filePath, "utf-8");
    existingData = JSON.parse(rawData);
  }

  // 기존 데이터에 새 데이터를 추가합니다.
  existingData = existingData.concat(newData);

  // 수정된 데이터를 JSON 파일로 저장합니다.
  fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), "utf-8");
  console.log(`[완료] ${filePath}에 데이터를 저장했습니다.`);
}
// 실행
(async () => {
  const { keyword, pages, delay } = {
    keyword: "vue", // 검색 키워드
    pages: 3, // 크롤링할 페이지 수
    delay: 3000, // 페이지 요청 간 딜레이 시간
  };

  console.log(`[알림] '${keyword}' 키워드로 ${pages}페이지 크롤링 시작`);
  const jobData = await crawlSaramin(keyword, pages, delay);

  if (jobData.length > 0) {
    console.log(`[완료] 총 ${jobData.length}건의 채용 정보 크롤링 완료`);

    // CSV로 저장할 경로
    const filePath = path.join(__dirname, "saramin_jobs.json");
    console.log(jobData);
    // 크롤링된 데이터를 CSV 파일로 저장
    saveToJSON(jobData, filePath);
  } else {
    console.log("[알림] 크롤링 결과가 없습니다.");
  }
})();
