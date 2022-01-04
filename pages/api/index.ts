import type { NextApiRequest, NextApiResponse } from "next";
import { client as prisma } from "../../prisma/client";
import getPostHash from "../../utils/posthasher";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const hash = getPostHash(
      req.body.title,
      req.body.content,
      req.body.theme,
      req.body.language
    );
    const post = await prisma.post.findUnique({ where: { hash } });
    if (!post) {
      await prisma.post.create({
        data: {
          title: req.body.title,
          language: req.body.language,
          content: req.body.content,
          theme: req.body.theme,
          hash: hash,
        },
      });
    }
    res.status(200).json({ hash });
  }
  if (req.method == "GET" && typeof req.query.hash === "string") {
    const post = await prisma.post.findUnique({
      where: { hash: req.query.hash },
    });
    if (!post) {
      res.status(200).json({});
    } else {
      const { title, content, theme, language } = post;
      res.status(200).json({ title, content, theme, language });
    }
  }
}
