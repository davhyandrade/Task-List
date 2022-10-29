export default function Tasks({ data }: any) {
  interface ITasks {
    id: number;
    title: string;
    body: string;
  }

  return (
    <section className="section-tasks">
      <div className="add-tasks">
        <button translate="no">
          <img className="img-button-add" src="https://i.postimg.cc/jqQj5YtX/vector-add.png" alt="Vetor Adicionar" />
          Adicionar Task
        </button>
        <p>
          Clique para adicionar suas <span>tarefas</span>
        </p>
      </div>
      <div className="field-tasks">
        <div className="header-tasks"></div>
        <div className="body-tasks">
          {data.map((value: ITasks) => {
            return (
              <details key={value.id}>
                <summary>{value.title}</summary>
                <div className="description-tasks">
                  <p>{value.body}</p>
                </div>
              </details>
            );
          })}
        </div>
      </div>
<p>Não se esqueça de logar na sua conta para salvar as suas task. Eles serão descartados assim que a página for recarregada caso não esteja logado.</p>
    </section>
  );
}
