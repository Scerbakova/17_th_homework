import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { Character } from '../../Models/CharacterModel';
import Loader from '../../components/Loader/Loader';

const CharacterPage = () => {
  const [character, setCharacter] = useState<Character>();
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();
  const [currentCharacter, setCurrentCharacter] = useState<number>(Number(id));
  const navigate = useNavigate();
  const getCharacter = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/${currentCharacter}`);
      setCharacter(response.data);
    } catch (error) {
      navigate('/characters');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCharacter();
  }, [currentCharacter]);

  const prev = Number(currentCharacter) - 1;
  const next = Number(currentCharacter) + 1;

  return (
    <div className="text-center">
      {character && (
        <div>
          <div className="navigation--inner">
            <button
              disabled={prev === 0}
              onClick={
                () => {
                  (setCurrentCharacter(prev));
                  (navigate(`/characters/${currentCharacter - 1}`));
                }
}
              className="previous btn btn-primary"
            >
              Previous

            </button>
            <h1 className="title">Character</h1>
            <button
              disabled={next === 827}
              onClick={
                () => {
                  (setCurrentCharacter(next));
                  (navigate(`/characters/${currentCharacter + 1}`));
                }
}
              className="next btn btn-danger"
            >
              Next

            </button>
          </div>
          <div>
            <div className="row character__row">
              <div className="col">
                <span className="character">name:</span>
              </div>
              <div className="col">
                {character.name}
              </div>
            </div>

            <div className="row character__row">
              <div className="col">
                <span className="character">id:</span>
              </div>
              <div className="col">
                {character.id}
              </div>
            </div>

            <div className="row character__row">
              <div className="col">
                <span className="character">status:</span>
              </div>
              <div className="col">
                {character.status}
              </div>
            </div>

            <div className="row character__row">
              <div className="col">
                <span className="character">species:</span>
              </div>
              <div className="col">
                {character.species}
              </div>
            </div>
            {(character.type)
              ? (
                <div className="row character__row">
                  <div className="col">
                    <span className="character">type:</span>
                  </div>
                  <div className="col">
                    {character.type}
                  </div>
                </div>
              ) : (null)}

            <div className="row character__row">
              <div className="col">
                <span className="character">gender:</span>
              </div>
              <div className="col">
                {character.gender}
              </div>
            </div>

            <div className="row character__row">
              <div className="col">
                <span className="character">origin:</span>
              </div>
              <div className="col">
                <div>
                  {character.origin.name}
                </div>
                <div className="origin">
                  <a href={character.origin.url.replace((character.origin.url.slice(0, 41)), '/locations/')}>
                    {character.origin.url.replace((character.origin.url.slice(0, 41)), '/locations/')}
                  </a>
                </div>
              </div>
            </div>
            <div className="row character__row">
              <div className="col">
                <span className="character">location:</span>
              </div>
              <div className="col">
                <div>
                  {character.location.name}
                </div>
                <div className="location">
                  <a href={character.location.url.replace((character.location.url.slice(0, 41)), '/locations/')}>
                    {character.location.url.replace((character.location.url.slice(0, 41)), '/locations/')}
                  </a>
                </div>
              </div>
            </div>

            <div className="row character__row">
              <div className="col">
                <span className="character">image:</span>
              </div>
              <div className="col">
                <img className="img-thumbnail character__image" src={character.image} alt="character" />
              </div>
            </div>

            <div className="episodes">
              <div className="row character__row">
                <div className="col">
                  <span className="character">episodes:</span>
                </div>
                <div className="col">
                  {character.episode.map((link) => (
                    <div key={link}>
                      <a href={link.replace((link.slice(0, 40)), '/episodes/')} key={id}>
                        {link.replace((link.slice(0, 40)), '/episodes/')}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="url">
              <div className="row character__row">
                <div className="col">
                  <span className="character">url:</span>
                </div>
                <div className="col">
                  <a href={character.url.replace((character.url.slice(0, 42)), '/characters/')}>
                    {character.url.replace((character.url.slice(0, 42)), '/characters/')}
                  </a>
                </div>
              </div>
            </div>

            <div className="row character__row">
              <div className="col">
                <span className="character">created:</span>
              </div>
              <div className="col">
                {character.created}
              </div>
            </div>
          </div>

        </div>
      )}
      {loading && <Loader />}
    </div>
  );
};

export default CharacterPage;
