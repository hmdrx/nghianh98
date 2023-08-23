import React from 'react';
import {
  AiOutlineHome,
  AiOutlineUsergroupDelete,
  AiOutlineQuestionCircle,
  AiOutlineRead,
  AiOutlineContainer,
} from 'react-icons/ai';
import { Outlet, Link, useLocation } from 'react-router-dom';

const menuList = [
  {
    fieldName: 'Home',
    fieldIcon: <AiOutlineHome className="mr-2" />,
    linkTo: '/',
  },
  {
    fieldName: 'Users',
    fieldIcon: <AiOutlineUsergroupDelete className="mr-2" />,
    linkTo: '/users',
  },
  {
    fieldName: 'Questions',
    fieldIcon: <AiOutlineQuestionCircle className="mr-2" />,
    linkTo: '/questions',
  },
  {
    fieldName: 'Subjects',
    fieldIcon: <AiOutlineRead className="mr-2" />,
    linkTo: '/subjects',
  },
  {
    fieldName: 'Feedback',
    fieldIcon: <AiOutlineContainer className="mr-2" />,
    linkTo: '/feedback',
  },
];

const Layout = () => {
  const pathname = useLocation().pathname;
  return (
    <div className="flex container mx-auto h-screen ">
      <div className="w-1/6 shadow-lg p-2 bg-blue-950">
        <div className="  border-b-2 border-white p-2 mb-2">
          <h1 className=" text-lg text-white ">Crishika Panel</h1>
        </div>
        {menuList.map(el => (
          <Link to={el.linkTo}>
            <div className="flex p-2 hover:cursor-pointer hover:bg-slate-500 items-center text-white">
              {el.fieldIcon}
              <h2>{el.fieldName}</h2>
            </div>
          </Link>
        ))}
      </div>
      <div className=" flex flex-col flex-1 bg-green-50 ">
        <div className=" border-b-2 p-3 ">
          <h1 className=" text-lg  ">
            {(() => {
              switch (pathname) {
                case '/':
                  return 'Home';
                case '/users':
                  return 'User Management';
                case '/questions':
                  return 'Question Management';
                case '/subjects':
                  return 'Subject Management';
                case '/feedback':
                  return 'Feedback';
                default:
                  return 'Other';
              }
            })()}
          </h1>
        </div>
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
