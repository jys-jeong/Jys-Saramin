module.exports = (sequelize, DataTypes) => {
    const JobPostingKeyword = sequelize.define('JobPostingKeyword', {
      jobPostingId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'JobPostings',
          key: 'id',
        },
        allowNull: false,
      },
      keywordId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Keywords',
          key: 'id',
        },
        allowNull: false,
      },
    });
  
    return JobPostingKeyword;
  };
  