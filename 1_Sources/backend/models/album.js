module.exports = function (sequelize, DataTypes) {
	var Album = sequelize.define('album', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		titulo: {
			type: DataTypes.STRING(45),
			allowNull: false,
			validate: {
				notEmpty: { msg: "El t�tulo no puede estar vac�o" }
			}
		},
		descripcion: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		anho: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		imagen: {
			type: DataTypes.STRING(45),
			allowNull: true
		}
	}, {
		tableName: 'albumes',
		timestamps: false
	});

	Album.associate = function (models) {
		Album.belongsTo(models.artista, { foreignKey: 'artista_id' });
	}

	return Album;
};