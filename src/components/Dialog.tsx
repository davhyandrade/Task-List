import { FormEvent, useContext } from 'react';
import { Context } from '../context/layout';

export default function Dialog({ dialog }: any) {
  const { handleCloseDialog } = useContext(Context);
  const { handleTasksTemporary } = useContext(Context);
  const { inputDescriptionTask } = useContext(Context);
  const { inputTitleTask } = useContext(Context);

  function handleForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  const { isAuth } = useContext(Context);
  const { handleTasks } = useContext(Context);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    handleForm(event);
    if (isAuth) {
      handleTasks();
    } else {
      handleTasksTemporary();
    }
  }

  const { setIsActiveDialog } = useContext(Context);

  function handleKeyPressDialog(event: any) {
    if (event.key === 'Escape') {
      setIsActiveDialog(false);
    }
  }

  return (
    <dialog onKeyDown={handleKeyPressDialog} ref={dialog}>
      <div className="position">
        <form onSubmit={handleSubmit}>
          <h1>Adicionar Tarefas</h1>
          <div>
            <input ref={inputTitleTask} name="title" id="title-task" type="text" placeholder="titulo" required />
            <label htmlFor="title-task">Título</label>
          </div>
          <div>
            <input
              ref={inputDescriptionTask}
              name="description"
              id="description-task"
              type="text"
              placeholder="descricao"
              required
            />
            <label htmlFor="description-task">Descrição</label>
          </div>
          <input type="submit" value="Criar Tarefa" />
          <button onClick={handleCloseDialog} id="close-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 209.68 210.63">
              <defs>
                <style>.cls-1{'fill:#9b0202;'}</style>
              </defs>
              <title>Ativo 3</title>
              <g id="Camada_2" data-name="Camada 2">
                <g id="Camada_1-2" data-name="Camada 1">
                  <path
                    className="cls-1"
                    d="M.26,181.75c-.28-8.87,3-15.42,8.45-20.94,17.4-17.47,34.79-34.95,52.34-52.26,2.69-2.65,3-4,.11-6.88Q35,75.93,9.16,49.78C-2.13,38.34-3,22,6.69,10.51,17.94-2.75,36.33-3.56,49,9q26.16,25.78,51.9,52c3,3,4.45,3.36,7.65.09q25.86-26.43,52.27-52.32c11.6-11.4,28.08-11.56,39.56-.85C212.33,19,212.9,37,201.21,48.92c-17.35,17.75-35,35.23-52.63,52.67-2.69,2.65-3,4-.1,6.88,17.81,17.52,35.55,35.13,53,53a28.33,28.33,0,0,1-6.67,44.77c-12.52,7-22.37,5.94-34-5-18-17-35.31-34.88-52.75-52.55-2.56-2.59-3.81-2.83-6.52-.08-16.69,17-33.68,33.69-50.41,50.65-5.81,5.89-12.52,10.62-20.64,11-11.83.56-21.09-5.08-27-15.48C1.06,190.51-.42,185.91.26,181.75Z"
                  />
                </g>
              </g>
            </svg>
          </button>
        </form>
      </div>
    </dialog>
  );
}
