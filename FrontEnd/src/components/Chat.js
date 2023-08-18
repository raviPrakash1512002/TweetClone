
import React, { useEffect, useState } from "react";
import { getDatabase, onChildAdded } from "firebase/database";
import {  ref, push, set } from "firebase/database";
import useKeypress from 'react-use-keypress'
// import useChat from "../hooks/UseChat";
import "../styles/chat.css";
import { useAuth } from "../hooks";

const Chat = () => {
  const [chats,setChats]=useState([]);
  const [msg,setMsg]=useState('');
  const auth=useAuth();
  const db = getDatabase();
  const chatListRef = ref(db, "chats");

  const handleNewMessageChange = (event) => {
     setMsg(event.target.value);

  };
  const sendChat=()=>{
    const chatListRef = ref(db, "chats");
    const chatRef = push(chatListRef);
    set(chatRef, {
      email:auth.user.email,
      name:auth.user.name,
      message:msg
    });

    setMsg('');
  }
  useKeypress('Enter', (event) => {
    if(msg!==""){
      if (event.key === 'Enter') {
        sendChat();
       
      }
    }
   
    
  },[]);
  const updateheight=()=>{
    const element=document.getElementById('chat-cont');
    if(element){
      element.scrollTop=element.scrollHeight;
    }
  }

  useEffect(()=>{
    onChildAdded(chatListRef,(data)=>{
     
      setChats(chats=>[...chats,data.val()]);
      setTimeout(()=>{
        updateheight();
      },100)
      
    });
  },[onChildAdded])




  const closeChatBox = () => {
    document.getElementsByClassName("chatcontainer")[0].style.display = "none";
    document.getElementsByClassName("close-chat-container")[0].style.display =
      "block";
  };
  const openChatBox = () => {
    document.getElementsByClassName("chatcontainer")[0].style.display =
      "block";
    document.getElementsByClassName("close-chat-container")[0].style.display =
      "none";
  };

  return (
    <>
      <div className="chatcontainer">
        <div className="chat-header">
          Chat
          <img
            className="close-chat"
            src="https://img.icons8.com/flat-round/64/000000/delete-sign.png"
            alt=""
            height={25}
            onClick={closeChatBox}
          />
        </div>
        <div  id="chat-cont" className="chat-messages">
          {chats.map((chat, i) => (
            <li
              key={i}
              className={`${
                chat.email===auth.user.email
                  ? "chat-bubble self-chat"
                  : "chat-bubble other-chat"
              }`}
            >
             <strong>{chat.message}</strong> 
             <p>{chat.name}</p>
            </li>
          ))}
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={msg}
            onChange={handleNewMessageChange}
            placeholder="Write message..."
            className="new-message-input-field"
          />
          <button onClick={sendChat} >Submit</button>
        </div>
      </div>
      <div class="close-chat-container">
        <img
          className="group-chat"
          src="https://img.icons8.com/ios-filled/50/ffffff/collaboration-female-male.png"
          alt=""
          height={25}
        />
        <span>Group chat</span>

        <img
          className="open-chat"
          src="https://img.icons8.com/ios-filled/50/ffffff/caps-lock-on--v1.png"
          alt=""
          height={25}
          onClick={openChatBox}
        />
      </div>
    </>
  );
};

export default Chat;

// import React from "react";

// import "./ChatRoom.css";
// import useChat from "../useChat";

// const ChatRoom = (props) => {
//   const { roomId } = props.match.params; // Gets roomId from URL
//   const { messages, sendMessage } = useChat(roomId); // Creates a websocket and manages messaging
//   const [newMessage, setNewMessage] = React.useState(""); // Message to be sent

//   const handleNewMessageChange = (event) => {
//     setNewMessage(event.target.value);
//   };

//   const handleSendMessage = () => {
//     sendMessage(newMessage);
//     setNewMessage("");
//   };

//   return (
//     <div className="chat-room-container">
//       <h1 className="room-name">Room: {roomId}</h1>
//       <div className="messages-container">
//         <ol className="messages-list">
//           {messages.map((message, i) => (
//             <li
//               key={i}
//               className={`message-item ${
//                 message.ownedByCurrentUser ? "my-message" : "received-message"
//               }`}
//             >
//               {message.body}
//             </li>
//           ))}
//         </ol>
//       </div>
//       <textarea
//         value={newMessage}
//         onChange={handleNewMessageChange}
//         placeholder="Write message..."
//         className="new-message-input-field"
//       />
//       <button onClick={handleSendMessage} className="send-message-button">
//         Send
//       </button>
//     </div>
//   );
// };

// export default ChatRoom;
