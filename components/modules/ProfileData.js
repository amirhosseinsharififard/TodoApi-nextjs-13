import React from "react";

const ProfileData = ({data}) => {
  return (
    <div>
      <div>
        <label>Name :</label>
        <p>{data.name}</p>
      </div>
      <div>
        <label>Last Name :</label>
        <p>{data.lastName}</p>
      </div>
      <div>
        <label>Email :</label>
        <p>{data.email}</p>
      </div>
    </div>
  );
};

export default ProfileData;
