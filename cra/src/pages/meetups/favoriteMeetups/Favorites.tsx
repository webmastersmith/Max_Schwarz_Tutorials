import { FC, useContext } from 'react'
import { FavoritesContext } from 'store'

export const FavoriteMeetUpsPage: FC<{}> = (): JSX.Element => {
  const { favorites } = useContext(FavoritesContext)

  return (
    <div>
      <div>FavoriteMeetUpsPage</div>
    </div>
  )
}
