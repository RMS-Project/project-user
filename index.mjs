import Express from "express";

// Importação das rotas.
import routes from "./routes.js";

// Conexão com o banco de dados utilizando Sequelize
//import db from "./database/index.js";

// Instancia o Express.
const app = Express();

// Definição da interface de rede.
const port = 3000;

// Middleware que analisa as solicitações recebidas em JSON.
app.use(Express.json());

app.use(routes)

// Escuta solicitações e serve a aplicação Node.
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

// Executando a conexão com o banco de dados.
//db.hasConnection();
