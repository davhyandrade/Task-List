import Link from "next/link";

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
          <a onClick={() => window.scrollTo(0,0)}>Inicio</a>
          <Link href="/login">
              <a>Entrar</a>
          </Link>
        </div>
        <div>
          <a href="https://github.com/davhyandrade">
            <img src="https://i.postimg.cc/4NccjBYr/logo-github.png" alt="logo github" />
          </a>
          <a href="https://www.linkedin.com/in/davhy-andrade-dev">
            <img src="https://i.postimg.cc/kgFbgGFs/logo-linkedin.png" alt="logo linkedin" />
          </a>
          <a href="https://www.instagram.com/_davhy/">
            <img src="https://i.postimg.cc/2SPR5drR/logo-instagram.png" alt="logo instagram" />
          </a>
        </div>
        <p>
          <span>© 2022 Davhy Andrade</span> - Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
}
