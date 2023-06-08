import React from 'react';

const Footer = () => {
  return (
    <footer className="flex justify-center py-5 mt-auto bg-mainBlue">
      <div>
        Developed by {" "}
        <a
          className="text-blue-300 transition hover:underline"
          href="https://github.com/merteldem1r"
          rel="noreferrer"
          target="_blank"
        >
          Mert Eldemir
        </a>
      </div>
    </footer>
  );
};

export default Footer;