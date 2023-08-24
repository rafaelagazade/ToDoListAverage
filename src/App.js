import { useState, useCallback, useEffect } from "react";
import "./tailwind.css";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import { IoIosArrowRoundBack } from "react-icons/io";
import { BsPencilSquare } from "react-icons/bs";

function App() {
  const [task, setTask] = useState("");
  const [result, setResult] = useState(null);
  const [icon, setIcon] = useState(false);
  const [trash, setTrash] = useState("");
  const [edit, setEdit] = useState(null);

  const localData = JSON.parse(window.localStorage.getItem("task"));

  useEffect(() => {
    window.localStorage.setItem("task", JSON.stringify(result));
  }, [result]);

  useEffect(() => {
    localData && setResult(localData);
  }, []);

  useEffect(() => {
    if (!localData || localData?.length === 0) {
      setTrash(false);
    } else {
      setTrash(true);
    }
  }, [localData]);

  const handleInput = (e) => {
    setTask(e.target.value);

    if (e.target.value.length > 0) {
      setIcon(true);
    } else if (e.target.value.length === 0) {
      setIcon(false);
    }
  };

  const deleteTask = (item) => {
    const filter = result.filter((result, index) => index !== item);
    setResult(filter);

    const numItems = result.length;

    if (numItems === 1) {
      setTrash(false);
    } else if (numItems > 1) {
      setTrash(true);
    }
  };

  const clearBtn = () => {
    setResult([]);
    setTrash(false);
  };

  const taskClick = () => {
    if (task) {
      if (!result) {
        setResult([{ text: task, border: random_bg_color() }]);
      } else {
        setResult((prev) => [
          { text: task, border: random_bg_color() },
          ...prev,
        ]);
      }
    }
    const numInput = task.length;
    if (numInput > 0) {
      setIcon(true);
    } else if (numInput === 0) {
      setIcon(false);
    }
    setTrash(true);
    // setTask("")
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13 && task) {
      if (!result) {
        setResult([{ text: task, border: random_bg_color() }]);
      } else {
        setResult((prev) => [
          { text: task, border: random_bg_color() },
          ...prev,
        ]);
      }
      const numInput = task.length;
      if (numInput > 0) {
        setIcon(true);
      } else if (numInput === 0) {
        setIcon(false);
      }
      setTrash(true);
      // setTask("")
    }
  };

  const changeTask = (c, m) => {
    setEdit({ ...c, index: m });
  };

  const editChange = (e) => {
    const val = e.target.value;
    setEdit((prev) => ({ ...prev, text: val }));
  };

  const backBtn = (r) => {
    const save = result.map((item, index) => {
      if (r === index) {
        item = edit;
      }
      return item;
    });
    setResult(save);
    setEdit(null);
  };

  const random_bg_color = useCallback(() => {
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    return "rgb(" + x + "," + y + "," + z + ")";
  }, [result]);

  return (
    <div className="App h-screen bg-slate-950 flex justify-center items-start">
      <div className="h-auto w-full flex flex-col items-center justify-center">
        <h1 className="text-slate-100 mb-10 font-medium text-2xl mt-20">
          To Do List
        </h1>
        <div className=" h-12 w-96 bg bg-slate-800 flex items-center  justify-between gap-4 p-4 rounded-lg">
          <input
            className="w-3/4 bg-transparent outline-none text-white
            border-r-slate-600 border-2 border-transparent"
            placeholder="What is the task for today"
            onChange={handleInput}
            onKeyUp={handleKeyUp}
            value={task}
          />
          <div className="flex w-1/4 justify-between items-center">
            {!icon ? (
              <button className="pointer-events-none">
                <AiOutlinePlusCircle
                  color="white"
                  size="1.5rem"
                  onClick={taskClick}
                />
              </button>
            ) : (
              <button>
                <AiFillPlusCircle
                  color="white"
                  size="1.5rem"
                  onClick={taskClick}
                />
              </button>
            )}
            {!trash ? (
              <button className="pointer-events-none">
                <AiOutlineDelete
                  color="white"
                  size="1.5rem"
                  onClick={clearBtn}
                />
              </button>
            ) : (
              <button>
                <AiFillDelete color="white" size="1.5rem" onClick={clearBtn} />
              </button>
            )}
          </div>
        </div>
        <div className="h-96 w-2/6 mt-16 ml-4 flex flex-col gap-2 overflow-y-scroll overflow-x-hidden scrollbar scrollbar-track-transparent scrollbar-thumb-slate-800 pr-2 scrollbar-thumb-rounded-lg ">
          {result?.map((item, index) => (
            <div
              key={index}
              className={`h-10  rounded-lg bg-slate-800 flex items-center justify-between shrink-0 border-l-4 border-[${item?.border}]" `}
              style={{ borderColor: item.border }}
            >
              <div className="text-white font-medium flex items-center justify-center h-full w-8 rounded-lg bg-slate-600">
                {result?.length - index}
              </div>

              {edit?.index !== index ? (
                <div className="text-white font-normal w-3/5 h-full flex items-center overflow-hidden border-r-slate-600 border-2 rounded-lg border-transparent">
                  {item?.text}
                </div>
              ) : (
                <input
                  className="bg-slate-700 w-3/5 outline-none text-white pl-2 rounded-md border-r-2"
                  value={edit.text}
                  onChange={editChange}
                />
              )}
              <div className="flex justify-between  items-center w-1/5">
                {edit?.index !== index ? (
                  <button>
                    <BsPencilSquare
                      color="white"
                      size="1.4rem"
                      className="mr-4"
                      onClick={() => changeTask(item, index)}
                    />
                  </button>
                ) : (
                  <button>
                    <IoIosArrowRoundBack
                      color="white"
                      size="1.4rem"
                      className="mr-4"
                      onClick={() => backBtn(index)}
                    />
                  </button>
                )}
                <button>
                  <TiDelete
                    color="white"
                    size="1.9rem"
                    className="mr-2.5"
                    onClick={() => deleteTask(index)}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
