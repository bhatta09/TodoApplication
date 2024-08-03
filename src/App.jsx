import  { useState } from 'react';
import './App.css';
import TodoForm from './components/todo_form';
import TodosForm from './components/todos_form';


function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

const [isDialogTaskOpen, setIsDialogTaskOpen] = useState(false);
  
  const handleAddTaskClick = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleViewTask =()=>{
    setIsDialogTaskOpen(true);
  }
  const handleViewTaskCloseDialog =()=>{
    setIsDialogTaskOpen(false);
  }

  return (
    <div>
      <div className='my-7'>
        
        <h1 className='text-4xl font-bold'>Welcome to Todo Application</h1>
        <h1 className='text-3xl font-bold underline'>What you want to do?</h1>
      </div>
      <div className='flex items-center justify-center gap-5'>
        <button 
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          onClick={handleAddTaskClick}
        >
          Add Task
        </button>
        <button  onClick={handleViewTask}
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          View Tasks
        </button>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg relative flex">
            <button 
              className="absolute top-4 right-4 text-red-500 font-bold"
              onClick={handleCloseDialog}
            >
              X
            </button>
            <TodosForm/>
          </div>
        </div>
      )}
      {isDialogTaskOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 w-full">
          <div className="bg-white p-8 rounded shadow-lg relative flex">
            <button 
              className="absolute top-4 right-4 text-red-500 font-bold"
              onClick={handleViewTaskCloseDialog}
            >
              X
            </button>
            <TodoForm/>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default App;
