import './style.scss';
import { ErrorMessage, useField } from 'formik';
import { useMediaQuery } from 'react-responsive';

const RegisterInut = ({ placeholder, type, ...props }) => {
  const [fields, meta] = useField(props.name);
  const desktopView = useMediaQuery({
    query: '(min-width: 924px)',
  });

  return (
    <div className="register-input">
      <input
        className={meta.touched && meta.error ? 'input-error' : ''}
        type={type}
        name={fields.name}
        placeholder={placeholder}
        {...fields}
      />
      {meta.touched && meta.error && (
        <div
          className={
            desktopView
              ? 'input-error-message input-error-desktop'
              : 'input-error-message'
          }
        >
          <ErrorMessage name={fields.name} />
          <div
            className={desktopView ? 'input-arrow-left' : 'input-arrow-bottom'}
          ></div>
        </div>
      )}
      {meta.touched && meta.error && <i className="error_icon"></i>}
    </div>
  );
};

export default RegisterInut;
