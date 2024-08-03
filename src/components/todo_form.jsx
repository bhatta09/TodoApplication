import { useEffect, useState } from "react";

const TodoForm = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [status, setStatus] = useState("inProgress");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/task/get');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
        console.log(result);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const todo = {
      taskName: title,
      taskDesc: desc,
      status: status,
    };

    try {
      const response = await fetch('http://localhost:8080/api/task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      });

      if (!response.ok) {
        throw new Error('Failed to post todo');
      }

      console.log('Todo added:', todo);
      setTitle('');
      setDesc('');
      setStatus('inProgress');
      // Optionally refetch data or update state here
      const updatedData = await fetch('http://localhost:8080/api/task/get').then(res => res.json());
      setData(updatedData);

    } catch (error) {
      console.error('Post error:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/task/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }

      console.log('Todo deleted:', id);
      // Update the data state to reflect the deletion
      setData(data.filter(todo => todo.taskId !== id));

    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="mx-8 flex flex-col gap-12">
      <div className="w-full max-w-xs ml-[400px]">
        <form onSubmit={handleSubmit} className="bg-[#f5f5f5] shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Title"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <input
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Description"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="PROGRESS">In Progress</option>
              <option value="COMPLETE">Complete</option>
              <option value="INCOMPLETE">InComplete</option>
              
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Add
            </button>
          </div>
        </form>
      </div>

      <div className="flex flex-col">
        <h1 className="text-3xl font-semibold mb-3">Todo list</h1>
        <table className="table-fixed bg-slate-300 text-xl font-semibold rounded-lg p-2">
          <thead>
            <tr className="text-red-500">
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? data.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.taskName}</td>
                <td>{todo.taskDesc}</td>
                <td>{todo.status}</td>
                <td className="flex justify-center gap-2">
                  <button>
                    <img src="https://img.icons8.com/?size=100&id=12082&format=png&color=000000" className="w-6" alt="edit" />
                  </button>
                  <button onClick={() => handleDelete(todo.taskId)}>
                    <img src="https://img.icons8.com/?size=100&id=99933&format=png&color=000000 " className="w-5" alt="delete" />
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4">No todos found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoForm;
