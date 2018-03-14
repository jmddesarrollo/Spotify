module.exports = function (sequelize, DataTypes) {
    var Cancion = sequelize.define('cancion', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        numero: {
            type: DataTypes.INTEGER(3),
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING(45),
            allowNull: false,
            validate: {
                notEmpty: { msg: "La canción no puede estar vacía." }
            }
        },        
        duracion: {
            type: DataTypes.STRING(8),
            allowNull: true
        },
        archivo: {
            type: DataTypes.STRING(45),
            allowNull: true
        }
    }, {
            tableName: 'canciones',
            timestamps: false
        });

    Cancion.associate = function (models) {
        Cancion.belongsTo(models.album, { foreignKey: 'album_id' });
    }

    return Cancion;
};