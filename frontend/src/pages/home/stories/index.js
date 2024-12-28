import { useMediaQuery } from 'react-responsive';
import useCssRootColor from '../../../hooks/useCssRootColor';
import { ArrowRight, Plus } from '../../../svg';
import { stories } from '../../../data/home';
import './style.scss';
import Story from './Story';

const Stories = () => {
  const query1175 = useMediaQuery({
    query: '(max-width: 1175px)',
  });

  const query1030 = useMediaQuery({
    query: '(max-width: 1030px)',
  });

  const query980 = useMediaQuery({
    query: '(max-width: 980px)',
  });

  const query885 = useMediaQuery({
    query: '(max-width: 885px)',
  });
  const max = query885
    ? 5
    : query980
    ? 4
    : query1030
    ? 5
    : query1175
    ? 4
    : stories.length;
  return (
    <div className="stories">
      <div className="create-story-card">
        <img
          src="../../../images/default_pic.png"
          alt=""
          className="create-story-card"
        />
        <div className="create-story-icon">
          <Plus color={useCssRootColor('--bg-primary')} />
        </div>
        <div className="create-story-text">Create Story</div>
      </div>
      {stories.slice(0, max).map((story) => (
        <Story story={story} key={story.profile_name} />
      ))}
      <div className="white-circle">
        <ArrowRight color={useCssRootColor('--color-secondary')} />
      </div>
    </div>
  );
};

export default Stories;
