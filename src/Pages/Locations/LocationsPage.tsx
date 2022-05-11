import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { Location } from '../../Models/LoactionModel';

const LocationsPage = () => {
  const [locations, setLocations] = useState<Location[]>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const getLocations = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://rickandmortyapi.com/api/location');
      setLocations(response.data.results);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.status === 404 ? 'Nothing to show' : error.message;
        setErrorMessage(message);
      } else {
        setErrorMessage('Not Axios Error');
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getLocations().then();
  }, []);
  return (
    <div className="text-center">
      <h1 className="title">Locations</h1>
      <div className="row gx-2 justify-content-center">
        {locations && locations.map(({ id, name, type }) => (
          <div key={id} className="card__wrapper col-xs-2 col-sm-4 col-lg-3">
            <div className="card text-dark bg-warning mb-3">
              <div>{type}</div>
              <div className="card-body character__card-body row">
                <h3 className="card-title">{name}</h3>
                <p className="card-text">
                  ID:
                  {' '}
                  {id}
                </p>
                <div className="col align-self-end">
                  <button
                    onClick={
                        () => navigate(`/locations/${id}`)
}
                    className="btn btn-danger"
                  >
                    Read More

                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>{errorMessage && <span>{errorMessage}</span>}</div>
      {loading && <Loader />}
    </div>
  );
};
export default LocationsPage;
