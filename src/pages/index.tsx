import type { NextPage } from 'next';
import axios from 'axios';
import { createGlobalStyle } from 'styled-components';
import Tasks from '../components/Tasks';
import HomeTasks from '../components/HomeTasks';
import InfoField from '../components/InfoField';

export async function getStaticProps() {
  let data;
  let maxTasks = 5;

  await axios
    .get(`https://jsonplaceholder.typicode.com/posts/?_limit=${maxTasks}`)
    .then((response) => (data = response.data));

  return {
    props: {
      data,
      maxTasks,
    },
  };
}

interface IProps {
  maxTasks: number;
}

const GlobalStyles = createGlobalStyle<IProps>`    
  ${(props) =>
    props.maxTasks > 0 &&
    `body {
      background-color: var(--bg-panel-secondary);
    }`}
`;

const Home: NextPage = ({ data, maxTasks }: any) => {
  return (
    <>
      <GlobalStyles maxTasks={maxTasks} />
      {maxTasks > 0 ? <Tasks data={data} /> : <HomeTasks />}
      <InfoField/>
    </>
  );
};

export default Home;
