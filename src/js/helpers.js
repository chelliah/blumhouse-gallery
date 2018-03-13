import css from '../styles/app.scss';
import axios from 'axios';
import Vue from 'vue';

export const MOVIES_DATA = {
    items: [
        {
            id: 'tt5052448',
            name: 'Get Out',
            director: 'Jordan Peele'
        },
        {
            id: 'tt4972582',
            name: 'Split',
            director: 'M. Night Shamalan'
        },
        // {
        //     id: 'tt2428170',
        //     name: 'Creep',
        //     director: 'That mumblecore dude'
        // },
        {
            id: 'tt1502407',
            name: 'Halloween',
            director: 'Not john carpenter'
        }
    ]
}

const searchById = (title) => {
    return axios.get(`http://www.omdbapi.com/?i=${title}&plot=full&apikey=2ee7cc5c`).then((result) => {
        return result.data;
    });
}

export const fetchBlumhouseMovies = () => {
    return Promise.all(
        MOVIES_DATA.items.map((movie) => searchById(movie.id))
    ).then((movies) => {
        console.log('movies', movies);
        return movies;
    })
}