import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // se o state newTaskTitle estiver vazio, retorne
    if (!newTaskTitle) {
      return;
    }

    // const newTask recebe um id(gerado com o Math.random()), o title vindo do state e o isComplete como false
    const newTask= {
      id: Math.random(),
      title: newTaskTitle,
      isComplete:false,
    }

    // o state setTasks vai colocar o state antigo dentro do array,e no final a newTask criada
    setTasks(oldState => [...oldState, newTask]);
    // após isso o state vai ficar limpo
    setNewTaskTitle('');
  }

  function handleToggleTaskCompletion(id: number) {
    // mapear todas as tasks e pegar o id passado
    const finishedTask = tasks.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete
    } : task);

    setTasks(finishedTask)
  }

  function handleRemoveTask(id: number) {
    const chosenTask = tasks.filter(task => task.id !== id);

    setTasks(chosenTask);

  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}