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
      <section class="header-nav">
        <span
          :key="key"
          :class="`nav-item ${(selectedItemIndex == key) ? 'selected-item' : ''}`"
          v-on:click="selectedItemIndex = key"
          v-for="(value, key) in movieItems"></span>
      </section>
    </header>
    <section v-if="isLoaded" class="right-hand">
      <movie-details
        :clearBlur="clearBlur"
        :blurItems="blurItems"
        :notableFigures="movieItems[selectedItemIndex]['notableFigures']"
        :movieDetails="movieItems[selectedItemIndex]"/>
    </section>
    <section v-if="isLoaded" class="left-hand">
      <character-image
        :mousePos="mousePos"
        :filterMatrix="movieItems[selectedItemIndex]['filterMatrix']"
        :imageURL="movieItems[selectedItemIndex]['imageURL']"
        :trianglePath="movieItems[selectedItemIndex]['trianglePath']"
        :tracePaths="movieItems[selectedItemIndex]['tracePaths']"/>
    </section>
    <svg
      id="bg-rect"
      width="65%" height="100%"
      preserveAspectRatio="xMinYMin slice"
      viewBox="0 0 1054 1124" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <!-- Generator: Sketch 48.2 (47327) - http://www.bohemiancoding.com/sketch -->
        <desc>Created with Sketch.</desc>
        <defs></defs>
        <rect
            id="Rectangle-4"
            :fill="`${ (isLoaded) ? tweenedContrastColor : '#888' }`"
            :transform="`translate(1126.625520, 681.625520) rotate(${-20.000000 - transformBg.y/10}) translate(${ -1597.625520 + transformBg.x }, ${ -666.625520 + transformBg.y })`" x="733.62552" y="-197.37448" width="1758" height="1758"></rect>
    </svg>
    <svg height="0">
        <defs>
            <filter id="blur-filter" x="0" y="0">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3"/>
            </filter>
        </defs>
    </svg>
  </div>
</template>

<script>
  import { fetchBlumhouseMovies, fetchActors } from './js/helpers.js';
  import ColorPropsPlugin from './vendors/plugins/ColorPropsPlugin.js';
  import TweenLite from './vendors/TweenLite.js';
  import CharacterImage from './CharacterImage.vue';
  import MovieDetails from './MovieDetails.vue'

  export default {
    name: 'app',
    data () {
      return {
        movieItems: [],
        isLoaded: false,
        selectedItemIndex: 0,
        isBlurred: false,
        mousePos: {},
        bgPos: {},
        tweenedContrastColor: '#666',
        transformBg: {
          x: 0,
          y: 0
        }
      }
    },
    components: {
      CharacterImage,
      MovieDetails
    },
    watch: {
      selectedItemIndex: function(newIndex) {
        this.fetchActors()
        TweenLite.to(
          this.$data,
          0.5,
          { colorProps: {
            ease: Power2.easeInOut,
            tweenedContrastColor: this.movieItems[newIndex].contrastColor
          }}
        ).delay(0.3)
      }
    },
    methods: {
      handleArrowClick: function(e) {
        if(this.isBlurred) return false;
        if(e.key == 'ArrowRight') {
          this.selectedItemIndex = Math.min((this.movieItems.length - 1), (this.selectedItemIndex + 1));
        }
        else if (e.key == 'ArrowLeft') {
          this.selectedItemIndex = Math.max(0, this.selectedItemIndex - 1);
        }
      },
      setMovies: function(movies) {
        this.movieItems = movies;
        this.tweenedContrastColor = this.movieItems[this.selectedItemIndex].contrastColor;
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
      },
      clearBlur: function(selectedPersonId) {
        const elements = document.querySelectorAll(`header, .left-hand, #bg-rect, .person, .title-container, .ratings-section, .movie-description-section`)
        elements.forEach( (element) => {
            if( element.id == selectedPersonId ) return false;
            element.classList.toggle('blur');
        })
        this.isBlurred = false;
      },
      blurItems: function(selectedPersonId) {
        const elements = document.querySelectorAll(`header, .left-hand, #bg-rect, .person, .title-container, .ratings-section, .movie-description-section`)
        elements.forEach( (element) => {
            if( element.id == selectedPersonId ) return false;
            element.classList.toggle('blur');
        })
        this.isBlurred = true;
      },
      handleMouseMove: function(event) {
        const MAX_DISTANCE = 15;
        this.mousePos = {
          x: event.pageX,
          y: event.pageY
        }

        let elX = Math.floor(this.bgPos.x + (this.bgPos.width/2))
        let elY = Math.floor(this.bgPos.y + this.bgPos.height/2)
        let xDistance = (elX - event.pageX)/(document.documentElement.clientWidth/MAX_DISTANCE)
        let yDistance = (elY - event.pageY)/(document.documentElement.clientWidth/MAX_DISTANCE)
        this.transformBg = {
          x: -xDistance,
          y: -yDistance
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
      window.addEventListener('mousemove', this.handleMouseMove)
      this.bgPos = document.getElementById("bg-rect").getBoundingClientRect()
    },

    beforeDestroy() {
      // Unregister the event listener before destroying this Vue instance
      window.removeEventListener('keydown', this.handleArrowClick)
      window.removeEventListener('mousemove', this.handleMouseMove)
    }
  }
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Anonymous+Pro:400,700|Open+Sans:400,600,700');

@mixin hw-accelerate {
    perspective: 1000;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
}

.blur {
  @include hw-accelerate();
  filter: url(#blur-filter);
}

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
  color: #fff;
}
p {
  font-family: 'Anonymous Pro', monospace;
}
#app {
  height: 100%;
  display: grid;
  grid-column-gap: 12px;
  grid-template-columns: 60px 1fr 1fr 60px;
  grid-template-rows: 60px auto;

  background: #F2F2F2;

  header {
    grid-column-start: 1;
    grid-column-end: 5;
    grid-row-start: 1;
    grid-row-end: 1;
    z-index: 2;

    display: flex;
    justify-content: space-between;
  }

  .header-icon {
    height: 60px;
    width: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .header-nav {
    width: 60px;
    height: 60px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    position: relative;
    z-index: 50;

    .nav-item {
      width: 40px;
      height: 8px;
      margin-bottom: 4px;
      background: #fff;
      opacity: 0.5;
      transform-origin: 100% 50%;
      transition: opacity 0.3s 0.15s cubic-bezier(0.645, 0.045, 0.355, .95),
              transform 0.3s cubic-bezier(0.645, 0.045, 0.355, .95);
      cursor: pointer;

      &.selected-item {
        transform: scaleX(1.3);
        opacity: 1;
      }
    }

  }

  .left-hand {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
    z-index: 2;

    width: 100%;
    height: 100%;
    position: relative;
  }
  .right-hand {
    grid-column-start: 3;
    grid-column-end: 5;
    grid-row-start: 2;
    grid-row-end: 3;
    z-index: 3;
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
}

#bg-rect {
    position: fixed;
    right: 0;
    top: 0;
    z-index: 0;
    // transform: translate(-100px, -100px);
}


</style>