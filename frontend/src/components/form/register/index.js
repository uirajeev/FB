import './style.scss';
import { ErrorMessage, useField } from 'formik';
import { useMediaQuery } from 'react-responsive';

const RegisterInut = ({ placeholder, type, handleChange, setValue = () => {}, ...props }) => {
  const [fields, meta] = useField(props.name);

  const updateValue = (e) => {
    props.formik.handleChange(e)
    setValue(e.target.value);
  }

  const desktopView = useMediaQuery({
    query: '(min-width: 1024px)',
  });

  return (
    <div className="register-input">
      <input
        className={meta.touched && meta.error ? 'input-error' : ''}
        type={type}
        name={fields.name}
        placeholder={placeholder}
        onChange={updateValue}
        onBlur={props.formik.handleBlur}
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
