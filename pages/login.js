import styled from "styled-components";
import Head from "next/head";
import { Button } from "@material-ui/core";

function Login() {
  return (
    <div>
      <Container>
        <Head>
          <title>Login</title>
        </Head>

        <LoginContainer>
          <Logo src="https://icons-for-free.com/iconfiles/png/512/chat+icon-1320184411998302345.png" />
          <Button variant="outlined">Sign in with Google</Button>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
`;

const Logo = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 50px;
`;
