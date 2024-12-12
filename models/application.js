module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define('Application', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    jobId: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },

  });

  // 외래키 관계 설정
  Application.associate = (models) => {
    // userId가 User 모델을 참조하는 외래키 관계 설정
    Application.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    
    // jobId가 JobPosting 모델을 참조하는 외래키 관계 설정
    Application.belongsTo(models.JobPosting, { foreignKey: 'jobId', onDelete: 'CASCADE' });
  };

  return Application;
};
