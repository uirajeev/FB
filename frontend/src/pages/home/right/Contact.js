const Contact = ({ user }) => {
  return (
    <div className="right-contacts-list-item hover1">
      <div className="right-contacts-list-img">
        <img src={user?.picture} alt="User" />
      </div>
      <span>
        {user.first_name} {user.last_name}
      </span>
    </div>
  );
};

export default Contact;
