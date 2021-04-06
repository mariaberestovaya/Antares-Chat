import styled from "styled-components";

function Message({ user, message }) {
  return (
    <Container>
      <p>{message.message}</p>
    </Container>
  );
}

export default Message;

const Container = styled.div`
  /* > p {
    border-radius: 5px;
    width: auto;
    padding: 10px;
    background-color: #fff;
  } */
`;
