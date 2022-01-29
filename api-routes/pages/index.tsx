import type { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'

const Home: NextPage = () => {
  const [data, setData] = useState([])

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const dataObject = Object.fromEntries(formData)
    console.log('dataObject', dataObject) //{email: "bob@gmail.com", feedback: "hghg!!"}
    await fetch('http://localhost:3000/api/form', {
      method: 'POST',
      body: JSON.stringify(dataObject),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))

    // event.target.reset() //reset form.
  }

  const handleClick = () => {
    fetch('http://localhost:3000/api/form')
      .then((res) => res.json())
      .then((data) => setData(data))
  }

  return (
    <div>
      <h1>Home Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" name="email" id="email" required />
        </div>

        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <input type="text" name="feedback" id="feedback" />
        </div>
        <button type="submit">Submit</button>
      </form>
      <hr />
      <button type="button" onClick={handleClick}>
        View All
      </button>
      {!!data.length &&
        data.map((d: any, i: number) => {
          return (
            <div key={i}>
              <p>{d.email}</p>
              <p>{d.feedback}</p>
            </div>
          )
        })}
    </div>
  )
}

export default Home
