import styled from "styled-components";
import Head from "next/head";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";

function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };
  return (
    <div>
      <Container>
        <Head>
          <title>Login</title>
        </Head>

        <LoginContainer>
          <Logo src="https://icons-for-free.com/iconfiles/png/512/chat+icon-1320184411998302345.png" />
          <Button onClick={signIn} variant="outlined">
            Sign in with Google
          </Button>
        </LoginContainer>
      </Container>
    </div>
  );
}

export default Login;

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
`;

const LoginContainer = styled.div`
  padding: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 5px;
`;

const Logo = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 50px;
`;
