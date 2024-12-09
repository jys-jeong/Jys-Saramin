module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define('Application', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    jobId: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    resume: { type: DataTypes.BLOB, allowNull: false },
  });

  return Application;
};
