import { Post, CreatePost, FriendsList, Loader, Chat } from "../components";
import styles from "../styles/home.module.css";

import { useAuth, usePosts } from "../hooks";
import { useState,useCallback } from "react";
const MobileHome = () => {
  const auth = useAuth();
  const posts = usePosts();
  const [render, setRender] = useState("Post");
  const modifyActiveComponent = useCallback(
    newActiveComponent => {
        setRender(newActiveComponent);
    },
    [setRender]
  );
  if (posts.loading) {
    return <Loader />;
  }

  return (
    <div className={styles.mobileview}>
    <div className={styles.mobileNav}>
        <div onClick={() => modifyActiveComponent("Post")}>POST</div>
        <div onClick={() => modifyActiveComponent("Chat")}>CHAT</div>
        <div onClick={() => modifyActiveComponent("Friends")}>FRIENDS</div>
      </div>

      <div className={styles.home}>
        {render==="Post" && <div className={styles.postsList}>
          <CreatePost />
          {posts.data.map((post) => (
            <Post post={post} key={`post-${post._id}`} />
          ))}
        </div>}
        {auth.user &&(render==="Friends"&&<FriendsList />)}
        {auth.user && (render==="Chat"&&<Chat />)}
      </div>
    </div>

  


  
  );
};

export default MobileHome;