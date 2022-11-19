import Router from 'next/router';
import { useContext, useEffect } from 'react';
import { Context } from '../context/layout';

export default function NotFoud() {
  const { setIsActiveLoading } = useContext(Context);

  useEffect(() => {
    setIsActiveLoading(false);
  })

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
