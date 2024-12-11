module.exports = (sequelize, DataTypes) => {
    const JobSkill = sequelize.define('JobSkill', {
      jobId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'JobPostings',
          key: 'id',
        },
        allowNull: false,
      },
      skillId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Skills',
          key: 'id',
        },
        allowNull: false,
      },
    });
    return JobSkill;
  };
  