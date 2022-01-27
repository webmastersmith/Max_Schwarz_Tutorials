import { EventsType, getFireStoreEventById } from 'data'
import { EventDetail } from 'components'
import { useState } from 'react'

const EventDetailPage = ({ event }: any) => {
  if (event) {
    return <EventDetail event={event} />
  }
  return <p>no event found</p>
}

export default EventDetailPage

export async function getServerSideProps(context: any) {
  const { params } = context //{slug: 'e1'}
  const event = await getFireStoreEventById(params.slug)

  return {
    props: {
      event,
    },
  }
}
