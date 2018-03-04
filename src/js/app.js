import css from '../styles/app.scss';
import axios from 'axios';
import Vue from 'vue';

const MOVIES_DATA = {
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
        {
            id: 'tt2428170',
            name: 'Creep',
            director: 'That mumblecore dude'
        },
        {
            id: 'tt1502407',
            name: 'Halloween',
            director: 'Not john carpenter'
        }
    ]
}

const vm = new Vue({
    data: {
        movieItems: [
            {
                title: 'Get Out',
                director: 'Jordan Peele',
                starring: 'Daniel Kaluuya, Allison Williams',
                synopsis: 'A black man goes to visit his white girlfriends family in suburban Conneticut. They’re some really crazy white people who like steal bodies and stuff. There’s some tea cup hypnosis, and this freako brother.'
            },
            {
                title: 'Split',
                director: 'Jordan Peele',
                starring: 'Daniel Kaluuya, Allison Williams',
                synopsis: 'A black man goes to visit his white girlfriends family in suburban Conneticut. They’re some really crazy white people who like steal bodies and stuff. There’s some tea cup hypnosis, and this freako brother.'
            },
            {
                title: 'Another one',
                director: 'Jordan Peele',
                starring: 'Daniel Kaluuya, Allison Williams',
                synopsis: 'A black man goes to visit his white girlfriends family in suburban Conneticut. They’re some really crazy white people who like steal bodies and stuff. There’s some tea cup hypnosis, and this freako brother.'
            },
            {
                title: 'the last one',
                director: 'Jordan Peele',
                starring: 'Daniel Kaluuya, Allison Williams',
                synopsis: 'A black man goes to visit his white girlfriends family in suburban Conneticut. They’re some really crazy white people who like steal bodies and stuff. There’s some tea cup hypnosis, and this freako brother.'
            }
        ],
        isLoaded: false,
        selectedItemIndex: 0
    }
})
const searchById = (title) => {
    return axios.get(`http://www.omdbapi.com/?i=${title}&plot=full&apikey=2ee7cc5c`).then((result) => {
        return result.data;
    });
}

const fetchBlumhouseMovies = () => {
    Promise.all(
        MOVIES_DATA.items.map((movie) => searchById(movie.id))
    ).then((movies) => {
        console.log('movies', movies);
        vm.movieItems = movies;
        vm.isLoaded = true;
    })
}
// function scrollFunction(e) {
//     // do your stuff here;
//     console.log(e)
// }

console.log('hi', fetchBlumhouseMovies());
// // window.addEventListener('scroll', scrollFunction);
// let ticking = false;
// let last_known_scroll_position = 0
// window.addEventListener('scroll', function(e) {

//     last_known_scroll_position = window.scrollY;

//     if (!ticking) {

//       window.requestAnimationFrame(function() {
//         scrollFunction(last_known_scroll_position);
//         ticking = false;
//       });

//       ticking = true;

//     }

//   });