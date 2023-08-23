import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TablePagination } from '@mui/material';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get('http://localhost:6767/api/v1/user', {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YzQ4Y2Q5MGUxZDNhYzY3MGQ3NDg2YyIsImlhdCI6MTY5MjYxMzA1MywiZXhwIjoxNjkzMjE3ODUzfQ.c5tn6lVfD5hV41Aue6Gfzm4H9RAgqaC8ze_IM27IGvA`,
          },
        });
        if (res.status === 200) {
          const data = res.data.users.reverse().map((el: any, index: any) => {
            return {
              sr: index + 1,
              ...el,
            };
          });
          setUsers(data);
        }
      } catch (error: any) {
        window.alert(error.message);
      }
    };
    fetchQuestions();
  }, []);

  const displayedData = users.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  return (
    <div className="h-full flex flex-col ">
      <div className="px-3 ">
        <div className="flex bg-slate-200">
          <h1 className="flex-1 p-2">Name</h1>
          <h1 className=" w-1/5 border-s-2 p-2">Mobile</h1>
          <div className=" w-1/3 flex ">
            <h1 className="border-s-2 flex-1 p-2">Email</h1>
          </div>
        </div>
      </div>
      <div className="px-3 flex-1 overflow-auto ">
        {displayedData.map((el: any) => {
          return (
            <div className=" flex border  text-sm hover:bg-slate-100 cursor-pointer">
              <h1 className="p-2">{el.sr}</h1>
              <h1 className="flex-1 p-2">{el.name}</h1>
              <h1 className=" w-1/5 border-s-2 p-2">{el.mobile}</h1>
              <div className=" w-1/3 flex ">{el.email || '-'}</div>
            </div>
          );
        })}
      </div>
      <div className="bg-slate-300">
        <TablePagination
          component="div"
          count={users.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};

export default Users;
