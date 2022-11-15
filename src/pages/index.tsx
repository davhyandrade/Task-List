import { useContext } from 'react';
import type { NextPage } from 'next';
import axios from 'axios';
import { createGlobalStyle } from 'styled-components';
import Tasks from '../components/Tasks';
import HomeTasks from '../components/HomeTasks';
import InfoField from '../components/InfoField';
import { Context } from '../context/layout';

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

      .section-tasks .field-tasks .body-tasks details summary input[type=image] {
        &:nth-child(1) {
          top: 50%;
          right: 110px;
        }
  
        &:nth-child(3) {
          top: 50%;
          right: 70px;
          opacity: 50%;
        }
      }
    `}
`;

const Home: NextPage = () => {
  const { isActiveDialog } = useContext(Context);
  const { tasksTemporary }: any = useContext(Context);
  const { isAuth } = useContext(Context);
  const { tasks } = useContext(Context);

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
