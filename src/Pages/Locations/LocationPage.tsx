import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Loader from '../../components/Loader/Loader';
import { Location } from '../../Models/LoactionModel';

const LocationPage = () => {
  const [location, setLocation] = useState<Location>();
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();
  const [currentLocation, setCurrentLocation] = useState(id && +id);
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

  return (
    <div className="text-center">
      { location && (
      <div>
        <div className="navigation--inner">
          <button
            onClick={
                () => setCurrentLocation(Number(currentLocation) - 1)
}
            className="previous btn btn-primary"
          >
            Previous

          </button>
          <h1 className="title">Episode</h1>
          <button
            onClick={
              () => setCurrentLocation(Number(currentLocation) + 1)
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
                  <div key={resident}>
                    <a
                      href={resident}
                    >
                      {resident}
                    </a>
                  </div>
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
              <a href={location.url}>{location.url}</a>
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
