export interface AppProps {
  username: string
}
const UserProfilePage = ({ username }: AppProps) => {
  return <h1>{username}</h1>
}

export async function getServerSideProps(context: any) {
  const { req, res } = context
  console.log(req.headers)
  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1')
  // console.log(res)

  return {
    props: {
      username: 'Bob',
    },
  }
}

export default UserProfilePage
