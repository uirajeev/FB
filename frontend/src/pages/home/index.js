import { useSelector } from 'react-redux';
import Header from '../../components/header';
import HomeLeft from './left';
import HomeRight from './right';
import Stories from './stories';
import CreatePost from '../../components/createPost';

import './style.scss';

const Home = () => {
  
  const user = useSelector((state) => state.user);
  
  return (
    <div className="home">
      <Header />
      <HomeLeft user={user} />
      <article className="home-middle">
        <Stories />
        <CreatePost user={user} />
      </article>
      <HomeRight user={user} />
    </div>
  );
};

export default Home;
