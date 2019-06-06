module.exports = function(sequelize, DataTypes) {
  var Duck = sequelize.define('Duck', {
    head: DataTypes.TEXT,
    body: DataTypes.TEXT,
    bill: DataTypes.TEXT,
    hat: DataTypes.TEXT,
    gradient: DataTypes.TEXT,
    pattern: DataTypes.TEXT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  });
  return Duck;
};
