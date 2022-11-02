import { useContext, useState } from 'react';
import { Context } from '../context/layout';
import Dialog from '../components/Dialog';

export default function Tasks({ data }: any) {
  interface ITasks {
    id: number;
    title: string;
    body: string;
    isDone: boolean;
  }

  const { handleButtonAdd } = useContext(Context);
  const { dialog } = useContext(Context);
  const { tasksTemporary }: any = useContext(Context);
  const { isAuth }: any = useContext(Context);

  const imageDone = {
    imagePending: 'https://i.postimg.cc/MKMvnXv6/btn-pendente.png',
    imageCompleted: 'https://i.postimg.cc/ZqZRscjn/btn-concluido.png',
  };

  const [isActiveIsDone, setIsActiveIsDone] = useState<Array<object>>([{}]);

  function handleButtonIsDone(id: number) {
    if (typeof isActiveIsDone[id] === 'undefined') {
      if (tasksTemporary[id].isDone) {
        setIsActiveIsDone([{ [id]: true }]);
        tasksTemporary[id].isDone = false;
      } else {
        setIsActiveIsDone([{ [id]: false }]);
        tasksTemporary[id].isDone = true;
      }
    } else if (isActiveIsDone[id]) {
      setIsActiveIsDone([{ [id]: false }]);
      tasksTemporary[id].isDone = true;
    } else {
      setIsActiveIsDone([{ [id]: true }]);
      tasksTemporary[id].isDone = false;
    }
  }

  return (
    <section className="section-tasks">
      <div className="add-tasks">
        <button onClick={handleButtonAdd} id="button-add" translate="no">
          <img className="img-button-add" src="https://i.postimg.cc/jqQj5YtX/vector-add.png" alt="Vetor Adicionar" />
          Adicionar Task
        </button>
        <p>
          Clique para adicionar suas <span>tarefas</span>
        </p>
        <Dialog dialog={dialog} />
      </div>
      <div className="field-tasks">
        <div className="header-tasks"></div>
        <div className="body-tasks">
          {isAuth
            ? data.map((value: ITasks) => {
                return (
                  <details key={value.id}>
                    <summary>{value.title}</summary>
                    <div className="description-tasks">
                      <p>{value.body}</p>
                    </div>
                  </details>
                );
              })
            : tasksTemporary.slice(1, tasksTemporary.length).map((value: ITasks) => {
                return (
                  <details key={value.id}>
                    <summary id={`${value.isDone && 'completed'}`}>
                      {value.title}
                      <input
                        id='input-image'
                        onClick={() => handleButtonIsDone(value.id)}
                        type="image"
                        src={`${value.isDone ? imageDone.imageCompleted : imageDone.imagePending}`}
                        alt="Image Done"
                      />
                    </summary>
                    <div className="description-tasks">
                      <p>{value.body}</p>
                    </div>
                  </details>
                );
              })}
        </div>
      </div>
      {!isAuth && (
        <p>
          Não se esqueça de logar na sua conta para acessar ou alterar as suas task. Elas serão descartados assim que a
          página for recarregada caso não esteja logado.
        </p>
      )}
    </section>
  );
}
