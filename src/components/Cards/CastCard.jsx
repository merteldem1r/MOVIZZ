import React, { useState } from 'react';
import MyModal from "../UI/MyModal/MyModal.jsx";

const CastCard = ({ actor }) => {
  const [isModal, setIsModal] = useState(false);
  const imageURL = actor.profile_path
    ? `https://image.tmdb.org/t/p/original/${actor.profile_path}`
    : '/img/no-image.png';

  return (
    <div className="relative pb-2 md:pb-6 flex flex-col gap-2">
      <img
        onClick={() => setIsModal(true)}
        className="max-w-[125px] sm:max-w-[150px] rounded-md opacity-95 cursor-pointer hover:opacity-60 transition-all"
        src={imageURL}
        alt="Actor"
      />
      <MyModal visible={isModal} setVisible={setIsModal}>
        <img
          className="block md:w-full sm:w-4/5 w-3/5 rounded-md"
          src={imageURL}
          alt="actor"
        />
      </MyModal>
      <div>
        <div className="text-md">{actor.name}</div>
        <div className="text-sm">{actor.character}</div>
      </div>
    </div>
  );
};

export default CastCard;