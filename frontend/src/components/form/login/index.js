import './style.scss';
import { ErrorMessage, useField } from 'formik';
import { useMediaQuery } from 'react-responsive';

const LoginInut = ({ placeholder, type, bottom, ...props }) => {
  const [fields, meta] = useField(props.name);
  const desktopView = useMediaQuery({
    query: '(min-width: 850px)',
  });

  return (
    <div className="login-input">
      {meta.touched && meta.error && !bottom && (
        <div
          className={
            desktopView
              ? 'input-error-message input-error-desktop'
              : 'input-error-message'
          }
        >
          <ErrorMessage name={fields.name} />
          <div
            className={desktopView ? 'input-arrow-left' : 'input-arrow-top'}
          ></div>
        </div>
      )}
      <input
        className={meta.touched && meta.error ? 'input-error' : ''}
        type={type}
        name={fields.name}
        placeholder={placeholder}
        {...fields}
      />
      {meta.touched && meta.error && bottom && (
        <div
          className={
            desktopView
              ? 'input-error-message input-error-desktop'
              : 'input-error-message'
          }
        >
          <ErrorMessage name={fields.name} />
          <div
            className={desktopView ? 'input-arrow-left' : 'input-arrow-top'}
          ></div>
        </div>
      )}
      {meta.touched && meta.error && (
        <i
          className="error_icon"
          style={{ top: `${!bottom && !desktopView ? '63%' : '15px'}` }}
        ></i>
      )}
    </div>
  );
};

export default LoginInut;
