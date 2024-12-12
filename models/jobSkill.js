module.exports = (sequelize, DataTypes) => {
  const JobSkill = sequelize.define('JobSkill', {
    jobPostingId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'JobPostings',
        key: 'id',  // JobPosting 테이블의 id 컬럼을 참조
      },
      allowNull: false,
    },
    skillId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Skills',
        key: 'id',  // Skill 테이블의 id 컬럼을 참조
      },
      allowNull: false,
    },
  });

  JobSkill.associate = (models) => {
    JobSkill.belongsTo(models.JobPosting, { foreignKey: 'jobPostingId' });
    JobSkill.belongsTo(models.Skill, { foreignKey: 'skillId' });
  };

  return JobSkill;
};
