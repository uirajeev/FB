import { useTranslation } from 'react-i18next';
import useCssRootColor from '../../hooks/useCssRootColor';
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
          <LiveVideo color={useCssRootColor('--raspberry-red')} />
          {t('post.liveVideo')}
        </div>
        <div className="creat-post-icon hover1">
          <Photo color={useCssRootColor('--green-color-dark-2')} />
          {t('post.photo')}
        </div>
        <div className="creat-post-icon hover1">
          <Feeling color={useCssRootColor('--yellow-gold')} />
          {t('post.feeling')}
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
