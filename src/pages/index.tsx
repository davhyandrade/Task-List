import { useContext } from 'react';
import type { NextPage } from 'next';
import axios from 'axios';
import { createGlobalStyle } from 'styled-components';
import Tasks from '../components/Tasks';
import HomeTasks from '../components/HomeTasks';
import InfoField from '../components/InfoField';
import { Context } from '../context/layout';

export async function getStaticProps() {
  let data;

  let quantTasks = 0;

  await axios
    .get(`https://jsonplaceholder.typicode.com/posts/?_limit=${quantTasks}`)
    .then((response) => (data = response.data));

  return {
    props: {
      data,
      quantTasks,
    },
  };
}

interface IProps {
  quantTasks: number;
  isActiveDialog: boolean | undefined;
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
`;

const Home: NextPage = ({ data, quantTasks }: any) => {
  const { isActiveDialog } = useContext(Context);
  const { tasksTemporary }: any = useContext(Context);
  const { isAuth } = useContext(Context);

  var isQuantTasks: number;

  if(isAuth) {
    isQuantTasks = quantTasks;
  } else {
    isQuantTasks = tasksTemporary.length - 1;
  }
  return (
    <>
      <GlobalStyles quantTasks={isQuantTasks} isActiveDialog={isActiveDialog} />
      {isQuantTasks > 0 ? <Tasks data={data} /> : <HomeTasks />}
      <InfoField />
    </>
  );
};

export default Home;
