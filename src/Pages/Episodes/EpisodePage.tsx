import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Loader from '../../components/Loader/Loader';
import { Episode } from '../../Models/EpisodeModel';

const EpisodePage = () => {
  const [episode, setEpisode] = useState<Episode>();
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();
  const [currentEpisode, setCurrentEpisode] = useState<number>(Number(id));
  const navigate = useNavigate();
  const getEpisode = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/episode/${currentEpisode}`);
      setEpisode(response.data);
    } catch (error) {
      navigate('/episodes');
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
              () => {
                (setCurrentEpisode(prev));
                (navigate(`/episodes/${currentEpisode - 1}`));
              }
}
            className="previous btn btn-primary"
          >
            Previous

          </button>
          <h1 className="title">Episode</h1>
          <button
            disabled={next === 52}
            onClick={
              () => {
                (setCurrentEpisode(next));
                (navigate(`/episodes/${currentEpisode + 1}`));
              }
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
                  <button
                    key={character}
                    className="button button__episode"
                    onClick={() => navigate(character.replace((character.slice(0, 42)), '/characters/'))}
                  >
                    {character.replace((character.slice(0, 42)), '/characters/')}
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
                key={episode.url}
                className="button button__episode"
                onClick={() => navigate(episode.url.replace((episode.url.slice(0, 40)), '/episodes/'))}
              >
                {episode.url.replace((episode.url.slice(0, 40)), '/episodes/')}
              </button>
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
