import cloudinary from "../../config/cloudinary.js";
import { v4 as uuid } from "uuid";
import fs from "fs";
import { prisma } from "../../prisma/prismaClient.js";

export default class Upload {
  async ReadUploadings(req, res) {
    const { tipo } = req.params;

    const image = await prisma.quartosimg.findMany({
      where: {
        Quarto: {
          tipo,
        },
      },
      select: {
        id: true,
        imagem: true,
        Quarto: {
          select: {
            tipo: true,
            nome: true,
            descricao: true,
          },
        },
      },
    });

    res.status(200).json(image);
  }
  async createdimg(req, res) {
    const { tipo } = req.body;
    const files = req.files;
    console.log(files)
    try {
      if (!files || !files.length) {
        return res
          .status(400)
          .json({ mensagem: "preencha todos os campos corretamente" });
      }

      const Quarto = await prisma.quartos.findUnique({
        where: {
          tipo,
        },
        include: {
          quartos: true,
        },
      });

      if (Quarto.quartos.length > 0) {
        for (const img of Quarto.quartos) {
          if (img.publicId) {
            await cloudinary.uploader.destroy(img.publicId);
          }
        }

        await prisma.quartosimg.deleteMany({
          where: {
            quartosId: Quarto.id,
          },
        });
      }

      for (const file of files) {
        const resultado = await cloudinary.uploader.upload(file.path, {
          folder: "uploads_api",
        });

        fs.unlinkSync(file.path);

        const imagens = [];
        const imagensQuartos = await prisma.quartosimg.create({
          data: {
            imagem: resultado.secure_url,
            publicId: resultado.public_id,
            Quarto: {
              connect: { tipo },
            },
          },
        });

        imagens.push(imagensQuartos);
      }
      res.status(201).json({ mensagem: "Sucesso", tipo: tipo });
    } catch (error) {
      res.status(500).json({ mensagem: error.message });
    }
  }
}
