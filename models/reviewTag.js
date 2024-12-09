module.exports = (sequelize, DataTypes) => {
    const ReviewTag = sequelize.define('ReviewTag', {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
    });
  
    // 관계 설정
    ReviewTag.associate = (models) => {
      ReviewTag.hasMany(models.CompanyReview, { foreignKey: 'tagId' });
    };
  
    return ReviewTag;
  };
  