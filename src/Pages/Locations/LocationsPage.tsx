import axios from 'axios';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { Location } from '../../Models/LoactionModel';

const LocationsPage = () => {
  const [locations, setLocations] = useState<Location[]>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [nextPage, setNextPage] = useState<string>();
  const [hasMore, setHasMore] = useState(true);

  const getLocations = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://rickandmortyapi.com/api/location');
      setLocations(response.data.results);
      if (response.data.info.next === null) {
        setHasMore(false);
      } else {
        setNextPage(response.data.info.next);
        setHasMore(true);
      }
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

  const getMoreLocations = async () => {
    setLoading(true);
    try {
      if (nextPage) {
        const response = await axios.get(nextPage);
        setNextPage(response.data.info.next);
        const data = response.data.results;
        return data;
      }
      setHasMore(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.status === 404 ? 'Nothing to show' : error.message;
        setErrorMessage(message);
      } else {
        setErrorMessage('Not Axios Error');
      }
    } finally {
      setLoading(false);
    } return [];
  };

  const fetchData = async () => {
    const moreLocations = await getMoreLocations();
    if (locations) {
      setLocations([...locations, ...moreLocations]);
    }
  };

  useEffect(() => {
    getLocations().then();
  }, []);

  return (
    <div className="text-center">
      <h1 className="title">Locations</h1>
      {locations && (
      <InfiniteScroll
        dataLength={locations.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <div className="row gx-2 justify-content-center">
          {locations && locations.map(({ id, name, type }) => (
            <div key={id} className="card__wrapper col-xs-2 col-sm-4 col-lg-3">
              <div className="card text-dark bg-warning mb-3">
                <div>{type}</div>
                <div className="card-body location__card-body row">
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
      </InfiniteScroll>
      )}
      <div>{errorMessage && <span>{errorMessage}</span>}</div>
      {loading && <Loader />}
    </div>
  );
};
export default LocationsPage;
