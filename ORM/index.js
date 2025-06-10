const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

const { sequelize } = require("./database/index.js");
const { User } = require("./model/user.js");
const { PerfilUTN } = require("./model/perfil.js");
const { Materias } = require("./model/materias.js");
const { Horarios } = require("./model/horario.js");
const { HorariosMaterias } = require("./model/horariosMaterias.js");

// Generamos las relacions

// uno a uno
User.hasOne(PerfilUTN, {
  foreignKey: "estudianteId",
});
PerfilUTN.belongsTo(User, { foreignKey: "estudianteId" });

// uno a muchos
PerfilUTN.hasMany(Materias, {
  foreignKey: "estudiantesIds",
});
Materias.belongsTo(PerfilUTN, {
  foreignKey: "estudiantesIds",
});

// muchos a muchos
Materias.belongsToMany(Horarios, {
  through: "HorariosMaterias",
  foreignKey: "materiaId",
});

Horarios.belongsToMany(Materias, {
  through: "HorariosMaterias",
  foreignKey: "horarioId",
});

// Rutas

app.put("/horarios/:horarioId/materias/:materiaId", async (req, res) => {
  try {
    const { horarioId, materiaId } = req.params;
    // declaromas la relacion

    const relacion = await HorariosMaterias.create({
      dia: "Lunes",
      horarioId,
      materiaId,
    });

    /*  
       const horario = await Horarios.findByPk(horarioId);
       const materia = await Materias.findByPk(materiaId);
       const relacion = await horario.addMateria(materia); 
       await horario.addMateria(materia, { through: { dia: "Lunes" } });
   */

    res.status(201).json(relacion);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Error en la consulta" });
  }
});

app.post("/horarios", async (req, res) => {
  try {
    // validacion de datos
    const newHorarios = await Horarios.create(req.body);
    res.status(201).json(newHorarios);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Error en la consulta" });
  }
});

app.get("/materias", async (req, res) => {
  try {
    const materias = await Materias.findAll({
      include: [
        { model: PerfilUTN, include: User },
        {
          model: Horarios,
        },
      ],
    });
    res.status(200).json(materias);
  } catch (error) {
    res.status(500).json({ error: "Error en la consulta" });
  }
});

app.post("/materias", async (req, res) => {
  try {
    // validacion de datos
    const newMateria = await Materias.create(req.body);
    res.status(201).json(newMateria);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Error en la consulta" });
  }
});

app.post("/perfil", async (req, res) => {
  try {
    // validacion de datos
    const newPerfil = await PerfilUTN.create(req.body);
    res.status(201).json(newPerfil);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Error en la consulta" });
  }
});

app.get("/user", async (req, res) => {
  try {
    const user = await User.findAll({
      include: [
        {
          model: PerfilUTN,
          where: {
            legajo: 112233,
          },
          include: [
            {
              model: Materias,
              where: {
                catedra: "Programacion III",
              },
              include: Horarios,
            },
          ],
        },
      ],
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error en la consulta" });
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [
        { model: PerfilUTN, include: [{ model: Materias, include: Horarios }] },
      ],
    });
    /* const user = await User.findOne({ id: req.params.id }); */
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error en la consulta" });
  }
});

app.post("/user", async (req, res) => {
  try {
    // validacion de datos

    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Error en la consulta" });
  }
});

app.put("/user/:id", async (req, res) => {
  try {
    // validacion de datos
    const updateUser = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    res.status(203).json(updateUser);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Error en la consulta" });
  }
});

app.delete("/user/:id", async (req, res) => {
  try {
    // validacion de datos
    const deleteUser = await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(203).json(deleteUser);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Error en la consulta" });
  }
});

sequelize
  .sync({ alter: true }) // force: true -> Elimina y vuelve a crear las tablas
  .then(() => {
    console.log(`Databa connected successfully.`);
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
