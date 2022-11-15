import { NextApiRequest, NextApiResponse } from 'next';
import Task from '../../models/Task';
import { connectDatabase } from '../../utils/database';
const mongoose = require('mongoose');

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  connectDatabase();

  const { method } = request;

  switch (method) {
    case 'GET':
      try {
        const tasks = await Task.find()
        response.status(200).json(tasks);
      } catch (error) {
        response.status(500).json(error);
      }
      break;
    case 'DELETE':
      break;
    case 'POST':
      try {
        const task = await Task.create(request.body)

        response.status(200).json(task);
      } catch (error) {
        response.status(500).json(error);
      }
      break;
    default:
      response.setHeader('Allow', ['GET', 'PUT']);
      response.status(405).end(`Method ${method} Not Allowed`);
  }
}
