"use client";
// Клиентский компонент, потому что нам нужны состояния и вызовы из onClick
import { Chip, Container } from "@mui/material";
import styles from "../app/page.module.css";
import { useState } from "react";
import Image from "next/image";

const Chips = ({ listOfPokemons }) => {
  const [currentPokemonId, setCurrentPokemonId] = useState(
    listOfPokemons[0].id
  );
  
  return (
    <Container className={styles.chipsContainer}>
      <div className={styles.chips}>
        {listOfPokemons.map((pok) => (
          <Chip
            label={pok.name}
            color="primary"
            key={pok.id}
            id={pok.id}
            onClick={(e) => setCurrentPokemonId(e.target.id)}
            className={styles.chipsgroup}
          />
        ))}
      </div>
      <div className={styles.pokemonContainer}>
        {listOfPokemons
          .filter((pok) => pok.id === parseInt(currentPokemonId))
          .map((p) => {
            let id = p.id < 100 ? p.id < 10 ? `00${p.id}` : `0${p.id}` : `${p.id}`;
            return (
            <>
            <div>
                <h1>{p.name}</h1>
                <Image src={p.sprites} alt="Pokemon" width='396' height='200'/>
            </div>
            <div>
                <p>Снялся в <a href={`https://www.serebii.net/anime/dex/${id}.shtml`}>{p.episodes}</a> сериях</p>
                <p>id: {p.id}</p>
                <p>height: {p.height}</p>
                <p>attack: {p.attack}</p>
            </div>
            </>
          )})}
      </div>
    </Container>
  );
};

export default Chips;
