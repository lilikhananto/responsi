'use strict';

const { sequelize } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transaksi', {
      id_transaksi: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_pelanggan: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // Add foreign key relationship if needed
        references: {
          model: 'register',
          key: 'id_pelanggan',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      no_hp: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      alamat: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      total: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      metode: {
        type: Sequelize.ENUM,
        values: ['COD', 'Transfer Bank', 'QRIS'],
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    // Add indexes or additional configurations if needed
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transaksi');
  }
};
