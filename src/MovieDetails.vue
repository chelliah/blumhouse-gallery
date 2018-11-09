<template>
  <section id="movie-details">
      <section class="details-container">
        <section class="title-container">
            <h2>
                <span
                :key="key"
                v-for="(value, key) in tweenedTitle">{{ value }}</span>
            </h2>
            <p
                :class="`year ${ complete ? '' : 'hidden'}`"
                :style="`color: ${ movieDetails.mainColor };`">{{ movieDetails['release_date'].slice(0,4) }}</p>
        </section>
        <section>
            <section class="people-section">
                <person
                    v-for="(value, index) in notableFigures"
                    :blurItems="blurItems"
                    :clearBlur="clearBlur"
                    :key="index"
                    :id="value.id"
                    :biography="value.biography"
                    :imageURL="value.profile_path"
                    :role="value.role"
                    :name="value.name"
                    :bgFill="`${ movieDetails.mainColor }`"
                    :bgShape="value.background_shape"
                    />
            </section>
            <section class="ratings-section">
                <section class="rating-box">
                    <h4>IMDB</h4>
                    <p>{{ tweenedRatings['imdb'] }}</p>
                </section>
                <section class="rating-box">
                    <h4>RT</h4>
                    <p>{{ tweenedRatings['rt'] }}%</p>
                </section>
                <section class="rating-box">
                    <h4>Metacritic</h4>
                    <p>{{ tweenedRatings['metacritic'] }}</p>
                </section>
            </section>
            <section class="movie-description-section">
                <div class="detail-section">
                    <transition
                        name="movie-description-fade"
                        mode="out-in">
                        <p :key="movieDetails.mdb_id">{{ movieDetails['overview'] }}</p>
                    </transition>
                </div>
            </section>
        </section>
    </section>
  </section>
</template>

<script>
    import Person from './Person.vue';
    import TweenLite from './vendors/TweenLite.js';

    const chars = ['$','%','#','@','&','=','*','/'];
    const charsTotal = chars.length;
    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    export default {
        name: 'movieDetails',
        data () {
            return {
                tweenedTitle: '',
                complete: false,
                timeouts: [],
                tweenedRatings: {
                    rt: this.movieDetails['rt'],
                    imdb: this.movieDetails['imdb'],
                    metacritic: this.movieDetails['metacritic']
                }
            }
        },
        components: {
            Person
        },
        watch: {
            movieDetails: function(newDetails) {

                this.complete = false;
                setTimeout(this.splitTitle, 250)
                TweenLite.to(
                    this.$data.tweenedRatings,
                    1,
                    {
                        rt: newDetails['rt'],
                        imdb: newDetails['imdb'],
                        metacritic: newDetails['metacritic'],
                        ease: Power2.easeInOut,
                        onUpdate: (update) => {
                            this.$data.tweenedRatings.rt = this.$data.tweenedRatings.rt.toFixed(0);
                            this.$data.tweenedRatings.imdb = this.$data.tweenedRatings.imdb.toFixed(1);
                            this.$data.tweenedRatings.metacritic = this.$data.tweenedRatings.metacritic.toFixed(0);
                        }
                    }
                )
            },
        },
        methods: {
            splitTitle: function() {
                this.clearTimeouts()
                this.tweenedTitle = this.movieDetails.name.split('')
                let cnt = 0;
                this.tweenedTitle.forEach((letter, index) => {
                    const initialLetter = letter;
                    let loopTimeout;
                    const loop = () => {
                        this.tweenedTitle[index] = chars[getRandomInt(0,charsTotal-1)];
                        this.tweenedTitle = Array.from(this.tweenedTitle)
                        loopTimeout = setTimeout(loop, getRandomInt(75,150));
                        this.timeouts.push(loopTimeout);
                    };
                    loop();

                    const timeout = setTimeout(() => {
                        clearTimeout(loopTimeout);
                        this.tweenedTitle[index] = initialLetter;
                        this.tweenedTitle = Array.from(this.tweenedTitle)
                        ++cnt;
                        if ( cnt === this.tweenedTitle.length ) {
                            console.log(this.complete)
                            this.complete = true
                        }
                    }, index*80+400);

                    this.timeouts.push(timeout);
                })
            },
            clearTimeouts: function(){
                if(this.timeouts.length) {
                    this.timeouts.forEach((timeout) => {
                        clearTimeout(timeout);
                    })
                }
                this.timeouts = []
            }
        },
        props: ['movieDetails', 'notableFigures', 'blurItems', 'clearBlur'],
        mounted() {
            this.splitTitle()
        },
        beforeDestroy() {
        }

  }
</script>

<style lang="scss">
.details-container {
    position: relative;
    z-index: 1;
    padding-right: 32px;
}
.title-container {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 8px;

    h2 {
        margin: 8px 16px 0 0;
        font-size: 40px;
    }
    .year {
        margin: 0 0 0 16px;
        font-size: 32px;
        align-self: baseline;
        transition: opacity 0.3s ease-out, color 0s 0.3s;
        opacity: 1;

        &.hidden {
            opacity: 0;
        }
    }
}

.ratings-section {
    display: flex;

    .rating-box {
        flex-basis: 33.33333%;
        text-align: center;
        border: 1px solid #fff;
        padding: 8px;

        h4 {
            margin: 0 0 8px 0;
            font-weight: 600;
            // text-transform: uppercase;
        }
        p {
            margin: 0;
        }
    }

}

.people-section {
    display: flex;
    justify-content: space-between;
    margin-bottom: 32px;
}


.movie-description-section {
    padding: 0 36px;
}

.movie-description-fade-enter-active {
    transition: opacity 0.3s 0.2s ease-out;
}

.movie-description-fade-leave-active {
    transition: opacity 0.3s ease-in;
}
.movie-description-fade-enter {
    /* .component-fade-leave-active below version 2.1.8 */
    opacity: 0;
}

.movie-description-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
    opacity: 0;

}

</style>