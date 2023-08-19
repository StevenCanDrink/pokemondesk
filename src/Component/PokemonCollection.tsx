import React from 'react';
import { PokemonDetail } from '../interface';
import PokemonList from './PokemonList.tsx';
import './Pokemon.css';
import { Detail } from '../App.tsx';
interface Props {
  pokemons: PokemonDetail[];
  viewDetail: Detail;
  setDetail: React.Dispatch<React.SetStateAction<Detail>>;
}

const PokemonCollection: React.FC<Props> = (props) => {
  const { pokemons, viewDetail, setDetail } = props;
  const selectPokemon = (id: number) => {
    if (!viewDetail.isOpened) {
      setDetail({
        id: id,
        isOpened: true,
      });
    }
  };
  return (
    <>
      <section className={viewDetail.isOpened ? 'collection-container-active' : 'collection-container'}>
        {viewDetail.isOpened ? <div className="overlay"></div> : <div className=""></div>}
        {pokemons.map((pokemon) => {
          return (
            <div
              key={pokemon.id}
              onClick={() => selectPokemon(pokemon.id)}>
              <PokemonList
                viewDetail={viewDetail}
                setDetail={setDetail}
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                abilities={pokemon.abilities}
                image={pokemon.sprites.front_default}
              />
            </div>
          );
        })}
      </section>
    </>
  );
};
export default PokemonCollection;
