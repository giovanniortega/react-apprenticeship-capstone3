import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../store/StoreContext';
import Search from '../../components/Search/Search.component';
import classes from './Aside.module.css';

const Aside = () => {
  const { store } = useContext(StoreContext);
  const { location } = store;

  return (
    <div className={classes['aside-container']}>
      <Search />
      {location == '/' && (
        <Link to="/archive" className={classes.link}>
          My archived notes
        </Link>
      )}
      {location == '/archive' && (
        <Link to="/" className={classes.link}>
          My notes
        </Link>
      )}
    </div>
  );
};

export default Aside;
