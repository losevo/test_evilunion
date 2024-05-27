'use server'
import axios from "axios";
import { JSDOM } from 'jsdom';
// Общее количество покемонов всех поколений
const lengthListOfPokemons = 1024;

const pokemonGet = async (pokemon) => {
    const data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`).then((response) => response.data).catch((e) => console.error(e));
    return data;
}

// Выбираем 10 случайных покемонов из имеющихся
const getArrayTenRandomPokemons = () => {
    const arrayOfPokemons = [];
    while (arrayOfPokemons.length < 10) {
        const randomPokemon = Math.random() * lengthListOfPokemons;
        const pokemonId = Math.floor(randomPokemon);
        if (!arrayOfPokemons.includes(pokemonId)) {
            arrayOfPokemons.push(pokemonId);
        }
    }
    return arrayOfPokemons;
}

const pokemonsGet = async () => {
    const array = getArrayTenRandomPokemons();
    const data = [];
    for (let i = 0; i < array.length; i++) {
        const pokemon = await pokemonGet(array[i]);
        const episodes = await getCountOfEpisodes(array[i]);
        // Не у всех покемонов есть svg спрайт, поэтому делаем проверку на его наличие, и если такого спрайта нет, то берем дефолтный в png
        data.push({
            name: pokemon.name,
            id: pokemon.id,
            height: pokemon.height,
            attack: pokemon.stats[0].base_stat,
            series: pokemon.moves.length,
            sprites: pokemon.sprites.other.dream_world.front_default ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_default,
            episodes: episodes,
        });
    }
    
    return data;
}

// Считаем количество эпизодов на единственном сайте, где есть список эпизодов с участием конкретного покемона
const getCountOfEpisodes = async (pokemon) => {
    // Приводим id в вид, по которому можно делать запрос на сайт
    let id = pokemon < 100 ? pokemon < 10 ? `00${pokemon}` : `0${pokemon}` : `${pokemon}`;
    const url = `https://www.serebii.net/anime/dex/${id}.shtml`;

    const data = await axios.get(url).then((response) => response.data).catch((e) => console.error(e));
    const doc = new JSDOM(data);
    const main = doc.window.document.getElementById('content');
    const tables = main.querySelectorAll('table');
    const arrayEpisodes = [];
    tables.forEach((table) => {
        //На странице 6 ненужных таблиц, выбираем только те, где есть упоминание эпизодов
        if(table.textContent.includes('Episode')) {
            arrayEpisodes.push(table);
        }
    });
    // Не считаем верхнюю и нижнюю строки таблицы, поэтому и минус 2
    const getCountOfEpisodes = arrayEpisodes.reduce((acc, table) => acc = acc + table.querySelectorAll('tr').length - 2,0)
    return getCountOfEpisodes;
}


export default pokemonsGet;
