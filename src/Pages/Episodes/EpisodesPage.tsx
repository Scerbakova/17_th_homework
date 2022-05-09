import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Episode } from '../../Models/EpisodeModel';

const EpisodesPage = () => {
  const [episodes, setEpisodes] = useState<Episode[]>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const navigate = useNavigate();

  const getCharacters = async () => {
    try {
      const response = await axios.get('https://rickandmortyapi.com/api/episode');
      setEpisodes(response.data.results);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.status === 404 ? 'Nothing to show' : error.message;
        setErrorMessage(message);
      } else {
        setErrorMessage('Not Axios Error');
      }
    } finally {
      console.log('BEIGAS');
    }
  };

  useEffect(() => {
    getCharacters().then();
  }, []);
  return (
    <div className="center">
      <div className="row justify-content-center">
        <div className="text-center">
          <h1 className="title">Episodes</h1>
          <div className="row gx-2 justify-content-center">
            {episodes && episodes.map(({ id, name, episode }) => (
              <div className="card__wrapper col-xs-2 col-sm-4 col-lg-3">
                <div key={id} className="card-subtitle text-warning bg-success mb-3">
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
      <div>{errorMessage && <span>{ errorMessage }</span>}</div>
    </div>
  );
};

export default EpisodesPage;
