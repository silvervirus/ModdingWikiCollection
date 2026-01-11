import React from 'react';
import Circles from '../Circles/Circles';
import { User } from '../Data/UserData';

interface CircleProps {
  users: User[];
}

const Circles: React.FC<CircleProps> = ({ users }) => {
  return (
    <div className="circle-container">
      {users.map((user, index) => (
        <div key={index} className="circle">
          <a href={`./${user.username}.html`}>
            <img src={user.avatar} alt={user.username} />
            <p>{user.username}</p>
          </a>
        </div>
      ))}
    </div>
  );
};

export default Circles;

