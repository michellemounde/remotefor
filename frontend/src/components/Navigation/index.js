import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import ProfileButton from './ProfileButton';

import './Navigation.css';

const Navigation = ({ isLoaded }) => {
  const user = useSelector(state => state.session.user);

  return (
    <nav>
      <ul>
        <li><NavLink activeClassName='active' to='/' exact>Home</NavLink></li>
        {isLoaded && (
          <li><ProfileButton user={user} /></li>
        )}
      </ul>
    </nav>
  )
}

export default Navigation;
