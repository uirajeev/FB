import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import Header from '../../components/header';
import HomeLeft from './left';
import HomeRight from './right';
import Stories from './stories';
import CreatePost from '../../components/createPost';
import BaseCard from '../../components/baseCard';
import SandVerificationEmail from '../../components/sendVerificationEmail';
import Posts from '../../components/posts';

import './style.scss';

const Home = ({ setVisible }) => {
  const query885 = useMediaQuery({
    query: '(max-width: 885px)',
  });

  const query500 = useMediaQuery({
    query: '(max-width: 500px)',
  });

  const user = useSelector((state) => state.user);

  return (
    <div className='home'>
      <Header />
      {!query500 && <HomeLeft user={user} />}
      <article className='home-middle'>
        <Stories />
        {user.verified ? null : (
          <BaseCard cssClass='cr-post'>
            <SandVerificationEmail user={user} />
          </BaseCard>
        )}
        <BaseCard cssClass='cr-post'>
          <CreatePost user={user} setVisible={setVisible} />
        </BaseCard>
        <Posts user={user} />
      </article>
      {!query885 && (
        <div className='home-right'>
          <HomeRight user={user} />
        </div>
      )}
    </div>
  );
};

export default Home;
