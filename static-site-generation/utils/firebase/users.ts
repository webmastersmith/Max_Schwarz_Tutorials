import { firestore } from './firebase'

export const getSales = async () => {
  return await firestore.collection('sales').get()
}
