import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import { FormEvent, useContext, useRef, useState } from 'react';
import { setCookie } from 'nookies';
import { Context } from '../context/layout';
import { toast } from 'react-toastify';

export default function Login() {
  const inputEmail = useRef<any>(null);
  const inputSenha = useRef<any>(null);

  const imageEye = {
    close: 'https://i.postimg.cc/Z5tsG5b6/aberto.png',
    open: 'https://i.postimg.cc/zvD8SFMX/fechado.png',
  };

  const [imageEyePassword, setImageEyePassword] = useState<string>(imageEye.close);

  const [isActiveButtonEyePessword, setIsActiveButtonEyePessword] = useState<boolean>(true);

  function handleClick() {
    if (isActiveButtonEyePessword) {
      setIsActiveButtonEyePessword(false);
      setImageEyePassword(imageEye.open);
      inputSenha.current.type = 'text';
    } else {
      setImageEyePassword(imageEye.close);
      setIsActiveButtonEyePessword(true);
      inputSenha.current.type = 'password';
    }
  }

  const [isActiveButtonSubmit, setIsActiveButtonSubmit] = useState<boolean>(false);

  const { fetchDataUser }: any = useContext(Context);

  async function handleLoginUser(event: FormEvent) {
    event.preventDefault();
    setIsActiveButtonSubmit(true);
    try {
      const user = await axios.post('/api/auth/login', {
        email: inputEmail.current.value,
        password: inputSenha.current.value,
      });
      if (user.status === 200) {
        setCookie(undefined, 'token', user.data.token, {
          maxAge: 60 * 60 * 24 * 7, // 7 days
        });
        Router.push('/');
        fetchDataUser();
        toast.success('Usuário logado!', {
          theme: 'colored',
        });
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
    <div className="form-login">
      <form onSubmit={handleLoginUser}>
        <Image src="https://i.postimg.cc/8CCJ3pKF/icone-task-list.png" alt="logo tasklist" width={130} height={90} />
        <h1>
          Entre na sua <span translate="no">Conta</span>
        </h1>
        <p>
          Primeira vez? <Link href="/register">Registre-se</Link> gratuitamente
        </p>
        <div>
          <input ref={inputEmail} id="email" name="email" type="Email" placeholder="Email" required />
          <label htmlFor="email">E-mail</label>
        </div>
        <div>
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
          <img onClick={handleClick} src={imageEyePassword} alt="olho" />
        </div>
        <Link href="/forgot-password">Esqueci minha Senha</Link>
        <input type="submit" value={isActiveButtonSubmit ? 'Entrando...' : 'Entrar'} />
      </form>
    </div>
  );
}
