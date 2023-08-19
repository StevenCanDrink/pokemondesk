import React, { useState, useEffect } from 'react';
import './App.css';
import PokemonCollection from './Component/PokemonCollection';
import { Pokemon } from './interface';

interface Pokemons {
  name: string;
  url: string;
}
export interface Detail {
  id: number;
  isOpened: boolean;
}

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextUrl, setNextURL] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [viewDetail, setDetail] = useState<Detail>({
    id: 0,
    isOpened: false,
  });
  useEffect(() => {
    const getPokemon = async () => {
      try {
        const resp = await fetch('https://pokeapi.co/api/v2/pokemon?offset=20&limit=20');
        const pokemonData = await resp.json();
        setNextURL(pokemonData.next);
        pokemonData.results.forEach(async (pokemon: Pokemons) => {
          const poke = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
          const pokeData = await poke.json();
          setPokemons((prev) => [...prev, pokeData]);
          setLoading(false);
        });
      } catch (err) {
        console.log(err);
      }
    };
    getPokemon();
  }, []);
  const nextPage = async () => {
    setLoading(!loading);
    const res = await fetch(`${nextUrl}`);
    const nextPokemonData = await res.json();
    setNextURL(nextPokemonData.next);
    nextPokemonData.results.forEach(async (pokemon: Pokemons) => {
      const poke = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
      const pokeData = await poke.json();
      setPokemons((Pre) => [...Pre, pokeData]);
      setLoading(false);
    });
  };

  return (
    <div className="App">
      <div className="container">
        <header className="pokemon-header">Pokemon</header>
        <PokemonCollection
          pokemons={pokemons}
          viewDetail={viewDetail}
          setDetail={setDetail}
        />
        <div className="btn">{!viewDetail.isOpened && <button onClick={nextPage}>{loading ? `Loading....` : `Load More`}</button>}</div>
      </div>
    </div>
  );
};

export default App;
