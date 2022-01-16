import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
  Home,
  AllMeetUpsPage,
  NewMeetUpsPage,
  FavoriteMeetUpsPage,
} from 'pages'
import { Nav } from 'components'
import styles from './App.module.scss'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className={styles.container}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="all_meetups" element={<AllMeetUpsPage />} />
          <Route path="new_meetups" element={<NewMeetUpsPage />} />
          <Route path="favorite_meetups" element={<FavoriteMeetUpsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
