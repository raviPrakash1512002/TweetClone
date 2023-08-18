import { useState } from "react";
import styles from "../styles/home.module.css";
import { addPost } from "../Api";
import { useToasts } from "react-toast-notifications";
import { usePosts } from "../hooks";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

const CreatePost = () => {
  let [post, setPost] = useState("");
  const [addingPost, setAddingPost] = useState(false);
  const { addToast } = useToasts();
  const posts = usePosts();

  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);



  const handleAddPostClick = async () => {
    setAddingPost(true);
    if (post === "") {
      return addToast("Please write post!", {
        appearance: "error",
      });
    }

    const response = await addPost(post);

    if (response.success) {
      setPost("");
      posts.addPostToState(response.data.post);
      addToast("Post created Successfully !!!!", {
        appearance: "success",
      });
    } else {
      addToast(response.message, {
        appearance: "error",
      });
    }

    setAddingPost(false);
  };

  const handleListing = () => {
    setIsListening(true);
    
    SpeechRecognition.startListening();
  };
  const stopHandle = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
  }


  return (
    <div className={styles.createPost}>
      <img
      className={styles.avatar}
        src="https://freepikpsd.com/file/2019/10/avatar-icon-png-5-Images-PNG-Transparent.png"
        alt=""
      />
      <textarea
        className={styles.addPost}
        placeholder="Post a new thread ........"
        value={isListening?(post=transcript):post}
        onChange={(e) => setPost(e.target.value)}
        
      />
      <img
        className={styles.micIcon}
        src="https://cdn-icons-png.flaticon.com/512/1082/1082912.png"
        alt=""
        onClick={isListening?stopHandle:handleListing}
  
      
      />

      <div>
        <button
          className={styles.addPostBtn}
          onClick={handleAddPostClick}
          disabled={addingPost}
        >
          {addingPost ? "Adding post..." : "Add post"}
        </button>
      </div>
     
    </div>
    
  );
};

export default CreatePost;
