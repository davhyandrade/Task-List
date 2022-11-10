import Router from 'next/router';

export default function NotFoud() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <span>
        <span>Poxa...</span> Aqui não tem nada!
      </span>
      <button onClick={() => Router.push('/')}>Voltar ao início</button>
    </div>
  );
}
