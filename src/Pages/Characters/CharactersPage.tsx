import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { Character } from '../../Models/CharacterModel';

const CaractersPage = () => {
  const [characters, setCharacters] = useState<Character[]>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  // const [page, setPage] = useState(1);
  // const [axiosing, setAxiosing] = useState(true);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  // const [totalPages, setTotalPages] = useState(0);

  // const scrollHandler = () => {
  //   if (document.documentElement.offsetHeight - (window.innerHeight + document.documentElement.scrollTop) < 100) {
  //     setAxiosing(true);
  //   }
  // };

  // const scrollHandler = useCallback(() => {
  //   if (
  //     window.innerHeight
  //       + Math.max(
  //         window.pageYOffset,
  //         document.documentElement.scrollTop,
  //         document.body.scrollTop,
  //       )
  //     > document.documentElement.offsetHeight - 100
  //   ) {
  //     setAxiosing(true);
  //   }
  // }, []);

  // useEffect(() => {
  //   document.addEventListener('scroll', scrollHandler);
  //   const scroll = () => {
  //     document.removeEventListener('scroll', scrollHandler);
  //     return scroll;
  //   };
  // }, []);

  const getCharacters = async () => {
    setLoading(true);
    const params = activeFilter === 'all' ? '' : `?status=${activeFilter}`;
    // const currentPage = '?page='.concat(`${page}`);
    // console.log(currentPage);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/${params}`);
      // console.log(response);
      setCharacters(response.data.results);
      // setTotalPages(42);
      // setPage(page + 1);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.status === 404 ? 'Nothing to show' : error.message;
        setErrorMessage(message);
      } else {
        setErrorMessage('Not Axios Error');
      }
    } finally {
      setLoading(false);
      // setAxiosing(false);
    }
  };

  // useEffect(() => {
  //   if (axiosing) {
  //     console.log('axiosing');
  //     getCharacters();
  //   }
  // }, [axiosing]);

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
      <div>{errorMessage && <span>{errorMessage}</span>}</div>
      {loading && <Loader />}
    </div>
  );
};

export default CaractersPage;
