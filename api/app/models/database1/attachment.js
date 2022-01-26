'use strict';
module.exports = (sequelize, DataTypes) => {
  const Attachment = sequelize.define('Attachment', {
    name: DataTypes.STRING,
    path: DataTypes.TEXT,
    size: DataTypes.BIGINT,
    description: DataTypes.TEXT,
    attachmentable_type: DataTypes.INTEGER,
    attachmentable_id: DataTypes.INTEGER,
    type: DataTypes.STRING
  }, {
    tableName: 'attachment'
  });
  Attachment.associate = function(models) {
    // associations can be defined here
  };
  return Attachment;
};