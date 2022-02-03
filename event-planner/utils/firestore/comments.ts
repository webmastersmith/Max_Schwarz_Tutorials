import { createCollection } from 'utils'
import { getDocs, addDoc, query, where, limit } from 'firebase/firestore'
import { Comments } from 'components'

export const getAllEventKeys = async () => {
  const eventsCol = createCollection<Comments>(`events`)
  const querySnapshot = await getDocs(eventsCol)

  const eventKeys: string[] = []
  // check if any comments exist.
  if (querySnapshot.empty) return eventKeys
  querySnapshot.forEach((doc) => {
    eventKeys.push(doc.id)
  })
  return eventKeys
}

export const getAllComments = async (id: string): Promise<Comments[]> => {
  const commentsCol = createCollection<Comments>(`comments`)
  const q = query(commentsCol, where('pageId', '==', id), limit(20))
  const querySnapshot = await getDocs(q)

  const comments: Comments[] = []
  // check if any comments exist.
  if (querySnapshot.empty) return comments
  querySnapshot.forEach((doc) => {
    comments.push(doc.data() as Comments)
  })
  return comments
}

export const getPageComments = async (pageId: string): Promise<Comments[]> => {
  const commentsCol = createCollection<Comments>(`comments`)
  const q = query(commentsCol, where('pageId', '==', pageId), limit(20))
  const querySnapshot = await getDocs(q)

  const comments: Comments[] = []
  // check if any comments exist.
  if (querySnapshot.empty) return comments
  querySnapshot.forEach((doc) => {
    comments.push(doc.data() as Comments)
  })
  return comments
}

export const postComment = async (comment: Comments): Promise<void> => {
  const commentsCol = createCollection<Comments>(`comments`)
  const commentRef = await addDoc(commentsCol, comment)
  console.log('comment was posted successfully', commentRef.id)
}
