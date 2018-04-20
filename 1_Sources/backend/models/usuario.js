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
                notEmpty: { msg: "El campo nombre no puede estar vacío. Debe ser campo alfabético." },
                is: { args: [/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ]+$/i], msg: "El campo nombre no tiene el formato correcto." }
            }
        },
        apellidos: {
            type: DataTypes.STRING(45),
            allowNull: true,
            validate: {
                notEmpty: { msg: "El campo apellido no puede estar vacío." },
                is: { args: [/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ]+$/i], msg: "El campo apellido no tiene el formato correcto." }
            }            
        },
        contrasenha: {
            type: DataTypes.STRING(60),
            allowNull: false,
            validate: {
                notEmpty: { msg: "El campo contraseña no puede estar vacío." }                
            }            
        },
        email: {
            type: DataTypes.STRING(45),
            allowNull: false,
            validate: {                
                notEmpty: { msg: "El campo email no puede estar vacío." },
                // isEmail: { msg: "El campo email no esta bien formateado." },
                is: { args: [/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{1,5})*$/i], msg: "El campo email no tiene el formato correcto." }              
            }
        },
        rol: {
            type: DataTypes.STRING(45),
            allowNull: false,
            validate: {
                isLowercase: { msg: "El campo rol sólo permite letras minúsculas." },
                len: { args: [4, 8], msg: "El campo rol debe tener entre 4 y 8 caracteres." },
                isAlpha: { msg: "El campo rol debe ser alfabétio." }
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