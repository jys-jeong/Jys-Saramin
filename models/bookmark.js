module.exports = (sequelize, DataTypes) => {
  const Bookmark = sequelize.define('Bookmark', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    jobPostingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: true, // createdAt, updatedAt 자동 생성
    indexes: [
      {
        unique: true,
        fields: ['userId', 'jobPostingId'],
      },
    ],
  });

  Bookmark.associate = (models) => {
    Bookmark.belongsTo(models.User, { foreignKey: 'userId' });
    Bookmark.belongsTo(models.JobPosting, { foreignKey: 'jobPostingId' });
  };

  return Bookmark;
};
