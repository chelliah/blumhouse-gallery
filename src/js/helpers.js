import css from '../styles/app.scss';
import axios from 'axios';
import getOut from '../assets/get-out.svg'
import split from '../assets/split.svg'
import halloween from '../assets/halloween.svg'
import Vue from 'vue';

export const MOVIES_DATA = {
    items: [
        {
            id: 'tt5052448',
            name: 'Get Out',
            imageURL: getOut
        },
        {
            id: 'tt4972582',
            name: 'Split',
            imageURL: split
        },
        // {
        //     id: 'tt2428170',
        //     name: 'Creep',
        //     director: 'That mumblecore dude'
        // },
        {
            id: 'tt1502407',
            name: 'Halloween',
            imageURL: halloween
        }
    ]
}

const searchById = (movie) => {
    return axios.get(`http://www.omdbapi.com/?i=${movie.id}&plot=full&apikey=2ee7cc5c`).then((result) => {
        return {
            ...movie,
            ...result.data
        };
    });
}

export const fetchBlumhouseMovies = () => {
    return Promise.all(
        MOVIES_DATA.items.map((movie) => searchById(movie))
    ).then((movies) => {
        console.log('movies', movies);
        return movies;
    })
}