const { sequelize } = require('./models'); // sequelize 인스턴스를 가져옵니다.

// 데이터베이스 모델을 동기화 (기존 테이블이 있으면 삭제하고 새로 만듭니다)
sequelize.sync({ force: true }) // force: true로 하면 기존 테이블을 삭제하고 다시 생성
  .then(() => {
    console.log("Database synchronized");
    console.log(sequelize.modelManager.models);
    console.log(sequelize.models.JobPosting.associations);

  })
  .catch((error) => {
    console.error("Error synchronizing the database:", error);
  });
