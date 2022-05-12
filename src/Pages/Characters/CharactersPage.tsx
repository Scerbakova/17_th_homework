import axios from 'axios';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { Character } from '../../Models/CharacterModel';

const CaractersPage = () => {
  const [characters, setCharacters] = useState<Character[]>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [nextPage, setNextPage] = useState<string>();
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const getCharacters = async () => {
    setLoading(true);
    const params = activeFilter === 'all' ? '' : `?status=${activeFilter}`;
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/${params}`);
      setCharacters(response.data.results);
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

  const getMoreCharacters = async () => {
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
    const moreCharacters = await getMoreCharacters();
    if (characters) {
      setCharacters([...characters, ...moreCharacters]);
    }
  };

  useEffect(() => {
    getCharacters();
  }, [activeFilter]);

  return (
    <div className="text-center">
      <h1 className="title">Characters</h1>
      <div className="buttons">
        <button onClick={() => setActiveFilter('all')} className="btn btn-primary">All</button>
        <button onClick={() => setActiveFilter('alive')} className="btn btn-success">Alive</button>
        <button onClick={() => setActiveFilter('dead')} className="btn btn-danger">Dead</button>
        <button onClick={() => setActiveFilter('unknown')} className="btn btn-warning">Unknown</button>
      </div>
      {characters && (
      <InfiniteScroll
        dataLength={characters.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={(
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
  )}
      >
        <div className="row gx-2 justify-content-center">
          {characters && characters.map(({
            id, name, image, status,
          }) => (
            <div key={id} className="card__wrapper col-xs-2 col-sm-4 col-lg-3">
              <div className={
              `card text-dark mb-3
              ${(status === 'Alive') ? 'bg-success' : ''}
              ${(status === 'Dead') ? 'bg-danger' : ''}
              ${(status === 'unknown') ? 'bg-warning' : ''}`
}
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
          ))}
        </div>
      </InfiniteScroll>
      )}

      <div>{errorMessage && <span>{errorMessage}</span>}</div>
      {loading && <Loader />}
    </div>
  );
};

export default CaractersPage;
