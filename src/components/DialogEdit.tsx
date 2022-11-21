import { FormEvent, useContext, useRef } from 'react';
import { Context } from '../context/layout';

export default function DialogEdit({ dialog }: any) {
  const { handleCloseDialog } = useContext(Context);
  const { handleUpdateTask } = useContext(Context);
  const { inputDescriptionTaskEdit } = useContext(Context);
  const { inputTitleTaskEdit } = useContext(Context);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleUpdateTask();
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
          <h1>Alterar Tarefa</h1>
          <div>
            <input ref={inputTitleTaskEdit} name="title" id="title-task" type="text" placeholder="titulo" required />
            <label htmlFor="title-task">Título</label>
          </div>
          <div>
            <input ref={inputDescriptionTaskEdit} name="description" id="description-task" type="text" placeholder="descricao" required />
            <label htmlFor="description-task">Descrição</label>
          </div>
          <input type="submit" value="Finalizar Alteração" />
          <img
            onClick={handleCloseDialog}
            id="btn-close"
            src="https://i.postimg.cc/prSVPYvN/btn-close.png"
            alt="button close"
          />
        </form>
      </div>
    </dialog>
  );
}
