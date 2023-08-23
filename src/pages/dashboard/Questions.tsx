import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import axios from 'axios';
import { TablePagination, Modal, Stack } from '@mui/material';
import Editor from './compo/Editor';
interface IQuestion {
  question: string;
  correctAns: string;
  options: any[];
  _id: string;
}

const Questions = () => {
  const [ques, setQues] = useState<IQuestion[]>([]);
  const [que, setQue] = useState<IQuestion>();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = (id: string) => {
    setOpenModal(true);
    const que = ques.find((el: any) => {
      return el._id === id;
    });
    setQue(que);
  };
  const handleClose = () => setOpenModal(false);

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
        const res = await axios.get('http://localhost:6767/api/v1/question', {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YzQ4Y2Q5MGUxZDNhYzY3MGQ3NDg2YyIsImlhdCI6MTY5MjYxMzA1MywiZXhwIjoxNjkzMjE3ODUzfQ.c5tn6lVfD5hV41Aue6Gfzm4H9RAgqaC8ze_IM27IGvA`,
          },
        });
        if (res.status === 200) {
          const data = res.data.questions
            .reverse()
            .map((el: any, index: any) => {
              return {
                sr: index + 1,
                ...el,
              };
            });
          setQues(data);
        }
      } catch (error: any) {
        window.alert(error.message);
      }
    };
    fetchQuestions();
  }, []);

  const displayedData = ques.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const updateHandler = (question: IQuestion) => {
    setQues(prev => {
      const updatedQuestions = prev.map(el => {
        if (el._id === question._id) {
          return question;
        }
        return el;
      });
      return updatedQuestions;
    });
  };

  return (
    <div className="h-full flex flex-col ">
      <Modal open={openModal} onClose={handleClose}>
        <Stack
          bgcolor="white"
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60%',
            height: '80vh',
            bgcolor: 'background.paper',
            boxShadow: 24,
            px: 4,
            // overflow: 'auto',
          }}
          p={2}
        >
          <Editor
            question={que!}
            onUpdateQuestion={updateHandler}
            modalHandler={handleClose}
          />
        </Stack>
      </Modal>
      <div className="px-3 ">
        <div className="flex bg-slate-200">
          <h1 className="flex-1 p-2">Question</h1>
          <h1 className=" w-1/5 border-s-2 p-2">Correct Answer</h1>
          <div className=" w-1/3 flex ">
            <h1 className="border-s-2 flex-1 p-2">Other Options</h1>
          </div>
        </div>
      </div>
      <div className="px-3 flex-1 overflow-auto ">
        {displayedData.map((el: any) => {
          return (
            <div
              onClick={handleOpen.bind(this, el._id)}
              className=" flex border  text-sm hover:bg-slate-100 cursor-pointer"
            >
              <h1 className="p-2">{el.sr}</h1>
              <h1 className="flex-1 p-2">{parse(el.question)}</h1>
              <h1 className=" w-1/5 border-s-2 p-2">{parse(el.correctAns)}</h1>
              <div className=" w-1/3 flex ">
                {el.options.map((el: any) => (
                  <h1 className="border-s-2 flex-1 p-2">{parse(el)}</h1>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className="bg-slate-300">
        <TablePagination
          component="div"
          count={ques.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};

export default Questions;
