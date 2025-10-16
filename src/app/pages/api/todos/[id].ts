import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@/generated/prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient().$extends(withAccelerate())

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const todo = await prisma.todo.update({
      where: { id: Number(id) },
      data: { completed: true },
    });
    return res.json(todo);
  }

  if (req.method === 'DELETE') {
    await prisma.todo.delete({
      where: { id: Number(id) },
    });
    return res.status(204).end();
  }

  res.status(405).end();
}
