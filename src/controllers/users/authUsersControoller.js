import { compare } from "bcrypt";
import { prisma } from "../../prisma/prismaClient.js";
import jwt from "jsonwebtoken";
export default class auth {
  async authenticator(req, res) {
    const { email, password } = req.body;

    const users = await prisma.users.findFirst({
      where: { email },
    });

    if (!users) {
      return res.status(400).json({ mensagem: "Usuario não existe" });
    }

    const senha = await compare(password, users.password);

    if (!senha) {
      return res.status(400).json({ mensagem: "Usuario não existe" });
    }
    if(email === "" || password === ""){
       return res.status(400).json({ mensagem: "Usuario não existe" });
    }

    const token = jwt.sign(
      { id: users.id, name: users.name },
      process.env.SECRET_SIGNATURE,
      { expiresIn: "7d" }
    );
    res.cookie("token", token,{
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path:"/",
        maxAge: 1000 * 60 * 60 * 24 * 7 
      });

    return res.status(200).json({ mensagem:"Login realizado com sucesso" });
  }
}
