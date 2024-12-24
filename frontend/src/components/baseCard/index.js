import './style.scss';

const BaseCard = ({children, cssClass}) => {
    return (
        <div className={`base-card ${cssClass}`}>
            {children}
        </div>
    );
};

export default BaseCard;