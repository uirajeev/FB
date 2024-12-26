import { PulseLoader } from 'react-spinners';
import './style.scss';

const InlineLoader = ({ error, loading, style }) => {
  return (
    <div className={`loader__errors ${style ? style : ''}`}>
      {error && <p className='error-text'>{error}</p>}
      <PulseLoader color='#1876f2' loading={loading} />
    </div>
  );
};

export default InlineLoader;