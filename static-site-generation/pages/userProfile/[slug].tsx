interface AppProps {
  id: string
}
const UserProfileSlug = ({ id }: AppProps) => {
  console.log('this page loaded!')

  if (!id) return <p>Loading...</p>
  return (
    <div>
      <h1>User Profile Slug</h1>
      <h2>{`userprofile-${id}`}</h2>
    </div>
  )
}

export default UserProfileSlug

export async function getServerSideProps(context: any) {
  console.log('server side loaded')

  const { params } = context //{ slug: 'butter' }

  return {
    props: {
      id: params.slug,
    },
  }
}
