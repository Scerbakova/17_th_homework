import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

export type EpisodeCardProps = {
  name: string,
  episode: string,
  id: number,
}

const EpisodeCard: FC<EpisodeCardProps> = ({ id, name, episode }) => {
  const navigate = useNavigate();
  return (
    <div className="card__wrapper col-xs-2 col-sm-4 col-lg-3">
      <div className="card-subtitle text-warning bg-success mb-3">
        <div className="card-body episode__card-body row">
          <h2 className="card-title">{name}</h2>
          <h3 className="card-subtitle mb-2 text-info">{episode}</h3>
          <p className="card-text text-dark">
            ID:
            {' '}
            {id}
          </p>
          <div className="col align-self-end">
            <button onClick={() => navigate(`/episodes/${id}`)} className="btn btn-danger">
              Read More

            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodeCard;
