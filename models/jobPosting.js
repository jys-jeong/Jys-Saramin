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
    location: DataTypes.STRING,
    deadline: DataTypes.STRING,
    views: { type: DataTypes.INTEGER, defaultValue: 0 },
  });
    // 관계 설정
  JobPosting.associate = (models) => {
    JobPosting.belongsTo(models.Company, { foreignKey: 'companyId' });

    JobPosting.belongsToMany(models.Skill, { through: models.JobSkill, foreignKey: 'jobId' });
    JobPosting.belongsToMany(models.Keyword, { through: models.JobPostingKeyword, foreignKey: 'jobPostingId' });

    JobPosting.belongsToMany(models.User, { through: models.Bookmark, foreignKey: 'jobPostingId' });
  };
  return JobPosting;
};
