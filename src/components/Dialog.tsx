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
            <input ref={inputDescriptionTask} name="description" id="description-task" type="text" placeholder="descricao" required />
            <label htmlFor="description-task">Descrição</label>
          </div>
          <input type="submit" value="Criar Tarefa" />
          <input
            onClick={handleCloseDialog}
            id="btn-close"
            type="image"
            src="https://i.postimg.cc/prSVPYvN/btn-close.png"
            alt="button close"
          />
        </form>
      </div>
    </dialog>
  );
}
