import React from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="container mt-[10vh]">
      <div className="flex flex-col gap-3 items-center">
        <ErrorIcon sx={{ fontSize: '50px' }} />
        <h2 className="text-xl">Page Not Found</h2>
        <Link
          to="/"
          className="p-2 px-4 bg-mainBlue rounded-sm hover:opacity-70 transition-all"
        >
          Back to home page
        </Link>
      </div>
    </section>
  );
};

export default NotFound;