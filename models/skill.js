module.exports = (sequelize, DataTypes) => {
    const Skill = sequelize.define('Skill', {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
    });
    Skill.associate = (models) => {
        Skill.belongsToMany(models.JobPosting, { through: models.JobSkill, foreignKey: 'skillId' });
      };
    return Skill;
  };
  