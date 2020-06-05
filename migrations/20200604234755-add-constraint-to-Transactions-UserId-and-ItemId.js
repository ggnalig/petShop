'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Transcactions', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'fkey_UserId',
      references: { //Required field
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
    .then(() => {
      return queryInterface.addConstraint('Transcactions', {
        fields: ['ItemId'],
        type: 'foreign key',
        name: 'fkey_ItemId',
        references: { //Required field
          table: 'Items',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      });
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Transcactions', 'fkey_UserId')
    .then(() => {
      return queryInterface.removeConstraint('Transcactions', 'fkey_ItemId')
    });
  }
};
