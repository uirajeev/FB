import { useTranslation } from 'react-i18next';

import { Feeling, LiveVideo, Photo } from '../../svg';
import './style.scss';

const CreatePost = ({ user }) => {
  const { t } = useTranslation();
  return (
    <div className="creat-post">
      <div className="creat-post-header">
        <img src={user.picture} alt="" />
        <div className="open-post hover2">
          {t('post.inYourMing')} {user?.first_name}
        </div>
      </div>
      <hr className="splitter" />
      <div className="creat-post-body">
        <div className="creat-post-icon hover1">
          <LiveVideo color="#f3425f" />
          {t('post.liveVideo')}
        </div>
        <div className="creat-post-icon hover1">
          <Photo color="#4bbf67" />
          {t('post.photo')}
        </div>
        <div className="creat-post-icon hover1">
          <Feeling color="#f7b928" />
          {t('post.feeling')}
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
