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
          --bg-panel: white;
          --bg-panel-secondary: #f7f9fa;
          --bg-panel-third: #edf0f2;
          --bg-panel-hover: #d8d8d8;
          --bg-tasks: rgb(246, 246, 246);
          --bg-tasks-title: #f0f0f0;
          --color-text: gray;
          --color-headings: #454545;
          --color-primary: rgb(0 154 196);
          --color-secondary: #4c616c;
          --color-border: #edeff0;
          --color-tasks: #333;
          --color-drop-shadow: rgba(128, 128, 128, 0.1);
          --color-gradient-primary: #f0f0f0;
          --color-gradient-secondary: transparent;
      }`
      : `:root {
          --bg-color: #202124;
          --bg-panel: #292a2d;
          --bg-panel-secondary: #292a2d;
          --bg-panel-third: #323336;
          --bg-panel-hover: #38393c;
          --bg-tasks: #333437;
          --bg-tasks-title: #2a2b2e;
          --color-text: #b8b8b8;
          --color-headings: white;
          --color-primary: rgb(138, 180, 248);
          --color-secondary: rgb(138, 180, 248);
          --color-border: rgb(255 255 255 / 10%);
          --color-tasks: white;
          --color-drop-shadow: rgba(0, 0, 0, 0.40);
          --color-gradient-primary: #343538;
          --color-gradient-secondary: #404144;
      }
      
      #button-add {
        .img-button-add {
          filter: hue-rotate(45deg) contrast(0.7);
        }
        
        &:hover .img-button-add {
          transition: 1s;
          filter: brightness(0) grayscale(1) invert(1);
        }
        
        &:active .img-button-add {
          transition: 0.1s;
          filter: hue-rotate(45deg) contrast(0.7);
        }
      }
      
      .field > img {
        filter: hue-rotate(45deg) contrast(0.7);
      }
      
      footer  > div:nth-child(2) {
        background-image: url(https://i.postimg.cc/J4PsTtnJ/footer2.png);
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
