import { Link } from 'react-router-dom';

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <nav>
        <ul className="nav">
        <li className="nav-item">
      {[
      <Link key={1} className="nav-link text-light" to="/">
        Home
      </Link>,
    ]}
    </li>
    <li className='nav-item'>
    {[
      <Link key={2} className="nav-link text-light" to="/SavedCandidates">
        Saved Candidates
      </Link>,
    ]}
    </li>
    </ul>
  </nav>
  )
};

export default Nav;
