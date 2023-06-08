import React, { useEffect } from 'react';

const MyModal = ({ children, visible, setVisible }) => {

  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : 'auto';
  }, [visible])

  return (
    <div
      className={`modalContainer ${visible ? 'active' : ''}`}
      onClick={() => setVisible(false)}
    >
      <div className="max-w-[400px]" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default MyModal;