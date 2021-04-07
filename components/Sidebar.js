import styled from "styled-components";
import { Avatar, IconButton, Button } from "@material-ui/core";
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "../components/Chat";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

function Sidebar() {
  const [user] = useAuthState(auth);
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);

  const [chatsSnapshop] = useCollection(userChatRef);

  const createChat = () => {
    const input = prompt(
      "Please enter an email adress for the user you wish to chat with"
    );

    if (!input) return null;

    console.log(EmailValidator.validate(input));
    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      // We need to add the chat into the DB 'chats' collection if it doesnt already exist and is valid
      db.collection("chats").add({
        users: [user.email, input],
      });
    }
  };

  const chatAlreadyExists = (recipientEmail) =>
    !!chatsSnapshop?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );

  const emailText = user.email.split("@")[0];

  return (
    <Container>
      <Header>
        <UserInfoGroup>
          <UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />
          <p>{emailText}</p>
        </UserInfoGroup>
        <IconsContainer>
          <IconButton>
            <PersonAddIcon fontSize="large" onClick={createChat} />
          </IconButton>
        </IconsContainer>
      </Header>

      {/* List of Chats */}
      {chatsSnapshop?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
  flex: 0.45;
  border-radius: 1px solid whitesmoke;
  height: 100vh;
  min-width: 300px;
  max-width: 350px;
  overflow-y: scroll;

f  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; /* IE and Edge */

  scrollbar-width: none; /* Firefox */
`;

const UserInfoGroup = styled.div``;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  transition: opacity 0.2s linear;

  :hover {
    opacity: 0.8;
  }
`;

const IconsContainer = styled.div``;
