const Story = ({ story }) => {
  return (
    <div className="story">
      <img src={story.image} alt="" className="story-image" />
      <div className="story-profile-pic">
        <img src={story.profile_picture} alt="" />
      </div>
      <div className="story-profile-name">{story.profile_name}</div>
    </div>
  );
};

export default Story;
