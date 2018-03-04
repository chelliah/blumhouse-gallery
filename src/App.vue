<template>
  <div id="app">
    <section class="left-hand">left hand</section>
    <section class="right-hand">
      <transition
        name="component-fade"
        mode="out-in">
        <section v-bind:key="selectedItemIndex">
          <h1>{{ movieItems[selectedItemIndex].title }}</h1>
          <section class="movie-details-section">
            <div class="detail-section">
              <h3>Director:</h3>
              <span>{{ movieItems[selectedItemIndex].director }}</span>
            </div>
            <div class="detail-section">
              <h3>Starring:</h3>
              <span>{{ movieItems[selectedItemIndex].starring }}</span>
            </div>
            <div class="detail-section">
              <h3>Synopsis:</h3>
              <span>{{ movieItems[selectedItemIndex].synopsis }}</span>
            </div>
          </section>
        </section>
      </transition>
    </section>
  </div>
</template>

<script>
  // const handleArrowClick = (e) => {
  //   console.log(e)
  //   if(e.key == 'ArrowRight') {
  //     selectedItemIndex = Math.min((movieItems.length - 1), selectedItemIndex + 1);
  //   }
  //   else if (e.key == 'ArrowLeft') {
  //     selectedItemIndex = Math.max(0, selectedItemIndex + 1);
  //   }
  // }
  // window.addEventListener('keydown', handleArrowClick)

  export default {
    name: 'app',
    data () {
      return {
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
        isMovingLeft: false,
        isLoaded: false,
        selectedItemIndex: 0
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
      }
    },
    mounted() {
      // Register an event listener when the Vue component is ready
      window.addEventListener('keydown', this.handleArrowClick)
    },

    beforeDestroy() {
      // Unregister the event listener before destroying this Vue instance
      window.removeEventListener('keydown', this.handleArrowClick)
    }
  }
</script>

<style lang="scss">
#app {
  margin: 0;
  display: flex;

  > section {
    flex-basis: 50%
  }

  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .3s ease, transform 0.3s ease;
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