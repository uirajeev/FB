import { ArrowRight, Plus } from '../../../svg';
import { stories } from '../../../data/home';
import './style.scss';
import Story from './Story';

const Stories = () => {
  return (
    <div className="stories">
      <div className="create-story-card">
        <img
          src="../../../images/default_pic.png"
          alt=""
          className="create-story-card"
        />
        <div className="create-story-icon">
          <Plus color="#fff" />
        </div>
        <div className="create-story-text">Create Story</div>
      </div>
      {stories.map((story) => (
        <Story story={story} key={story.profile_name} />
      ))}
      <div className="white-circle">
        <ArrowRight color="#65676b" />
      </div>
    </div>
  );
};

export default Stories;
