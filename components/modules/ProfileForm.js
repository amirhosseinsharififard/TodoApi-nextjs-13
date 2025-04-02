import React from "react";

const ProfileForm = ({
  name,
  lastName,
  password,
  setName,
  setLastName,
  setPassword,
  submitHandler,
  
}) => {
  return (
    <>
      <div className='profile-form__input'>
        <div>
          <label htmlFor='name'>Name:</label>
          <input
            id='name'
            type='text'
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div>
          <label htmlFor='last-name'>Last Name:</label>
          <input
            id='last-name'
            type='text'
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            id='password'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button onClick={submitHandler}> submit</button>
      </div>
    </>
  );
};

export default ProfileForm;
