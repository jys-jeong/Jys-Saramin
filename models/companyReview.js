module.exports = (sequelize, DataTypes) => {
  const CompanyReview = sequelize.define('CompanyReview', {
    companyId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Companies',
        key: 'id',
      },
      allowNull: false,
    },
    tagId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ReviewTags',
        key: 'id',
      },
      allowNull: true,
    },
    review: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  });
  CompanyReview.associate = (models) => {
    CompanyReview.belongsTo(models.Company, { foreignKey: 'companyId' });
    CompanyReview.belongsTo(models.ReviewTag, { foreignKey: 'tagId' });
  };
  return CompanyReview;
};
