import {useEffect, useState} from "react";
import Tasks from "../modules/Tasks";

const HomePage = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();
    // console.log(data.todo.sortedData);
    if (data.status === "success") return setTodos(data.todo.sortedData);
  };

  console.log(todos && todos);
  return (
    <div className='home-page'>
      <div className='home-page--todo'>
        <p>Todo</p>
        <Tasks
          data={todos.todo}
          fetchApi={fetchApi}
          next={"inProgress"}
          back={""}
        />
      </div>
      <div className='home-page--inProgress'>
        <p>In Progress</p>
        <Tasks
          data={todos.inProgress}
          fetchApi={fetchApi}
          next={"review"}
          back={"todo"}
        />
      </div>
      <div className='home-page--review'>
        <p>Review</p>
        <Tasks
          data={todos.review}
          fetchApi={fetchApi}
          next={"done"}
          back={"inProgress"}
        />
      </div>
      <div className='home-page--done'>
        <p>Done</p>
        <Tasks data={todos.done} fetchApi={fetchApi} back={"review"} />
      </div>
    </div>
  );
};

export default HomePage;
