import { createContext, Dispatch, LegacyRef, ReactNode, RefObject, useEffect, useId, useRef, useState } from 'react';
import Menu from '../components/Menu';
import Footer from '../components/Footer';
import { destroyCookie, parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../components/Loader';

interface IContext {
  fetchDataUser?: () => Promise<void>;
  handleButtonAdd?: VoidFunction;
  handleCloseDialog?: VoidFunction;
  handleTasksTemporary?: any;
  tasksTemporary?: object;
  setTasksTemporary?: any;
  dialog?: RefObject<HTMLHeadingElement>;
  inputTitleTask?: LegacyRef<HTMLInputElement>;
  inputDescriptionTask?: LegacyRef<HTMLInputElement>;
  isActiveDialog?: boolean;
  setIsActiveDialog?: any;
  isAuth?: boolean;
  setIsAuth?: any;
  handleTasks?: any;
  tasks?: any;
  fetchTasks?: any;
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
  const inputDescriptionTask = useRef<any>(null);

  const [user, setUser] = useState<object | null>(null);

  const [isAuth, setIsAuth] = useState<boolean>(false);

  async function fetchDataUser() {
    const { token }: any = parseCookies();

    if (token) {
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
    fetchTasks();
  }

  const [tasks, setTasks] = useState();

  async function fetchTasks() {
    const { token }: any = parseCookies();

    if (token) {
      try {
        const getTasks = await axios.get('/api/tasks', {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setTasks(getTasks.data)
      } catch (error: any) {
        destroyCookie(undefined, 'token');
        toast.error(error.response.data.msg, {
          theme: 'colored',
        });
        console.log(error);
      }
    }
  }

  async function handleTasks() {
    const { token }: any = parseCookies();

    if (token) {
      try {
        const createTasks = await axios.post('api/tasks', {
          [inputTitleTask.current.name]: inputTitleTask.current.value,
          [inputDescriptionTask.current.name]: inputDescriptionTask.current.value,
        },{
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        console.log(createTasks);
        fetchTasks();
      } catch (error: any) {
        destroyCookie(undefined, 'token');
        toast.error(error.response.data.msg, {
          theme: 'colored',
        });
        console.log(error);
      }
    }

    handleCloseDialog();
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
    inputDescriptionTask.current.value = '';
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
      [inputDescriptionTask.current.name]: inputDescriptionTask.current.value,
      id: number,
      completed: false,
    });

    setTasksTemporary((prevData) => [...prevData, task]);

    console.log(task);

    handleCloseDialog();
  }

  const [isActiveLoading, setIsActiveLoading] = useState<boolean>(true);
  const [isVisiblePage, setIsVisibleP] = useState<boolean>(false);

  useEffect(() => {
    setIsVisibleP(true);
  });

  function handlePageLoaded() {
    setTimeout(() => {
      setIsActiveLoading(false);
    }, 2000);
  }

  return (
    <>
      {isActiveLoading && <Loader />}
      {isVisiblePage && (
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
            inputDescriptionTask,
            isAuth,
            setIsAuth,
            fetchDataUser,
            handleTasks,
            tasks,
            fetchTasks
          }}
        >
          <Menu />
          <section onLoad={handlePageLoaded}>{children}</section>
          <Footer />
          <ToastContainer />
        </Context.Provider>
      )}
    </>
  );
}
