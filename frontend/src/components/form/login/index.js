import './style.scss';
import { ErrorMessage, useField } from 'formik';

const LoginInut = ({placeholder, type, ...props}) => {
    const [fields, meta] = useField(props.name);

    return <div className='login-input'>
        <div>
            {
                meta.touched && meta.error && <ErrorMessage name={fields.name} />
            }
        </div>
        <input
            className={meta.touched && meta.error && 'input-error'}
            type={type}
            name={fields.name}
            placeholder={placeholder} {...fields} />
        {meta.touched && meta.error && <i className="error_icon"></i> }
    </div>
};

export default LoginInut;