import styles from "../styles/Footer.module.css"

const Footer = () => {
  return (
    <div className={styles.container}>
      <p>
        Copyright © {new Date().getFullYear()} - All right reserved - <a className="link-hover" href='https://kpwebdev.com'>KPDEV PLATFORM</a>
      </p>
    </div>
  )
}
export default Footer
