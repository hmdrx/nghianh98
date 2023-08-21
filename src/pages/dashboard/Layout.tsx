import React from 'react';
import { AiOutlineHome } from 'react-icons/ai';

const Layout = () => {
  return (
    <div className="bg-green-100 flex container mx-auto h-screen">
      <div className="w-1/6 shadow-lg p-2">
        {['Home', 'Users', 'Questions', 'Subjects', 'Feedback'].map(el => (
          <div className="flex shadow-sm p-2 hover:cursor-pointer rounded-sm items-center">
            <AiOutlineHome />
            <h3>{el}</h3>
          </div>
        ))}
      </div>
      <div className="flex-1">2</div>
    </div>
  );
};

export default Layout;
