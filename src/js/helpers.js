import css from '../styles/app.scss';
import axios from 'axios';
import getOut from '../assets/get-out.svg'
import split from '../assets/split.svg'
import halloween from '../assets/halloween.svg'
import getOutPNG from '../assets/get-out.jpg'
import splitPNG from '../assets/split.jpg'
import halloweenPNG from '../assets/halloween.jpg'
import { splitTracePaths, getOutTracePaths, halloweenTracePaths, compoundPaths } from './svgPaths.js';
import Vue from 'vue';

export const MOVIES_DATA = {
    items: [
        {
            id: 'tt5052448',
            name: 'Get Out',
            imageURL: getOutPNG,
            trianglePath: "128.87 15.93 686.82 410.02 172.74 725.05 128.87 15.93",
            filterMatrix:  `0   0   0.5   0   0
                            0.4   0.6  0   0.1   0
                            0  0   3   0.4   0
                            0   0   0   1   0`,
            tracePaths: compoundPaths.getOut
            // tracePaths: getOutTracePaths
        },
        {
            id: 'tt4972582',
            name: 'Split',
            imageURL: splitPNG,
            trianglePath: "92.2 73.42 674.75 257.23 210.38 725.05 92.2 73.42",
            filterMatrix: `3   0   0.5   0   0
                            0   0.2  0   0   0
                            0  0   0   0.5   0
                            0   0   0   1   0`,
            tracePaths: compoundPaths.split
            // tracePaths: splitTracePaths
        },
        // {
        //     id: 'tt2428170',
        //     name: 'Creep',
        //     director: 'That mumblecore dude'
        // },
        {
            id: 'tt1502407',
            name: 'Halloween',
            imageURL: halloweenPNG,
            trianglePath: "35.56 228.76 660.3 58.23 463.66 738.49 35.56 228.76",
            filterMatrix: `0.2  0   0   0   0
                            0   0.8  0   0.3   0
                            0  0   0.25  0.2   0
                            0   0   0   1   0`,
            tracePaths: compoundPaths.halloween
            // tracePaths: halloweenTracePaths
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