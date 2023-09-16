import { useRef } from 'react';
import useClickOutside from '../../helpers/ClickOutside';
import Header from '../../components/header';

const Home = () => {
  const el = useRef(null);
  useClickOutside(el, () => {
    el.current.style.display = 'none';
  });
  return (
    <div>
      <Header />
      <div className="card" ref={el}></div>
    </div>
  );
};

export default Home;
