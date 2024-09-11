import {
  createContext,
  Dispatch,
  LegacyRef,
  ReactNode,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react';
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
  handleButtonOpenDialogEdit?: any;
  handleCloseDialog?: VoidFunction;
  handleTasksTemporary?: any;
  tasksTemporary?: any;
  setTasksTemporary?: any;
  dialog?: RefObject<HTMLHeadingElement>;
  dialogEdit?: RefObject<HTMLHeadingElement>;
  inputTitleTask?: LegacyRef<HTMLInputElement>;
  inputDescriptionTask?: LegacyRef<HTMLInputElement>;
  inputTitleTaskEdit?: LegacyRef<HTMLInputElement>;
  inputDescriptionTaskEdit?: LegacyRef<HTMLInputElement>;
  isActiveDialog?: boolean;
  setIsActiveDialog?: any;
  isAuth?: boolean;
  setIsAuth?: any;
  handleTasks?: any;
  tasks?: any;
  fetchTasks?: any;
  handleUpdateTask?: any;
  setIsActiveLoading?: Dispatch<SetStateAction<boolean>>;
}

type ComponentProps = {
  children: ReactNode;
};

export const Context = createContext<IContext>({});

export default function Layout({ children }: ComponentProps) {
  const [isActiveDialog, setIsActiveDialog] = useState<boolean>(false);
  const [tasksTemporary, setTasksTemporary] = useState<Array<object>>([{}]);
  const dialog = useRef<any>(null);
  const dialogEdit = useRef<any>(null);
  const inputTitleTask = useRef<any>(null);
  const inputDescriptionTask = useRef<any>(null);

  const [user, setUser] = useState<object | null>(null);

  const [isAuth, setIsAuth] = useState<boolean>(false);

  async function fetchDataUser() {
    const { token }: any = parseCookies();

    if (token) {
      setIsActiveLoading(true);

      try {
        const requestUser = await axios.get(`/api/auth/user/${(jwt.decode(token) as any).id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setUser(requestUser);
        setIsAuth(true);
      } catch (error: any) {
        if (error.status === 400 || error.status === 401) destroyCookie(undefined, 'token');
        toast.error(error.response.data.msg, {
          theme: 'colored',
        });
        console.log(error);
      } finally {
        setIsActiveLoading(false);
      }

      fetchTasks();
    }
  }

  const [tasks, setTasks] = useState([]);

  async function fetchTasks() {
    const { token }: any = parseCookies();

    if (token) {
      setIsActiveLoading(true);

      try {
        const getTasks = await axios.get('/api/tasks', {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setTasks(getTasks.data);
      } catch (error: any) {
        if (error.status === 400 || error.status === 401) destroyCookie(undefined, 'token');
        toast.error(error.response.data.msg, {
          theme: 'colored',
        });
        console.log(error);
      } finally {
        setIsActiveLoading(false);
      }
    }
  }

  async function handleTasks() {
    const { token }: any = parseCookies();

    if (token) {
      setIsActiveLoading(true);

      try {
        const createTasks = await axios.post(
          'api/tasks',
          {
            [inputTitleTask.current.name]: inputTitleTask.current.value,
            [inputDescriptionTask.current.name]: inputDescriptionTask.current.value,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(createTasks);
        fetchTasks();
      } catch (error: any) {
        if (error.status === 400 || error.status === 401) destroyCookie(undefined, 'token');
        toast.error(error.response.data.msg, {
          theme: 'colored',
        });
        console.log(error);
      } finally {
        setIsActiveLoading(false);
      }
    }

    handleCloseDialog();
  }

  useEffect(() => {
    fetchDataUser();
  }, []);

  function handleButtonAdd() {
    window.scrollTo(0, 0);
    dialog.current.showModal();
    setIsActiveDialog(true);
  }

  const inputDescriptionTaskEdit = useRef<any>(null);
  const inputTitleTaskEdit = useRef<any>(null);
  const [idTasksUpdate, setIdTaskUpdate] = useState<number>();

  function handleButtonOpenDialogEdit(value: any) {
    window.scrollTo(0, 0);
    inputTitleTaskEdit.current.value = value.title;
    inputDescriptionTaskEdit.current.value = value.description;
    setIdTaskUpdate(value._id);
    dialogEdit.current.showModal();
    setIsActiveDialog(true);
  }

  async function handleUpdateTask() {
    const { token }: any = parseCookies();

    if (token) {
      setIsActiveLoading(true);

      try {
        const updateTask = await axios.put(
          `api/tasks/${idTasksUpdate}`,
          {
            [inputTitleTaskEdit.current.name]: inputTitleTaskEdit.current.value,
            [inputDescriptionTaskEdit.current.name]: inputDescriptionTaskEdit.current.value,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success(updateTask.data.msg, {
          theme: 'colored',
        });
        console.log(updateTask);
        fetchTasks();
      } catch (error: any) {
        if (error.status === 400 || error.status === 401) destroyCookie(undefined, 'token');
        toast.error(error.response.data.msg, {
          theme: 'colored',
        });
        console.log(error);
      } finally {
        setIsActiveLoading(false);
      }
    }

    handleCloseDialog();
  }

  function handleCloseDialog() {
    inputTitleTask.current.value = '';
    inputDescriptionTask.current.value = '';
    setIsActiveDialog(false);
    dialog.current.close();
    dialogEdit.current?.close();
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

  const [isPending, startTransition] = useTransition();

  const [isVisiblePage, setIsVisiblePage] = useState<boolean>(false);
  const [isActiveLoading, setIsActiveLoading] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisiblePage(true);
    }, 3000);
  }, []);

  useEffect(() => {
    if (!isVisiblePage) {
      setIsActiveLoading(true);
    } else {
      setIsActiveLoading(false);
    }
  }, [isVisiblePage]);

  useEffect(() => {
    if (isPending) {
      setIsActiveLoading(true);
    } else {
      setIsActiveLoading(false);
    }
  }, [isPending]);
  
  return (
    <>
      {isActiveLoading ? (
        <Loader />
      ) : (
        <Context.Provider
          value={{
            handleButtonAdd,
            handleButtonOpenDialogEdit,
            handleCloseDialog,
            dialog,
            dialogEdit,
            isActiveDialog,
            setIsActiveDialog,
            handleTasksTemporary,
            tasksTemporary,
            setTasksTemporary,
            inputTitleTask,
            inputDescriptionTask,
            inputTitleTaskEdit,
            inputDescriptionTaskEdit,
            isAuth,
            setIsAuth,
            fetchDataUser,
            handleTasks,
            tasks,
            fetchTasks,
            handleUpdateTask,
            setIsActiveLoading,
          }}
        >
          <Menu />
          <section>{children}</section>
          <Footer />
          <ToastContainer />
        </Context.Provider>
      )}
    </>
  );
}
