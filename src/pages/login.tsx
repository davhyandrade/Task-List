import axios from 'axios';
import Link from 'next/link';
import Router from 'next/router';
import { FormEvent, useContext, useRef, useState } from 'react';
import { setCookie } from 'nookies';
import { Context } from '../context/layout';
import { toast } from 'react-toastify';

export default function Login() {
  const inputEmail = useRef<any>(null);
  const inputSenha = useRef<any>(null);

  const eyeIcon = {
    close: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 194.13 140.94">
        <title>Ativo 4</title>
        <g id="Camada_2" data-name="Camada 2">
          <g id="Camada_1-2" data-name="Camada 1">
            <path d="M97.26,25.26c-9.34-.38-18,1.84-26.52,4.4-3.83,1.15-10.42-2.22-11.5-5.95-.7-2.42,1-3.13,2.82-3.81A98.09,98.09,0,0,1,93.4,13.32c28.12-1,52,10.34,74.39,25.83A174.72,174.72,0,0,1,186.37,54c10.33,9.45,10.37,23.72,0,33A193.64,193.64,0,0,1,153.61,111c-4,2.3-10.71-.52-11.59-5-.49-2.5,1.69-3.33,3.4-4.29a196.51,196.51,0,0,0,31.46-22.36c7.06-6.07,7-11.55-.06-17.62-17.6-15.08-36.6-27.63-59.32-33.7C110.76,26.22,104,25,97.26,25.26Z" />
            <path d="M96.43,115.81c9.74.37,18.36-1.84,26.92-4.39,4.25-1.27,9.76,1.31,11.28,5.35.94,2.48-.47,3.64-2.59,4.44-14.29,5.37-29,7.81-44.25,6.1-28.51-3.21-51.93-17.24-73.61-34.88-2.69-2.2-5.41-4.4-7.86-6.85-8.11-8.08-8.58-21.5-.45-29.51a160.57,160.57,0,0,1,36.66-26.9c2.5-1.35,7.51,1.42,9.18,5.14,1.34,3-1,4.1-3.07,5.23C37.44,45.7,27.26,53.31,17.48,61.47,10.9,67,10.24,73.22,16.15,78.31c18,15.57,37.5,28.66,60.92,34.84C83.65,114.89,90.28,116.11,96.43,115.81Z" />
            <path d="M163.48,140.93c-2.93.12-4.36-2.17-6.07-3.88Q96.32,76.12,35.27,15.15c-2.46-2.46-4.92-4.93-7.4-7.37-2.07-2-2.75-4.2-.37-6.39,2.19-2,4.5-1.77,6.59.28q7.8,7.68,15.55,15.39l115,114.3a24.7,24.7,0,0,1,2.72,2.89,3.78,3.78,0,0,1,.27,4.57A4.26,4.26,0,0,1,163.48,140.93Z" />
            <path d="M123.5,84.81c-1.49-1.49-2.69-2.87-4.07-4-2.71-2.28-3.63-4.62-3-8.51,1.85-11.45-7.87-21.62-19.5-21.12-8.08.34-8.31.23-13.78-6.95A28.78,28.78,0,0,1,118,48.85C128.24,58.94,130.46,72.59,123.5,84.81Z" />
          </g>
        </g>
      </svg>
    ),
    open: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 194.14 114.54">
        <title>Ativo 5</title>
        <g id="Camada_2" data-name="Camada 2">
          <g id="Camada_1-2" data-name="Camada 1">
            <path d="M97,114.53c-25.25-.32-47.15-10.19-67.63-23.94A175.6,175.6,0,0,1,7.51,73.37C-1.63,64.87-2.76,51.19,6,42.86,25.37,24.4,47.41,10.06,73.62,3.08c25.81-6.87,50.07-1.72,73.3,10.21a190.92,190.92,0,0,1,39,27.17c10.33,9.12,11.14,23.4,1.25,32.33C167.09,90.92,144.91,105.62,118.1,112A86.45,86.45,0,0,1,97,114.53ZM96.08,11.87a55.71,55.71,0,0,0-14.44,1.5C56.06,19,35,32.94,15.56,49.8c-5.1,4.43-4.72,10.87.52,15.44,12.77,11.12,26.51,20.84,42,28,17.65,8.12,35.87,12.12,55.32,7.7,25.05-5.68,45.71-19.29,64.7-35.82,5.91-5.14,5.44-11-.85-16.47C165.78,38.73,153.58,29.93,140,23.24S112.65,11.77,96.08,11.87Z" />
            <path d="M127.26,57.56A30.21,30.21,0,0,1,97,87.63C80.32,87.59,66.37,73.54,66.5,57c.12-16.29,14.14-30.24,30.56-30C116.08,27.2,128.22,43.14,127.26,57.56Zm-12-1A18.91,18.91,0,1,0,96.42,75.67,19,19,0,0,0,115.27,56.59Z" />
          </g>
        </g>
      </svg>
    ),
  };

  const [eyeIconPassword, setEyeIconPassword] = useState<JSX.Element>(eyeIcon.close);

  const [isActiveButtonEyePessword, setIsActiveButtonEyePessword] = useState<boolean>(true);

  function handleClick() {
    if (isActiveButtonEyePessword) {
      setIsActiveButtonEyePessword(false);
      setEyeIconPassword(eyeIcon.open);
      inputSenha.current.type = 'text';
    } else {
      setEyeIconPassword(eyeIcon.close);
      setIsActiveButtonEyePessword(true);
      inputSenha.current.type = 'password';
    }
  }

  const [isActiveButtonSubmit, setIsActiveButtonSubmit] = useState<boolean>(false);

  const { fetchDataUser, setIsActiveLoading }: any = useContext(Context);

  async function handleLoginUser(event: FormEvent) {
    event.preventDefault();
    setIsActiveButtonSubmit(true);
    setIsActiveLoading(true);

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
    } finally {
      setIsActiveLoading(false);
    }
  }

  return (
    <div className="form-login">
      <form onSubmit={handleLoginUser}>
        <svg width={120} height={90} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 826.21 573.03">
          <defs>
            <style>
              .cls-1{'fill:#4c606c;'}.cls-2{'fill:#b9c1c6;'}
            </style>
          </defs>
          <title>Ativo 9</title>
          <g id="Camada_2" data-name="Camada 2">
            <g id="Camada_1-2" data-name="Camada 1">
              <path
                className="gray-vector"
                d="M156.68,114.35c-3-3.45-6-7.28-9.45-10.71-8.22-8.23-4.64-19.55,2.28-24.78,19.9-15,42-18.49,65.82-12.24,5.07,1.32,10.39,1.89,15,5,1.12.78,3.64.14,5.26-.49,7.8-3,15.44-6.52,23.27-9.48,16.6-6.26,32.07-14.76,47.5-23.36,16.76-9.35,33.49-18.75,50.29-28C362.51,7.05,368.53,4,374.55,1a8.06,8.06,0,0,1,8.31.35q45.75,26.19,91.67,52.08Q527.74,83.56,581,113.65c27.61,15.55,55.31,30.91,82.93,46.44,30.92,17.38,61.67,35.07,92.74,52.18,15.6,8.59,30.61,18.24,46.69,26,1.48.72,3.45,1.37,3.64,3.06.22,1.93-2.12,2.23-3.38,2.91Q755,270.34,706.24,296.29q-55,29.44-110,59-40.82,21.93-81.6,43.94-29.18,15.69-58.34,31.39c-7.65,4.1-15.42,8-23,12.24-2.64,1.49-4.76,1.63-7.35.19q-32.81-18.15-65.66-36.19-27.84-15.3-55.71-30.57-54.37-29.88-108.74-59.77c-26.41-14.48-52.91-28.81-79.31-43.3q-49.37-27.09-98.65-54.33c-5-2.73-10-5.35-15-8C1.74,210.24,0,210,0,208.47s1.55-2,2.72-2.63C17.21,198,31.8,190.29,46.18,182.23c16.75-9.4,33.69-18.42,50.06-28.53,9-5.56,18.41-10.58,28-15.3a69.09,69.09,0,0,0,15.95-11.07C145.28,122.58,151.94,120,156.68,114.35Zm23.17-15.48a32.82,32.82,0,0,0,20.79-6.53c3.26-2.46,5.5-5.34,4.42-9.55s-4-6.59-8.2-7.71c-10.51-2.82-20.42-.75-30,3.61-4.12,1.88-7.12,7.66-6.19,11.47,1.21,4.93,4.83,6.91,9.58,7.8C173.44,98.56,176.54,99.41,179.85,98.87Z"
              />
              <path
                className="light-gray-vector"
                d="M446.37,573c-2.83,0-4.62-1.32-6.49-2.35q-34.8-19.06-69.57-38.2-52.69-29-105.37-58c-22.46-12.34-45-24.54-67.47-36.86Q148,410.45,98.61,383.24c-27.58-15.09-55.24-30-82.85-45.07-1.27-.69-3.22-.89-3.3-2.68-.08-2.06,2-2.43,3.39-3.21C39.91,319.06,64,305.92,88,292.55a6.62,6.62,0,0,1,7.33,0q53.77,29.64,107.59,59.2,36.76,20.17,73.55,40.31,55.35,30.39,110.69,60.82,10.5,5.76,21,11.5c.87.47,1.8,1.29,2.68,1.26,14.71-.41,29.68,3.72,43.81-4.66,15.16-9,30.93-17,46.47-25.31Q569.75,398.83,638.41,362q38.07-20.4,76.2-40.7a101.92,101.92,0,0,0,9.16-5.09c4.34-2.95,8.09-2.19,12.44.3,20.48,11.75,41.11,23.24,61.69,34.8,8.55,4.81,17.1,9.64,25.71,14.33,3.7,2,3.25,3.69,0,5.47q-15.37,8.31-30.77,16.58-75,40.25-150,80.47c-26,13.91-52,27.71-78,41.63Q507.4,540.64,450,571.54C448.71,572.24,447.45,573.1,446.37,573Z"
              />
            </g>
          </g>
        </svg>
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
          <button onClick={handleClick} type="button">
            {eyeIconPassword}
          </button>
        </div>
        <Link href="/forgot-password">Esqueci minha Senha</Link>
        <input type="submit" value={isActiveButtonSubmit ? 'Entrando...' : 'Entrar'} />
      </form>
    </div>
  );
}
