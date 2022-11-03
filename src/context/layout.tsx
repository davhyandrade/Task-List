import { createContext, LegacyRef, ReactNode, RefObject, useRef, useState } from 'react';
import Menu from '../components/Menu';
import Footer from '../components/Footer';

interface IContext {
  handleButtonAdd?: VoidFunction;
  handleCloseDialog?: VoidFunction;
  handleTasksTemporary?: any;
  tasksTemporary?: object;
  setTasksTemporary?: any;
  dialog?: RefObject<HTMLHeadingElement>;
  inputTitleTask?: LegacyRef<HTMLInputElement>;
  inputBodyTask?: LegacyRef<HTMLInputElement>;
  isActiveDialog?: boolean;
  isAuth?: boolean;
}

type ComponentProps = {
  children: ReactNode;
};

export const Context = createContext<IContext>({});

export default function Layout({ children }: ComponentProps) {
  const [isActiveDialog, setIsActiveDialog] = useState<boolean>(false);
  const [tasksTemporary, setTasksTemporary] = useState<Array<object>>([{}]);
  const dialog = useRef<any>(null);
  const inputTitleTask = useRef<any>(null);
  const inputBodyTask = useRef<any>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  function handleButtonAdd() {
    dialog.current.showModal();
    setIsActiveDialog(true);
  }

  function handleCloseDialog() {
    inputTitleTask.current.value = '';
    inputBodyTask.current.value = '';
    setIsActiveDialog(false);
    dialog.current.close();
  }

  const [formatDigit, setFormatDigit] = useState<number>(-1);

  function handleTasksTemporary() {
    const number = parseInt(Object.keys(tasksTemporary).toString().slice(formatDigit)) + 1;

    const quantCaracteres = tasksTemporary.length.toString().length;

    setFormatDigit(-quantCaracteres);

    const task = new Object({
      [inputTitleTask.current.name]: inputTitleTask.current.value,
      [inputBodyTask.current.name]: inputBodyTask.current.value,
      id: number,
      isDone: false,
    });

    setTasksTemporary((prevData) => ([
      ...prevData,
      task,
    ]));

    console.log(task);
    
    handleCloseDialog();
  }

  return (
    <>
      <Menu />
      <Context.Provider
        value={{
          handleButtonAdd,
          handleCloseDialog,
          dialog,
          isActiveDialog,
          handleTasksTemporary,
          tasksTemporary,
          setTasksTemporary,
          inputTitleTask,
          inputBodyTask,
          isAuth
        }}
      >
        <section>{children}</section>
      </Context.Provider>
      <Footer />
    </>
  );
}
