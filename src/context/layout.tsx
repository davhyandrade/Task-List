import {
  createContext,
  Dispatch,
  LegacyRef,
  ReactNode,
  RefObject,
  SetStateAction,
  useContext,
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

interface ITasks {
  _id: string;
  title: string;
  description: string;
  user: string;
  completed: boolean;
  createAt: Date;
}

interface IEditModal {
  title: string;
  description: string;
  _id: number;
}

interface ITasksTemporary {
  id: number;
  completed: boolean;
}

interface IContext {
  fetchDataUser: () => Promise<void>;
  handleButtonAdd: VoidFunction;
  handleButtonOpenEditModal: (value: IEditModal) => void;
  handleCloseDialog: VoidFunction;
  handleTasksTemporary: () => void;
  tasksTemporary: ITasksTemporary[];
  setTasksTemporary: Dispatch<SetStateAction<ITasksTemporary[]>>;
  dialog: RefObject<HTMLDialogElement>;
  editModal: RefObject<HTMLDialogElement>;
  inputTitleTask: LegacyRef<HTMLInputElement>;
  inputDescriptionTask: LegacyRef<HTMLInputElement>;
  inputTitleTaskEdit: LegacyRef<HTMLInputElement>;
  inputDescriptionTaskEdit: LegacyRef<HTMLInputElement>;
  isActiveDialog: boolean;
  setIsActiveDialog: Dispatch<SetStateAction<boolean>>;
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
  handleTasks: VoidFunction;
  tasks: ITasks[];
  fetchTasks: () => Promise<void>;
  handleUpdateTask: VoidFunction;
  setIsActiveLoading: Dispatch<SetStateAction<boolean>>;
}

export const GlobalContext = createContext<IContext | undefined>(undefined);

export function useGlobalContext(): IContext {
  const globalContext = useContext(GlobalContext);

  if (!globalContext) {
    throw new Error("GlobalContext must be used within a ContextProvider")
  }

  return globalContext;
}

type ComponentProps = {
  children: ReactNode;
};

export default function Layout({ children }: ComponentProps) {
  const [isActiveDialog, setIsActiveDialog] = useState<boolean>(false);
  const [tasksTemporary, setTasksTemporary] = useState<ITasksTemporary[]>([]);
  const dialog = useRef<HTMLDialogElement>(null);
  const editModal = useRef<HTMLDialogElement>(null);
  const inputTitleTask = useRef<HTMLInputElement>(null);
  const inputDescriptionTask = useRef<HTMLInputElement>(null);

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
        setUser(requestUser.data);
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

  const [tasks, setTasks] = useState<ITasks[]>([]);

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
            [inputTitleTask.current?.name || '']: inputTitleTask.current?.value || '',
            [inputDescriptionTask.current?.name || '']: inputDescriptionTask.current?.value || '',
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
    dialog.current?.showModal();
    setIsActiveDialog(true);
  }

  const inputDescriptionTaskEdit = useRef<HTMLInputElement>(null);
  const inputTitleTaskEdit = useRef<HTMLInputElement>(null);
  const [idTasksUpdate, setIdTaskUpdate] = useState<number | undefined>();

  function handleButtonOpenEditModal(value: IEditModal) {
    window.scrollTo(0, 0);
    inputTitleTaskEdit.current!.value = value.title;
    inputDescriptionTaskEdit.current!.value = value.description;
    setIdTaskUpdate(value._id);
    editModal.current?.showModal();
    setIsActiveDialog(true);
  }

  async function handleUpdateTask() {
    const { token }: any = parseCookies();

    if (token && idTasksUpdate) {
      setIsActiveLoading(true);

      try {
        const updateTask = await axios.put(
          `api/tasks/${idTasksUpdate}`,
          {
            [inputTitleTaskEdit.current?.name || '']: inputTitleTaskEdit.current?.value || '',
            [inputDescriptionTaskEdit.current?.name || '']: inputDescriptionTaskEdit.current?.value || '',
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
    if (inputTitleTask.current) inputTitleTask.current.value = '';
    if (inputDescriptionTask.current) inputDescriptionTask.current.value = '';
    setIsActiveDialog(false);
    dialog.current?.close();
    editModal.current?.close();
  }

  const [formatDigit, setFormatDigit] = useState<number>(-1);

  function handleTasksTemporary() {
    const number = parseInt(Object.keys(tasksTemporary).toString().slice(formatDigit)) + 1;

    const quantCaracteres = tasksTemporary.length.toString().length;

    setFormatDigit(-quantCaracteres);

    const task = {
      [inputTitleTask.current?.name || '']: inputTitleTask.current?.value || '',
      [inputDescriptionTask.current?.name || '']: inputDescriptionTask.current?.value || '',
      id: number,
      completed: false,
    };

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
        <GlobalContext.Provider
          value={{
            handleButtonAdd,
            handleButtonOpenEditModal,
            handleCloseDialog,
            dialog,
            editModal,
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
        </GlobalContext.Provider>
      )}
    </>
  );
}
