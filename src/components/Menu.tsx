import Link from 'next/link';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { Context } from '../context/layout';
import { destroyCookie } from 'nookies';
import { toast } from 'react-toastify';

interface IProps {
  isActiveThemeDarkOrLight: string;
  isActiveToggleMenu: boolean;
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
          --color-summary-tasks: rgba(245, 245, 245, 0.15);
          --color: white;
      }`
      : `:root {
          --bg-color: #10151b;
          --bg-panel: #20262e;
          --bg-panel-secondary: #161b22;
          --bg-panel-third: #2a323b;
          --bg-panel-hover: #323b44;
          --bg-tasks: #232A34;
          --bg-tasks-title: #29313b;
          --color-text: #b8b8b8;
          --color-headings: white;
          --color-primary: rgb(138, 180, 248);
          --color-secondary: rgb(138, 180, 248);
          --color-border: rgb(255 255 255 / 10%);
          --color-tasks: white;
          --color-drop-shadow: rgba(0, 0, 0, 0.40);
          --color-gradient-primary: #13181e;
          --color-gradient-secondary: #222830;
          --color-summary-tasks: #191e25;
          --color: #10151b;
        }
        
        #button-add {
          .img-button-add {
            filter: hue-rotate(45deg) contrast(0.6);
          }
          
          &:hover .img-button-add {
            transition: 1s;
            filter: brightness(0) grayscale(1) invert(1);
          }
          
          &:active .img-button-add {
            transition: 0.1s;
            filter: hue-rotate(45deg) contrast(0.6);
          }
        }
        
        .field > img {
          filter: hue-rotate(45deg) contrast(0.6);
        }
        
        footer  > div:nth-child(2) {
          filter: saturate(0.5) opacity(0.5);
        }

        dialog::backdrop {
          background: #ffffff15;
        }
        
        #input-image {
          opacity: 100%;
          filter: hue-rotate(45deg) contrast(0.6);
        }
        
        .form-login form > div img, .form-register form > div img {
          filter: invert(1);
          opacity: 100%;
        }
                
        .btns-login > input[type="image"] {
          filter: invert(1);
        }

        .section-tasks .field-tasks .header-tasks > span {
          opacity: 10%;

          span {
            color: var(--color-headings);
            background-color: rgba(0, 0, 0, 0.5);
          }
        }

        #btn-edit {
          filter: contrast(0.42);
          opacity: 100%;

          &:hover {
            transition: 1s;
            opacity: 50%;
          }

          &:active {
            transition: 0.1s;
            opacity: 100%;
          }
        }
      `}
  ${(props) => 
    props.isActiveToggleMenu && 
    `.menu-mobile {
      display: flex;
    }

    .menu {
      position: fixed;
    }
  `}
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
  }, [images.imageLua]);

  const { isAuth } = useContext(Context);
  const { setIsAuth } = useContext(Context);

  function handleLogout() {
    destroyCookie(undefined, 'token');
    setIsAuth(false);
    toast.error('Usuário desconectado!', {
      theme: 'colored',
    });
  }

  const [isActiveToggleMenu, setIsActiveToggleMenu] = useState<boolean>(false);

  function toggleMenu() {
    if(isActiveToggleMenu) {
      setIsActiveToggleMenu(false);
    } else {
      setIsActiveToggleMenu(true);
    }
  }

  function handleCloseMenuMobile() {
    setTimeout(() => {
      setIsActiveToggleMenu(false);
    }, 1500);
  }

  return (
    <>
      <GlobalStyles isActiveThemeDarkOrLight={isActiveThemeDarkOrLight} isActiveToggleMenu={isActiveToggleMenu} />
      <nav className="menu">
        <div className="position">
          <div>
            <img
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
            {isAuth ? (
              <input onClick={handleLogout} type="image" src="https://i.postimg.cc/qqhzh8Zk/logout.png" alt="logout" />
            ) : (
              <>
                <Link href="/">
                  <a translate="no">Home</a>
                </Link>
                <Link href="/login">
                  <a>Entrar</a>
                </Link>
                <Link href="/register">
                  <a>Cadastrar-se</a>
                </Link>
              </>
            )}
          </div>
          <div onClick={toggleMenu} className={`toggle-menu ${isActiveToggleMenu && 'active'}`} >
            <div className="toggle-menu-item"></div>
          </div>
        </div>
      </nav>
      <div className="menu-mobile">
        <div className="position">
          {isAuth ? (
            <a onClick={handleLogout}>Logout</a>
          ) : (
            <>
              <Link href="/">
                <a onClick={handleCloseMenuMobile} translate="no">Home</a>
              </Link>
              <Link href="/login">
                <a onClick={handleCloseMenuMobile}>Entrar</a>
              </Link>
              <Link href="/register">
                <a onClick={handleCloseMenuMobile}>Cadastrar-se</a>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );  
}
