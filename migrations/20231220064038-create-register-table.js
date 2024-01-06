'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transaksi', {
      id_transaksi: {
        type: Sequelize.INTEGER, // Gunakan UUID untuk kunci utama
        primaryKey: true,
        allowNull: false,
      },
      id_pelanggan: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // Tambahkan keterikatan kunci asing jika diperlukan
        references: {
          model: 'register',
          key: 'id_pelanggan',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_produk: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // Tambahkan keterikatan kunci asing jika diperlukan
        references: {
          model: 'products',
          key: 'id',
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
      unit: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      total: {
        type: Sequelize.DECIMAL(10, 2), // Contoh: DECIMAL dengan 10 digit dan 2 tempat desimal
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

    // Tambahkan indeks atau konfigurasi tambahan jika diperlukan
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transaksi');
  }
};