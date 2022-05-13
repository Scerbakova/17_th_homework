import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Loader from '../../components/Loader/Loader';
import { Location } from '../../Models/LoactionModel';
import LocationsPage from './LocationsPage';

const LocationPage = () => {
  const [location, setLocation] = useState<Location>();
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();
  const [currentLocation, setCurrentLocation] = useState<number>(Number(id));
  const navigate = useNavigate();
  const getLocation = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/location/${currentLocation}`);
      setLocation(response.data);
    } catch (error) {
      navigate('/locations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, [currentLocation]);

  const prev = Number(currentLocation) - 1;
  const next = Number(currentLocation) + 1;

  return (
    <div className="text-center">
      { location && (
      <div>
        <div className="navigation--inner">
          <button
            disabled={prev === 0}
            onClick={
              () => {
                (setCurrentLocation(prev));
                (navigate(`/locations/${currentLocation - 1}`));
              }
}
            className="previous btn btn-primary"
          >
            Previous

          </button>
          <h1 className="title">Location</h1>
          <button
            disabled={next === 127}
            onClick={
              () => {
                (setCurrentLocation(next));
                (navigate(`/locations/${currentLocation + 1}`));
              }
}
            className="next btn btn-danger"
          >
            Next

          </button>
        </div>

        <div className="row episode__row">
          <div className="col">
            <span className="character">id:</span>
          </div>
          <div className="col">
            {location.id}
          </div>
        </div>

        <div className="row episode__row">
          <div className="col">
            <span className="character">name:</span>
          </div>
          <div className="col">
            {location.name}
          </div>
        </div>

        <div className="row episode__row">
          <div className="col">
            <span className="character">type:</span>
          </div>
          <div className="col">
            {location.type}
          </div>
        </div>

        <div className="row episode__row">
          <div className="col">
            <span className="character">dimention:</span>
          </div>
          <div className="col">
            {location.dimension}
          </div>
        </div>

        <div className="characters">
          <div className="row episode__row">
            <div className="col">
              <span className="character">residents:</span>
            </div>
            <div className="col">
              {location.residents.map(
                (resident) => (
                  <button
                    key={resident}
                    className="button button__episode"
                    onClick={() => navigate(resident.replace((resident.slice(0, 42)), '/characters/'))}
                  >
                    {resident.replace((resident.slice(0, 42)), '/characters/')}
                  </button>
                ),
              )}
            </div>
          </div>
        </div>
        <div className="url">
          <div className="row episode__row">
            <div className="col">
              <span className="character">url:</span>
            </div>
            <div className="col">
              <button
                key={location.url}
                className="button button__episode"
                onClick={() => navigate(location.url.replace((location.url.slice(0, 41)), '/locations/'))}
              >
                {location.url.replace((location.url.slice(0, 41)), '/locations/')}
              </button>
            </div>
          </div>
        </div>

        <div className="row episode__row">
          <div className="col">
            <span className="character">created:</span>
          </div>
          <div className="col">
            {location.created}
          </div>
        </div>
      </div>
      )}
      {loading && <Loader />}
    </div>
  );
};
export default LocationPage;
