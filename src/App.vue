<template>
  <div id="app">
    <section v-if="isLoaded" class="left-hand">
      <character-image
        :imageURL="movieItems[selectedItemIndex]['imageURL']"
        :trianglePath="movieItems[selectedItemIndex]['trianglePath']"
        :tracePaths="movieItems[selectedItemIndex]['tracePaths']"/>
    </section>
    <section v-if="isLoaded" class="right-hand">

      <h1>{{ movieItems[selectedItemIndex]['Title'] }}</h1>
      <transition
        name="component-fade"
        mode="out-in">
        <section v-bind:key="selectedItemIndex">
          <section class="movie-details-section">
            <div class="detail-section">
              <h3>Director:</h3>
              <span>{{ movieItems[selectedItemIndex]['Director'] }}</span>
            </div>
            <div class="detail-section">
              <h3>Starring:</h3>
              <span>{{ movieItems[selectedItemIndex]['Actors'] }}</span>
            </div>
            <div class="detail-section">
              <h3>Synopsis:</h3>
              <span>{{ movieItems[selectedItemIndex]['Plot'] }}</span>
            </div>
          </section>
        </section>
      </transition>
    </section>
  </div>
</template>

<script>
  import { fetchBlumhouseMovies } from './js/helpers.js';
  import CharacterImage from './CharacterImage.vue';

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
      CharacterImage
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
        console.log(movies)
        this.movieItems = movies;
        this.isLoaded = true;
      }
    },
    mounted() {
      // Register an event listener when the Vue component is ready
      window.addEventListener('keydown', this.handleArrowClick)
      fetchBlumhouseMovies().then((movies) => {
        this.setMovies(movies);
      })
    },

    beforeDestroy() {
      // Unregister the event listener before destroying this Vue instance
      window.removeEventListener('keydown', this.handleArrowClick)
    }
  }
</script>

<style lang="scss">
body, #app {
  box-sizing: border-box;
  position: relative;
}
body {
  height: 100vh;
  padding: 20px;
  margin: 0;
}
#app {
  height: 100%;
  display: flex;
  background: hsla(0,0,0,.08);

  > section {
    flex-basis: 50%
  }

  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .3s ease-out, transform 0.3s ease;
  }
  .component-fade-enter {
      /* .component-fade-leave-active below version 2.1.8 */
    opacity: 0;
    transform: translateX(50px);
  }

  .component-fade-leave-to
  /* .component-fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateX(-50px);

  }

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