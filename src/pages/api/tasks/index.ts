import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import Task from '../../../models/Task';
import { connectDatabase } from '../../../utils/database';
import jwt from 'jsonwebtoken';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  connectDatabase();

  const authHeader: any = request.headers['authorization'];

  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return response.status(401).json({ msg: 'Acesso negado!' });
  }

  try {
    const SECRET: any = process.env.SECRET;

    jwt.verify(token, SECRET);
    NextResponse.next();
  } catch (error) {
    response.status(400).json({ msg: 'Token inválido!' });
    console.log(error);
  }

  const tokenDecode = jwt.decode(token) as any;

  const { method } = request;

  switch (method) {
    case 'GET':
      try {
        const tasks = await Task.find({ user: tokenDecode.id }).populate('user', '-password');
        response.status(200).json(tasks);
      } catch (error) {
        response.status(500).json(error);
      }
      break;
    case 'POST':
      try {
        const task = await Task.create({ ...request.body, user: tokenDecode.id });

        response.status(201).json({
          msg: 'Task criada com sucesso!!',
          task: task,
        });
      } catch (error) {
        response.status(500).json(error);
      }
      break;
    default:
      response.setHeader('Allow', ['GET', 'PUT']);
      response.status(405).end(`Method ${method} Not Allowed`);
  }
}
