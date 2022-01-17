import { FC } from 'react'
import { DUMMY_DATA, Data } from 'components'
import { MeetupList } from 'pages'

export const AllMeetUpsPage: FC<{}> = (): JSX.Element => {
  return (
    <div>
      <MeetupList items={DUMMY_DATA} />
    </div>
  )
}
// <ul role="list" className="globalInlineFlexCenter">
//   {DUMMY_DATA.map(
//     ({ id, title, address, description, image }: Data): JSX.Element => {
//       return (
//         <li key={id}>
//           {/* <div>
//             <img src={image} alt={title} />
//           </div> */}
//           <div>
//             <h3>{title}</h3>
//             <address>{address}</address>
//             <p>{description}</p>
//           </div>
//           <div>
//             <button>Save to Favorites</button>
//           </div>
//         </li>
//       )
//     }
//   )}
// </ul>
