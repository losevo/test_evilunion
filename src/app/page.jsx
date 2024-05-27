'use server'
import pokemonsGet from "@/features";
import Chips from "../components/Chips.jsx";


const Home = async () => {
  const pokemons = await pokemonsGet();
  return (
    <>
      <Chips listOfPokemons={pokemons} />
    </>
  );
}


export default Home;
