import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import EmojiPicker from '../emojiPicker';
import './style.scss';
const ImagePreview = ({
  text,
  user,
  images,
  setImages,
  setText,
  setShowPreview,
  setError,
}) => {
  const imageInput = useRef(null);
  const { t } = useTranslation();

  const handleImage = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((img) => {
      if (
        img.type !== 'image/jpeg' &&
        img.type !== 'image/jpg' &&
        img.type !== 'image/png' &&
        img.type !== 'image/gif' &&
        img.type !== 'image/webp'
      ) {
        setError(
          `${img.name} format is unsupported! Only use jpg, jpeg, png, gif, webp`
        );
        return;
      } else if (img.size > 1024 * 1024) {
        setError(`${img.name} size is too large max 5mb allowed.`);
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (readEvent) => {
        setImages((images) => [...images, readEvent.target.result]);
      };
    });
  };

  return (
    <>
      <div className='image-preview'>
        <EmojiPicker text={text} user={user} setText={setText} type2={true} />
      </div>
      <div className='image-preview__add'>
        <input
          type='file'
          accept='image/jpeg,image/png,image/gif,image/webp,image/jpg'
          multiple
          hidden
          ref={imageInput}
          onChange={handleImage}
        />
        {images && images.length ? (
          <div className='image-preview__action'>
            <div className='image-preview__action__buttons'>
              <button className='btn'>
                <i className='edit_icon' />
                {t('header.edit')}
              </button>
              <button
                type='button'
                className='btn'
                onClick={() => imageInput.current.click()}
              >
                <i className='addPhoto_icon' />
                {t('post.addPhotoVideo')}
              </button>
            </div>
            <div
              className='image-preview__addinside__cricle small-circle'
              onClick={() => setImages([])}
            >
              <i className='exit_icon' />
            </div>
            <div
              className={`preview-${images.length < 7 ? images.length : '6'} ${
                images.length % 2 && images.length > 6 ? 'odd-image' : ''
              } `}
            >
              {images.map((img) => (
                <img src={img} alt='' key={img} />
              ))}
            </div>
          </div>
        ) : (
          <div className='image-preview__addinside'>
            <div
              className='image-preview__addinside__cricle small-circle'
              onClick={() => setShowPreview(false)}
            >
              <i className='exit_icon' />
            </div>
            <div
              className='image-preview__col'
              onClick={() => imageInput.current.click()}
            >
              <div className='image-preview__col__circle small-circle'>
                <i className='addPhoto_icon' />
              </div>
              <span>{t('post.addPhotoVideo')}</span>
              <span>{t('post.dragDrop')}</span>
            </div>
          </div>
        )}
        <div className='image-preview__add__phone'>
          <div className='image-preview__add__phone__cricle small-circle'>
            <i className='phone_icon' />
          </div>
          <div className='image-preview__add__phone__text'>
            {t('post.addFromPhone')}
          </div>
          <button
            type='button'
            className='btn btn-gray image-preview__add__phone__btn'
          >
            {t('post.add')}
          </button>
        </div>
      </div>
    </>
  );
};

export default ImagePreview;
