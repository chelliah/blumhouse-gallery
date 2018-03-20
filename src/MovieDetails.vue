<template>
  <section id="movie-details">
      <section class="detais-container">
        <section class="title-container">
            <h2>
                <span
                :key="key"
                v-for="(value, key) in tweenedTitle">{{ value }}</span>
            </h2>
            <p
                v-if="complete"
                :style="`color: ${ movieDetails.mainColor };`">{{ movieDetails['release_date'].slice(0,4) }}</p>
        </section>
        <transition
            name="component-fade"
            mode="out-in">
            <section v-bind:key="movieDetails['id']">
                <section class="people-section">
                    <section
                        :key="key"
                        class="person-container"
                        v-for="(value, key) in movieDetails['notableFigures']">
                        <section class="z-2">
                            <section class="img-container">
                                <img v-bind:src="`https://image.tmdb.org/t/p/w200/${ value.profile_path }`">
                            </section>
                            <h5>{{ value.role }}</h5>
                            <h4>{{ value.name }}</h4>
                        </section>
                        <svg width="200px" height="240px" :aria-labelledby="value.id" viewBox="0 0 200 240" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <!-- Generator: Sketch 48.2 (47327) - http://www.bohemiancoding.com/sketch -->
                            <title :id="value.id" >{{ value.name }}</title>
                            <filter id="linear">
                                <feColorMatrix
                                    type="matrix"
                                    :values="movieDetails.filterMatrix"/>
                            </filter>
                            <g :class="`char-bg-polygon ${ (movieDetails.name) == 'Get Out' ? 'get-out' : '' }`" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="3.3" >
                                    <polygon id="Triangle" :points="value.background_shape"></polygon>
                                </g>
                            </g>
                        </svg>
                    </section>
                </section>
                <section class="ratings-section">
                    <section class="rating-box">
                        <h4>IMDB</h4>
                        <p>{{ movieDetails['imdb'] }}</p>
                    </section>
                    <section class="rating-box">
                        <h4>RT</h4>
                        <p>{{ movieDetails['rt'] }}</p>
                    </section>
                    <section class="rating-box">
                        <h4>Metacritic</h4>
                        <p>{{ movieDetails['metacritic'] }}</p>
                    </section>
                </section>
                <section class="movie-details-section">
                    <div class="detail-section">
                        <p>{{ movieDetails['overview'] }}</p>
                    </div>
                </section>
            </section>
        </transition>
    </section>
    <svg id="bg-rect" width="65%" height="100%" preserveAspectRatio="xMinYMin slice" viewBox="0 0 954 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <!-- Generator: Sketch 48.2 (47327) - http://www.bohemiancoding.com/sketch -->
        <desc>Created with Sketch.</desc>
        <defs></defs>
        <rect
            id="Rectangle-4"
            :fill="movieDetails.contrastColor"
            transform="translate(1126.625520, 681.625520) rotate(-20.000000) translate(-1612.625520, -681.625520) " x="733.62552" y="-197.37448" width="1758" height="1758"></rect>
    </svg>
  </section>
</template>

<script>
    const chars = ['$','%','#','@','&','=','*','/'];
    const charsTotal = chars.length;
    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    export default {
        name: 'movieDetails',
        data () {
            return {
                tweenedTitle: '',
                complete: false,
                timeouts: []
            }
        },
        watch: {
            movieDetails: function() {
                this.splitTitle()
            },
        },
        methods: {
            splitTitle: function() {
                this.clearTimeouts()
                this.tweenedTitle = this.movieDetails.name.split('')
                this.complete = false;
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
                            this.complete = true;
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
        props: ['movieDetails'],
        mounted() {
            this.splitTitle()
        },
        beforeDestroy() {
        }

  }
</script>

<style lang="scss">
    #bg-rect {
        position: fixed;
        right: 0;
        top: 0;
        z-index: 0;
        fill: #E3B256
    }
.detais-container {
    position: relative;
    z-index: 3;
    padding-right: 32px
}

.title-container {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 8px;

    h2 {
        margin: 8px 16px 0 0;
        font-size: 40px;
    }

    p {
        margin: 0 0 0 16px;
        font-size: 32px;
        align-self: baseline;
        transition: color 0.3s;
    }
}

.ratings-section {
    display: flex;
}

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

.people-section {
    display: flex;
    justify-content: space-between;
    margin-bottom: 32px;
}
.person-container {
    position: relative;
    width: 200px;
    height: 240px;

    .img-container {
        height: 160px;
        width: 120px;
        box-shadow: 0 0 12px rgba(30, 30, 30, 0.3);
        margin: 20px 40px 0;
        overflow: hidden;

        img {
            width: 120px;
            height: auto;
        }
    }

    h5 {
        text-transform: uppercase;
        opacity: 0.8;
        margin:  8px 0 0;
        padding: 0 20px 0 40px;
    }

    h4 {
        margin: 0;
        padding: 0 20px 0 40px;
        font-weight: 600
    }
    .z-2 {
        position: relative;
        z-index: 2;
    }
    svg {
        position: absolute;
        top: 0;
        z-index: 1;
    }
}

.movie-details-section {
    padding: 0 36px;
}
.char-bg-polygon {
    fill: #999999;
    filter: url('#linear');

    &.get-out {
        fill: #6d6d6d;
    }
}
</style>