import { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from '../../../../utils/database';
import User from '../../../../models/User';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  connectDatabase();

  const { method } = request;

  const { id } = request.query;

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

  if (method === 'GET') {
    const user = await User.findById(id, '-password');

    if (!user) {
      return response.status(404).json({ msg: 'Usuário não encontrado' });
    }

    try {
      response.status(200).json({ user });
    } catch (error) {
      response.status(500).json({ msg: 'Aconteceu um erro no servidor!' });
      console.log(error);
    }
  }
}
