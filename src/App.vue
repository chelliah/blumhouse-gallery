<template>
  <div id="app">
    <header>
      <section class="header-icon">
        <svg width="80px" height="80px" viewBox="0 0 66 69" transform="scale(0.6)" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity="0.25">
                <g id="Desktop-HD-Copy" transform="translate(-37.000000, -37.000000)" fill="#000000" fill-rule="nonzero">
                    <g id="daily-ui-3-v2Asset-2" transform="translate(37.000000, 37.000000)">
                        <path d="M66,25.5432801 L66,26.3514394 L63.3859366,26.3514394 C62.7828656,26.3514394 62.689911,28.3741076 62.689911,28.3741076 L62.689911,65.2338872 C62.689911,68.3734496 63.3859366,69 63.3859366,69 L40.4601697,69 C41.0133626,68.979569 41.140325,68.7207764 40.9430799,68.1691397 C40.4216276,66.6458957 40.353612,65.0613588 40.353612,63.4700115 L40.353612,49.6223392 C40.353612,46.4441849 40.3241386,43.2660306 40.353612,40.0878763 C40.389887,37.0708998 40.0747484,34.0312222 40.8478582,31.0551077 C40.9906908,30.5102813 40.6959569,30.3513736 40.2697262,30.3445633 C38.7960565,30.3279158 37.3231425,30.3279158 35.8509842,30.3445633 C35.4134176,30.3445633 35.1572258,30.5125514 35.2569819,31.0528376 C36.1638556,36.0062181 35.4837003,41.009541 35.6832125,45.9856226 C35.7036172,46.5145583 35.5131737,46.8732357 34.9191714,46.8732357 C33.633678,46.8732357 32.3504517,46.8732357 31.0649583,46.8732357 C30.5435059,46.8732357 30.3190547,46.5645007 30.3326578,46.0696167 C30.4686888,41.1616384 29.9585724,36.2377694 30.6659338,31.347952 C30.7520868,30.7441026 30.7475525,30.3559138 30.0515269,30.3491035 C28.6156436,30.332456 27.1797602,30.332456 25.7438769,30.3491035 C25.1997527,30.3491035 25.0637216,30.6328672 25.1884167,31.1754236 C25.6418536,33.0641553 25.6758614,34.9892088 25.6758614,36.9210725 C25.6758614,45.430959 25.6758614,53.9416022 25.6758614,62.4530021 C25.6758614,64.4166475 25.6758614,66.3893733 25.0342482,68.2849153 C24.8642094,68.7843395 25.0342482,68.9931897 25.5398303,68.9909196 C27.1268593,68.9909196 28.7138882,68.9909196 30.3009172,68.9909196 C30.8790492,68.9909196 30.9969427,68.7480178 30.8450414,68.2054614 C30.6409948,67.4812963 30.3916045,66.73443 30.3916045,65.9943741 C30.3394593,61.1908209 30.3553296,56.3872676 30.323589,51.5837144 C30.323589,50.791446 30.6523307,50.503142 31.4095703,50.523573 C32.391261,50.5530844 33.3774862,50.5848659 34.3569098,50.523573 C35.4066161,50.4486593 35.7172203,50.8595493 35.7172203,51.8856391 C35.6673422,56.0830729 35.6832125,60.2850469 35.6968156,64.4802106 C35.6968156,65.7378516 35.6356017,66.9773318 35.1685617,68.1600592 C34.9418433,68.7185063 35.0393322,68.9727587 35.6061283,68.9931897 L2.61406341,68.9931897 C2.61406341,68.9931897 3.31008897,68.3666392 3.31008897,65.2270768 L3.31008897,28.3763777 C3.31008897,28.3763777 3.21713442,26.3537095 2.61406341,26.3537095 L0,26.3537095 L0,25.5455503 L7.38421902,8.62641882 L23.0572636,8.62641882 L32.9807289,0 L42.9563395,8.62641882 L58.9830648,8.62641882 L65.9614579,25.5546307 L66,25.5432801 Z" id="Shape"></path>
                    </g>
                </g>
            </g>
        </svg>
      </section>
    </header>
    <section v-if="isLoaded" class="left-hand">
      <character-image
        :filterMatrix="movieItems[selectedItemIndex]['filterMatrix']"
        :imageURL="movieItems[selectedItemIndex]['imageURL']"
        :trianglePath="movieItems[selectedItemIndex]['trianglePath']"
        :tracePaths="movieItems[selectedItemIndex]['tracePaths']"/>
    </section>
    <section v-if="isLoaded" class="right-hand">
      <movie-details
        :movieDetails="movieItems[selectedItemIndex]"/>
    </section>
  </div>
</template>

<script>
  import { fetchBlumhouseMovies, fetchActors } from './js/helpers.js';
  import CharacterImage from './CharacterImage.vue';
  import MovieDetails from './MovieDetails.vue'

  export default {
    name: 'app',
    data () {
      return {
        movieItems: [],
        isMovingLeft: false,
        isLoaded: false,
        selectedItemIndex: 0
      }
    },
    components: {
      CharacterImage,
      MovieDetails
    },
    watch: {
      selectedItemIndex: function() {
        this.fetchActors()
      }
    },
    methods: {
      handleArrowClick: function(e) {
        if(e.key == 'ArrowRight') {
          this.selectedItemIndex = Math.min((this.movieItems.length - 1), (this.selectedItemIndex + 1));
          this.isMovingLeft = false;
        }
        else if (e.key == 'ArrowLeft') {
          this.selectedItemIndex = Math.max(0, this.selectedItemIndex - 1);
          this.isMovingLeft = true;
        }
      },
      setMovies: function(movies) {
        this.movieItems = movies;
        this.isLoaded = true;
      },
      fetchActors: function() {
        const personData = this.movieItems[this.selectedItemIndex].notableFigures;
        if(!this.movieItems[this.selectedItemIndex].fetchedActors) {

          fetchActors(this.movieItems[this.selectedItemIndex].notableFigures).then((actors) => {
            this.movieItems[this.selectedItemIndex].notableFigures = actors;
            this.movieItems[this.selectedItemIndex].fetchedActors = true;
          });
        }
      }
    },
    mounted() {
      // Register an event listener when the Vue component is ready
      window.addEventListener('keydown', this.handleArrowClick)
      fetchBlumhouseMovies().then((movies) => {
        this.setMovies(movies);
        this.fetchActors();
      })
    },

    beforeDestroy() {
      // Unregister the event listener before destroying this Vue instance
      window.removeEventListener('keydown', this.handleArrowClick)
    }
  }
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Anonymous+Pro:400,700|Open+Sans:400,600,700');

body, #app {
  box-sizing: border-box;
  position: relative;
}
body {
  height: 100vh;
  padding: 20px;
  margin: 0;
  overflow: hidden;
  font-family: 'Open Sans', sans-serif;
  color: #fff
}
p {
  font-family: 'Anonymous Pro', monospace;
}
#app {
  height: 100%;
  display: grid;
  grid-template-columns: 60px 1fr 1fr 60px;
  grid-template-rows: 60px auto;

  background: #F2F2F2;

  header {
    grid-column-start: 1;
    grid-column-end: 5;
    grid-row-start: 1;
    grid-row-end: 1;
  }

  .header-icon {
    height: 60px;
    width: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .left-hand {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
  }
  .right-hand {
    grid-column-start: 3;
    grid-column-end: 5;
    grid-row-start: 2;
    grid-row-end: 3;
  }

  // .component-fade-enter-active, .component-fade-leave-active {
  //   transition: opacity .3s ease-out, transform 0.3s ease;
  // }
  // .component-fade-enter {
  //     /* .component-fade-leave-active below version 2.1.8 */
  //   opacity: 0;
  //   transform: translateX(50px);
  // }

  // .component-fade-leave-to
  // /* .component-fade-leave-active below version 2.1.8 */ {
  //   opacity: 0;
  //   transform: translateX(-50px);

  // }

  .movie-details-section {
    display: flex;
    flex-direction: column;
  }

  .detail-section {
    display: flex;
    text-align: left;
    padding-right: 48px;
    align-items: baseline;

    h3 {
      flex-basis: 80px;
      flex-shrink: 0;
      margin: 0 8px 0 0;
    }
  }
}


</style>