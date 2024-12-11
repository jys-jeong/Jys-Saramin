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
      field: {  // 필드를 추가하여 키워드의 종류를 구분
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
  
    return JobPostingKeyword;
  };
  