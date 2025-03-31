import {RiMastodonLine} from "react-icons/ri";

const Tasks = ({data, fetchApi, next, back}) => {
  console.log(data);
  const changeStatus = async (id, status) => {
    const res = await fetch("/api/todos", {
      method: "PATCH",
      body: JSON.stringify({id, status}),
      headers: {"Content-Type": "application/json"},
    });
    const data = await res.json()
    if(data.status === 'success') fetchApi()
  };
  return (
    <div className='tasks'>
      {data?.map((i) => (
        <div key={i._id} className='tasks__card'>
          <span className={i.status}></span>
          <RiMastodonLine />
          <h4>{i.title}</h4>
          <div>
            {back && (
              <button
                className='button-back'
                onClick={() => changeStatus(i._id, back)}>
                Back
              </button>
            )}
            {next && (
              <button
                className='button-next'
                onClick={() => changeStatus(i._id, next)}>
                Next
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tasks;
