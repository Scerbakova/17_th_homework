import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Loader from '../../components/Loader/Loader';
import { Episode } from '../../Models/EpisodeModel';

const EpisodePage = () => {
  const [episode, setEpisode] = useState<Episode>();
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const getCharacter = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/episode/${id}`);
      setEpisode(response.data);
    } catch (error) {
      navigate('/users');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      getCharacter().then();
    }
  }, []);
  return (
    <div className="text-center">
      <h1 className="title">Episode</h1>

      <div className="row episode__row">
        <div className="col">
          <span className="character">name:</span>
        </div>
        <div className="col">
          {episode?.name}
        </div>
      </div>

      <div className="row episode__row">
        <div className="col">
          <span className="character">id:</span>
        </div>
        <div className="col">
          {episode?.id}
        </div>
      </div>

      <div className="row episode__row">
        <div className="col">
          <span className="character">air date:</span>
        </div>
        <div className="col">
          {episode?.air_date}
        </div>
      </div>

      <div className="row episode__row">
        <div className="col">
          <span className="character">episode:</span>
        </div>
        <div className="col">
          {episode?.episode}
        </div>
      </div>

      <div className="characters">
        <div className="row episode__row">
          <div className="col">
            <span className="character">characters:</span>
          </div>
          <div className="col">
            {episode?.characters?.map((character) => <div>{character}</div>)}
          </div>
        </div>
      </div>

      <div className="url">
        <div className="row episode__row">
          <div className="col">
            <span className="character">url:</span>
          </div>
          <div className="col">
            {episode?.url}
          </div>
        </div>
      </div>

      <div className="row episode__row">
        <div className="col">
          <span className="character">created:</span>
        </div>
        <div className="col">
          {episode?.created}
        </div>
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default EpisodePage;
