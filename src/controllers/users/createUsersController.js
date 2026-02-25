import { prisma } from "../../prisma/prismaClient.js";
import { hash } from "bcrypt";

export default class users {
  async createUsers(req, res) {
      const { name, email, password } = req.body;
      const emailExiste = await prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (emailExiste) {
      return res.status(400).json({ mensagem: "Ocorreu um erro verifique os campos" });
    }

    if(name === "" || email === "" || password === "") {
          return res.status(400).json({ mensagem: "Ocorreu um erro verifique os campos" });
    }

    const passwordCrpto = await hash(password,10)

  
    await prisma.users.create({
      data: {
        name,
        email,
        password:passwordCrpto,
      },
    });
    return res.status(201).json({ mensagem: "criado com sucesso" });
  }
}
