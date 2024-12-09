module.exports = (sequelize, DataTypes) => {
    const Keyword = sequelize.define('Keyword', {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
    });
  
    // 관계 설정
    Keyword.associate = (models) => {
      Keyword.belongsToMany(models.JobPosting, { through: models.JobPostingKeyword, foreignKey: 'keywordId' });
    };
  
    return Keyword;
  };
  