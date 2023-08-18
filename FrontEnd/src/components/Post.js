import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { useAuth } from "../hooks";

import { createComment, toggleLike } from "../Api";
import { usePosts } from "../hooks";
import styles from "../styles/home.module.css";
import { Comment } from "./";

const Post = ({ post }) => {
  const [comment, setComment] = useState("");
  const [like,setLike]=useState(false);
  const [likeLength,setLikeLength]=useState(post.likes.length);
  const [creatingComment, setCreatingComment] = useState(false);
  const posts = usePosts();
  const { addToast } = useToasts();
  const auth = useAuth();
  var date = new Date(post.createdAt).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})

  const handleAddComment = async (e) => {
    if (e.key === "Enter") {
      setCreatingComment(true);

      const response = await createComment(comment, post._id);

      if (response.success) {
        setComment("");
        posts.addComment(response.data.comment, post._id);
        addToast("Comment created successfully!", {
          appearance: "success",
        });
      } else {
        addToast(response.message, {
          appearance: "error",
        });
      }

      setCreatingComment(false);
    }
  };

  const handlePostLikeClick = async () => {
    const response = await toggleLike(post._id, "Post");
   if (response.success) {
      if (response.data.deleted) {
        posts.removeLikes(auth.user.userId,post._id);
        
        setLike(false);
        addToast("Like removed successfully!", {
          appearance: "success",
        });
      } else {
        
        posts.addLikes(auth.user.userId, post._id);
        setLike(true);
        addToast("Like added successfully!", {
          appearance: "success",
        });
      }
      setLikeLength(response.data.length);
    } else {
      addToast(response.message, {
        appearance: "error",
      });
    }
  };
  

  return (
    <div className={styles.postWrapper} key={`post-${post._id}`}>
      <div className={styles.postHeader}>
        <div className={styles.postAvatar}>
          <img
            src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png"
            alt="user-pic"
          />
          <div>
            <Link
              to={`/user/${post.user._id}`}
              state={{ user: post.user }}
              className={styles.postAuthor}
            >
              {post.user.name}
            </Link>
            <span className={styles.postTime}>{date.substring(0,10)}</span>
          </div>
        </div>
        <div className={styles.postContent}>{post.content}</div>

        <div className={styles.postActions}>
          <div className={styles.postLike}>
            
              <img
                src={like?"https://cdn-icons-png.flaticon.com/512/1076/1076984.png":"https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/000000/external-like-instagram-flatart-icons-outline-flatarticons.png"}
                alt="likes-icon"
                onClick={handlePostLikeClick}
              />
            
            <span>{likeLength}</span>
          </div>

          <div className={styles.postCommentsIcon}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1029/1029183.png"
              alt="comments-icon"
            />
            <span>{post.comments.length}</span>
          </div>
        </div>
        <div className={styles.postCommentBox}>
          <input
            placeholder="Start typing a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleAddComment}
          />
        </div>

        <div className={styles.postCommentsList}>
          {post.comments.map((comment) => (
            <Comment comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;
