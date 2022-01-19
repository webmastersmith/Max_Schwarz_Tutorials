import { FC, useContext } from 'react'
import { FavoritesContext } from 'store'
import { MeetupCard } from 'pages'

export const FavoriteMeetUpsPage: FC<{}> = (): JSX.Element => {
  const { favorites } = useContext(FavoritesContext)

  return (
    <section>
      <h1>My Favorites</h1>
      {favorites.length ? (
        <MeetupCard meetups={favorites} />
      ) : (
        <div>You need to add some favorites</div>
      )}
    </section>
  )
}
