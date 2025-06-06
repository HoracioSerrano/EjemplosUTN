const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

const { sequelize } = require("./database/index.js");
const { User } = require("./model/user.js");

app.get("/user", async (req, res) => {
  try {
    const user = await User.findAll({});
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error en la consulta" });
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
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
  .sync({ force: false }) // force: true -> Elimina y vuelve a crear las tablas
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
