import React, {useState} from "react";
import {BsAlignStart} from "react-icons/bs";
import {GrAddCircle} from "react-icons/gr";
import RadioButton from "../elements/RadioButton";
import {FiSettings} from "react-icons/fi";
import {AiOutlineFileSearch} from "react-icons/ai";
import {MdDoneAll} from "react-icons/md";


import { ToastContainer, toast } from 'react-toastify';

const AddTodosPage = () => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("todo");

  const clickHandler = async () => {
    const res = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({status, title}),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (data.status === "success") {
      setTitle("");
      setStatus("todo");
      toast("Todo added")
    }
  };

  return (
    <div className='add-form'>
      <h2>
        <GrAddCircle />
        Add New Todo
      </h2>

      <div className='add-form_input'>
        <div className='add-form__input--first'>
          <label htmlFor='title'>Title:</label>
          <input
            id='title'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='add-form__input--second'>
          {/* <div className='todo'>
            <labal htmlFor='todo'>
              <BsAlignStart />
              Todo
            </labal>
            <input
              type='radio'
              id='todo'
              value='todo'
              chacked={status === "todo"}
              onChange={(e) => setStatus(e.target.value)}
            />
          </div> */}

          <RadioButton
            title={"Todo"}
            value={"todo"}
            status={status}
            setStatus={setStatus}>
            <BsAlignStart />
          </RadioButton>

          <RadioButton
            title={"In progress"}
            value={"inProgress"}
            status={status}
            setStatus={setStatus}>
            <FiSettings />
          </RadioButton>

          <RadioButton
            title={"Review"}
            value={"review"}
            status={status}
            setStatus={setStatus}>
            <AiOutlineFileSearch />
          </RadioButton>

          <RadioButton
            title={"Done"}
            value={"done"}
            status={status}
            setStatus={setStatus}>
            <MdDoneAll />
          </RadioButton>
        </div>
        <button onClick={clickHandler}>Add</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddTodosPage;
