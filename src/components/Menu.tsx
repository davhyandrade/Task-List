import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { useGlobalContext } from '@/context/layout';
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
          --color-headings: #4d616d;
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
        
        footer  > div:nth-child(2) {
          filter: saturate(0.5) opacity(0.5);
        }

        dialog::backdrop {
          background: #ffffff15;
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
  const nameLogoIcon = (
    <svg className="logo" width={135} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 870.76 173.4">
      <defs>
        <style>
          .cls-1{'fill:#b9c1c6;'}.cls-2{'fill:#4d616d;'}.cls-3{'fill:#fefefe;'}
        </style>
      </defs>
      <title>Ativo 11</title>
      <g id="Camada_2" data-name="Camada 2">
        <g id="Camada_1-2" data-name="Camada 1">
          <path
            className="light-gray-vector"
            d="M724.33,172.89a49.27,49.27,0,0,1-38.39-15.44c-7.48-7.71-5.4-13.78,2.15-16.92a28.1,28.1,0,0,0,4.17-2.72c8-5.27,8.77-5.35,16.74.18,7.66,5.31,16.18,5.65,24.89,4.48,3.3-.44,6.49-1.89,7-6,.44-3.89-2.12-5.75-5.05-7.18-7.2-3.53-14.9-5.61-22.64-7.56-25.84-6.53-38.34-33.24-25.95-55.67,6.06-11,15.88-16.74,28.08-18.47,15-2.12,29.6-1.49,42.29,8.24a84.11,84.11,0,0,1,8.8,8.09c3.41,3.45,3.39,7.55-.27,10.91a92.83,92.83,0,0,1-10.9,8.68c-3.06,2.06-6.71,2.54-9.64-.36-5.84-5.78-12.89-7.13-20.69-6.37-3.35.33-6.35,1.3-7.11,5s.3,6.89,3.83,8.93c6.28,3.63,13.31,5.09,20.16,7.08,10.62,3.09,20.84,6.62,27.8,16.24,9.31,12.88,7.91,32-2.91,43.61C755.39,169.81,741.17,173,724.33,172.89Z"
          />
          <path
            className="light-gray-vector"
            d="M500.93,87.31q0-35.23,0-70.46c0-8.72,2.27-11,10.82-11h15c6.3,0,9,2.69,9,9.1.05,10,0,20,0,30,0,29.65.07,59.3-.08,88.95,0,3.94,1,5.11,5,5.05,15-.22,30-.09,45-.09,9.59,0,11.93,2.39,11.93,12.17,0,3.5.16,7,0,10.5-.36,5.87-3,8.26-8.88,8.26h-78c-7.22,0-9.79-2.55-9.8-10Q500.89,123.55,500.93,87.31Z"
          />
          <path
            className="light-gray-vector"
            d="M811.75,109.44c0-9.49-.12-17.15,0-24.8.07-3.08-1-4.19-4-4a87,87,0,0,1-9,0c-5-.19-7.79-2.89-7.93-7.74-.15-5.15-.16-10.32,0-15.48.16-4.87,3-7.46,7.89-7.7,4.11-.21,9.43,1.8,12-.86,2.79-2.85.83-8.23.93-12.49.17-6.82,0-13.65,0-20.48s1-8.25,7.84-9.86c5-1.18,10-2.2,15-3.37,7.45-1.73,11.81,1.5,11.93,9.3.17,10.81.21,21.64,0,32.45-.09,4,.89,5.81,5.22,5.4a98.06,98.06,0,0,1,11-.06c4.86.09,7.74,2.76,7.91,7.64.17,5.16.15,10.32,0,15.48-.14,4.87-2.94,7.6-7.89,7.76-4,.13-8,.15-12,0-2.84-.1-4.24.63-4.21,3.86.14,13.81,0,27.63.12,41.44.08,7,5.2,12.24,12.86,13.83a35.83,35.83,0,0,0,4.89.88c4.44.27,6.09,3,6.21,7,.15,5.15.13,10.32,0,15.48-.09,3.66-2.41,6.3-5.74,6.48-10.62.57-21.21.87-31.33-3.82-12.65-5.86-17.89-16.71-20.77-29.29C810.62,126.93,812.3,117.22,811.75,109.44Z"
          />
          <path
            className="light-gray-vector"
            d="M656.78,110.32q0,24.72,0,49.46c0,7.66-2.41,10-10.14,10-5.17,0-10.33,0-15.5,0-6.37,0-9.08-2.6-9.19-9.09-.14-7.83,0-15.66,0-23.49q0-38.22,0-76.45c0-8.67,2.29-11,10.76-11,5.17,0,10.33,0,15.5,0,5.86,0,8.57,2.85,8.58,9.07C656.81,76,656.78,93.16,656.78,110.32Z"
          />
          <path
            className="light-gray-vector"
            d="M639.68,39.84c-11.14,0-19.8-8.47-19.84-19.39,0-11.17,8.64-19.5,20-19.72s19.26,8.86,19.69,19.64S650.57,39.85,639.68,39.84Z"
          />
          <path
            className="gray-vector"
            d="M410.82,96.37c6.54-12.5,13.41-24.84,19.49-37.56,3.21-6.71,7.19-10.1,14.95-9.27,6.09.65,12.31.1,18.47.14,8.17,0,10.87,4.45,7.11,11.49C463.17,75.54,455.6,90,447.78,104.24c-1.72,3.13-1.79,5.38.23,8.48C458,128,467.74,143.53,477.52,159c3.47,5.48.66,10.66-6,10.77-8.32.14-16.65-.08-25,.08-4.64.09-6.8-3-8.87-6.22-8-12.64-16-25.31-24-38-1-1.64-2.12-3.24-3.94-6,0,14,0,26.71,0,39.42,0,8.75-2,10.71-10.87,10.71-5.16,0-10.33.05-15.49,0-5.4-.06-7.87-2.46-8.18-7.86-.06-1.16,0-2.33,0-3.5V11.07c0-9.08,2-11.06,11.2-11.06,4.67,0,9.33,0,14,0,6.7,0,9.35,2.63,9.36,9.36q0,41,0,81.92v4.84Z"
          />
          <path
            className="gray-vector"
            d="M196.48,160.7c-24.42,21.46-58.72,15-72.09-14.06-11.48-25-11.22-50.85.94-75.7,11-22.52,33.11-28,55.08-22.39,6.27,1.61,11.26,5.46,16.31,10.73,0-3.49.61-6.08,2.88-8,2.46-2.11,5.32-1.55,8.1-1.58,5.16-.06,10.32-.09,15.48,0s7.9,2.63,8.2,8c.17,3,0,6,0,9q0,46.17,0,92.36c0,8.82-2,10.78-10.88,10.78h-14C199.43,169.78,197.58,168.16,196.48,160.7Zm.4-50c0-7.8-.73-14.73-3.16-21.37-3.21-8.77-10.24-11.82-18.83-12-8.41-.15-16.34,1.72-19.78,10.46a58.18,58.18,0,0,0,.1,44.22c3.2,8,10.55,10.21,18.44,10.19s15.27-1.76,19.13-9.94C196.13,125.14,196.65,117.54,196.88,110.66Z"
          />
          <path
            className="gray-vector"
            d="M77.05,101.36q0,29.48,0,59c0,7.36-2.11,9.45-9.45,9.46H52.1c-6.89,0-9.34-2.35-9.36-9.22q-.06-35.22,0-70.45c0-16.32-.11-32.64.08-49,0-3.66-.83-4.95-4.69-4.84-9.65.28-19.32.14-29,.08-6.43,0-9-2.69-9.08-9.2,0-4.5-.12-9,0-13.49.17-5.32,2.8-7.83,8.17-7.84q51.72,0,103.45,0c5.51,0,7.93,2.41,8,7.83.06,4.49,0,9,0,13.49,0,7-2.2,9.17-9.34,9.21-9.5.06-19,.22-28.48-.08-4.09-.13-5,1.27-4.93,5.09C77.14,61.39,77.05,81.37,77.05,101.36Z"
          />
          <path
            className="gray-vector"
            d="M298.79,173c-15.14.36-29.1-4.58-40-17-5.33-6.08-4.71-10.25,2-14.64a26.33,26.33,0,0,0,2.5-1.65c7-5.76,13.44-7.7,21.62-.9,6.33,5.26,14.89,5.29,23,3.69,3.3-.65,6.57-1.91,7.19-5.92s-2.28-6.08-5.34-7.52c-7.24-3.4-15-5.44-22.71-7.42C265,116,252.25,95.76,258,74.54c4.24-15.8,15.44-24.3,31.31-26.93C308.64,44.39,326,47.9,339.85,63c4.32,4.7,4.22,8.62-.67,12.75-2.8,2.36-5.64,4.67-8.54,6.9-4.33,3.34-7.78,3.27-12-.36a23.18,23.18,0,0,0-19.92-5.6c-3.3.57-6.19,1.7-7,5.35-.92,4,.92,6.8,4.21,8.75,4.91,2.91,10.39,4.37,15.82,5.94,4.79,1.39,9.6,2.74,14.28,4.45,13.94,5.08,22,15,23.75,29.8,1.76,15.41-5.68,26.25-17.9,34.24C322.17,171.52,311.1,173,298.79,173Z"
          />
        </g>
      </g>
    </svg>
  );

  const [isActiveThemeDarkOrLight, setIsActiveThemeDarkOrLight] = useState<string>('light');

  const themeIcons = {
    sunIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 871.71 868.66">
        <defs>
          <style>.cls-1{'fill:#fff;'}</style>
        </defs>
        <title>Ativo 2</title>
        <g id="Camada_2" data-name="Camada 2">
          <g id="Camada_1-2" data-name="Camada 1">
            <path d="M582.65,430.07c.73,96.66-71.26,148.85-141,150.66C359.47,582.87,293,517.82,294.47,430.29c1.53-88.62,75-140.44,142.89-139.84C519.54,291.19,579.88,350.68,582.65,430.07Z" />
            <path d="M85.94,398.88c41.08,0,82.19-.76,123.24.36,14.8.41,31.77,5.39,37.33,19.93,5.44,14.2,7.75,32.94-8.1,43.63-8.29,5.6-20.38,7.58-30.81,7.72-55.07.72-110.15.47-165.23.27-20.42-.07-51-21.89-40.1-48.29C7.33,410.23,21.67,398,40,398.78,55.3,399.41,70.63,398.91,85.94,398.88Z" />
            <path d="M754.83,469.63c-33.47,0-66.94-.45-100.39.16-21.83.4-22.8-14.49-22.56-29.51.25-15.52-5.52-37,19.66-37.81,63-2.12,126.15-3.87,189.16-2.43,19.16.43,30.79,18.9,31,38.52.23,20.3-14.29,30.82-32.94,31.83-27.9,1.51-55.95.39-83.94.39Z" />
            <path d="M470.89,121.25c0,31-.17,62,.06,93,.19,25.89-16.53,33.43-37.78,32.83-25.57-.71-27.44-21.21-27.75-40-.72-44.21-.88-88.45-.08-132.65.39-21.21-.17-43.58,6.38-63.2,6.12-18.35,26.71-8.38,41-9.22,11.25-.65,17.53,6.31,17.56,17.83.09,33.82,0,67.64,0,101.45Z" />
            <path d="M470.5,741.84c0,34.13.33,68.26-.12,102.38-.26,19.84-15.42,22.61-30.57,24.18s-27-4.1-30.19-19.55c-8.31-40.61-1.08-81.72-2-122.6-.61-27.47-4.27-55.1,1-82.7,3.36-17.62,14.83-22.1,29.78-20.58,14.7,1.48,31.33,3.15,31.78,23.47.71,31.78.19,63.6.19,95.4Z" />
            <path d="M693.52,649.92c0,17.84-5.22,27.32-16.69,32.42-14.8,6.57-28.9,8.28-42.07-4.89-26.79-26.77-54.28-52.84-81.34-79.35-9.13-8.94-10.57-20.1-7-31.82,4.44-14.68,14.6-23.9,29.77-25.82,11.39-1.45,18.72,7.15,27.13,13.39,17.4,12.92,30.77,30.14,45.9,45.11C665.79,615.38,688.73,628.89,693.52,649.92Z" />
            <path d="M693.61,207.66c.9,26.37-18.71,36-31.5,49.46-21.62,22.74-44.28,44.64-68,65.23-15.34,13.34-32,7.19-42.71-7.1-9-12-10.43-27.08,1.93-39.95,22.1-23,45-45.34,65.75-69.56,22.28-26.07,60.17-30.2,72.44-5.83A25.47,25.47,0,0,1,693.61,207.66Z" />
            <path d="M298.94,327.49c-18.94,2-26.73-14.67-37.74-24.34-24-21.06-45.82-44.64-68.29-67.42-10.2-10.33-9.45-23.26-5.54-35.6s15.36-18.4,26.36-19.32c11.22-.93,22.49,2.6,31.63,12.77,23.95,26.65,49.72,51.67,74.06,78,8.29,9,19.9,19.59,11.82,32.94C324.36,315.89,316.31,329.41,298.94,327.49Z" />
            <path d="M184.46,646.09c-2.16-19.9,26-27.11,39.15-44.4,14.73-19.36,34.26-35.29,52.81-51.43,10.6-9.22,25.3-8.78,36.32-2.19,10.1,6,19.66,15.85,18.94,30.1-.68,13.46-10.11,20.87-19.35,29.3-17.37,15.85-32.74,33.9-50,49.92-18.59,17.29-34.38,44.35-66.86,23.07C185.65,674,186,664.56,184.46,646.09Z" />
            <path
              className="cls-1"
              d="M440.15,358.86c42.48-.17,77,34.05,73.57,78.56-3.41,44.24-26.41,71.66-73,73.79-50.71,2.32-77.9-36-80-81C358.85,390.19,396.24,358.17,440.15,358.86Z"
            />
          </g>
        </g>
      </svg>
    ),
    moonIcon: (
      <svg width={15} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 571.48 816.89">
        <title>Ativo 1</title>
        <g id="Camada_2" data-name="Camada 2">
          <g id="Camada_1-2" data-name="Camada 1">
            <path d="M555.86,17c9.62,4.14,15.87,35,11.25,49.61-10.94,34.7-51.37,29.37-76.29,46.12-24.26,16.31-48.62,33.13-69.92,53-18.37,17.11-34.27,37.63-48,58.75a397.11,397.11,0,0,0-37.22,71.47c-8.24,21.1-14.1,44.19-15.31,66.71-2,37.21-2.08,75,2.3,111.89,2.6,21.91,14.31,43.06,23.75,63.72,7.27,15.93,16.63,31,26.4,45.63,12.9,19.24,25.89,38.67,41.15,56a196.15,196.15,0,0,0,41.62,35.47c21,13.28,43.47,24.28,65.92,35,20.45,9.74,44.72,13.56,49.36,42.25,4.13,25.57-12.39,40.06-39,49.89-66.34,24.51-134.1,10-201,11.63-22.25.54-44.95-15.57-67.36-24.27-14.55-5.65-29.74-10.26-43.23-17.86a480.93,480.93,0,0,1-53.81-35.52A771.8,771.8,0,0,1,106,686.15c-9.31-8.68-15.19-21-22.8-31.56C70.54,637.1,55.82,620.77,45.66,602c-9.61-17.79-14.51-38.14-21.46-57.37-6.55-18.14-17.41-36-18.76-54.52C1.47,435.71-1.71,380.92,1,326.62c1.18-23.46,17.52-46.21,27.21-69.18,10.66-25.24,20-51.24,33-75.19,8.08-14.83,21.78-26.7,33.43-39.47,15.06-16.49,29.24-34.19,46.28-48.38,20.35-17,42-33.46,65.48-45.29,32.37-16.28,65.08-36.44,101-40.85C418.66-14.52,555.86,17,555.86,17Z" />
          </g>
        </g>
      </svg>
    ),
  };

  const [isActiveThemeIcon, setIsActiveThemeIcon] = useState<JSX.Element>(themeIcons.sunIcon);
  const [isActiveButtonTheme, setIsActiveButtonTheme] = useState<boolean>(true);

  function handleButtonTheme() {
    if (isActiveButtonTheme) {
      setIsActiveButtonTheme(false);
      setIsActiveThemeIcon(themeIcons.moonIcon);
      localStorage.setItem('theme', 'dark');
    } else {
      setIsActiveButtonTheme(true);
      setIsActiveThemeIcon(themeIcons.sunIcon);
      localStorage.setItem('theme', 'light');
    }

    const theme: any = localStorage.getItem('theme');
    setIsActiveThemeDarkOrLight(theme);
  }

  useEffect(() => {
    const theme: any = localStorage.getItem('theme');

    if (theme === 'dark') {
      setIsActiveButtonTheme(false);
      setIsActiveThemeIcon(themeIcons.moonIcon);
      setIsActiveThemeDarkOrLight('dark');
    }
  }, []);

  const { isAuth, setIsAuth } = useGlobalContext();

  function handleLogout() {
    destroyCookie(undefined, 'token');
    setIsAuth(false);
    toast.error('Usuário desconectado!', {
      theme: 'colored',
    });
  }

  const [isActiveToggleMenu, setIsActiveToggleMenu] = useState<boolean>(false);

  function toggleMenu() {
    if (isActiveToggleMenu) {
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
            <div>
              <svg
                className="logo"
                height={50}
                width={50}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 826.21 573.03"
              >
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
              {nameLogoIcon}
            </div>
            <hr />
            <button className="theme-button" onClick={handleButtonTheme} type="button">
              {isActiveThemeIcon}
            </button>
          </div>
          <div className="login-buttons">
            {isAuth ? (
              <button onClick={handleLogout} type="button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080">
                  <defs>
                    <style>.cls-1{'fill:#fff;'}</style>
                  </defs>
                  <title>Ativo 3</title>
                  <g id="Camada_2" data-name="Camada 2">
                    <g id="Camada_1-2" data-name="Camada 1">
                      <path d="M710.31,576c-44.81,0-89.62.22-134.42-.19-9-.08-14.89,5-17.06,11.26-2.52,7.25-4.07,16.4,3,23.38,28.15,27.65,57.07,54.58,84.21,83.2,25.36,26.74,27.18,49.3,8.51,67.78-21.34,21.12-45.56,19.7-72.23-6.75q-95.79-95-190.29-191.33C372,543,373.78,520.54,401.77,491.89c62.57-64.08,126.34-127,190.6-189.42,18.64-18.1,42-18.45,60.33.45,17.9,18.44,19.78,40.87.53,60.64-29.61,30.4-59.93,60.12-90.37,89.69-7.76,7.54-7.31,16.62-4.76,24.42,2.47,7.55,9.58,11.76,19.35,11.63,88.44-1.19,176.89-2.19,265.34-2.42,21.67-.06,39.94,9.46,49.08,30.1,6.55,14.79,6.18,30.48-5.65,43.36s-27.85,18-45,18.09c-43.65.35-87.3.12-131,.12Z" />
                      <path d="M278.27,534.18c0,70.13-.61,140.27.35,210.38.31,22.71,14.6,36,37.52,37.22a499.85,499.85,0,0,0,56,.19c22.19-1.25,35,10.55,37.19,30,2.33,20.83-8.63,39.27-30.67,40.82-37.88,2.67-77.59,8.51-112.56-11.7C224.73,817.2,206.45,779.68,207,731.47c1.47-132.26,1.58-264.53,2.53-396.8.56-78.2,43.78-122,122-121.76C354.44,213,380.21,202,400,224.08c8.63,9.65,13.92,20.44,9,33.24-6,15.57-15.46,27.72-34.4,27.48-21.1-.26-42.39-2.46-63.24-.37-23.81,2.38-35.92,17.31-35.41,42.33.69,34.64.3,69.31.33,104q0,51.73,0,103.46Z" />
                    </g>
                  </g>
                </svg>
              </button>
            ) : (
              <>
                <Link href="/" translate="no">
                  Home
                </Link>
                <Link href="/login">Entrar</Link>
                <Link href="/register">Cadastrar-se</Link>
              </>
            )}
          </div>
          <div onClick={toggleMenu} className={`toggle-menu ${isActiveToggleMenu && 'active'}`}>
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
              <Link href="/" translate="no">
                Home
              </Link>
              <Link href="/login" onClick={handleCloseMenuMobile}>
                Entrar
              </Link>
              <Link href="/register" onClick={handleCloseMenuMobile}>
                Cadastrar-se
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
