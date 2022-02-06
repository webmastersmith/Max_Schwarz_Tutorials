import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface NotifySliceType {
  status: string
}

const initialState: NotifySliceType = {
  status: '',
}

export const notifySlice = createSlice({
  name: 'notify',
  initialState,
  reducers: {
    error: (state) => {
      state.status = 'error'
    },
    success: (state) => {
      state.status = 'success'
    },
    pending: (state) => {
      state.status = 'pending'
    },
    reset: (state) => {
      state.status = ''
    },
  },
})

// Action creators are generated for each case reducer function
export const { error, success, pending, reset } = notifySlice.actions

export const notifyReducer = notifySlice.reducer

// import classes from './notification.module.scss'
// import NotificationContext from '../../store/notification-context'

// interface PropsType {
//   title:string
//   message: string
//   status: number
// }

// function Notification({title, message, status}: PropsType) {
//   const notificationCtx = useContext(NotificationContext)

//   // const { title, message, status } = props

//   let statusClasses = ''

//   if (status === 'success') {
//     statusClasses = classes.success
//   }

//   if (status === 'error') {
//     statusClasses = classes.error
//   }

//   if (status === 'pending') {
//     statusClasses = classes.pending
//   }

//   const activeClasses = `${classes.notification} ${statusClasses}`

//   return (
//     <div className={activeClasses} onClick={notificationCtx.hideNotification}>
//       <h2>{title}</h2>
//       <p>{message}</p>
//     </div>
//   )
// }

// export default Notification
