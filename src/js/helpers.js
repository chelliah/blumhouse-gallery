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

const generateMovieURL = (field, id) => `https://api.themoviedb.org/3/${field}/${id}?api_key=fb943e57f66775bee33b75e94c7f0310`

export const MOVIES_DATA = {
    items: [
        {
            id: 'tt5052448',
            mdb_id: '419430',
            name: 'Get Out',
            imageURL: getOutPNG,
            trianglePath: "128.87 15.93 686.82 410.02 172.74 725.05 128.87 15.93",
            filterMatrix:  `0   0   1.2   0   0
                            0.6   0.6  0   0.05   0
                            0  0   2   0.9   0
                            0   0   0   1   0`,
            contrastColor: '#E3B256',
            mainColor: '#7381f5',
            tracePaths: getOutTracePaths,
            fetchedActors: false,
            rt: 99,
            metacritic: 84,
            imdb: 7.7,
            notableFigures: [
                {
                    name: 'Jordan Peele',
                    role: 'Director',
                    id: '291263',
                    background_shape: '80 10 180 110 110 210 16 145 47 103'
                },
                {
                    name: 'Daniel Kaluuya',
                    role: 'Actor',
                    id: '206919',
                    background_shape: '35 42 131 23 186 105 35 221'
                },
                {
                    name: 'Allison Williams',
                    role: 'Actor',
                    id: '1255540',
                    background_shape: '54 07 169 54 54 224'
                }
            ]
        },
        {
            id: 'tt4972582',
            name: 'Split',
            mdb_id: '381288',
            imageURL: splitPNG,
            trianglePath: "92.2 73.42 674.75 257.23 210.38 725.05 92.2 73.42",
            filterMatrix: `3   0   0.5   0   0
                            0   0.2  0   0   0
                            0  0   0   0.5   0
                            0   0   0   1   0`,
            contrastColor: '#56c6e3',
            mainColor: '#ff47bc',
            tracePaths: splitTracePaths,
            fetchedActors: false,
            rt: 75,
            metacritic: 62,
            imdb: 7.3,
            notableFigures: [
                {
                    name: 'M. Night Shyamalan',
                    role: 'Director',
                    id: '11614',
                    background_shape: '136 0 160 95 142 162 38 209 23 64'
                },
                {
                    name: 'James McAvoy',
                    role: 'Actor',
                    id: '5530',
                    background_shape: '65 77 160 20 175 217 16 201'
                },
                {
                    name: 'Anya Taylor-Joy',
                    role: 'Actor',
                    id: '1397778',
                    background_shape: '111 22 180 165 17 192'
                }
            ]
        },
        // {
        //     id: 'tt2428170',
        //     name: 'Creep',
        //     director: 'That mumblecore dude'
        // },
        {
            id: 'tt1502407',
            name: 'Halloween',
            mdb_id: '424139',
            imageURL: halloweenPNG,
            trianglePath: "35.56 228.76 660.3 58.23 463.66 738.49 35.56 228.76",
            filterMatrix: `0.2  0   0   0   0
                            0   1.5  0   0.15   0
                            0  0   0.25  0.2   0
                            0   0   0   1   0`,
            tracePaths: halloweenTracePaths,
            contrastColor: '#e35656',
            mainColor: '#47d090',
            fetchedActors: false,
            rt: 100,
            metacritic: 100,
            imdb: 10.0,
            notableFigures: [
                {
                    name: 'David Gordon Green',
                    role: 'Director',
                    id: '64141',
                    background_shape: '73 0 173 53 183 149 28 198 73 84',
                },
                {
                    name: 'Jamie Lee Curtis',
                    role: 'Actor',
                    id: '8944',
                    background_shape: '95 28 183 14 130 204 19 118'
                },
                {
                    name: 'Judy Greer',
                    role: 'Actor',
                    id: '20750',
                    background_shape: '84 24 181 225 16 138'
                }
            ]
        }
    ]
}

const searchMovieById = (type='movie', movie) => {
    return axios.get(generateMovieURL('movie', movie.mdb_id)).then((result) => {
        return {
            ...movie,
            ...result.data,
        };
    });
}

const searchPerson = (type='person', person) => {
    const movieURL = generateMovieURL(type, person.id)
    return axios.get(movieURL).then((result) => {
        return {
            ...person,
            ...result.data
        };
    });
}

export const fetchBlumhouseMovies = () => {
    return Promise.all(
        MOVIES_DATA.items.map((movie) => {
            return searchMovieById('movie', movie)
        })
    ).then((movies) => {
        return movies;
    })
}

export const fetchActors = (actors) => {
    return Promise.all(
        actors.map((actor) => searchPerson('person', actor))
    ).then((actors) => {
        return actors;
    })
}