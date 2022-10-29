import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';

interface IProps {
  isActiveThemeDarkOrLight: string;
}

const GlobalStyles = createGlobalStyle<IProps>`
  ${(props) =>
    props.isActiveThemeDarkOrLight === 'light'
      ? `:root {
          --bg-color: white;
          --bg-panel: #eeeeee;
          --color-headings: #f3920b;
          --color-text: #333;
      }`
      : `:root {
          --bg-color: #171717;
          --bg-panel: #434343;
          --color-headings: #f3b20b;
          --color-text: #dedede;
      }`}
  `;

export default function Menu() {
  const [isActiveThemeDarkOrLight, setIsActiveThemeDarkOrLight] = useState<string>('light');

  const images = {
    imageSol: 'https://i.postimg.cc/mgtgX8t9/sol.png',
    imageLua: 'https://i.postimg.cc/d3fpL2V4/lua.png',
  };

  const [imageTheme, setImageTheme] = useState<string>(images.imageSol);
  const [isActiveButtonTheme, setIsActiveButtonTheme] = useState<boolean>(true);

  function handleButtonTheme() {
    if (isActiveButtonTheme) {
      setIsActiveButtonTheme(false);
      setImageTheme(images.imageLua);
      localStorage.setItem('theme', 'dark');
    } else {
      setIsActiveButtonTheme(true);
      setImageTheme(images.imageSol);
      localStorage.setItem('theme', 'light');
    }

    const theme: any = localStorage.getItem('theme');
    setIsActiveThemeDarkOrLight(theme);
  }

  useEffect(() => {
    const theme: any = localStorage.getItem('theme');

    if (theme === 'dark') {
      setIsActiveButtonTheme(false);
      setImageTheme(images.imageLua);
      setIsActiveThemeDarkOrLight('dark');
    }
  });

  return (
    <>
      <GlobalStyles isActiveThemeDarkOrLight={isActiveThemeDarkOrLight} />
      <nav className="menu">
        <div className="position">
          <div>
            <Image
              className="logo"
              src="https://i.postimg.cc/8CCJ3pKF/icone-task-list.png"
              alt="Icone Logo"
              height={50}
              width={50}
            />
            <Image
              className="logo"
              src="https://i.postimg.cc/4NPYN1Gj/TaskList.png"
              alt="Logo"
              height={70}
              width={170}
            />
            <hr />
            <input className="btn-theme" onClick={handleButtonTheme} type="image" src={imageTheme} alt="theme vector" />
          </div>
          <div className="btns-login">
            <Link href="/login">
              <a>Entrar</a>
            </Link>
            <Link href="/register">
              <a>Cadastrar-se</a>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
