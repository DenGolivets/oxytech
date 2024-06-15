import NavBar from './NavBar';
import MobileNavBar from './MobileNavBar';

const navbarData = [
  {
    href: '/about',
    name: 'About us'
  },
  {
    href: '/artists',
    name: 'Artists'
  },
  {
    href: '/releases',
    name: 'Releases'
  },
  {
    href: '/contact',
    name: 'Contact'
  }
]

const ResponsiveNavBar = () => {
  return (
    <div className=''>
      <NavBar navbarData={navbarData}  />
      <MobileNavBar navbarData={navbarData}  />
    </div>
  );
};

export default ResponsiveNavBar;