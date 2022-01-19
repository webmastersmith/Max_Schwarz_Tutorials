import { createContext, FC, useState, useCallback, useEffect } from 'react'
import { Data, DUMMY_DATA } from 'components'

interface FavContext {
  favorites: Data[]
  totalFavorites: number
}
interface FavContextMethods extends FavContext {
  data: Data[]
  addData: (newData: Data) => void
  addFavorite: (newFavorite: Data) => void
  removeFavorite: (id: string) => void
  itemIsFavorite: (id: string) => boolean
}
export const FavoritesContext = createContext<FavContextMethods>({
  data: [],
  addData: (newData) => {},
  favorites: [],
  totalFavorites: 0,
  //dummy functions for typescript
  addFavorite: (newFavorite) => {},
  removeFavorite: (id) => {},
  itemIsFavorite: (id) => true,
})

// creates wrapper Provider fn
export const FavoriteContextProvider: FC = ({ children }) => {
  const [data, setData] = useState<Data[]>([])
  const [favorites, setFavorites] = useState<Data[]>([])

  useEffect(() => {
    setData(DUMMY_DATA)
  }, [])

  const addData = useCallback((newData: Data) => {
    setData((d) => [...d, newData])
  }, [])
  const addFavorite = useCallback(
    (newFavorite: Data): void => {
      if (favorites.some((item) => item.id === newFavorite.id)) return
      setFavorites((f) => [...f, newFavorite])
    },
    [favorites]
  )
  const removeFavorite = useCallback((id: string): void => {
    setFavorites((f) => f.filter((meetup) => meetup.id !== id))
  }, [])
  const itemIsFavorite = useCallback(
    (id: string): boolean => favorites.some((meetup) => meetup.id === id),
    [favorites]
  )

  const context: FavContextMethods = {
    data,
    addData,
    favorites,
    totalFavorites: favorites.length,
    addFavorite,
    removeFavorite,
    itemIsFavorite,
  }

  return (
    <FavoritesContext.Provider value={context}>
      {children}
    </FavoritesContext.Provider>
  )
}
