import { Link } from 'react-router-dom';

import styles from "../styles/home.module.css";
import { useAuth } from '../hooks';

const FriendsList = () => {
  const auth = useAuth();
  const { friends = [] } = auth.user;
 

  return (
    <div className={styles.friendsList}>
      <div className={styles.header}>Friends</div>

      {friends && friends.length === 0 && (
        <div className={styles.noFriends}>NO friends found!</div>
      )}

      {friends &&
        friends.map((friend) => (
          <div key={`friend-${friend._id}`}>
            <Link className={styles.friendsItem} to={`/user/${friend.to_user._id}`}>
              <div className={styles.friendsImg}>
                <img
                  src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png"
                  alt=""
                />
              </div>
              <div className={styles.friendsName}>{friend.to_user.name}</div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default FriendsList;