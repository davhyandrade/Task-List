import type { NextPage } from 'next';
import axios from 'axios';
import { createGlobalStyle } from 'styled-components';
import Tasks from '../components/Tasks';
import HomeTasks from '../components/HomeTasks';

export async function getStaticProps() {
  let data;
  let maxTasks = 0;

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
      background: #f7f9fa;
    }`}
`;

const Home: NextPage = ({ data, maxTasks }: any) => {
  return (
    <>
      <GlobalStyles maxTasks={maxTasks} />
      {maxTasks > 0 ? <Tasks data={data} /> : <HomeTasks />}
      <div className="field-info">
        <div className="position">
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere,
            magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna. Nunc
            viverra imperdiet enim. Fusce est. Vivamus a tellus. Pellentesque habitant morbi tristique senectus et netus
            et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci. Aenean nec lorem. In
            porttitor. Donec laoreet nonummy augue. Suspendisse dui purus, scelerisque at, vulputate vitae, pretium
            mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
