module.exports = function (sequelize, DataTypes) {
    var Usuario = sequelize.define('usuario', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING(45),
            allowNull: false,
            validate: {
                notEmpty: { msg: "El campo nombre no puede estar vac�o." }                
            }
        },
        apellidos: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        contrasenha: {
            type: DataTypes.STRING(60),
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(45),
            allowNull: false,
            validate: {
                notEmpty: { msg: "La contrase�a no puede estar vac�a." }
            }
        },
        rol: {
            type: DataTypes.STRING(45),
            allowNull: true,
            validate: {
                isLowercase: { msg: "S�lo se permiten letras min�sculas." },
                len: { args: [4, 8], msg: "El rol debe tener entre 4 y 8 caracteres." },
                isAlpha: { msg: "El rol s�lo puede contener caracteres." }
            }
        },
        imagen: {
            type: DataTypes.STRING(45),
            allowNull: true
        }
    }, {
            tableName: 'usuarios',
            timestamps: false
        });

    return Usuario;
};