import PropTypes from 'prop-types';

import styles from '../styles/home.module.css';

const Comment = ({ comment }) => {
  var time = new Date(comment.createdAt).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})
  return (
    <div className={styles.postCommentsItem}>
      <div className={styles.postCommentHeader}>
        <span className={styles.postCommentAuthor}>{comment.user.name}</span>
        <span className={styles.postCommentTime}>at {time.substring(10)}</span>
        <span className={styles.postCommentLikes}></span>
      </div>

      <div className={styles.postCommentContent}>{comment.content}</div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default Comment;
