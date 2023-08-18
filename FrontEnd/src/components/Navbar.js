import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/navbar.module.css";

import { useAuth } from "../hooks";
import { searchUsers } from "../Api";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
const Navbar = () => {
  const [results, setResults] = useState([]);
  let [searchText, setSearchText] = useState("");
  const auth = useAuth();
  

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await searchUsers(searchText);

      if (response.success) {
        setResults(response.data.users);
      }
    };

    if (searchText.length > 2) {
      fetchUsers();
    } else {
      setResults([]);
    }
  }, [searchText]);

  const openNav = () => {
    let threeDot = document.getElementsByClassName(styles.mobileright);
    threeDot[0].style.display = "flex";
  };
  const closenav=()=>{
    let threeDot = document.getElementsByClassName(styles.mobileright);
    threeDot[0].style.display = "none";

  }

  return (
    <>
      <div className={styles.nav}>
        <div className={styles.leftDiv}>
          <Link to="/">
                <span className={styles.logo}>TweetClone</span>
          </Link>
        </div>
        <div className={styles.searchContainer}>
          <img
            className={styles.searchIcon}
            src="https://img.icons8.com/ios-glyphs/60/000000/search--v1.png"
            alt=""
          />

          <input
            placeholder="Search users"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        

          {results.length > 0 && (
            <div className={styles.searchResults}>
              <ul>
                {results.map((user) => (
                  <li
                    className={styles.searchResultsRow}
                    key={`user-${user._id}`}
                  >
                    <Link to={`/user/${user._id}`}>
                      <img
                        src="https://freepikpsd.com/file/2019/10/avatar-icon-png-5-Images-PNG-Transparent.png"
                        alt=""
                      />
                      <span>{user.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className={styles.rightNav}>
          {auth.user && (
            <div className={styles.user}>
              <Link to="/settings">
                <img
                  src="https://freepikpsd.com/file/2019/10/avatar-icon-png-5-Images-PNG-Transparent.png"
                  alt=""
                  className={styles.userDp}
                />
              </Link>
              <span>{auth.user.name}</span>
            </div>
          )}

          <div className={styles.navLinks}>
            <ul>
              {auth.user ? (
                <>
                  <li onClick={auth.logout}>Log out</li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">Log in</Link>
                  </li>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        <div className={styles.mobileRightDiv}>
          <img
            className={styles.mobileIcon}
            src="https://img.icons8.com/ios-filled/100/ffffff/menu-2.png"
            alt=""
            onClick={openNav}
          />
          <div className={styles.mobileright}>
            {auth.user && (
              <div className={styles.user}>
                <Link to="/settings">
                  <img
                    src="https://freepikpsd.com/file/2019/10/avatar-icon-png-5-Images-PNG-Transparent.png"
                    alt=""
                    className={styles.userDp}
                  />
                </Link>
                <span>{auth.user.name}</span>
              </div>
            )}
            {!auth.user && (
              <div className={styles.user}>
              
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMWXvjCtsKhCd5uDDa427zET7OjCVa_r8JzQ&usqp=CAU"
                    alt=""
                    className={styles.userDp}
                  />
                
               
              </div>
            )}

            <div className={styles.navLinks}>
              <ul>
                {auth.user ? (
                  <>
                    <li onClick={auth.logout}>Log out</li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/login">Log in</Link>
                    </li>
                    <li>
                      <Link to="/register">Register</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <div className={styles.close} onClick={closenav}>CLOSE</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
