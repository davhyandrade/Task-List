import Image from 'next/image';
import { useContext } from 'react';
import Dialog from '../components/Dialog';
import { Context } from '../context/layout';

export default function HomeTasks() {
  const { handleButtonAdd } = useContext(Context);
  const { dialog } = useContext(Context);
  const { isAuth } = useContext(Context);

  return (
    <div className="home-tasks">
      {!isAuth ? (
        <>
          <h1>Entre na sua conta</h1>
          <span>para salvar ou acessar suas Tarefas</span>
        </>
      ) : (
        <>
          <h1>Adicione sua primeira tarefa</h1>
          <span>para o seu dia ser mais produtivo</span>
        </>
      )
      }
      <Image src="https://i.postimg.cc/8CCJ3pKF/icone-task-list.png" alt="logo tasklist" width={150} height={100} />
      <div className="add-tasks">
        <button onClick={handleButtonAdd} id="button-add" translate="no">
          <img className="img-button-add" src="https://i.postimg.cc/jqQj5YtX/vector-add.png" alt="Vetor Adicionar" />
          Adicionar Task
        </button>
        <p>
          Clique para adicionar suas <span>tarefas</span>
        </p>
        <p>
          Ao adicionar uma Task ou Tarefa, você concorda com nossos <span>Termos de Serviço</span> além da{' '}
          <span>Política de Privacidade</span> ao qual se aplica.
        </p>
      </div>
      <Dialog dialog={dialog} />
    </div>
  );
}
