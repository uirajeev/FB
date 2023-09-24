import { useSelector } from 'react-redux';
import Header from '../../components/header';
import HomeLeft from './left';

const Home = () => {
  const { user } = useSelector((state) => ({ ...state }));

  return (
    <>
      <Header />
      <HomeLeft user={user} />
    </>
  );
};

export default Home;
