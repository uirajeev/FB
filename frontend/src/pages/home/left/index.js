import LeftLink from './LeftLink';
import { left } from '../../../data/home';

import './style.scss';
import { Link } from 'react-router-dom';

const HomeLeft = ({ user }) => {
  return (
    <aside className="left-home">
      <Link to="/profile" className="left-home-link hover1">
        <img src={user?.picture} alt="User" />
        <span>
          {user.first_name} {user.last_name}
        </span>
      </Link>
      {left.slice(0, 8).map(({ img, text, notification }) => (
        <LeftLink img={img} text={text} notification={notification} />
      ))}
    </aside>
  );
};

export default HomeLeft;
