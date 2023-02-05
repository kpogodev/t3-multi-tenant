import {type NextPage, type GetServerSideProps } from "next";
import { getServerAuthSession } from "../server/auth";
import LoginForm from "../components/auth/LoginForm";

const Login: NextPage = () => {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-[#fafafa]"
      data-theme="fantasy"
    >
      <LoginForm />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Login;
