//npm install squelize
//npm install mysql2

const { Sequelize, DataTypes } = require('sequelize');




async function Programa(){
// Option 3: Passing parameters separately (other dialects)
    const sequelize = new Sequelize('dbprueba', 'root', '', {
      host: 'localhost',
      dialect: 'mysql'// | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
    });


    const Mesa = sequelize.define(
        'Mesa',{
            mesa_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            mesa_numero: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            mesa_mozo: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {freezeTableName: true}
    );

    const Comensal = sequelize.define(
        'Comensal',{
            comensal_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            comensal_nombre: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {freezeTableName: true}
    );

    Mesa.hasMany(Comensal, {
      foreignKey: 'comensal_mesa_id',
      onDelete: 'CASCADE',
      allowNull: false
    });
    Comensal.belongsTo(Mesa,{foreignKey: 'comensal_mesa_id', allowNull: false});




    try {
      //await sequelize.authenticate();
      await sequelize.sync({ force: true });//alter: true 
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }

    const Mesa10 = await Mesa.create({mesa_numero: 10, mesa_mozo: 'Horacio Serrano'});
    const Comensal1 = await Comensal.create({comensal_nombre:'Pablo Jesus', comensal_mesa_id: Mesa10.dataValues.mesa_id});
    const Comensal2 = await Comensal.create({comensal_nombre:'Miguel Ángel Chávez', comensal_mesa_id: Mesa10.dataValues.mesa_id});
   

    const Mesa11 = await Mesa.create(
        {
            mesa_numero: 21, 
            mesa_mozo: 'Horacio Serrano',
            Comensals: [
                {
                    comensal_nombre: 'Juan'
                },
                {
                    comensal_nombre: 'Pedro'
                },
                {
                    comensal_nombre: 'Maria'
                }
            ]
        }, 
        {
            include: [Comensal]
        }
    );


    await Mesa.destroy({where:{mesa_id:4}})

    const mesaBusacada = await Mesa.findAll({
        where: {
            mesa_id: Mesa10.dataValues.mesa_id,
        },
        include: [{
          model: Comensal,
          required: true
        }]
    });
    console.log(mesaBusacada[0].dataValues);
    console.log(mesaBusacada[0].Comensals);

    sequelize.close();
}

Programa();
