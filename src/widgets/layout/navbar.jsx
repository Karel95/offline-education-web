import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Navbar as MTNavbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from '@material-tailwind/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import SubjectsFlyout from '../../components/subjects-flyout';

export function Navbar({ brandName, routes }) {
  const [openNav, setOpenNav] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.onupdatefound = () => {
          setUpdateAvailable(true); // Notify the user when an update is available
        };
      });
    }
  }, []);

  const handleUpdate = async () => {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.ready;
      await registration.update(); // Force an update of the SW
      window.location.reload(); // Reload the page to apply the update
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize); // Cleanup listener
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 text-inherit lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {routes.map(({ name, path, icon, href, target }) => (
        <Typography
          key={name}
          as="li"
          variant="small"
          color="inherit"
          className="capitalize"
        >
          {href ? (
            <a href={href} target={target} className="flex items-center gap-1 p-1 font-bold">
              {icon && React.createElement(icon, { className: 'w-[18px] h-[18px] opacity-75 mr-1' })}
              {name}
            </a>
          ) : (
            <Link to={path} target={target} className="flex items-center gap-1 p-1 font-bold">
              {icon && React.createElement(icon, { className: 'w-[18px] h-[18px] opacity-75 mr-1' })}
              {name}
            </Link>
          )}
        </Typography>
      ))}
    </ul>
  );

  return (
    <MTNavbar color="transparent" className="p-3">
      <div className="container mx-auto flex items-center justify-between text-white">
        <Link to="/">
          <Typography className="mr-4 ml-2 cursor-pointer py-1.5 font-bold">
            {brandName}
          </Typography>
        </Link>
        <div className="hidden lg:block">{navList}</div>
        <div className="hidden gap-2 lg:flex">
          <SubjectsFlyout maxHeight={'400px'} />
        </div>
        <IconButton
          variant="text"
          size="sm"
          color="white"
          className="ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>
      <MobileNav className="rounded-xl bg-blue-gray-900 px-4 pt-2 pb-4 text-white" open={openNav}>
        <div className="container mx-auto">
          <SubjectsFlyout maxHeight={'200px'} />
          {navList}
        </div>
      </MobileNav>

      {updateAvailable && (
        <div className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded">
          <span>New update available!</span>
          <Button variant="gradient" size="sm" fullWidth onClick={handleUpdate}>
            Refresh to Update
          </Button>
        </div>
      )}
    </MTNavbar>
  );
}

Navbar.defaultProps = {
  brandName: 'Suriname Offline Education Web',
};

Navbar.propTypes = {
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Navbar.displayName = '/src/widgets/layout/navbar.jsx';

export default Navbar;
