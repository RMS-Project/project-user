import express from 'express';

// Controlador de usuários que conversa com o modelo
// "user" que faz comunicação com o banco de dados
import user from "./controllers/userControllers.js";

const routes = express.Router(); 

routes.get("/user", user.list);

routes.post("/user", user.create);
routes.post("/user/login", user.login)
routes.get('/user/:id', user.read)
routes.put("/user/:id", user.update);
routes.delete("/user/:id", user.delete);

export default routes