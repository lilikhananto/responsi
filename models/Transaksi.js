module.exports = (sequelize, DataTypes) =>{
    const Transaksi = sequelize.define('Transaksi',{
        id_transaksi: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
          id_pelanggan: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          id_produk: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          no_hp: {
            type: DataTypes.STRING,
            allowNull: false
          },
          alamat:{
            type: DataTypes.STRING,
            allowNull: false
          },
          unit: {
            type: DataTypes.INTEGER,
            allowNull: false
          }, 
          total: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          metode: {
            type: DataTypes.ENUM,
            values: ['COD', 'Transfer Bank', 'QRIS'],
            allowNull: false
          },
          createdAt: {
            type: DataTypes.DATE,
            allowNull: false
          },
          updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
    }}, 
          {
              tableName: "transaksi"
          }
          )
          return Transaksi;
      }
