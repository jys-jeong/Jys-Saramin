const fs = require('fs');
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

function getAllJsFiles(dirPath) {
  let files = [];
  const filesInDirectory = fs.readdirSync(dirPath);

  filesInDirectory.forEach(file => {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // 폴더인 경우, 재귀적으로 파일을 읽어옴
      files = files.concat(getAllJsFiles(fullPath));
    } else if (file.endsWith('.js')) {
      // 상대 경로를 계산하여 추가 (docs/를 기준으로 상대 경로 계산)
      const relativePath = path.relative(path.join(__dirname, 'docs'), fullPath);
      files.push(relativePath);
    }
  });

  return files;
}

// docs 폴더 내의 모든 .js 파일을 동적으로 불러오기
const docsDirectory = path.join(__dirname, 'docs');
const apiFiles = getAllJsFiles(docsDirectory);
console.log(apiFiles); // 상대 경로를 출력하여 확인

// Swagger 옵션 정의
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '구인구직 백엔드 API',
      version: '1.0.0',
      description: '구인구직 서버의 API 문서',
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: '로그인 후, accessToken을 발급 받아 입력하세요'
        },
      },
    },
  },
  apis: apiFiles.map(file => path.join('docs', file)),  // docs 폴더의 모든 .js 파일을 Swagger 문서로 등록
};

// Swagger JSDoc 생성
const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerUi, swaggerSpec };
