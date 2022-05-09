import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { url } from 'inspector';
import { Character } from '../../Models/CharacterModel';
import Loader from '../../components/Loader/Loader';

const CharacterPage = () => {
  const [character, setCharacter] = useState<Character>();
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const getCharacter = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
      setCharacter(response.data);
    } catch (error) {
      navigate('/characters');
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
      {character && (
        <div>
          <h1 className="title">Character</h1>
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
                  <a href={character.origin.url}>{character.origin.url}</a>
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
                  <a href={character.location.url}>{character.location.url}</a>
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
                  {character.episode.map((link) => <div><a href={link} key={Math.random()}>{link}</a></div>)}
                </div>
              </div>
            </div>

            <div className="url">
              <div className="row character__row">
                <div className="col">
                  <span className="character">url:</span>
                </div>
                <div className="col">
                  <a href={character.url}>{character.url}</a>
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
