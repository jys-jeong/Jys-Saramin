module.exports = (sequelize, DataTypes) => {
    const LoginHistory = sequelize.define('LoginHistory', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      loginTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },{
        timestamps:true,
    }
);
  
    LoginHistory.associate = (models) => {
      LoginHistory.belongsTo(models.User, { foreignKey: 'userId' });
    };
  
    return LoginHistory;
  };
  