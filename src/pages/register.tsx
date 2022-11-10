import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import { FormEvent, useRef, useState } from 'react';
import { toast } from 'react-toastify';

export default function Register() {
  const inputNome = useRef<any>(null);
  const inputEmail = useRef<any>(null);
  const inputSenha = useRef<any>(null);
  const inputConfirmaSenha = useRef<any>(null);

  const imageEye = {
    close: 'https://i.postimg.cc/Z5tsG5b6/aberto.png',
    open: 'https://i.postimg.cc/zvD8SFMX/fechado.png',
  };

  const [isActiveButtonEyePessword, setIsActiveButtonEyePessword] = useState<any>({
    'confirma-senha': true,
    senha: true,
  });

  function handleClick(name: string) {
    setIsActiveButtonEyePessword((prev: any) => ({
      ...prev,
      [name]: true,
    }));
    if (isActiveButtonEyePessword[name]) {
      setIsActiveButtonEyePessword((prev: any) => ({
        ...prev,
        [name]: false,
      }));
      if (name === 'senha') {
        inputSenha.current.type = 'text';
      } else if (name === 'confirma-senha') {
        inputConfirmaSenha.current.type = 'text';
      }
    } else {
      setIsActiveButtonEyePessword((prev: any) => ({
        ...prev,
        [name]: true,
      }));
      if (name === 'senha') {
        inputSenha.current.type = 'password';
      } else if (name === 'confirma-senha') {
        inputConfirmaSenha.current.type = 'password';
      }
    }
  }

  const [isActiveButtonSubmit, setIsActiveButtonSubmit] = useState<boolean>(false);

  async function handleRegisterUser(event: FormEvent) {
    event.preventDefault();
    setIsActiveButtonSubmit(true);
    try {
      const user = await axios.post('/api/auth/register', {
        name: inputNome.current.value,
        email: inputEmail.current.value,
        password: inputSenha.current.value,
        confirmPassword: inputConfirmaSenha.current.value,
      });
      if (user.status === 201) {
        toast.success('Usuário cadastrado com sucesso!', {
          theme: 'colored',
        });
        Router.push('/login');
      }
    } catch (error: any) {
      toast.error(error.response.data.msg, {
        theme: 'colored',
      });
      setIsActiveButtonSubmit(false);
      console.log(error.message);
      console.log(error.response);
    }
  }

  return (
    <div className="form-register">
      <form onSubmit={handleRegisterUser}>
        <Image src="https://i.postimg.cc/8CCJ3pKF/icone-task-list.png" alt="logo tasklist" width={130} height={90} />
        <h1>
          Bem vindo ao <span>TaskList</span>
        </h1>
        <p>
          Já possui uma conta? <Link href="/login">Entre</Link> então!
        </p>
        <div className="container-input">
          <input ref={inputNome} id="name" name="nome" type="text" placeholder="Email" required />
          <label htmlFor="name">Nome</label>
        </div>
        <div className="container-input">
          <input ref={inputEmail} id="email" name="email" type="Email" placeholder="Email" required />
          <label htmlFor="email">E-mail</label>
        </div>
        <div>
          <div className="container-input">
            <input
              ref={inputSenha}
              id="password"
              name="senha"
              type="password"
              minLength={6}
              placeholder="Senha"
              required
            />
            <label htmlFor="password">Senha</label>
            <img
              onClick={() => handleClick(inputSenha.current.name)}
              src={`${inputSenha.current?.type === 'text' ? imageEye.open : imageEye.close}`}
              alt="olho"
            />
          </div>
          <div className="container-input">
            <input
              ref={inputConfirmaSenha}
              id="confirm-password"
              name="confirma-senha"
              type="password"
              minLength={6}
              placeholder="Senha"
              required
            />
            <label htmlFor="confirm-password">Repita a Senha</label>
            <img
              onClick={() => handleClick(inputConfirmaSenha.current.name)}
              src={`${inputConfirmaSenha.current?.type === 'text' ? imageEye.open : imageEye.close}`}
              alt="olho"
            />
          </div>
        </div>
        <input type="submit" value={isActiveButtonSubmit ? 'Cadastrando...' : 'Cadastrar'} />
      </form>
    </div>
  );
}
