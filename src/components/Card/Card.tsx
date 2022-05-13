import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

export type CharacterCard = {
  id: number,
  name: string,
  image: string,
  status: string,
}

const Card: FC<CharacterCard> = ({
  id, name, image, status,
}) => {
  const navigate = useNavigate();

  return (
    <div key={id} className="card__wrapper col-xs-2 col-sm-4 col-lg-3">
      <div className={`card text-dark mb-3
                ${status === 'Alive' ? 'bg-success' : ''}
                ${status === 'Dead' ? 'bg-danger' : ''}
                ${status === 'unknown' ? 'bg-warning' : ''}`}
      >
        <img src={image} className="img-thumbnail card-img-top" alt="character" />
        <div className="card-body character__card-body row">
          <h3 className="card-title">{name}</h3>
          <p className="card-text">
            ID:
            {' '}
            {id}
          </p>
          <div className="col align-self-end">
            <button onClick={() => navigate(`/characters/${id}`)} className="btn btn-info">Read More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
