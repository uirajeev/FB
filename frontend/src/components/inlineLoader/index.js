import { PulseLoader } from 'react-spinners';
import useCssRootColor from '../../hooks/useCssRootColor';
import './style.scss';

const InlineLoader = ({ error, loading, style }) => {
  return (
    <div className={`loader__errors ${style ? style : ''}`}>
      {error && <p className='error-text'>{error}</p>}
      <PulseLoader color={useCssRootColor('--blue-color')} loading={loading} />
    </div>
  );
};

export default InlineLoader;