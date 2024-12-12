module.exports = (sequelize, DataTypes) => {
  const JobPosting = sequelize.define('JobPosting', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    companyId: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    link: DataTypes.STRING,
    experience: DataTypes.STRING,
    education: DataTypes.STRING,
    employmentType: DataTypes.STRING,
    salary: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, allowNull: true },
    location: DataTypes.STRING,
    deadline: DataTypes.DATE,
    views: { type: DataTypes.INTEGER, defaultValue: 0 },
  });

  JobPosting.associate = (models) => {
    JobPosting.belongsTo(models.Company, { foreignKey: 'companyId' });
    JobPosting.belongsTo(models.User, { foreignKey: 'userId' });

    // 다대다 관계
    JobPosting.belongsToMany(models.Skill, {
      through: models.JobSkill,
      foreignKey: 'jobPostingId',
      otherKey: 'skillId',   // 다른 테이블(다른 모델)에서의 외래키
    });

    JobPosting.belongsToMany(models.Keyword, { through: models.JobPostingKeyword, foreignKey: 'jobPostingId' });
    JobPosting.belongsToMany(models.User, { through: models.Bookmark, foreignKey: 'jobPostingId' });
  };

  return JobPosting;
};
