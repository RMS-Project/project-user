// Para utilizar o s recursos de um ORM devemos criar uma padronização no projeto.
// Para cada tabela que temos no banco de dados será um arquivo em models.

import { DataTypes } from "sequelize";

import db from "../database/index.js";

// Cria um objeto com padrão pascal-case que contém a primeira letra em maiúsculo.
const User = db.define(
  "User" /* No do módulo */,
  {
    // Descrição das colunas da tabela.
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      unique: true,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    // Objeto de configurações.
    tableName: "user",
  }
);

export default User;
