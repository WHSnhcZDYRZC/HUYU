import { Link, Outlet } from 'umi';
import styles from './index.less';
import Menu from './components/Menu/Menu';

export default () => {

  return (
    <div className={styles.layout}>
      <Menu />
      <div className='main'>
        <Outlet />
      </div>
    </div>
  );
}
