/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import './Pokemon.css';
import { Detail } from '../App';
interface Props {
  viewDetail: Detail;
  setDetail: React.Dispatch<React.SetStateAction<Detail>>;
  abilities:
    | {
        name: string;
        ability: string;
      }[]
    | undefined;
  id: number;
  name: string;
  image: string;
}

const PokemonList: React.FC<Props> = (props) => {
  const { name, id, image, abilities, viewDetail, setDetail } = props;
  const [isSelected, setSelected] = useState(false);
  const closeDetail = () => {
    setDetail({
      id: 0,
      isOpened: false,
    });
    setSelected(false);
  };
  useEffect(() => {
    setSelected(id === viewDetail?.id);
  }, [id, viewDetail]);
  return (
    <div
      className=""
      key={id}>
      {isSelected ? (
        <section className="pokemon-list-detailed">
          <div className="detail-container">
            <p
              className="detail-close"
              onClick={closeDetail}>
              X
            </p>
            <div className="detail-info">
              <img
                src={image}
                alt="pokemon"
                className="detail-img"
              />
              <p className="detail-name">{name}</p>
            </div>
            <div className="detail-skill">
              <p className="detail-ability">Abilities:</p>
              {abilities?.map((ab: any) => (
                <div className="">{ab.ability.name}</div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="pokemon-list-container">
          <p className="pokemon-name">{name}</p>
          <img
            src={image}
            alt="pokemon"
          />
        </section>
      )}
    </div>
  );
};

export default PokemonList;
