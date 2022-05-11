import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Loader from '../../components/Loader/Loader';
import { Episode } from '../../Models/EpisodeModel';

const EpisodePage = () => {
  const [episode, setEpisode] = useState<Episode>();
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();
  const [currentEpisode, setCurrentEpisode] = useState(id && +id);
  const navigate = useNavigate();
  const getEpisode = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/episode/${currentEpisode}`);
      setEpisode(response.data);
    } catch (error) {
      navigate('/users');
    } finally {
      setLoading(false);
    }
  };

  const prev = Number(currentEpisode) - 1;
  const next = Number(currentEpisode) + 1;

  useEffect(() => {
    getEpisode();
  }, [currentEpisode]);

  return (
    <div className="text-center">
      { episode && (
      <div>
        <div className="navigation--inner">
          <button
            disabled={prev === 0}
            onClick={
                () => setCurrentEpisode(prev)
}
            className="previous btn btn-primary"
          >
            Previous

          </button>
          <h1 className="title">Episode</h1>
          <button
            disabled={next === 52}
            onClick={
              () => setCurrentEpisode(next)

}
            className="next btn btn-danger"
          >
            Next

          </button>
        </div>

        <div className="row episode__row">
          <div className="col">
            <span className="character">name:</span>
          </div>
          <div className="col">
            {episode.name}
          </div>
        </div>

        <div className="row episode__row">
          <div className="col">
            <span className="character">id:</span>
          </div>
          <div className="col">
            {episode.id}
          </div>
        </div>

        <div className="row episode__row">
          <div className="col">
            <span className="character">air date:</span>
          </div>
          <div className="col">
            {episode.air_date}
          </div>
        </div>

        <div className="row episode__row">
          <div className="col">
            <span className="character">episode:</span>
          </div>
          <div className="col">
            {episode.episode}
          </div>
        </div>

        <div className="characters">
          <div className="row episode__row">
            <div className="col">
              <span className="character">characters:</span>
            </div>
            <div className="col">
              {episode.characters.map(
                (character) => (
                  <div key={character}>
                    <a
                      href={character}
                    >
                      {character}
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
              <a href={episode.url}>{episode.url}</a>
            </div>
          </div>
        </div>

        <div className="row episode__row">
          <div className="col">
            <span className="character">created:</span>
          </div>
          <div className="col">
            {episode.created}
          </div>
        </div>
      </div>
      )}
      {loading && <Loader />}
    </div>
  );
};

export default EpisodePage;
