import type { GetServerSideProps, NextPage } from "next"
import { getServerAuthSession } from "../../server/auth"

const CMS: NextPage = () => {
  return <div>CMS</div>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession(context)

  if (!session) {
    const refPath = context.req.url ?? "/"
    context.res.setHeader("Set-Cookie", `refPath=${refPath}; Path=/; HttpOnly`)

    return {
      redirect: {
        destination: "/auth/sign-in",
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default CMS
