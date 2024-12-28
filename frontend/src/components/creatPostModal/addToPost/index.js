import { Dots, Feeling, Photo } from '../../../svg';
import useCssRootColor from '../../../hooks/useCssRootColor';
import './style.scss';
const AddToPost = ({setShowPreview}) => {
  return (
    <div className='addtopost'>
      <div className='addtopost__title'>Add to your post</div>
      <div className='addtopost__icon hover1' onClick={() => setShowPreview(true)}>
        <Photo color={useCssRootColor('--green-color-dark')} />
      </div>
      <div className='addtopost__icon hover1'>
        <i className='tag_icon' />
      </div>
      <div className='addtopost__icon hover1'>
        <Feeling color={useCssRootColor('--yellow-gold')} />
      </div>
      <div className='addtopost__icon hover1'>
        <i className='maps_icon' />
      </div>
      <div className='addtopost__icon hover1'>
        <i className='microphone_icon' />
      </div>
      <div className='addtopost__icon hover1'>
        <Dots color={useCssRootColor('--color-secondary')} />
      </div>
    </div>
  );
};

export default AddToPost;
