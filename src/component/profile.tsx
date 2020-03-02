import React from "react";

interface ProfileProps {
  username: string;
  name: string;
}

const Profile: React.FC<ProfileProps> = ({ username, name }) => {
  return (
    <div data-testid={"profile"}>
      <b>{username}</b>&nbsp;
      <span>({name})</span>
    </div>
  );
};

export default Profile;
