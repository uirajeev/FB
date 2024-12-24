import PropagateLoader from 'react-spinners/PropagateLoader';

export default function Activate({type, header, text, loading}) {
  return (
    <div className='blur'>
      <div className='popup'>
        <div className={`popup__header ${type === 'success' ? 'success-text' : 'error-text'}`}>
          <h2>{header}</h2>
        </div>
        <div className='popup__body'>
          <p>{text}</p>
        </div>
        <div className='popup__footer'>
          <PropagateLoader color='#1876f2' size={30} loading={loading} />
        </div>
      </div>
    </div>
  );
}