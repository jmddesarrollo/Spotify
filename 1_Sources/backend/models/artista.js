module.exports = function (sequelize, DataTypes) {
    var Artista = sequelize.define('artista', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(45),
            allowNull: false,
            validate: {
                notEmpty: { msg: "El campo nombre no puede estar vacío" }
            }
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        imagen: {
            type: DataTypes.STRING(45),
            allowNull: true
        }
    }, {
            tableName: 'artistas',
            timestamps: false
        });

    return Artista;
};