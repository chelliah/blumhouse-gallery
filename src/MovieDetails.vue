<template>
  <section id="movie-details">
      <section class="detais-container">
        <section class="title-container">
            <h2>{{ movieDetails['name'] }}</h2>
            <p>{{ movieDetails['release_date'].slice(0,4) }}</p>
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
                            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="3.3" fill="#D8D8D8">
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
        <rect id="Rectangle-4" transform="translate(1126.625520, 681.625520) rotate(-20.000000) translate(-1612.625520, -681.625520) " x="733.62552" y="-197.37448" width="1758" height="1758"></rect>
    </svg>
  </section>
</template>

<script>

    export default {
        name: 'movieDetails',
        data () {
            return {
            }
        },
        watch: {

        },
        methods: {
        },
        props: ['movieDetails'],
        mounted() {
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
    justify-content: flex-start

    h2 {
        margin-right: 16px;
    }

    p {
        margin-left: 16px;
        align-self: baseline;
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
        margin: 0 0 8px 0
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
        padding: 20px 40px 0;
        overflow: hidden;

        img {
            width: 120px;
            height: auto;
        }
    }

    h5 {
        text-transform: uppercase;
        opacity: 0.8;
        margin: 0 0 8px 0;
        padding: 0 40px;
    }

    h4 {
        margin: 0;
        padding: 0 40px;
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
</style>