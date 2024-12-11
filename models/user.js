module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user',  // 기본값을 'user'로 설정
    validate: {
      isIn: [['user', 'admin', 'manager']], // 허용되는 값
    },
  },
  });
  User.associate=(models)=>{
    User.belongsToMany(models.JobPosting, { through: models.Bookmark, foreignKey: 'userId' });
    
  }

  return User;
};
