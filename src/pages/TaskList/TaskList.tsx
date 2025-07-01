import { useEffect, useState } from 'react'
import './TaskList.less'
import PlusButton from '../../components/PlusButton/PlusButton'
import Header from '../../components/Header/Header'
import TaskCard from '../../components/TaskCard/TaskCard'
import { useNavigate } from 'react-router-dom'

export interface Task {
  id: string
  title: string
  deadline?: string
  priority?: 'baixa' | 'media' | 'alta' | 'nenhuma'
  status: 'pendente' | 'concluida'
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const navigate = useNavigate();

  useEffect(() => {
    // Mocked tasks data
    const mockedTasks: Task[] = [
      {
        id: '1',
        title: 'Comprar leite',
        deadline: '2025-07-03',
        priority: 'alta',
        status: 'pendente'
      },
      {
        id: '2',
        title: 'Estudar React',
        deadline: '2025-07-05',
        priority: 'media',
        status: 'pendente'
      },
      {
        id: '3',
        title: 'Enviar relatório',
        deadline: '2025-07-02',
        priority: 'baixa',
        status: 'concluida'
      }
    ];
    setTasks(mockedTasks);
  }, [])

  return (
    <>
      <Header />

      <div className="task-list-container">

        <main className="task-list-grid">
          {!tasks.length ? <><span className="no-task">Começe criando suas tarefas clicando no botão de "+" abaixo!</span></> : tasks.map((task) => (
            <TaskCard key={task.id} {...task} />
          ))}
        </main>

        <PlusButton onClick={() => navigate('/add-task')} />
      </div>
    </>
  )
}
