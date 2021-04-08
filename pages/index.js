import Head from "next/head";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Antares</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Sidebar />

      <ChatContainer>
        <h1>Here will be your chat</h1>
      </ChatContainer>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 10fr;

  @media (max-width: 1240px) {
    grid-template-columns: 0;
  }
`;

const ChatContainer = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;

  @media (max-width: 1240px) {
    display: none;
  }
`;
