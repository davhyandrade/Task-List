import { createContext, Dispatch, LegacyRef, ReactNode, RefObject, useEffect, useId, useRef, useState } from 'react';
import Menu from '../components/Menu';
import Footer from '../components/Footer';
import { destroyCookie, parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IContext {
  fetchDataUser?: () => Promise<void>;
  handleButtonAdd?: VoidFunction;
  handleCloseDialog?: VoidFunction;
  handleTasksTemporary?: any;
  tasksTemporary?: object;
  setTasksTemporary?: any;
  dialog?: RefObject<HTMLHeadingElement>;
  inputTitleTask?: LegacyRef<HTMLInputElement>;
  inputBodyTask?: LegacyRef<HTMLInputElement>;
  isActiveDialog?: boolean;
  setIsActiveDialog?: any;
  isAuth?: boolean;
  setIsAuth?: any;
  userId?: object | null;
  setUserId?: any;
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

  const [user, setUser] = useState<object | null>(null);
  const [userId, setUserId] = useState<any>({});

  const [isAuth, setIsAuth] = useState<boolean>(false);

  async function fetchDataUser() {
    const { token }: any = parseCookies();
    if (token) {
      setUserId(jwt.decode(token) as any);

      try {
        const requestUser = await axios.get(`/api/auth/user/${(jwt.decode(token) as any).id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setUser(requestUser);
        setIsAuth(true);
      } catch (error: any) {
        destroyCookie(undefined, 'token');
        toast.error(error.response.data.msg, {
          theme: 'colored',
        });
        console.log(error);
      }
    }
  }

  useEffect(() => {
    fetchDataUser();
  }, []);

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

    setTasksTemporary((prevData) => [...prevData, task]);

    console.log(task);

    handleCloseDialog();
  }

  return (
    <>
      <Context.Provider
        value={{
          handleButtonAdd,
          handleCloseDialog,
          dialog,
          isActiveDialog,
          setIsActiveDialog,
          handleTasksTemporary,
          tasksTemporary,
          setTasksTemporary,
          inputTitleTask,
          inputBodyTask,
          isAuth,
          setIsAuth,
          setUserId,
          userId,
          fetchDataUser,
        }}
      >
        <Menu />
        <section>{children}</section>
        <Footer />
        <ToastContainer />
      </Context.Provider>
    </>
  );
}
