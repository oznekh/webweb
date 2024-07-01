import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState({});

  useEffect(() => {
    if (window.Telegram) {
      window.Telegram.WebApp.ready();
    }
  }, []);

  const handleAddTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { text: task, id: Date.now() }]);
      setTask('');
    }
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleEditTask = (task) => {
    setIsEditing(true);
    setCurrentTask(task);
    setTask(task.text);
  };

  const handleUpdateTask = () => {
    const updatedTasks = tasks.map((t) =>
        t.id === currentTask.id ? { ...t, text: task } : t
    );
    setTasks(updatedTasks);
    setIsEditing(false);
    setTask('');
    setCurrentTask({});
  };

  return (
      <div className="App">
        <h1>ToDo List for Telegram</h1>
        <div className="task-form">
          <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Enter your task"
          />
          <button onClick={isEditing ? handleUpdateTask : handleAddTask}>
            {isEditing ? 'Update Task' : 'Add Task'}
          </button>
        </div>
        <ul className="task-list">
          {tasks.map((task) => (
              <li key={task.id}>
                {task.text}
                <button onClick={() => handleEditTask(task)}>Edit</button>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              </li>
          ))}
        </ul>
      </div>
  );
}

export default App;
