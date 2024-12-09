module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  });
  User.associate=(models)=>{
    User.belongsToMany(models.JobPosting, { through: models.Bookmark, foreignKey: 'userId' });
    
  }

  return User;
};
