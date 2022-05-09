import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Character } from '../../Models/CharacterModel';

const CaractersPage = () => {
  const [characters, setCharacters] = useState<Character[]>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const navigate = useNavigate();

  const getCharacters = async () => {
    try {
      const response = await axios.get('https://rickandmortyapi.com/api/character');
      setCharacters(response.data.results);
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
    <div className="text-center">
      <h1 className="title">Characters</h1>
      <div className="row gx-2 justify-content-center">
        {characters && characters.map(({ id, name, image }) => (
          <div key={id} className="card__wrapper col-xs-2 col-sm-4 col-lg-3">
            <div className="card text-dark bg-warning mb-3">
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
      <div>{errorMessage && <span>{ errorMessage }</span>}</div>
    </div>
  );
};

export default CaractersPage;
