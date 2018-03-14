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
        <g
            id="imageclip"
            :transform="`${ (transformData['imageclip']) ? transformData['imageclip'].transform : 'translate(0,0)'}`">
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
            <path
                v-for="(value, key) in tracePathsTweened"
                :key="key"
                class="cls-4"
                :transform="`${ (transformData['trace-path-' + key]) ? transformData['trace-path-' + key].transform : 'translate(0,0)'}`"
                :id="`trace-path-${key}`"
                :d="value"/>
            <!-- <path id="trace-path" class="cls-4" v-bind:d="tracePathsTweened" /> -->
            <!-- <path id="trace-path" class="cls-4" d=""/> -->
        </g>
        </svg>
  </section>
</template>

<script>
    import TweenLite from './vendors/TweenLite.js';
    import kute from 'kute.js'
    import kuteSVG from 'kute.js/kute-svg'

    export default {
        name: 'characterImage',
        data () {
            return {
                trianglePathTweened: this.trianglePath,
                tracePathsTweened: Object.assign({}, this.tracePaths),
                filterTweened: this.filterMatrix,
                transformData: this.generateTransformData(this.tracePaths)
            }
        },
        watch: {
            filterMatrix: function(newMatrix) {
                TweenLite.to(
                    this.$data,
                    0.5,
                    { filterTweened: newMatrix }
    	        )
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

                    kute.to( `#trace-path-${index}`, {
                        path: path,
                    }, {
                        delay: 250 - (index*5),
                        duration: 500 + (index*5),
                        easing: 'easeInQuad'
                    }).start();
                })

                this.$data.transformData = this.generateTransformData(newPaths)
            }
        },
        methods: {
            generateTransformData: function(paths) {
                let transformData = {}

                const image = document.getElementById("imageclip")

                if (image) {
                    transformData['imageclip'] = {
                        coordinates: image.getBoundingClientRect(),
                        transform: 'translate(0, 0)'
                    }
                }

                paths.forEach((path, index) => {
                    let pathNode = document.getElementById(`trace-path-${index}`)
                    if(pathNode) {
                        transformData[`trace-path-${index}`] = {
                            coordinates: pathNode.getBoundingClientRect(),
                            transform: 'translate(0, 0)'
                        }
                    }
                })
                console.log(transformData)
                return transformData;

            },
            handleMouseMove: function(e) {
                // console.log(this.transformData);
                const yPos = e.pageY;
                const xPos = e.pageX;
                const updatedTransformData = this.transformData;
                const MAX_DISTANCE = 25;

                if(updatedTransformData) {
                    Object.keys(updatedTransformData).map((dataKey, index) => {
                        const coordinates = updatedTransformData[dataKey].coordinates
                        let elX = Math.floor(coordinates.x + (coordinates.width/2))
                        let elY = Math.floor(coordinates.y + coordinates.height/2)
                        let xDistance = Math.sqrt(elX - xPos)
                        let yDistance = Math.sqrt(elY - yPos)
                        updatedTransformData[dataKey].transform =
                            `translate( ${Math.abs(xDistance) > 10 ? (MAX_DISTANCE/xDistance) : '0'} , ${Math.abs(yDistance) > 10 ? (MAX_DISTANCE/yDistance) : '0'})`
                        // console.log(coordinates)
                    })
                }

                this.transformData = updatedTransformData

            }
        },
        props: ['imageURL', 'trianglePath', 'tracePaths', 'filterMatrix'],
        mounted() {
            // Register an event listener when the Vue component is ready
            window.addEventListener('mousemove', this.handleMouseMove)

            this.transformData = this.generateTransformData(this.tracePaths)
        },

        beforeDestroy() {
            // Unregister the event listener before destroying this Vue instance
            window.removeEventListener('mousemove', this.handleMouseMove)
        }

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