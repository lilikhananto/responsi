module.exports = (sequelize, DataTypes) =>{
    const Register = sequelize.define(
    'Register',{
        id_pelanggan: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
          nama: {
            type: DataTypes.STRING,
            allowNull: false
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false
          },
          password: {
            type: DataTypes.STRING,
          }
          
    },
    {
        tableName: "register"
    }
    )
    return Register;
}