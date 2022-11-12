import { useContext, useState } from 'react';
import { Context } from '../context/layout';
import Dialog from '../components/Dialog';
import axios from 'axios';
import { join } from 'path';
import { parseCookies } from 'nookies';

export default function Tasks() {
  interface ITasks {
    id: number;
    _id: number;
    title: string;
    description: string;
    completed: boolean;
  }

  const { handleButtonAdd } = useContext(Context);
  const { dialog } = useContext(Context);
  const { tasksTemporary }: any = useContext(Context);
  const { tasks }: any = useContext(Context);
  const { isAuth }: any = useContext(Context);

  const imageDone = {
    imagePending: 'https://i.postimg.cc/MKMvnXv6/btn-pendente.png',
    imageCompleted: 'https://i.postimg.cc/ZqZRscjn/btn-concluido.png',
  };

  const [isActiveIsCompleted, setIsActiveIsCompleted] = useState<Array<object>>([{}]);

  function handleButtonIsCompleted(id: number) {
    if (typeof isActiveIsCompleted[id] === 'undefined') {
      if (tasksTemporary[id].completed) {
        setIsActiveIsCompleted([{ [id]: true }]);
        tasksTemporary[id].completed = false;
      } else {
        setIsActiveIsCompleted([{ [id]: false }]);
        tasksTemporary[id].completed = true;
      }
    } else if (isActiveIsCompleted[id]) {
      setIsActiveIsCompleted([{ [id]: false }]);
      tasksTemporary[id].completed = true;
    } else {
      setIsActiveIsCompleted([{ [id]: true }]);
      tasksTemporary[id].completed = false;
    }
  }

  const { setTasksTemporary } = useContext(Context);

  const { fetchTasks } = useContext(Context);

  async function handleButtonDelete(id: any) {
    const { token }: any = parseCookies();

    if (isAuth) {
      await axios.delete(`api/tasks/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      fetchTasks();
    } else {
      setTasksTemporary(tasksTemporary.filter((value: any) => value.id !== id));
      tasksTemporary.forEach((element: any) => {
        if (element.id > id) element.id -= 1;
      });
    }
  }

  const pendingTasks = tasks.filter((value: any) => value.completed !== true).length;

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
        {!isAuth && <p>Algumas funcionalidades estaram disponíveis apenas se você estiver logado</p>}
        <Dialog dialog={dialog} />
      </div>
      <div className="field-tasks">
        <div className="header-tasks">
          <span>
            PEDENTES
            <span>{pendingTasks}</span>
          </span>
        </div>
        <div className="body-tasks">
          {isAuth
            ? tasks.map((value: ITasks) => {
                return (
                  <details key={value._id}>
                    <summary id={`${value.completed && 'completed'}`}>
                      {value.title}
                      <input
                        id="input-image"
                        onClick={() => handleButtonIsCompleted(value._id)}
                        type="image"
                        src={`${value.completed ? imageDone.imageCompleted : imageDone.imagePending}`}
                        alt="Image Done"
                      />
                      <input
                        onClick={() => handleButtonDelete(value._id)}
                        type="image"
                        src="https://i.postimg.cc/HxPpDGL9/btn-exit.png"
                        alt="Button close"
                      />
                    </summary>
                    <div className="description-tasks">
                      <p>{value.description}</p>
                    </div>
                  </details>
                );
              })
            : tasksTemporary.slice(1, tasksTemporary.length).map((value: ITasks) => {
                return (
                  <details key={value.id}>
                    <summary id={`${value.completed && 'completed'}`}>
                      {value.title}
                      <input
                        id="input-image"
                        onClick={() => handleButtonIsCompleted(value.id)}
                        type="image"
                        src={`${value.completed ? imageDone.imageCompleted : imageDone.imagePending}`}
                        alt="Image Done"
                      />
                      <input
                        onClick={() => handleButtonDelete(value.id)}
                        type="image"
                        src="https://i.postimg.cc/HxPpDGL9/btn-exit.png"
                        alt="Button close"
                      />
                    </summary>
                    <div className="description-tasks">
                      <p>{value.description}</p>
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
