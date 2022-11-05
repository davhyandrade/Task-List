import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';

export default function Login() {
  const inputEmail = useRef(null);
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

  return (
    <div className="form-login">
      <form>
        <Image src="https://i.postimg.cc/8CCJ3pKF/icone-task-list.png" alt="logo tasklist" width={130} height={90} />
        <h1>
          Entre na sua <span translate='no'>Conta</span>
        </h1>
        <p>
          Primeira vez? <Link href="/register">Registre-se</Link> gratuitamente
        </p>
        <div>
          <input ref={inputEmail} name="email" type="Email" placeholder="Email" required />
          <label htmlFor="title-task">E-mail</label>
        </div>
        <div>
          <input ref={inputSenha} name="senha" type="password" minLength={6} placeholder="Senha" required />
          <label htmlFor="body-task">Senha</label>
          <img onClick={handleClick} src={imageEyePassword} alt="olho" />
        </div>
        <Link href="/forgot-password">Esqueci minha Senha</Link>
        <input type="submit" value="Entrar" />
      </form>
    </div>
  );
}
