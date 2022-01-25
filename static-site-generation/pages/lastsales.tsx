import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { getSales } from 'utils'

interface TodoType {
  username: string
  volume: number
}

const LastSalesPage: NextPage = () => {
  const [sales, setSales] = useState<TodoType[] | any>([])
  useEffect(() => {
    getSales().then((snapshot) => {
      console.log('snapshot', snapshot)
      const salesArr = []
      for (const doc of snapshot.docs) {
        salesArr.push(doc.data())
      }
      setSales(salesArr)
    })

    // fetch('https://jsonplaceholder.typicode.com/todos/1')
    //   .then((res) => res.json())
    //   .then((data) => setState(data))
  }, [])

  if (!sales.length) return <p>Loading...</p>
  console.log('sales', sales)

  return (
    <div>
      {sales.map((sale: TodoType) => {
        const { username, volume } = sale
        return (
          <div key={username}>
            <h1>Sales</h1>
            <h2>{`User: ${username}`}</h2>
            <p>{`volume: ${volume.toString()}`}</p>
          </div>
        )
      })}
    </div>
  )
}

export default LastSalesPage
