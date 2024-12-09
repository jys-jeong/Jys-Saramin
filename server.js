const { sequelize } = require('./models'); // models/index.js 불러오기

(async () => {
  try {
    await sequelize.sync({ force: true }); // 기존 테이블 삭제 후 재생성
    console.log('All tables created successfully!');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
})();
