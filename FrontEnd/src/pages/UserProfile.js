import { useNavigate, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import styles from "../styles/settings.module.css";
import { useEffect, useState } from "react";
import { addFriend, fetchUserProfile, removeFriend } from "../Api";
import { Loader } from "../components";
import { useAuth } from "../hooks";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [requestInProgress, setrequestInProgress] = useState(false);

  const { userId } = useParams();
  const { addToast } = useToasts();
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    const getUser = async () => {
      const response = await fetchUserProfile(userId);
      if (response.success) {
        setUser(response.data.user);
      } else {
        addToast("response.message", {
          appearance: "error",
        });
        return navigate("/");
      }
      setLoading(false);
    };
    getUser();
  }, [userId, navigate, addToast]);

  if (loading) {
    return <Loader />;
  }

  const checkIfUserIsAFriend = () => {
    const friends = auth.user.friends;

    const FriendIds = friends.map((friend) => friend.to_user._id);
    const index = FriendIds.indexOf(userId);
    if (index !== -1) {
      return true;
    } else {
      return false;
    }
  };
  const handleRemoveFriendClick = async () => {
    setrequestInProgress(true);

    const response = await removeFriend(userId);
    if (response.success) {
      const friendship = auth.user.friends.filter(
        (friend) => friend.to_user._id === userId
      );
      auth.updateUserFriends(false, friendship[0]);
      addToast("Remove Friend Successfully !!", {
        appearance: "success",
      });
    } else {
      addToast(response.message, {
        appearance: "error",
      });
    }

    setrequestInProgress(false);
  };

  const handleAddFriendClick = async () => {
    setrequestInProgress(true);

    const response = await addFriend(userId);
    if (response.success) {
      const { friendship } = response.data;
      auth.updateUserFriends(true, friendship);
      addToast("Friend added Successfully !!", {
        appearance: "success",
      });
    } else {
      addToast(response.message, {
        appearance: "error",
      });
    }

    setrequestInProgress(false);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://freepikpsd.com/file/2019/10/avatar-icon-png-5-Images-PNG-Transparent.png"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>

        <div className={styles.fieldValue}>{user.name}</div>
      </div>

      {auth.user.userId===userId?undefined:<div className={styles.btnGrp}>
      {checkIfUserIsAFriend() ? (
        <button
          className={`button ${styles.saveBtn}`}
          onClick={handleRemoveFriendClick}
          disabled={requestInProgress}
        >
          {requestInProgress ? "Removing friend..." : "Remove friend"}
        </button>
      ) : (
        <button
          className={`button ${styles.saveBtn}`}
          onClick={handleAddFriendClick}
          disabled={requestInProgress}
        >
          {requestInProgress ? "Adding friend..." : "Add friend"}
        </button>
      )}
    </div>}
    </div>
  );
};

export default UserProfile;
