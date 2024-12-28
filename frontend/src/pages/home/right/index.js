import { Dots, NewRoom, Search } from '../../../svg';
import useCssRootColor from '../../../hooks/useCssRootColor';
import Contact from './Contact';
import './style.scss';

const HomeRight = ({ user }) => {
  const iconColor = useCssRootColor('--color-secondary');
  return (
    <aside className="right-home">
      <div className="right-heading">Sponsored</div>
      <hr className="splitter" />
      <div className="right-contacts-wrap">
        <div className="right-contacts-header">
          <div className="right-contacts-header-left">Contacts</div>
          <div className="right-contacts-header-right">
            <div className="right-contacts-circle hover1">
              <NewRoom color={iconColor} />
            </div>
            <div className="right-contacts-circle hover1">
              <Search color={iconColor} />
            </div>
            <div className="right-contacts-circle hover1">
              <Dots color={iconColor} />
            </div>
          </div>
        </div>
        <div className="right-contacts-list">
          <Contact user={user} />
        </div>
      </div>
    </aside>
  );
};

export default HomeRight;
