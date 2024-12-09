module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define('Company', {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      representative: DataTypes.STRING,
      category: DataTypes.STRING,
      homepage: DataTypes.STRING,
      address: DataTypes.STRING,
      form: DataTypes.STRING,
      establish: DataTypes.DATE,
      wage: DataTypes.INTEGER,
      employee: DataTypes.INTEGER,
    });
    Company.associate = (models) => {
        Company.hasMany(models.JobPosting, { foreignKey: 'companyId' });
        Company.hasMany(models.CompanyReview, { foreignKey: 'companyId' });
      };
    return Company;
  };
  