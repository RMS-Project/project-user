import Sequelize from "sequelize";

// Nome do banco criado no banco de dados.
const DB_NAME = "USERS_DATABASE"

// Usuário do banco.
const DB_USER = "root"

// Password do banco.
const DB_PASS = "root"

// Configuração de conexão com o banco.
const DB_CONFIG = {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306
}

// Possui um método de authentication que vai dizer se está conectado ao banco.
const db = new Sequelize(DB_NAME, DB_USER, DB_PASS, DB_CONFIG)

// Função que cria a conexão autenticando com o método authenticate().
async function hasConnection() {
    try {
        await db.authenticate()
        console.log("Banco de dados conectado!")
    } catch (error) {
        console.error("Erro ao tentar se conectar ao banco de dados!")
    }
}

// Vai concatenar o objeto de conexão com a função de conexão.
Object.assign(db, {
    hasConnection,
})

export default db;