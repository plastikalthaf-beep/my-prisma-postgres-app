import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@/generated/prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient().$extends(withAccelerate())


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const todos = await prisma.todo.findMany({ orderBy: { createdAt: 'desc' } });
    return res.json(todos);
  }

  if (req.method === 'POST') {
    const { title } = req.body;
    const todo = await prisma.todo.create({ data: { title } });
    return res.status(201).json(todo);
  }

  res.status(405).end(); // Method Not Allowed
}
