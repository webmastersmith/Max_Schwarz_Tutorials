import { useEffect, useState } from 'react'
import { getSales } from 'utils'

interface SalesArrType {
  salesArr: SaleType[]
}

interface SaleType {
  username: string
  volume: number
}

const LastSalesPage = (props: SalesArrType) => {
  const [sales, setSales] = useState<SaleType[] | any>(props.salesArr)
  useEffect(() => {
    // this custom function from Firebase Database.
    getSales().then((snapshot) => {
      console.log('snapshot', snapshot)
      const salesArr = []
      for (const doc of snapshot.docs) {
        salesArr.push(doc.data())
      }
      setSales(salesArr)
    })
  }, [])

  if (!sales.length) return <p>Loading...</p>

  console.log('sales', sales)

  return (
    <div>
      {sales.map((sale: SaleType) => {
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

export async function getStaticProps() {
  const snapshot = await getSales()

  const salesArr = []
  for (const doc of snapshot.docs) {
    salesArr.push(doc.data())
  }

  return {
    props: {
      salesArr,
    },
  }
}
