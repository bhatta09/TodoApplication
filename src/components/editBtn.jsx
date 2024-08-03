import React, { useState, useEffect } from 'react';

const EditBtn = ({ todo, onClose, onSave }) => {
  const [title, setTitle] = useState(todo ? todo.taskName : '');
  const [desc, setDesc] = useState(todo ? todo.taskDesc : '');
  const [status, setStatus] = useState(todo ? todo.status : 'PROGRESS');

  useEffect(() => {
    if (todo) {
      setTitle(todo.taskName);
      setDesc(todo.taskDesc);
      setStatus(todo.status);
    }
  }, [todo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedTodo = {
      taskName: title,
      taskDesc: desc,
      status: status,
    };

    try {
      const response = await fetch(`http://localhost:8080/api/task/${todo.taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      console.log('Todo updated:', updatedTodo);
      onSave(); 
      onClose();
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">Edit Todo</h2>
        <form onSubmit={handleSubmit}>
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
          <div className="flex justify-between">
            <button type="button" onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBtn;
