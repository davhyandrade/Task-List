import type { NextPage } from 'next';
import { createGlobalStyle } from 'styled-components';
import Tasks from '../components/Tasks';
import HomeTasks from '../components/HomeTasks';
import InfoField from '../components/InfoField';
import { useGlobalContext } from '@/context/layout';

interface IProps {
  quantTasks: number;
  isActiveDialog: boolean | undefined;
  isAuth: boolean | undefined;
}

const GlobalStyles = createGlobalStyle<IProps>`    
  ${(props) =>
    props.quantTasks > 0 &&
    `body {
        background-color: var(--bg-panel-secondary);
      }`}
  ${(props) =>
    props.isActiveDialog &&
    `body {
        overflow: hidden;
      }`}
  ${(props) =>
    props.isAuth &&
    `.section-tasks .add-tasks {
        height: 180px;
      }
      
      .home-tasks > h1 {
        font-size: 3.6rem;
      }
      
      body #__next section .section-tasks {
        height: 780px;
      }
    `}
`;

const Home: NextPage = () => {
  const { isActiveDialog, tasksTemporary, isAuth, tasks } = useGlobalContext();

  const quantTasks = tasks?.length;

  var isQuantTasks: number;

  if (isAuth) {
    isQuantTasks = quantTasks;
  } else {
    isQuantTasks = tasksTemporary.length - 1;
  }

  return (
    <>
      <GlobalStyles quantTasks={isQuantTasks} isActiveDialog={isActiveDialog} isAuth={isAuth} />
      {isQuantTasks > 0 ? <Tasks /> : <HomeTasks />}
      <InfoField />
    </>
  );
};

export default Home;
