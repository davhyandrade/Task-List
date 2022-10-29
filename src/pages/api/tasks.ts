import { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from '../../utils/database';
const mongoose = require('mongoose');

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  connectDatabase();

  const { method } = request;

  switch (method) {
    case 'GET':
      try {
        response.status(200).json({});
      } catch (error) {
        response.status(500).json(error);
      }
      break;
    case 'DELETE':
      break;
    case 'POST':
      try {
        response.status(200).json({});
      } catch (error) {
        response.status(500).json(error);
      }
      break;
    default:
      response.setHeader('Allow', ['GET', 'PUT']);
      response.status(405).end(`Method ${method} Not Allowed`);
  }
}
