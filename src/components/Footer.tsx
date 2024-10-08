import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div>
        <div className="position">
          <h1>Projects</h1>
          <div>
            <a href="https://www.davhyandrade.com.br/">Site Pessoal</a>
            <a href="https://hostmain.vercel.app/">HostMain</a>
            <a href="https://relogioonline.vercel.app/">Relógio</a>
            <a href="https://fullscreen-react.vercel.app/">Fullscreen</a>
          </div>
          <div>
            <a href="https://cursor-select.vercel.app/">Cursor Select</a>
            <a href="https://pokedex-javascript-vanilla.vercel.app/">Pokédex</a>
            <a href="https://calculadora-javascript-vanilla.vercel.app/">Calculadora</a>
            <a href="https://bank-small.vercel.app/">Bank Small</a>
          </div>
          <div>
            <a href="https://todo-list-jsonplaceholder.vercel.app/">Todo List</a>
            <a href="https://dark-mode-simple.vercel.app">Dark Mode</a>
          </div>
        </div>
      </div>
      <div>
        <div>
          <a onClick={() => window.scrollTo(0, 0)}>Inicio</a>
          <Link href="/login">Entrar</Link>
        </div>
        <div>
          <Link href="https://github.com/davhyandrade">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 642.34 620.29">
              <title>Ativo 6</title>
              <g id="Camada_2" data-name="Camada 2">
                <g id="Camada_1-2" data-name="Camada 1">
                  <path d="M400.9,556.82c-.26-17.81,1.31-35.66-.56-53.45-1.67-15.8-6.74-30.19-17.76-42.05-.69-.73-1.68-1.5-1.17-2.54.69-1.4,2.28-1.16,3.56-1.3a241,241,0,0,0,46.88-9.82c49.75-15.58,79.62-49.14,89.71-100.16,4.62-23.34,6.39-46.91,2.11-70.54A118.53,118.53,0,0,0,496,219.59c-2.05-2.37-2.76-4.29-1.72-7.52,8.36-26,6-51.59-3.31-76.87-1.22-3.3-3.57-3.95-6.66-4-15.71,0-30.13,4.92-44.16,11.38a241.87,241.87,0,0,0-34.83,19.56,8.86,8.86,0,0,1-7.92,1.28,303.78,303.78,0,0,0-150.86-.3,11.64,11.64,0,0,1-10.22-1.62c-17-11.21-34.84-20.95-54.54-26.75a80,80,0,0,0-23.64-3.58c-3.74,0-5.69,1.54-6.93,5-9,25.23-11,50.68-2.71,76.47.76,2.36.62,4-1,5.88-23.57,26.93-32.51,58.56-30.64,93.9,1.33,25.22,5.4,49.75,16.75,72.52,17.11,34.34,46,53.92,82,64.3a242.69,242.69,0,0,0,40.59,8.28c1.58.17,3.76-.25,4.49,1.48.79,1.9-1.43,2.76-2.43,3.95-8.31,9.82-12.95,21.28-15.1,33.82-.43,2.46-1,4.43-3.64,5.41-18.05,6.83-36.34,9.84-55.18,3.37-15.45-5.3-26.12-16.26-34.48-29.76-8.09-13.07-18.38-23.67-32.72-29.8-7.77-3.32-15.84-5.25-24.35-3.54-2.74.55-5.87,1.08-6.92,4.22s1.26,5.38,3.27,7.32a40.72,40.72,0,0,0,7.31,6c15.86,9.43,26.84,23.33,33.39,40,13.83,35.26,41,48.38,76.59,48.86a132.09,132.09,0,0,0,29.8-2.91c4-.87,5.34.16,5.33,4.34-.05,17,.14,34,.3,51,.15,14.92-9.9,22.23-24.2,17.45a309.37,309.37,0,0,1-73-35.57c-60.38-40-103-94.11-126.84-162.51C-1.22,366.34-5.34,310.4,7.1,254.21,30.15,150.14,90.78,75.06,187,29.34c51-24.27,105.32-32.88,161.61-28q115.77,9.95,198.89,91.32c44.46,43.55,73.74,95.94,87,156.86,18.18,83.37,4.78,161.86-39.72,234.39-40,65.18-97.18,109.71-169.4,134.9A24.4,24.4,0,0,1,417,620.1c-9.93-.09-16-5.83-16.09-15.78C400.79,588.49,400.9,572.65,400.9,556.82Z" />
                  <path d="M233.26,511.34c2.9.21,6.13.72,6.14,3.94,0,4.1-3.62,5.21-7.08,5.46-2.8.2-5.91-.54-6-3.84C226.29,512.64,230,511.91,233.26,511.34Z" />
                  <path d="M208,524c-2.95-.62-6.53-1.18-6.24-5,.26-3.65,3.74-4.43,6.85-4.33s6.58.88,6.27,4.8C214.55,523,211.06,523.53,208,524Z" />
                  <path d="M183.26,519.91c-3.92-.09-7.92-3-7.57-5.81.4-3.13,2.79-3.81,5.51-3.78,3.86,0,7.71,3,7.6,5.8C188.71,518.43,186.43,520,183.26,519.91Z" />
                  <path d="M158,496.54c3.41-.12,7.76,3.85,7.79,7.21,0,2.67-1.5,3.94-4.08,4-3.37,0-7.29-3.61-7.45-6.93C154.19,498.22,155.31,496.64,158,496.54Z" />
                  <path d="M142.17,478.38c3.62.13,7.17,4.42,6.82,7.54-.25,2.25-1.46,4-3.92,3.46-3.69-.79-5.6-3.44-5.78-7.15C139.17,479.88,140.54,478.59,142.17,478.38Z" />
                  <path d="M135.93,468.07c-.38,2.53-1.69,3.7-3.8,3.28a6,6,0,0,1-5.15-5.82c-.17-2.15,1.1-3.61,3.33-3.23C133.62,462.86,135.22,465.27,135.93,468.07Z" />
                  <path d="M122.05,454.94a2.61,2.61,0,0,1-2.81,2.93c-2.52.06-4.72-.9-5.32-3.57-.47-2.07,1-3.15,2.91-3.1A5.42,5.42,0,0,1,122.05,454.94Z" />
                </g>
              </g>
            </svg>
          </Link>
          <Link href="https://www.linkedin.com/in/davhy-andrade-dev">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 641.19 640.5">
              <title>Ativo 7</title>
              <g id="Camada_2" data-name="Camada 2">
                <g id="Camada_1-2" data-name="Camada 1">
                  <path d="M320.49,640.5C143.27,640.49-.09,497,0,319.67S143.93-.07,322.65,0C498,.07,641.31,144.46,641.19,320.85S497.31,640.51,320.49,640.5Zm33.73-360.27-1.22-.32c0-8.26-.08-16.52.05-24.78,0-3-.92-4.16-4-4.15q-33,.14-66,0c-3.5,0-4.14,1.48-4,4.54.25,7.49.32,15,.31,22.5q-.13,94.74-.4,189.48c0,4.19.75,5.87,5.39,5.82q31.74-.35,63.49,0c4.28,0,5.31-1.48,5.29-5.5-.16-25.83-.12-51.66-.08-77.5,0-15.83,0-31.66.27-47.49.21-12.3,6.06-22.06,15.18-29.81,21.59-18.34,52.63-8.47,59.75,18.86a88.11,88.11,0,0,1,2.58,22.29c0,37.83.06,75.66-.1,113.5,0,4.37,1.2,5.7,5.62,5.66,20.83-.22,41.67-.25,62.5,0,4.95.06,6.07-1.54,6.05-6.24-.18-40.17-.11-80.33-.11-120.5a178.07,178.07,0,0,0-1.88-26.4c-6.42-42.95-32-69.24-73.18-73.77-30.4-3.35-55.94,5.93-73.93,32C355.29,279,354.73,279.62,354.22,280.23ZM238.07,362.06c0-35.33,0-70.67.08-106,0-3.9-1.07-5.17-5.06-5.13q-32,.27-64,0c-4.07,0-5.05,1.3-5,5.15q.13,105.75,0,211.5c0,4.34,1.15,5.75,5.61,5.7q31.5-.32,63,0c4.56.05,5.53-1.5,5.52-5.75C238,432.39,238.07,397.23,238.07,362.06ZM201,220.89c3.31-.36,6.65-.51,9.92-1.1,16.87-3,28.81-14.7,31.46-30.63,2.73-16.48-4.29-32.49-18.58-39.81-16.17-8.29-32.5-7.58-48.05,2-7,4.35-11.58,10.9-14.11,18.81C153.17,196.66,171.86,220.64,201,220.89Z" />
                </g>
              </g>
            </svg>
          </Link>
          <Link href="https://www.instagram.com/_davhy/">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 638.86 638">
              <title>Ativo 7</title>
              <g id="Camada_2" data-name="Camada 2">
                <g id="Camada_1-2" data-name="Camada 1">
                  <path d="M308.57,0h26a23.12,23.12,0,0,0,3.35.84c10.77,1.09,21.62,1.3,32.33,3.1C439.87,15.67,500.15,46,548.63,97.33c78,82.56,105.67,180.7,82.06,291.51-18.22,85.46-66.64,151.6-139.9,199.21-38.28,24.87-80.32,40.07-125.51,46.68-8.89,1.31-18,.93-26.71,3.27h-38a27.86,27.86,0,0,0-3.86-.87,315.23,315.23,0,0,1-50.82-7.81C163,608.9,97.71,563,51.39,491.49c-48.31-74.61-62.34-156.38-43-242.83C27.25,164.3,74.32,98.44,146.64,51.1,191.25,21.9,240.28,5,293.7,1.51,298.66,1.19,303.7,1.35,308.57,0ZM320,97.93q-56.24,0-112.48,0a89.92,89.92,0,0,0-22.62,2.91c-48.73,12.44-87.77,59-88,113.53-.29,69.65-.06,139.3-.08,209a112.43,112.43,0,0,0,3.27,26.7,117.2,117.2,0,0,0,39.44,63.34c20.25,17,43.21,26.86,70.16,26.8q110.47-.25,221,.07a96.22,96.22,0,0,0,33.61-6.13c46.19-16.81,78-62.23,78-111.48q.13-103.72,0-207.46A108.86,108.86,0,0,0,539,188c-5.74-22.39-16.53-41.87-33.53-57.94-21.84-20.64-47-32.38-77.54-32.14C392,98.14,356,97.93,320,97.93Z" />
                  <path d="M484.61,316.74c.37,31.29,0,60.29-1.86,89.23-1.21,18.69-5.84,36.51-18.1,51.38-9.5,11.52-22.39,17.42-36.48,21.2-19.74,5.3-40,4.23-60.09,5-29.15,1.11-58.33.91-87.47.26-20.45-.46-41.06.38-61.31-3.44-30.11-5.69-51.18-19.12-59.54-53.63a137.94,137.94,0,0,1-3.91-27.62c-1.69-46.8-2.23-93.6-.52-140.42.49-13.48.16-27,2.78-40.33,5.94-30.13,19.31-50.77,54.06-59.17a145.25,145.25,0,0,1,29.63-3.94c44.8-1.41,89.6-2.11,134.42-.5,14.48.52,29,.14,43.34,2.81,31.05,5.79,51.54,19.7,59.85,53.89a160,160,0,0,1,4.09,31.12q.84,19.21,1.07,38.46C484.75,293.7,484.61,306.37,484.61,316.74ZM222.75,320c-.71,10.33.19,21.52,4.23,32,21,54.65,72.28,76.67,125.53,59,55.67-18.51,76.48-71.65,59.2-124.58-18.59-56.93-74.85-76.76-129.19-58.28C252.34,238.37,219.49,273.64,222.75,320ZM450,221.37c2.66-19.39-15.33-33.64-30.41-33-23,1-33.87,11-35.18,31.65-1.28,20.24,15.25,34.3,32.84,34.39C435.36,254.5,452.53,240,450,221.37Z" />
                  <path d="M273.39,319.24c-.44-22,23.82-46.41,46.18-46.4s45.62,23.21,46.17,45.9c.53,21.95-23.73,46.34-46.16,46.4C297.4,365.2,273.85,341.8,273.39,319.24Z" />
                </g>
              </g>
            </svg>
          </Link>
        </div>
        <p>
          <span>© 2022 Davhy Andrade</span> - Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
}
