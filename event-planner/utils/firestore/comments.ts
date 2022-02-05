import { createCollection } from 'utils'
import { getDocs, addDoc, query, where, limit } from 'firebase/firestore'
import { Comments } from 'components'
import { isValidEmail } from './email'
// import v from 'validator'

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

export const postComment = async (newComment: Comments): Promise<void> => {
  // ...(dataObject as Comments), //{email, name, comment}
  // date: new Date().toISOString(),
  // id: crypto.randomUUID?.() ?? `${Date.now()}`,
  // pageId: id,
  function stringify(word: string, lower: boolean = false) {
    const wordString = typeof word === 'string' ? word : word + ''
    return lower ? wordString.trim().toLowerCase() : wordString.trim()
  }
  const { email, name, comment, pageId, id } = newComment
  const fixedEmail = stringify(email, true)
  const fixedName = stringify(name)
  const fixedComment = stringify(comment)
  const fixedPageId = stringify(pageId)
  const fixedId = stringify(id)

  function checkLength(word: string, chars: number) {
    return typeof word === 'string' && word.length > 0 && word.length <= chars
      ? true
      : false
  }

  if (
    isValidEmail(fixedEmail) &&
    checkLength(fixedEmail, 100) &&
    checkLength(fixedName, 100) &&
    checkLength(fixedComment, 800) &&
    checkLength(fixedPageId, 50) &&
    checkLength(fixedId, 50)
  ) {
    const eventKeys = await getAllEventKeys()
    if (eventKeys.includes(fixedPageId)) {
      const sanitizedComment = {
        email: fixedEmail,
        name: fixedName,
        comment: fixedComment,
        pageId: fixedPageId,
        id: fixedId,
        date: new Date().toISOString(),
      }

      const commentsCol = createCollection<Comments>(`comments`)
      const commentRef = await addDoc(commentsCol, sanitizedComment)
      console.log('comment was posted successfully', commentRef.id)
    } else {
      console.log('something wrong with pageId', fixedPageId)
    }
  } else {
    console.log(
      'comment object did not pass validation.',
      JSON.stringify(newComment)
    )
  }
}
