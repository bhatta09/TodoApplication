import { useEffect, useState } from "react";
import TodoList from "./todo_list.jsx";
import EditBtn from "./editBtn";
import TodosForm from "./todos_form.jsx";

const TodoForm = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [status, setStatus] = useState("PROGRESS");
  const [data, setData] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/task/get');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result.sort((a, b) => a.taskId - b.taskId)); // Sort by taskId in ascending order
     
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
      setStatus('PROGRESS');
      const updatedData = await fetch('http://localhost:8080/api/task/get').then(res => res.json());
      setData(updatedData.sort((a, b) => a.taskId - b.taskId)); // Sort by taskId

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
      setData(data.filter(todo => todo.taskId !== id));

    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleEditClick = (todo) => {
    setCurrentTodo(todo);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setCurrentTodo(null);
  };

  const handleSaveDialog = async () => {
    try {
      const updatedData = await fetch('http://localhost:8080/api/task/get').then(res => res.json());
      setData(updatedData.sort((a, b) => a.taskId - b.taskId));
      handleCloseDialog();
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <div className="w-full">
     
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
              <tr key={todo.taskId}>
                <td>{todo.taskName}</td>
                <td>{todo.taskDesc}</td>
                <td>{todo.status}</td>
                <td className="flex justify-center gap-2">
                  <button onClick={() => handleEditClick(todo)}>
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
      {isDialogOpen && currentTodo && (
        <EditBtn
          todo={currentTodo}
          onClose={handleCloseDialog}
          onSave={handleSaveDialog}
        />
      )}
      <TodoList />
    </div>
  );
};

export default TodoForm;
