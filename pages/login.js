import Head from "next/head";
import styled from "styled-components";
import { auth, provider } from "../firebase";

function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };
  return (
    <Container>
      <Head>
        <title>Log In</title>
      </Head>

      <LoginContainer>
        <h2>Welcome to</h2>
        <h1>
          <Logo src="/icon.png" />
          Antares Chat
        </h1>

        <Button onClick={signIn}>Sign in with Google</Button>
      </LoginContainer>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
`;

const Logo = styled.img`
  height: 70px;

  @media (max-width: 643px) {
    height: 40px;
  }
`;

const LoginContainer = styled.div`
  padding: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 5px;

  @media (max-width: 643px) {
    padding: 0;
  }

  > h1 {
    font-size: 4rem;
    margin: 0 0 40px 0;

    @media (max-width: 643px) {
      font-size: 3em;
      margin: 0 0 20px 0;
    }

    @media (max-width: 322px) {
      font-size: 2em;
    }
  }

  > h2 {
    font-size: 2rem;
    margin: 0;

    @media (max-width: 643px) {
      font-size: 2em;
    }

    @media (max-width: 322px) {
      font-size: 1.6em;
    }
  }
`;

const Button = styled.button`
  background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa80VaEqxezGIMWnxtuw6jrsMoiYyuswvz5A&usqp=CAU");

  padding: 20px 40px;
  color: #fff;
  border: none;
  outline: 0;
  border-radius: 5px;
  font-size: 1.2em;

  transition: all 0.25s ease-in;

  :hover {
    opacity: 0.8;
  }

  @media (max-width: 643px) {
    font-size: 1em;
    padding: 20px 30px;
  }
`;
