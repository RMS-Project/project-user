import bcrypt from "bcryptjs";
import pkg from "jsonwebtoken"

import User from "../models/User.js";
import DeletedUser from "../models/DeletedUser.js"

// Chave secreta para o jsonwebtoken.
const secret = {
  key: "RMS-WebApp"
}

async function getUser(data, attributes) {
  // Busca um usuário em específico.
  const user = await User.findOne({
    where: data,
    attributes: attributes,
  });

  return user;
}

// Garante que as hash dos usuários não sejam iguais.
async function passwordGenerator(password) {
  // Gera hash com base na senha fornecida.
  const newPassword = bcrypt.hashSync(password, 10);

  // Verifica no banco de dados se não existe um usuário com a mesma hash.
  const user = await getUser(
    {
      password: newPassword,
    },
    ["password"]
  );

  // Se existir um usuário com a mesma hash gera uma nova.
  if (user !== null) {
    return passwordGenerator(newPassword);
  }

  return newPassword;
}

const user = {
  create: async (request, response) => {
    //const { name, email, password, confirmPassword } = request.body;
    const body = request.body;

    const name = body.name;
    const email = body.email;
    const password1 = body.password;
    const password2 = body.confirmPassword;

    // Verificar se o email esta cadastrado.
    /*const emailExists = await User.findOne({
      where: {
        email: email,
      },
    });

    if (emailExists !== null) {
      return response.status(401).json("Existe um cadastro com este email.");
    }*/

    // Verifica se a senha digitada é igual a senha de confirmação.
    if (password1 !== password2) {
      return response
        .status(401)
        .json("A senha de confirmação não corresponde a senha informada.");
    }

    // Gera um hash com base na senha fornecida.
    const password = await passwordGenerator(password1);

    const { newUser } = await User.create({
      name,
      email,
      password,
    })
      .then((newUser) => {
        return response.status(201).json(newUser);
      })
      .catch((err) => {
        if (err.errors[0].message === "email must be unique") {
          return response
            .status(401)
            .json("Existe um cadastro com este email.");
        }

        return response.status(401).json("Erro ao realizar o cadastro.");
      });
  },

  login: async(request, response) => {

    const { email, password } = request.body;

    const user = await getUser({ email }, [
      "id",
      "name",
      "email",
      "password"
    ]);

    console.log(user)

    // Verifica se o usuário foi encontrado.
    if (user === null) {
      // 400 - Bad request, usuário não existe.
      return response.status(400).json("Email ou senha inválidos.");
    }

    // Verifica se a senha fornecida é igual a senha cadastrada no banco de dados.
    // Somente o bcrypt vai saber dizer de a senha cadastrada é igual
    // a senha fornecida.
    if(!bcrypt.compareSync(password, user.password)) {
      // 401 - nâo autorizado.
      return response.status(401).json("Senha invalida")
    }

    // Encontrando o usuário gera um token e o retorna.
    const token = pkg.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      secret.key
    );
    return response.status(200).json(token);

  },

  list: async (request, response) => {
    const usersList = await User.findAll({
      attributes: ["id", "name", "email"],
    });

    return response.status(200).json(usersList);
  },

  read: async (request, response) => {
    const user = await getUser({ id: request.params.id }, [
      "id",
      "name",
      "email",
    ]);

    if(user === null) {
      return response.status(200).json("Usuário não encontrado.");
    }

    return response.status(200).json(user);
  },

  update: async (request, response) => {
  
    // ------ Dados do formulário ------
    const idReq = request.params.id;

    const {
      newName,
      newEmail,
      newPassword,
      newPasswordConfirm,

      currentName,
      currentEmail,
      currentPassword,
    } = request.body;

    // Accept account
    // validade email

    // ------ Dados atuais do usuário ------
    const currentData = await getUser(
      {
        id: idReq,
        email: currentEmail
      },
      ["id","password"]
    )
      .catch((err) => {
        console.log(err)
        return response.status(500).json("Algo deu errado.");
      });

    // ------ Validações ------

    // Verifica se o usuário foi encontrado.
    if (currentData === null) {
      // O usuário trocou o email
      // Ação de trocar email.
      return response
        .status(401)
        .json("Tente novamente, usuário não encontrados.");
    }

    // Verifica se a senha cadastrada é igual a senha informada.
    if (!bcrypt.compareSync(currentPassword, currentData.password)) {
      // 401 - nâo autorizado.
      return response.status(401).json("Senha atual incorreta.");
    }

    // Verifica se a senha digitada é igual a senha de confirmação.
    if (newPassword !== newPasswordConfirm) {
      return response
        .status(401)
        .json("A senha de confirmação não corresponde a senha informada.");
    }

    // ------ Novo objeto de atualização ------
    // Será atualizado apenas os dados que foram modificas pelo usuário

    // Criar o objeto de atualização.
    let updateData = {};

    // Verifica se o novo nome não é igual ao nome existente.
    if (newName !== currentName) {
      updateData = Object.assign(updateData, { name: newName });
    }

    // Verifica se o novo email não é igual ao email existente.
    if (newEmail !== currentEmail) {
      updateData = Object.assign(updateData, { email: newEmail });
    }

    // Verifica se a nova senha não é igual a senha existente.
    if (newPassword !== currentPassword) {
      // Gera um hash com base na senha fornecida.
      const password = await passwordGenerator(newPassword);

      updateData = Object.assign(updateData, { password: password });
    }

    // Caso os dados do banco sejam iguais aos dados fornecidos
    // não se faz necessário atualizar no banco de dados.
    if (Object.keys(updateData).length === 0) {
      return response.status(200).json("Dados atualizados!");
    }

    // ------ Atualização no banco de dados ------

    const id = currentData.id;

    await User.update(updateData, {
      where: {
        id,
      },
    })
      .then(() => {
        return response.status(201).json("Dados atualizados!");
      })
      .catch((err) => {
        console.log(err);

        return response.status(401).json("Tente novamente mais tarde.");
      });
  },

  delete: async (request, response) => {
    const { id } = request.params
    const { password } = request.body;

    const user = await getUser({ 
      id: id 
    })

    if (user === null) {
      return response.status(204).json("Usuário não encontrado");
    }

    // Verifica se a senha cadastrada é igual a senha informada.
    if (!bcrypt.compareSync(password, user.password)) {
      // 401 - nâo autorizado.
      return response.status(401).json("Senha incorreta.");
    }

    try {
      const deleteUser = await DeletedUser.create({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
      })

      User.destroy({
        where: {
          id: deleteUser.id
        }
      })

      return response.status(204).json("Usuário removido!");

    } catch(error) {
      return response.status(401).json("Erro ao remover o usuário");
    }
  }
};

export default user;
