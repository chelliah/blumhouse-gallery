<template>
  <section id="character-image">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 768 768">
        <defs>
            <filter id="linear">
                <feColorMatrix
                    type="matrix"
                    :values="filterTweened"/>
            </filter>
            <clipPath id="clip-path">
                <polygon class="cls-1" :points="trianglePathTweened"/>
            </clipPath>
            <clipPath id="clip-path-2">
                <rect class="cls-1" y="0" width="768" height="768"/>
            </clipPath>
        </defs>
        <title>get-out-cropped</title>
        <g id="imageclip">
            <g class="cls-2">
                <g id="svg-image">
                    <g class="cls-3" fill="none">
                        <rect width="768" height="768" ></rect>
                        <transition
                            name="image-fade"
                            mode="out-in">
                            <image
                                id="image-cropped"
                                width="768" height="768"
                                v-bind:key="imageURL"
                                v-bind:xlink:href="imageURL"/>
                        </transition>
                    </g>
                </g>
            </g>
        </g>
        <g id="traces">
            <!-- <path v-for="(value, key) in tracePaths" :key="key" :class="'cls-4 ' + `trace-path-${key}`" :d="value" /> -->
            <!-- <path id="trace-path" class="cls-4" v-bind:d="tracePathsTweened" /> -->
            <path id="trace-path" class="cls-4" d=""/>
        </g>
        </svg>
  </section>
</template>

<script>
    import TweenLite from './vendors/TweenLite.js';
    import anime from 'animejs';

    export default {
        name: 'characterImage',
        data () {
            return {
                trianglePathTweened: this.trianglePath,
                tracePathsTweened: this.tracePaths,
                filterTweened: this.filterMatrix
            }
        },
        watch: {
            filterMatrix: function(newMatrix) {
                TweenLite.to(
                    this.$data,
                    0.5,
                    { filterTweened: newMatrix }
    	        )
                // this.filterTweened = newMatrix;
            },
            trianglePath: function (newPath) {
			    TweenLite.to(
                    this.$data,
                    0.5,
                    { trianglePathTweened: newPath }
    	        )
            },
            tracePaths: function (newPaths) {
                newPaths.forEach((path, index) => {
                    anime({
                        targets: `.trace-path-${key}`,
                        d: path,
                        duration: 500,
                        easing: "easeInOutSine"
                    })
                })
                // TweenLite.to(
                //     this.$data,
                //     0.5,
                //     { tracePathsTweened: newPath }
                // )
                // anime({
                //     targets: "#trace-path",
                //     d: newPath,
                //     duration: 500,
                //     easing: "easeInOutSine"
                // });
                // this.tracePathsTweened = newPath;
            }
        },
        mounted: function(){
            console.log(this.tracePaths);
        },
        props: ['imageURL', 'trianglePath', 'tracePaths', 'filterMatrix']

  }
</script>

<style lang="scss">

    .cls-1 {
        fill: none;
    }

    .cls-2 {
        clip-path: url(#clip-path);
    }

    .cls-3 {
        clip-path: url(#clip-path-2);
        fill: rgba(0,0,0,0.5);
    }

    .cls-4 {
        stroke: #fff;
        stroke-miterlimit: 10;
        stroke-width: 3px;
        fill: none;
    }

    .image-fade-enter-active, .image-fade-leave-active {
        transition: opacity 0.3s ease-out
    }
    .image-fade-enter {
        /* .component-fade-leave-active below version 2.1.8 */
        opacity: 0;
    }

    .image-fade-leave-to
    /* .component-fade-leave-active below version 2.1.8 */ {
        opacity: 0;

    }

    #svg-image {
        filter: url('#linear');
    }

</style>