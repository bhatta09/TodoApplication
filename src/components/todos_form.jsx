import React, { useState, useEffect } from 'react';

const TodosForm = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [status, setStatus] = useState('PROGRESS');
  const [data, setData] = useState([]);

  // Fetch data on component mount
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

  // Handle form submission
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

      // Update the todo list
      const updatedData = await fetch('http://localhost:8080/api/task/get').then(res => res.json());
      setData(updatedData.sort((a, b) => a.taskId - b.taskId)); // Sort by taskId in ascending order

    } catch (error) {
      console.error('Post error:', error);
    }
  };

  return (
    <div>
      <div className="w-full max-w-xs ml-[400px]">
        <form onSubmit={handleSubmit} className="bg-[#f5f5f5] shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Title"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <input
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Description"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="PROGRESS">In Progress</option>
              <option value="COMPLETE">Complete</option>
              <option value="INCOMPLETE">Incomplete</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit">
              Add
            </button>
          </div>
        </form>
      </div>


    </div>
  );
};

export default TodosForm;
