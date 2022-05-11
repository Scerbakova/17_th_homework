import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { Episode } from '../../Models/EpisodeModel';

const EpisodesPage = () => {
  const [episodes, setEpisodes] = useState<Episode[]>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const getEpisodes = async () => {
    setLoading(true);
    const params = `?name=${inputValue}`;
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/episode/${params}`);
      setEpisodes(response.data.results);
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
    getEpisodes().then();
  }, [search]);

  useEffect(() => {
    setInputValue('');
  }, [search]);

  return (
    <div className="center">
      <div className="row justify-content-center">
        <div className="text-center">
          <h1 className="title">Episodes</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setInputValue('');
            }}
            className="input__search"
          >
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              type="text"
              placeholder="Search by name"
            />
            <button
              onClick={() => setSearch(inputValue)}
              className="btn btn-info"
            >
              Search

            </button>
          </form>
          <div className="row gx-2 justify-content-center">
            {episodes && episodes.map(({ id, name, episode }) => (
              <div key={id} className="card__wrapper col-xs-2 col-sm-4 col-lg-3">
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
                      <button
                        onClick={
                            () => navigate(`/episodes/${id}`)
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
        </div>
      </div>
      <div>{errorMessage && <span>{errorMessage}</span>}</div>
      {loading && <Loader />}
    </div>
  );
};
export default EpisodesPage;
