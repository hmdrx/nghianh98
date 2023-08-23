import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TablePagination } from '@mui/material';

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
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
        const res = await axios.get('http://localhost:6767/api/v1/subject', {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YzQ4Y2Q5MGUxZDNhYzY3MGQ3NDg2YyIsImlhdCI6MTY5MjYxMzA1MywiZXhwIjoxNjkzMjE3ODUzfQ.c5tn6lVfD5hV41Aue6Gfzm4H9RAgqaC8ze_IM27IGvA`,
          },
        });
        if (res.status === 200) {
          const data = res.data.subjects
            .reverse()
            .map((el: any, index: any) => {
              return {
                sr: index + 1,
                ...el,
              };
            });
          setSubjects(data);
        }
      } catch (error: any) {
        window.alert(error.message);
      }
    };
    fetchQuestions();
  }, []);

  const displayedData = subjects.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  return (
    <div className="h-full flex flex-col ">
      <div className="px-3 ">
        <div className="flex bg-slate-200">
          <h1 className="flex-1 p-2">Subject</h1>
          <h1 className=" w-1/5 border-s-2 p-2">Code</h1>
          <div className=" w-1/3 flex ">
            <h1 className="border-s-2 flex-1 p-2">Image</h1>
          </div>
        </div>
      </div>
      <div className="px-3 flex-1 overflow-auto ">
        {displayedData.map((el: any) => {
          return (
            <div className=" flex border  text-sm hover:bg-slate-100 cursor-pointer">
              <h1 className="p-2">{el.sr}</h1>
              <h1 className="flex-1 p-2">{el.subject}</h1>
              <h1 className=" w-1/5 border-s-2 p-2">{el.code}</h1>
              <div className=" w-1/3 flex h-16">
                <img
                  className=" h-12 my-auto"
                  src={el.image}
                  alt={`${el.subject}_image`}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="bg-slate-300">
        <TablePagination
          component="div"
          count={subjects.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};

export default Subjects;
