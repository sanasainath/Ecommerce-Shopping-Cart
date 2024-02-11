import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDisplay = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/users/sanasainath013@gmail.com');
        setUserData(response.data);
      } catch (error) {
        console.error('Error occurred:', error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div>
      {userData ? (
        <div>
          <p>User Email: {userData.email}</p>
          <p>User First Name: {userData.firstName}</p>
          <p>User Last Name: {userData.lastName}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserDisplay;
