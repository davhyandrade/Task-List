import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const { method } = request;

  switch (method) {
    case 'GET':
      const { name, email, password, confirmPassword } = request.body;

      if (!name) {
        return response.status(422).json({ msg: 'O Nome é obrigatório!' });
      }

      if (!email) {
        return response.status(422).json({ msg: 'O Email é obrigatório!' });
      }

      if (!password) {
        return response.status(422).json({ msg: 'A Senha é obrigatório!' });
      }

      if (password !== confirmPassword) {
        return response.status(422).json({ msg: 'As senhas estão diferentes!' });
      }

      // const userExists = await User.findOne({ email: email })
      break;
  }
}
