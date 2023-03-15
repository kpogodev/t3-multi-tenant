import { link } from "fs"
import Link from "next/link"
import { api } from "utils/api"
import styles from "../styles/Navbar.module.css"

const Navbar = ({ domain }: { domain: string }) => {
  const { data: navigation } = api.sites.navigation.getNavigation.useQuery(domain, { enabled: !!domain })

  if (typeof navigation === "undefined") return <></>

  // alphabetically sort the navigation
  const sortedNavigation = navigation.sort((a, b) => a.name.localeCompare(b.name))

  return (
    <nav className={styles.container}>
      <ul className={styles.list}>
        <li key='home-link' className={styles.item}>
          <Link className={styles.link} href='/'>
            Home
          </Link>
        </li>
        {sortedNavigation.map((page) => (
          <li key={page.id} className={styles.item}>
            <Link href={`/${page.slug}`} className={styles.link}>
              {page.name}
            </Link>
            {page.children.length > 0 && (
              <ul className={styles["sub-list"]}>
                {page.children.map((child) => (
                  <li key={child.id} className={styles["sub-item"]}>
                    <Link href={`/${child.slug}`} className={styles["sub-link"]}>
                      {child.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
export default Navbar
