import { db } from 'utils'
import { collection, getDocs, query, where } from 'firebase/firestore'

export interface EventsType {
  id: string
  title: string
  description: string
  location: string
  date: string
  image: string
  isFeatured: boolean
}

const DUMMY_EVENTS: EventsType[] = [
  {
    id: 'e1',
    title: 'Programming for everyone',
    description:
      'Everyone can learn to code! Yes, everyone! In this live event, we are going to go through all the key basics and get you started with programming as well.',
    location: 'Somestreet 25, 12345 San Somewhereo',
    date: '2021-05-12',
    image: 'images/coding-event.jpg',
    isFeatured: false,
  },
  {
    id: 'e2',
    title: 'Networking for introverts',
    description:
      "We know: Networking is no fun if you are an introvert person. That's why we came up with this event - it'll be so much easier. Promised!",
    location: 'New Wall Street 5, 98765 New Work',
    date: '2021-05-30',
    image: 'images/introvert-event.jpg',
    isFeatured: true,
  },
  {
    id: 'e3',
    title: 'Networking for extroverts',
    description:
      'You probably need no help with networking in general. But focusing your energy correctly - that is something where most people can improve.',
    location: 'My Street 12, 10115 Broke City',
    date: '2022-04-10',
    image: 'images/extrovert-event.jpg',
    isFeatured: true,
  },
]

export async function getFireStoreFeaturedEvents(): Promise<EventsType[]> {
  const eventsArr: EventsType[] = []
  const q = query(collection(db, 'events'), where('isFeatured', '==', true))
  const eventsSnapshot = await getDocs(q)
  eventsSnapshot.forEach((doc: any) => {
    eventsArr.push(doc.data())
  })
  // console.log('featured events', eventsArr)
  return eventsArr
}
// getFireStoreFeaturedEvents()

export async function getAllFireStoreEvents(): Promise<EventsType[]> {
  const eventsArr: EventsType[] = []
  const eventsSnapshot = await getDocs(collection(db, 'events'))
  eventsSnapshot.forEach((doc: any) => {
    eventsArr.push(doc.data())
  })
  // console.log('all events', eventsArr)
  return eventsArr
}
// getAllFireStoreEvents()

export function getFeaturedEvents(): EventsType[] {
  return DUMMY_EVENTS.filter((event) => event.isFeatured)
}

export function getAllEvents(): EventsType[] {
  return DUMMY_EVENTS
}

export function getFilteredEvents(year: number, month: number): EventsType[] {
  let filteredEvents = DUMMY_EVENTS.filter((event) => {
    const eventDate = new Date(event.date)
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    )
  })

  return filteredEvents
}

export function getEventById(id: string): EventsType | undefined {
  const event = DUMMY_EVENTS.find((event) => event.id === id)
  // can be type EventsType or undefined.
  return event
}
