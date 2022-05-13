import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

export type LocationCardProps = {
  type: string,
  name: string,
  id: number,
}

const LocationsPage: FC<LocationCardProps> = ({ type, name, id }) => {
  const navigate = useNavigate();
  return (
    <div className="card__wrapper col-xs-2 col-sm-4 col-lg-3">
      <div className="card text-dark bg-warning mb-3">
        <div className="card-text">{type}</div>
        <div className="card-body location__card-body row">
          <h3 className="card-title">{name}</h3>
          <p className="card-text">
            ID:
            {' '}
            {id}
          </p>
          <div className="col align-self-end">
            <button onClick={() => navigate(`/locations/${id}`)} className="btn btn-danger">
              Read More

            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationsPage;
