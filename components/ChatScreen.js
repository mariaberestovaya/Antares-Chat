import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { Avatar } from "@material-ui/core";
import { auth, db } from "../firebase";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { useCollection } from "react-firebase-hooks/firestore";
import { IconButton } from "@material-ui/core";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import SendIcon from "@material-ui/icons/Send";
import Message from "../components/Message";
import { useState } from "react";
import getRecipientEmail from "../utils/getRecipientEmail";
import firebase from "firebase";
import TimeAgo from "timeago-react";
import { useRef } from "react";

function ChatScreen({ chat, messages }) {
  const [user] = useAuthState(auth);
  const [input, setInput] = useState("");
  const endOfMessageRef = useRef(null);
  const router = useRouter();
  const [messagesSnapchat] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const [recipientSnapshot] = useCollection(
    db
      .collection("users")
      .where("email", "==", getRecipientEmail(chat.users, user))
  );

  const showMessages = () => {
    if (messagesSnapchat) {
      return messagesSnapchat.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map((message) => {
        <Message key={message.id} user={message.user} message={message} />;
      });
    }
  };

  const scrollToButtom = () => {
    endOfMessageRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const sendMessage = (e) => {
    e.preventDefault();

    if (input.lenght > 200) return null;

    db.collection("users").doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    db.collection("chats").doc(router.query.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });

    setInput("");
    scrollToButtom();
  };

  const recipient = recipientSnapshot?.docs?.[0].data();
  const recipientEmail = getRecipientEmail(chat.users, user);

  const emailText = recipientEmail.split("@")[0];

  return (
    <Container>
      <Header>
        {recipient ? (
          <Avatar src={recipient?.photoURL} />
        ) : (
          <Avatar>{recipientEmail[0]}</Avatar>
        )}

        <HeaderInformation>
          <h3>{emailText}</h3>
          {recipientSnapshot ? (
            <p>
              Last active:{" "}
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
              ) : (
                "Unavailable"
              )}
            </p>
          ) : (
            <p>Loadin Last active...</p>
          )}
        </HeaderInformation>
        {/* <HeaderIcons>
          <IconButton>
            <AttachFileIcon style={{ color: "#000" }} />
          </IconButton>
          <IconButton>
            <MoreVertIcon style={{ color: "#000" }} />
          </IconButton>
        </HeaderIcons> */}
      </Header>

      <MessageContainer>
        {showMessages()}
        <EndOfMessage ref={endOfMessageRef} />
      </MessageContainer>

      <InputContainer>
        <InsertEmoticonIcon />
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <button hidden disabled={!input} type="submit" onClick={sendMessage}>
          Send Message
        </button>
        <SendIcon onClick={sendMessage} />
      </InputContainer>
    </Container>
  );
}

export default ChatScreen;

const Container = styled.div`
  height: 100vh;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;

  scrollbar-width: none;
`;

const Input = styled.input`
  flex: 1;
  align-items: center;
  outline: 0;
  padding: 20px;
  position: sticky;
  margin-left: 15px;
  margin-right: 15px;
  border-radius: 10px;
  border: none;
  background-color: whitesmoke;
`;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`;

const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;

const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 2;

  > h3 {
    margin: 0;
  }

  > p {
    font-size: 14px;
    color: gray;
    margin: 0;
  }
`;

const EndOfMessage = styled.div`
  margin-bottom: 50px;
`;

const HeaderIcons = styled.div``;

const MessageContainer = styled.div`
  padding: 30px;
  min-height: 90vh;
`;
