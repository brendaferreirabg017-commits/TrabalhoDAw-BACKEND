const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const artistaRoutes = require("./routes/userRoutes");
const obraRoutes = require("./routes/taskRoutes");
const galeriaRoutes = require("./routes/galeriaRoutes");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.json");
require('dotenv').config();

connectDB();
app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use("/", artistaRoutes);
app.use("/", obraRoutes);
app.use("/", galeriaRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Servidor rodando: http://localhost:${PORT}/api-docs`)
})

