import { useRef } from 'react';
import Header from '../../components/header';

const Home = () => {
  const el = useRef(null);

  return (
    <div>
      <Header />
    </div>
  );
};

export default Home;
