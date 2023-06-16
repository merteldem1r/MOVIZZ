import React, { useEffect } from 'react';

const MyModal = ({ children, visible, setVisible }) => {

  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    }
  }, [visible])

  return (
    <div
      className={`modalContainer ${visible ? 'active' : ''}`}
      onClick={() => setVisible(false)}
    >
      <div className="flex justify-center max-w-[400px]" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default MyModal;