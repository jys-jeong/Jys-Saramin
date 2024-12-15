## [JobPosting](http://113.198.66.75:10241/)
- [API Docs](http://113.198.66.75:10241/api-docs/)

## 프로젝트 설치 및 실행 방법

Nodejs Version: 18.19.1

### 패키지 설치
```
npm install
```

### 환경변수 설정

.env

```
PORT="YOUR 포트 번호"

JWT_SECRET="YOUR JWT SECRET Key"
JWT_REFRESH_SECRET="YOUR JWT_REFRESH_SECRET"
export SECRET_KEY=<YOUR SECRET KEY TO JWT ENCODE>
export DB_USER=<DB USER>
export DB_PASSWORD=<DB PASSWORD>
```

/config/config.json
```
{
  "development": {
    "username": "MySQL USER",
    "password": "MySQL PassWord",
    "database": "DB name",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "port":"YOUR DB PORT"
  }
}
```
### 실행
```
node server.js
```

## API 엔드포인트 목록 및 설명

### Application

| Method | Endpoint               | Description          |
|--------|------------------------|----------------------|
| GET    | `/applications/`       | 사용자 지원 내역 조회     |
| POST   | `/applications/`       | 채용 공고 지원      |
| DELETE | `/applications/{id}`   | 지원 취소            |

### Auth

| Method | Endpoint               | Description          |
|--------|------------------------|----------------------|
| DELETE | `/auth/`               | 회원 탈퇴         |
| POST   | `/auth/login`          | 로그인       |
| GET    | `/auth/profile`        | 회원 정보 조회  |
| PUT    | `/auth/profile`        | 회원 정보 수정  |
| POST   | `/auth/refresh`        | Access 토큰 갱신  |
| POST   | `/auth/register`       | 회원 가입         |

### Bookmark

| Method | Endpoint               | Description          |
|--------|------------------------|----------------------|
| GET    | `/bookmarks/`          | 북마크 목록 조회   |
| POST   | `/bookmarks/`          | 채용 공고 북마크 추가/제거 |

### Company Review

| Method | Endpoint               | Description          |
|--------|------------------------|----------------------|
| GET    | `/companyreview/`          | 회사 리뷰 조회  |
| POST   | `/companyreview/`          | 회사 리뷰 추가 |
| DELETE | `/companyreview/{id}`      | 회사 리뷰 삭제            |

### Job Posting

| Method | Endpoint               | Description          |
|--------|------------------------|----------------------|
| GET    | `/jobs/`               | 채용 공고 목록 조회   |
| POST   | `/jobs/`               | 채용 공고 추가       |
| DELETE | `/jobs/{id}`           | 채용 공고 삭제     |
| PUT    | `/jobs/{id}`           | 채용 공고 수정     |
| GET    | `/jobs/{job_id}`       | 채용 공고 상세 정보 조회 |

## 크롤링 코드 실행 방법

NodeJs Version: 18.20.4

### 패키지 설치
```
npm install axios
npm install cheerio
```

### 실행
```
node saramin_crawl.js
```
