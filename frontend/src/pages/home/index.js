import { useSelector } from 'react-redux';
import Header from '../../components/header';
import HomeLeft from './left';
import HomeRight from './right';
import Stories from './stories';
import CreatePost from '../../components/createPost';
import BaseCard from '../../components/baseCard';
import SandVerificationEmail from '../../components/sendVerificationEmail';

import './style.scss';

const Home = () => {
  
  const user = useSelector((state) => state.user);
  
  return (
    <div className="home">
      <Header />
      <HomeLeft user={user} />
      <article className="home-middle">
        <Stories />
        {
          user.verified ? null : <BaseCard cssClass="cr-post">
            <SandVerificationEmail user={user} />
          </BaseCard>
        }
        <BaseCard cssClass="cr-post">
          <CreatePost user={user} />
        </BaseCard>
      </article>
      <HomeRight user={user} />
    </div>
  );
};

export default Home;
