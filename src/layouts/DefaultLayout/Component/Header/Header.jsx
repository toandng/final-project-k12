
import styles from "../Header/Header.module.scss"

function Header() {
    return (
        <header id="header" className={styles.wrapper}>
           <div className={styles.img}>
                   <img src="/img/7.jpg" alt="Background" />
                 </div>
        </header>
    );
}

export default Header;