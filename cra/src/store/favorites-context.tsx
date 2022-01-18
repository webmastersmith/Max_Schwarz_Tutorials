import { createContext, FC, useState } from 'react'
import { Data } from 'components'

interface FavContext {
  favorites: Data[]
  totalFavorites: number
}
interface FavContextMethods extends FavContext {
  addFavorite: (newFavorite: Data) => void
  removeFavorite: (id: string) => void
  itemIsFavorite: (id: string) => boolean
}
const FavoritesContext = createContext<FavContext>({
  favorites: [],
  totalFavorites: 0,
})

export const FavoriteContextProvider: FC = ({ children }) => {
  const [favorites, setFavorites] = useState<Data[]>([])

  const addFavorite = (newFavorite: Data): void => {
    setFavorites((f) => [...f, newFavorite])
  }
  const removeFavorite = (id: string): void => {
    setFavorites((f) => f.filter((meetup) => meetup.id !== id))
  }
  const itemIsFavorite = (id: string): boolean =>
    favorites.some((meetup) => meetup.id === id)

  const context: FavContextMethods = {
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
