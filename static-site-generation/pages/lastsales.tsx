import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

interface TodoType {
  completed: boolean
  id: number
  title: string
  userId: number
}

const LastSalesPage: NextPage = () => {
  const [state, setState] = useState<TodoType | null>(null)
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((res) => res.json())
      .then((data) => setState(data))
  }, [])
  console.log(state)

  if (!state) return <p>Loading...</p>
  const { completed, id, title, userId } = state
  return (
    <div>
      <h1>Todo</h1>
      <h2>{title}</h2>
      <p>{`Completed: ${completed.toString()}`}</p>
    </div>
  )
}

export default LastSalesPage
