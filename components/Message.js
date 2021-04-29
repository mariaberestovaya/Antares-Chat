import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import moment from "moment";

function Message({ user, message }) {
  const [userLoggedIn] = useAuthState(auth);

  const TypeOfMessage = user === userLoggedIn.email ? Sender : Reciever;

  return (
    <Container>
      <TypeOfMessage>
        <p>{message.message}</p>
        <Timestamp>
          {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
        </Timestamp>
      </TypeOfMessage>
    </Container>
  );
}

export default Message;

const Container = styled.div``;

const MessageElement = styled.p`
  width: fit-content;
  padding: 5px 15px;
  border-radius: 8px;
  min-width: 60px;
  max-width: 800px;
  position: relative;

  > p {
    word-break: break-all;
    margin: 0;
  }
`;

const Timestamp = styled.div`
  font-size: 0.7em;
`;

const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: #b0b0b0;
  text-align: left;
`;

const Reciever = styled(MessageElement)`
  background-color: whitesmoke;
  text-align: right;
`;
