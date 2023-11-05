import { Link, Outlet, useLocation } from 'umi';
import styles from './index.less';

export default function Layout() {
  const location = useLocation()
  const fullpath = location.pathname + location.search

  return (
    <div className={styles.navs} key={fullpath}>
      <Outlet />
    </div>
  );
}
