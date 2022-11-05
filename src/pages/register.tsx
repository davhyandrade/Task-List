import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';

export default function Register() {
  const inputEmail = useRef(null);
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
      [name]: true
    }))
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

  return (
    <div className="form-register">
      <form>
        <Image src="https://i.postimg.cc/8CCJ3pKF/icone-task-list.png" alt="logo tasklist" width={130} height={90} />
        <h1>
          Bem vindo ao <span>TaskList</span>
        </h1>
        <p>
          Já possui uma conta? <Link href="/login">Entre</Link> então!
        </p>
        <div className="container-input">
          <input name="nome" type="text" placeholder="Email" required />
          <label htmlFor="title-task">Nome</label>
        </div>
        <div className="container-input">
          <input ref={inputEmail} name="email" type="Email" placeholder="Email" required />
          <label htmlFor="title-task">E-mail</label>
        </div>
        <div>
          <div className="container-input">
            <input ref={inputSenha} name="senha" type="password" minLength={6} placeholder="Senha" required />
            <label htmlFor="body-task">Senha</label>
            <img
              onClick={() => handleClick(inputSenha.current.name)}
              src={`${inputSenha.current?.type === 'text' ? imageEye.open : imageEye.close}`}
              alt="olho"
            />
          </div>
          <div className="container-input">
            <input ref={inputConfirmaSenha} name="confirma-senha" type="password" minLength={6} placeholder="Senha" required />
            <label htmlFor="body-task">Repita a Senha</label>
            <img
              onClick={() => handleClick(inputConfirmaSenha.current.name)}
              src={`${inputConfirmaSenha.current?.type === 'text' ? imageEye.open : imageEye.close}`}
              alt="olho"
            />
          </div>
        </div>
        <input type="submit" value="Entrar" />
      </form>
    </div>
  );
}
