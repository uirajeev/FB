const Shortcut = ({ name, url, img }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="left-home-shortcut-item"
    >
      <img src={`../../../images/${img}`} alt={name} />
      {name}
    </a>
  );
};

export default Shortcut;
