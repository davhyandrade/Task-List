import { useContext, useState, useTransition } from 'react';
import { Context } from '../context/layout';
import Dialog from './Dialog';
import DialogEdit from './DialogEdit';
import axios from 'axios';
import { destroyCookie, parseCookies } from 'nookies';
import { toast } from 'react-toastify';

export default function Tasks() {
  interface ITasks {
    id: number;
    _id: number;
    title: string;
    description: string;
    completed: boolean;
  }

  const { handleButtonAdd, handleButtonOpenDialogEdit, dialog, dialogEdit, tasksTemporary, tasks, isAuth, setIsActiveLoading }: any = useContext(Context);

  const taskStatusIcon = {
    pending: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 370.9 370.71">
        <defs>
          <style>.cls-1{'fill:#373737;'}</style>
        </defs>
        <title>Ativo 6</title>
        <g id="Camada_2" data-name="Camada 2">
          <g id="Camada_1-2" data-name="Camada 1">
            <path
              className="cls-1"
              d="M184.66,0C289.06-1.15,370.38,86.13,370.9,183.33c.55,104.59-82.49,186.32-184.79,187.37C79.3,371.81.08,283.13,0,185.88A185.46,185.46,0,0,1,184.66,0ZM347.48,186.36c-1.13-103.11-83-168.15-171.86-163-85.25,5-157,78-152,171.37,4.77,88.42,81.19,156.43,170.78,152.67C281.79,343.79,349,266.59,347.48,186.36Z"
            />
          </g>
        </g>
      </svg>
    ),
    completed: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 383.06 370.33">
        <defs>
          <style>
            .cls-1{'fill:#0a9ec9;'}.cls-2{'fill:#079dc8;'}
          </style>
        </defs>
        <title>Ativo 7</title>
        <g id="Camada_2" data-name="Camada 2">
          <g id="Camada_1-2" data-name="Camada 1">
            <path
              className="cls-1"
              d="M23,185.8c.33,55.84,24.45,99.37,69,132.15a150.69,150.69,0,0,0,71.53,28.73c40.39,5,78.18-3.06,112.23-26.09,29.41-19.89,50.67-46.33,62.91-79.76,9.39-25.64,11.58-52,7.86-79a155.71,155.71,0,0,0-23.08-63.2c-1.57-2.46-1.77-4.52.73-6.52,3.24-2.6,6.44-5.27,9.56-8,3.5-3.08,6-2.32,8.37,1.5A189.93,189.93,0,0,1,358.75,119a180.76,180.76,0,0,1,12.05,75.85c-1.92,33-11.79,63.6-30.27,91.24-23.33,34.89-54.44,60-94.06,74a181.65,181.65,0,0,1-79.19,9.25c-30.41-3-58.46-12.51-83.79-29.66-34.59-23.43-59-54.82-73-94.22a178,178,0,0,1-9.37-79.65A180.76,180.76,0,0,1,25.81,91.61c25-41.6,60.49-69.71,107-83.9,28.63-8.73,57.5-9.83,86.86-4.4a188,188,0,0,1,69.94,28c4.65,3.07,4.17,3.45.26,7-9.82,8.89-18.39,8.27-30.35,1.93-46.7-24.74-95-25.47-142.72-3C78.86,55,51.45,84,35,123,26.45,143.08,22.82,164,23,185.8Z"
            />
            <path
              className="cls-2"
              d="M383.06,31.61a16.18,16.18,0,0,1-5.37,3.54c-33.32,13.9-61.06,35.43-85.56,61.68a370.47,370.47,0,0,0-43.55,57A640.8,640.8,0,0,0,191.51,270c-3.94,10.59-7.28,21.41-10.94,32.1-.46,1.36-.34,3.48-1.94,3.76-2.07.36-2.5-1.91-3.18-3.3-10.41-21.19-20.87-42.36-31.11-63.63-15.79-32.82-30.74-66-45.19-99.46A130.21,130.21,0,0,1,93.43,124c-1.47-5.13-.75-9.65,3-13.37,3.93-3.92,8.82-4.35,13.93-2.68,6.32,2.07,11.48,6,16.14,10.6C138.25,130.07,147,143.89,155,158.1c7.52,13.31,15.59,26.32,22.12,40.17.44.92.82,2,2,2,1.74-.1,2.39-1.6,3.12-2.92,4.66-8.45,9.23-17,14-25.33,18.95-33.06,40.51-64.14,68.78-90.1,23.69-21.76,49.9-39.31,81.23-48.15A108.26,108.26,0,0,1,378.83,30C380.27,30.05,381.81,30.07,383.06,31.61Z"
            />
          </g>
        </g>
      </svg>
    ),
  };

  const [isActiveIsCompleted, setIsActiveIsCompleted] = useState<Array<object>>([{}]);

  async function handleButtonIsCompleted(id: number) {
    try {
      if (typeof id === 'undefined') {
        throw new Error("O valor de 'id' é indefinido.");
      }

      if (isAuth) {
        const task = tasks.filter((value: any) => value._id === id);

        if (task.length === 0) {
          throw new Error('Tarefa não encontrada.');
        }

        let isCompleted: boolean;

        if (task[0].completed) {
          isCompleted = false;
        } else {
          isCompleted = true;
        }

        const { token }: any = parseCookies();

        if (!token) {
          throw new Error('Token não encontrado.');
        }

        setIsActiveLoading(true);

        try {
          await axios.put(
            `api/tasks/${id}`,
            { completed: isCompleted },
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          fetchTasks();
        } catch (error: any) {
          if (error.status === 400 || error.status === 401) destroyCookie(undefined, 'token');
          if (error.response && error.response.data && error.response.data.msg) {
            toast.error(error.response.data.msg, { theme: 'colored' });
          } else {
            toast.error('Erro ao atualizar a tarefa.', { theme: 'colored' });
          }
          console.error(error);
        } finally {
          setIsActiveLoading(false);
        }
      } else {
        if (typeof tasksTemporary[id] === 'undefined') {
          throw new Error(`Tarefa temporária com ID ${id} não encontrada.`);
        }

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
    } catch (error: any) {
      toast.error(`Erro: ${error.message}`, { theme: 'colored' });
      console.error('Erro ao processar a ação do botão:', error);
    }
  }

  const { setTasksTemporary } = useContext(Context);

  const { fetchTasks } = useContext(Context);

  async function handleButtonDelete(id: any) {
    const { token }: any = parseCookies();

    if (isAuth) {
      setIsActiveLoading(true);

      try {
        await axios.delete(`api/tasks/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        fetchTasks();
      } catch (error: any) {
        if (error.status === 400 || error.status === 401) destroyCookie(undefined, 'token');
        if (error.response && error.response.data && error.response.data.msg) {
          toast.error(error.response.data.msg, { theme: 'colored' });
        } else {
          toast.error('Erro ao apagar a tarefa.', { theme: 'colored' });
        }
        console.error(error);
      } finally {
        setIsActiveLoading(false);
      }
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
        <button onClick={handleButtonAdd} className="button-pattern" id="add-button" translate="no">
          <svg className="add-button-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384.15 384.3">
            <defs>
              <style>.cls-1{'fill:#019bc6;'}</style>
            </defs>
            <title>Ativo 8</title>
            <g id="Camada_2" data-name="Camada 2">
              <g id="Camada_1-2" data-name="Camada 1">
                <path
                  className="cls-1"
                  d="M1.66,218.52A11.66,11.66,0,0,0,1,212.39a2.73,2.73,0,0,0-.29-2.88A44.16,44.16,0,0,0,0,197.42c.72-11.95.86-23.9,2.6-35.81C14,83.67,77.69,17.14,155.48,3.54,224.9-8.6,285,10.41,333.43,61.87c35.8,38,52.79,84,50.52,136.29-3.2,73.68-38.25,128.19-102.35,163.91-29.14,16.24-61,22.53-94.27,22-1.48,0-3,.15-4.43.24-30.3-2-59-9.79-85.24-25.09C50,331.45,19.06,290.8,5.54,237.14c-.41-1.6-1-3.17-1.44-4.75l-.39-1.89a4,4,0,0,0-.59-3.11,1.64,1.64,0,0,0-.4-1.9,9.18,9.18,0,0,0-.78-5.11A1.32,1.32,0,0,0,1.66,218.52Zm113.23,4.91v0c13.65,0,27.31.17,41-.11,4.29-.08,5.2,1.32,5.17,5.37-.2,27.31-.09,54.63-.24,81.94,0,3.51.59,5,4.58,4.93q27-.33,54,0c3.92,0,4.62-1.28,4.6-4.86-.15-27.48,0-55-.2-82.44,0-4,1.15-5,5-4.95,27.48.19,55,.08,82.44.27,3.72,0,4.82-.93,4.78-4.71q-.28-26.73,0-53.46c0-3.88-.93-5.07-5-5-27.31.21-54.62,0-81.94.23-4.06,0-5.37-.92-5.33-5.19.2-27.48,0-55,.2-82.44,0-3.53-1-4.49-4.47-4.45q-27,.24-54,0c-3.68,0-4.81.88-4.78,4.7.18,27.31,0,54.63.26,81.94,0,4.6-1.36,5.48-5.62,5.45-27.31-.19-54.62-.06-81.94-.18-3.26,0-4.71.58-4.67,4.32q.28,27.22,0,54.45c0,3.68,1.31,4.38,4.64,4.34C87.24,223.33,101.06,223.43,114.89,223.43Z"
                />
              </g>
            </g>
          </svg>
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
          {isAuth && (
            <span>
              PEDENTES
              <span>{pendingTasks}</span>
            </span>
          )}
        </div>
        <div className="body-tasks">
          {isAuth
            ? tasks.map((value: ITasks) => {
                return (
                  <details key={value._id}>
                    <summary id={`${value.completed && 'completed'}`}>
                      <div>
                        <p>{value.title}</p>
                        <div>
                          <button onClick={() => handleButtonIsCompleted(value._id)} type="button">
                            {value.completed ? taskStatusIcon.completed : taskStatusIcon.pending}
                          </button>
                          <button id="btn-edit" onClick={() => handleButtonOpenDialogEdit(value)} type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 376.87 376.89">
                              <defs>
                                <style>.cls-1{'fill:#040404;'}</style>
                              </defs>
                              <title>Ativo 5</title>
                              <g id="Camada_2" data-name="Camada 2">
                                <g id="Camada_1-2" data-name="Camada 1">
                                  <path
                                    className="cls-1"
                                    d="M188.56,376.73c-72.44,2.54-146.11-44.49-174.83-116.51A193,193,0,0,1,.34,176.64,187.89,187.89,0,0,1,191.56,0a189.52,189.52,0,0,1,89.72,24.16c7.27,4,9.71,10,6.56,15.93-3.22,6.13-9.75,7.57-17.24,3.43a174.32,174.32,0,0,0-57.19-19.94,156.8,156.8,0,0,0-70.14,4.59C96.75,42,61.5,70.14,39.49,113.58-12,215.16,52,337.68,164.49,353.64c91.5,13,176.21-50.36,189-141.25,5.37-38.15-1.85-73.83-20.69-107.29-3.05-5.42-1.32-11.18,4.48-14.47s11.49-2.09,14.45,3.22a192.86,192.86,0,0,1,24.73,94c.29,34.85-7.79,67.16-25.57,96.66-33.51,55.56-83.27,86-147.84,92.21C198.26,377.13,193.39,376.73,188.56,376.73Z"
                                  />
                                  <path
                                    className="cls-1"
                                    d="M166.93,207a3.86,3.86,0,0,1,.1-.49c4.89-15.71,9.71-31.45,14.77-47.11.57-1.76,2.35-3.19,3.75-4.6q65.7-65.73,131.37-131.49c2.31-2.31,3.51-2.92,6.12-.22,10.89,11.24,22,22.26,33.18,33.24,2.08,2,2.42,3.08.11,5.38Q290,127.84,223.79,194.16a17.12,17.12,0,0,1-7.09,4.48c-14,4.3-27.95,8.65-41.95,12.9C170,213,166.83,211,166.93,207ZM337.42,58.9c-4.73-4.6-9.54-8.95-13.93-13.69-2.53-2.72-3.92-3-6.75-.11-35.19,35.42-70.3,70.93-106,105.83-10,9.74-17.79,20-20.26,33.85a30.59,30.59,0,0,1-1.71,4.79,9.87,9.87,0,0,0,2.5,0c12.69-3.46,25.55-6.59,33.85-18.28,1.42-2,3.49-3.56,5.25-5.33Z"
                                  />
                                  <path
                                    className="cls-1"
                                    d="M345.7,2.31c12.93.12,30.79,17.75,31.16,29.76.22,7.26-3.18,12.69-8.29,17.41-1.32,1.21-2,1.08-3.19-.1Q347.6,31.5,329.72,13.73c-1.25-1.24-1.18-1.94,0-3.18C334.32,5.63,339.53,2.07,345.7,2.31Z"
                                  />
                                </g>
                              </g>
                            </svg>
                          </button>
                          <button type="button" onClick={() => handleButtonDelete(value._id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 376.39 376.07">
                              <defs>
                                <style>
                                  .cls-1{'fill:#ab0404;'}.cls-2{'fill:#ab0505;'}
                                </style>
                              </defs>
                              <title>Ativo 4</title>
                              <g id="Camada_2" data-name="Camada 2">
                                <g id="Camada_1-2" data-name="Camada 1">
                                  <path
                                    className="cls-1"
                                    d="M185.78.24c76.35-2.65,154.8,46.65,180,126.61,23.93,76,7.41,143.27-49.92,199.09C285.54,355.46,248,371.2,206,375.17A187.59,187.59,0,0,1,98.13,353.54c-3.65-1.94-6.94-4.14-7.86-8.44s.09-8,3.47-10.82a10.6,10.6,0,0,1,12.11-1.6c6.44,3.06,12.73,6.42,19.36,9.15C217,379.53,322,327.94,348.46,232.06c26.78-97.18-38.28-195.65-138.25-209.21C119,10.47,34.64,74.77,23.05,166.24c-6.61,52.24,8.71,97.83,44.6,136.4,6.7,7.2,7.62,13.66,2.33,18.64S58.53,325,51.88,318.1C21.25,286.14,4.18,247.8.66,204c-7-87.23,42.1-159.71,114.43-189.86C138.33,4.43,162.48-1.26,185.78.24Z"
                                  />
                                  <path
                                    className="cls-2"
                                    d="M129,121.44c4.2,0,7.07,2.44,9.83,5.21,15.14,15.18,30.39,30.24,45.41,45.55,2.85,2.9,4.41,3.07,7.34.07,14.77-15.08,29.77-29.93,44.7-44.85a36.07,36.07,0,0,1,4-3.7A10.57,10.57,0,0,1,254.79,125a10.75,10.75,0,0,1,.5,14.52,44.79,44.79,0,0,1-3.43,3.6C236.94,158,222.1,173,207,187.79c-3.06,3-2.74,4.5.12,7.3,15,14.66,29.7,29.54,44.51,44.34a44.17,44.17,0,0,1,3.75,4,10.84,10.84,0,0,1-1,14.89c-4.18,3.91-9.84,4.08-14.5.35a39.42,39.42,0,0,1-3.24-3.09c-15.06-15-30.17-30-45.11-45.16-2.61-2.65-4.06-3.09-6.94-.15-15.24,15.56-30.74,30.85-46.11,46.27-2.93,2.94-6.14,5.22-10.5,4.72A11,11,0,0,1,120.19,244a37.79,37.79,0,0,1,4.36-4.78c14.92-14.92,29.81-29.89,44.86-44.69,2.52-2.47,2.36-3.82-.08-6.22-15.72-15.54-31.27-31.25-46.92-46.86C119,138,117,134.24,118.6,129.32A11.25,11.25,0,0,1,129,121.44Z"
                                  />
                                </g>
                              </g>
                            </svg>
                          </button>
                        </div>
                      </div>
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
                      <div>
                        <p>{value.title}</p>
                        <div>
                          <button onClick={() => handleButtonIsCompleted(value.id)} type="button">
                            {value.completed ? taskStatusIcon.completed : taskStatusIcon.pending}
                          </button>
                          <button type="button" onClick={() => handleButtonDelete(value.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 376.39 376.07">
                              <defs>
                                <style>
                                  .cls-1{'fill:#ab0404;'}.cls-2{'fill:#ab0505;'}
                                </style>
                              </defs>
                              <title>Ativo 4</title>
                              <g id="Camada_2" data-name="Camada 2">
                                <g id="Camada_1-2" data-name="Camada 1">
                                  <path
                                    className="cls-1"
                                    d="M185.78.24c76.35-2.65,154.8,46.65,180,126.61,23.93,76,7.41,143.27-49.92,199.09C285.54,355.46,248,371.2,206,375.17A187.59,187.59,0,0,1,98.13,353.54c-3.65-1.94-6.94-4.14-7.86-8.44s.09-8,3.47-10.82a10.6,10.6,0,0,1,12.11-1.6c6.44,3.06,12.73,6.42,19.36,9.15C217,379.53,322,327.94,348.46,232.06c26.78-97.18-38.28-195.65-138.25-209.21C119,10.47,34.64,74.77,23.05,166.24c-6.61,52.24,8.71,97.83,44.6,136.4,6.7,7.2,7.62,13.66,2.33,18.64S58.53,325,51.88,318.1C21.25,286.14,4.18,247.8.66,204c-7-87.23,42.1-159.71,114.43-189.86C138.33,4.43,162.48-1.26,185.78.24Z"
                                  />
                                  <path
                                    className="cls-2"
                                    d="M129,121.44c4.2,0,7.07,2.44,9.83,5.21,15.14,15.18,30.39,30.24,45.41,45.55,2.85,2.9,4.41,3.07,7.34.07,14.77-15.08,29.77-29.93,44.7-44.85a36.07,36.07,0,0,1,4-3.7A10.57,10.57,0,0,1,254.79,125a10.75,10.75,0,0,1,.5,14.52,44.79,44.79,0,0,1-3.43,3.6C236.94,158,222.1,173,207,187.79c-3.06,3-2.74,4.5.12,7.3,15,14.66,29.7,29.54,44.51,44.34a44.17,44.17,0,0,1,3.75,4,10.84,10.84,0,0,1-1,14.89c-4.18,3.91-9.84,4.08-14.5.35a39.42,39.42,0,0,1-3.24-3.09c-15.06-15-30.17-30-45.11-45.16-2.61-2.65-4.06-3.09-6.94-.15-15.24,15.56-30.74,30.85-46.11,46.27-2.93,2.94-6.14,5.22-10.5,4.72A11,11,0,0,1,120.19,244a37.79,37.79,0,0,1,4.36-4.78c14.92-14.92,29.81-29.89,44.86-44.69,2.52-2.47,2.36-3.82-.08-6.22-15.72-15.54-31.27-31.25-46.92-46.86C119,138,117,134.24,118.6,129.32A11.25,11.25,0,0,1,129,121.44Z"
                                  />
                                </g>
                              </g>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </summary>
                    <div className="description-tasks">
                      <p>{value.description}</p>
                    </div>
                  </details>
                );
              })}
        </div>
        <DialogEdit dialog={dialogEdit} />
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
