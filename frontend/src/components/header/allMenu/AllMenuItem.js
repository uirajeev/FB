const AllMenuItem = ({ name, icon, description }) => {
  return (
    <div className="all-menu-item hover1">
      <img src={`../../left/${icon}.png`} alt="Socal" />
      <div className="all-menu-item-col">
        <span>{name}</span>
        <span>{description}</span>
      </div>
    </div>
  );
};

export default AllMenuItem;
