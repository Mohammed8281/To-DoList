import React, { useState, useEffect } from 'react';
import './App.css';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'; 
import { BsCheckLg } from 'react-icons/bs';

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [completedTodos, setCompletedTodos] = useState([]);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [currentEditedItem, setCurrentEditedItem] = useState(null);

  const handleAddTodo = () => {
    if (!newTitle || !newDescription) {
      alert('Title and Description are required!');
      return;
    }

    const newTodoItem = {
      title: newTitle,
      description: newDescription
    };

    const updatedTodoArr = [...allTodos, newTodoItem];
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
    setNewTitle('');
    setNewDescription('');
  };

  const handleDeleteTodo = (index) => {
    const reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);
    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  const handleDeleteCompletedTodo = (index) => {
    const reducedCompleted = [...completedTodos];
    reducedCompleted.splice(index, 1);
    localStorage.setItem('completedTodos', JSON.stringify(reducedCompleted));
    setCompletedTodos(reducedCompleted);
  };

  const handleComplete = (index) => {
    const now = new Date();
    const completedOn = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()} at ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    const filteredItem = {
      ...allTodos[index],
      completedOn: completedOn
    };

    const updatedCompletedArr = [...completedTodos, filteredItem];
    setCompletedTodos(updatedCompletedArr);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));
    handleDeleteTodo(index);
  };

  useEffect(() => {
    const savedTodo = JSON.parse(localStorage.getItem('todolist'));
    const savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));
    if (savedTodo) {
      setTodos(savedTodo);
    }
    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo);
    }
  }, []);

  const handleEdit = (index) => {
    setCurrentEdit(index);
    setCurrentEditedItem({ ...allTodos[index] });
  };

  const handleUpdateTitle = (value) => {
    setCurrentEditedItem(prev => ({ ...prev, title: value }));
  };

  const handleUpdateDescription = (value) => {
    setCurrentEditedItem(prev => ({ ...prev, description: value }));
  };

  const handleSaveEdit = () => {
    if (currentEdit !== null && currentEditedItem) {
      const updatedTodos = [...allTodos];
      updatedTodos[currentEdit] = currentEditedItem;
      setTodos(updatedTodos);
      localStorage.setItem('todolist', JSON.stringify(updatedTodos));
      setCurrentEdit(null);
      setCurrentEditedItem(null);
    }
  };

  const formatDescription = (description) => {
    return description.split('\n').map((line, index) => (
      <li key={index}>{line}</li>
    ));
  };

  return (
    <div className="App">
      <h1>My Todos</h1>

      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What's the Task title?"
            />
          </div>
          <div className='todo-input-item'>
            <label>Description</label>
            <textarea
              className='description-input'
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What's the Task description?"
            />
          </div>
          <div className='todo-input-item'>
            <button
              type='button'
              onClick={handleAddTodo}
              className='primaryBtn'
            >
              Add
            </button>
          </div>
        </div>

        <div className='btn-Area'>
          <button
            className={`secondaryBtn ${!isCompleteScreen ? 'active' : ''}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen ? 'active' : ''}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>

        <div className='todo-list'>
          {!isCompleteScreen && allTodos.map((item, index) => (
            currentEdit === index ? (
              <div className='edit__wrapper' key={index}>
                <input
                  placeholder='Updated Title'
                  onChange={(e) => handleUpdateTitle(e.target.value)}
                  value={currentEditedItem?.title || ''}
                />
                <textarea
                  placeholder='Updated Description'
                  onChange={(e) => handleUpdateDescription(e.target.value)}
                  value={currentEditedItem?.description || ''}
                  className='description-input'
                />
                <button
                  type='button'
                  onClick={handleSaveEdit}
                  className='primaryBtn'
                >
                  Save
                </button>
              </div>
            ) : (
              <div className='todo-list-item' key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <ul className='description-list'>
                    {formatDescription(item.description)}
                  </ul>
                </div>
                <div>
                  <AiOutlineDelete
                    className='icon'
                    onClick={() => handleDeleteTodo(index)}
                    title='Delete?'
                  />
                  <BsCheckLg
                    className='check-icon'
                    onClick={() => handleComplete(index)}
                    title='Complete?'
                  />
                  <AiOutlineEdit
                    className='check-icon'
                    onClick={() => handleEdit(index)}
                    title='Edit?'
                  />
                </div>
              </div>
            )
          ))}

          {isCompleteScreen && completedTodos.map((item, index) => (
            <div className='todo-list-item' key={index}>
              <div>
                <h3>{item.title}</h3>
                <ul className='description-list'>
                  {formatDescription(item.description)}
                </ul>
                <p><small>Completed On: {item.completedOn}</small></p>
              </div>
              <div>
                <AiOutlineDelete
                  className='icon'
                  onClick={() => handleDeleteCompletedTodo(index)}
                  title='Delete?'
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
