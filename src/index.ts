import express from "express";
import RouterBuilder from "./routers";
import { AppDataSource } from "./config/database";
import scketioService from "./services/sockerio.service";

require("dotenv").config();

// Inicializando a conexão com Banco de Dados
AppDataSource.initialize();

// Criar o express app
const app = express();

// Habilitar o CORS
const cors = require("cors");
app.use(cors({ origin: "*" }));

// Habiltar a análise do JSON
app.use(express.json());

// Habilitar a porta
const PORT = process.env.PORT ? process.env.PORT : 5000;

// Criar a instância do servidor e do socket.io.
const server = require("http").createServer(app);
export const io = require("socket.io")(server, { cors: { origin: "*" } });

const startServer = async () => {
  // Contruir o express router
  RouterBuilder(app);

  // Iniciar o servidor e o socket.io.
  server.listen(PORT);
  console.log(`Server started on port: ${PORT}`);
  scketioService(io);
};

startServer();

export {};
