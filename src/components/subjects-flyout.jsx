import { Button } from '@material-tailwind/react';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importa Link

const SubjectsFlyout = ({ maxHeight }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const flyoutRef = useRef(null); // Create a ref for the flyout

  const toggleFlyout = () => {
    setIsOpen((prev) => !prev);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleClickOutside = (event) => {
    // Check if the click is outside the flyout
    if (flyoutRef.current && !flyoutRef.current.contains(event.target)) {
      setIsOpen(false); // Close the flyout
    }
  };

  useEffect(() => {
    // Add event listener for clicks
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={flyoutRef}>
      <Button
        variant="text"
        size="sm"
        color="white"
        fullWidth
        type="button"
        className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-white"
        aria-expanded={isOpen}
        onClick={toggleFlyout}
      >
        <span>Subjects</span>
        <svg
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </Button>

      {isOpen && (
        <div className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
          <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
            <div className="p-4" style={{ maxHeight, overflowY: 'auto' }}>
              {/* Estructura de ejemplo */}
              <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                  <svg
                    className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
                    />
                  </svg>
                </div>
                <div>
                  <button
                    className="font-semibold text-gray-900"
                    onClick={() => {
                      handleNavigation('/subjects/mathematics'); // Navigate to the route
                      setIsOpen(false); // Close the flyout
                    }}
                  >
                    English Language Arts (ELA)
                    <span className="absolute inset-0"></span>
                  </button>
                  <p className="mt-1 text-gray-600">
                    Reading, Writing, Speaking and Listening, Vocabulary Development
                  </p>
                </div>
              </div>

              <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                  <svg
                    className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
                    />
                  </svg>
                </div>
                <div>
                  <button
                    className="font-semibold text-gray-900"
                    onClick={() => {
                      handleNavigation('/subjects/mathematics'); // Navigate to the route
                      setIsOpen(false); // Close the flyout
                    }}
                  >
                    Mathematics
                    <span className="absolute inset-0"></span>
                  </button>
                  <p className="mt-1 text-gray-600">
                    Basic Arithmetic, Geometry, Measurement, Data and Probability
                  </p>
                </div>
              </div>

              {/* Sección para otros enlaces */}
              <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50 mt-4">
                <Link to="/help" className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100">
                  <svg
                    className="h-5 w-5 flex-none text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Help
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectsFlyout;
