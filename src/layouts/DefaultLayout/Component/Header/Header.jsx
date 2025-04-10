import styles from "../Header/Header.module.scss"

function Header() {
  return (
    <header id="header" className={styles.wrapper}>
      <div className={styles.mapContainer}>
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.384751703631!2d106.700423!3d10.778957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3d8c79a1f3%3A0x8d8b9d1afc4e3087!2zQ8O0bmcgTmdo4buHIFRo4buNIFRow6FpLCBQaMaw4budbmcgMiBTw6FjaCBUaOG7iywgUXXhuq1uIDcsIEjDoCBO4buZaSwgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1616563323341!5m2!1sen!2s"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </header>
  );
}

export default Header;
