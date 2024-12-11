module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    representative: DataTypes.STRING,
    category: DataTypes.STRING,
    homepage: DataTypes.STRING,
    address: { type: DataTypes.STRING, allowNull: false },
    companyType: DataTypes.STRING,
    wage: DataTypes.INTEGER,
    employee: DataTypes.INTEGER,
  }, {
    indexes: [
      {
        unique: true, 
        fields: ['name', 'address'],
      },
    ],
  });

  Company.associate = (models) => {
    Company.hasMany(models.JobPosting, { foreignKey: 'companyId' });
    Company.hasMany(models.CompanyReview, { foreignKey: 'companyId' });
  };

  return Company;
};
