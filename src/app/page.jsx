'use server'
import pokemonsGet from "@/features";
import Chips from "../components/Chips.jsx";

const Home = async (props) => {
  const pokemons = await pokemonsGet();
  console.log(props);
  return (
    <>
      <Chips listOfPokemons={pokemons} />
    </>
  );
}


export default Home;
