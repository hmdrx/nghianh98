import React, { useState } from 'react';

import { CircularProgress, Stack } from '@mui/material';
import parse from 'html-react-parser';

import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import URL from '../../../constant/URL';
import useHttp from '../../../hooks/use-http';
import isObjectDiffer from '../../../utils/checkObject';

type TCurrentField = 'question' | 'correctAns' | 'options' | number;
export interface IQuestion {
  question: string;
  correctAns: string;
  options: any[];
  _id: string;
}
interface IEditor {
  question: IQuestion;
  onUpdateQuestion: (question: IQuestion) => void;
  modalHandler: () => void;
}

const Editor = ({ question, onUpdateQuestion, modalHandler }: IEditor) => {
  //   const editor = useRef(null);
  const { fetchData, loading } = useHttp();
  const [content, setContent] = useState<IQuestion>({ ...question });
  const [currentField, setCurrentField] = useState<TCurrentField>();

  // const objectsDiffer = (obj1: any, obj2: any): boolean => {
  //   const keys1 = Object.keys(obj1);
  //   const keys2 = Object.keys(obj2);

  //   if (keys1.length !== keys2.length) {
  //     return true; // Different number of properties
  //   }

  //   for (const key of keys1) {
  //     if (obj1[key] !== obj2[key]) {
  //       return true; // Different property value
  //     }
  //   }

  //   return false; // Objects are the same
  // };

  const textChangeHandler = (field: TCurrentField, text: string) => {
    if (field === 'question') {
      setContent(prev => {
        return { ...prev, question: text };
      });
    } else if (field === 'correctAns') {
      setContent(prev => {
        return { ...prev, correctAns: text };
      });
    } else {
      setContent(prev => {
        const updatedOptions = prev.options.map((option, index) => {
          if (index === field) {
            return text;
          }
          return option;
        });
        return { ...prev, options: updatedOptions };
      });
    }
  };

  const updateHandler = async () => {
    if (isObjectDiffer(question, content)) {
      window.alert('no difference');
      return;
    }
    try {
      const res = await fetchData(
        `${URL.BASE_URL}/question/${content._id}`,
        'PATCH',
        {
          headers: {
            Authorization: `Bearer ${URL.TOKEN}`,
          },
        }
      );

      if (res.status === 200) {
        onUpdateQuestion(content);
        modalHandler();
      }
    } catch (error: any) {
      window.alert(error.message);
    }
  };

  const customOptions = {
    buttonList: [
      [
        'bold',
        'italic',
        'underline',
        'superscript',
        'subscript',
        'removeFormat',
        'codeView',
      ],
    ],
  };

  return (
    <Stack gap={2} sx={{ height: '100%' }}>
      <Stack sx={{ flex: 1, overflow: 'auto' }}>
        <h1 className=" p-2 bg-blue-200 text-sm">Question</h1>

        {!(currentField === 'question') && (
          <div
            onClick={() => {
              setCurrentField('question');
            }}
            className=" hover:bg-blue-50 hover:cursor-pointer"
          >
            <p className=" min-h-[8rem] border p-2">
              {parse(content.question)}
            </p>
          </div>
        )}
        <SunEditor
          hide={!(currentField === 'question')}
          setOptions={customOptions}
          onClick={() => {
            setCurrentField('question');
          }}
          onBlur={() => {
            setCurrentField(undefined);
          }}
          setContents={content.question}
          onChange={textChangeHandler.bind(this, 'question')}
        />
        <h1 className=" p-2 mt-4 bg-blue-200 text-sm">Correct Answer</h1>
        {!(currentField === 'correctAns') && (
          <div
            onClick={() => {
              setCurrentField('correctAns');
            }}
            className=" hover:bg-blue-50 hover:cursor-pointer"
          >
            <p className=" min-h-[2rem] border p-2">
              {parse(content.correctAns)}
            </p>
          </div>
        )}
        <SunEditor
          setOptions={customOptions}
          onClick={() => {
            setCurrentField('correctAns');
          }}
          onBlur={() => {
            setCurrentField(undefined);
          }}
          hide={!(currentField === 'correctAns')}
          setContents={content.correctAns}
          onChange={textChangeHandler.bind(this, 'correctAns')}
        />
        <h1 className=" p-2 mt-4 bg-blue-200 text-sm">Other Options</h1>
        {content.options.map((el: any, index) => (
          <div>
            {!(currentField === index) && (
              <div
                onClick={() => {
                  setCurrentField(index);
                }}
                className=" hover:bg-blue-50 hover:cursor-pointer"
              >
                <p className=" min-h-[2rem] border my-1 p-2">{parse(el)}</p>
              </div>
            )}

            <SunEditor
              setOptions={customOptions}
              onClick={() => {
                setCurrentField(index);
              }}
              onBlur={() => {
                setCurrentField(undefined);
              }}
              hide={!(currentField === index)}
              setContents={el}
              onChange={textChangeHandler.bind(this, index)}
            />
          </div>
        ))}
      </Stack>
      <button
        onClick={updateHandler}
        disabled={loading}
        className=" text-white disabled:bg-slate-300 hover:text-blue-900 bg-blue-900 p-2 hover:bg-white hover:ring-2 rounded-sm"
      >
        {(loading && <CircularProgress size={24} color="secondary" />) ||
          ' Update'}
      </button>
    </Stack>
  );
};

export default Editor;
