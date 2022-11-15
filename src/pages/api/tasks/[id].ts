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

  const { method } = request;

  const { id } = request.query
  switch (method) {
    case 'DELETE':
      try {
        await Task.findByIdAndDelete(id);
        response.status(200).json({ msg: 'Task deletada com sucesso!!' });
      } catch (error) {
        response.status(500).json(error);
      }
      break;
      case 'PUT': 
      try {
        const updateTask = await Task.findByIdAndUpdate(id,     
          { ...request.body }
        )
        response.status(200).json({ msg: 'Task atualizada com sucesso!!' });
      } catch (error) {
        response.status(500).json(error);
      }

      break;
    default:
      response.setHeader('Allow', ['GET', 'PUT']);
      response.status(405).end(`Method ${method} Not Allowed`);
  }
}
