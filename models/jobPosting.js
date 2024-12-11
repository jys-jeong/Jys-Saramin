module.exports = (sequelize, DataTypes) => {
  const JobPosting = sequelize.define('JobPosting', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    companyId: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },  //제목
    link: DataTypes.STRING,  //공고 링크
    experience: DataTypes.STRING, // 경력
    education: DataTypes.STRING,  // 학력
    employmentType: DataTypes.STRING, //고용형태
    salary: DataTypes.STRING,  //연봉정보
    userId:{ type: DataTypes.INTEGER, allowNull: true }, //작성자
    location: DataTypes.STRING, //지역
    deadline: DataTypes.DATE,   //마감일
    views: { type: DataTypes.INTEGER, defaultValue: 0 },
  });
    // 관계 설정
  JobPosting.associate = (models) => {
    JobPosting.belongsTo(models.Company, { foreignKey: 'companyId' });
    JobPosting.belongsTo(models.User, { foreignKey: 'userId' });

    JobPosting.belongsToMany(models.Skill, { through: models.JobSkill, foreignKey: 'jobId' });
    JobPosting.belongsToMany(models.Keyword, { through: models.JobPostingKeyword, foreignKey: 'jobPostingId' });

    JobPosting.belongsToMany(models.User, { through: models.Bookmark, foreignKey: 'jobPostingId' });
  };
  return JobPosting;
};
