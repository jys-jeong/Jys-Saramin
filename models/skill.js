module.exports = (sequelize, DataTypes) => {
  const Skill = sequelize.define('Skill', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
  });

  Skill.associate = (models) => {
    Skill.belongsToMany(models.JobPosting, {
      through: models.JobSkill,  // 연결 테이블 지정
      foreignKey: 'skillId',  
      otherKey: 'jobPostingId'    // 연결 테이블의 외래키 지정
    });
  };

  return Skill;
};
