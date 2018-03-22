<template>
  <section
        :name="name"
        :id="id"
        :class="`person ${ isOpen ? 'is-open' : ''}`"
        :style="`transform: ${this.transform};`"
        >
        <section class="z-2">
            <section class="img-container">
                <img
                    v-on:click="open"
                    :src="`https://image.tmdb.org/t/p/w200/${ imageURL }`"/>
            </section>
            <h5>{{ role }}</h5>
            <h4>{{ name }}</h4>
        </section>
        <svg width="200px" height="240px" :aria-labelledby="id" viewBox="0 0 200 240" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <title :id="id" >{{ name }}</title>
            <g :class="`char-bg-polygon`" stroke="none" stroke-width="1" :fill="bgFillTweened" fill-rule="evenodd">
                <g id="3.3" >
                    <polygon id="Triangle" :points="bgShapeTweened"></polygon>
                </g>
            </g>
        </svg>
        <transition
            name="biography-fade">
            <section v-if="isOpen">
                <section class="selected-bg"></section>
                <p  class="biography">{{ biography }}</p>
            </section>
        </transition>
    </section>
</template>

<script>
    import TweenLite from './vendors/TweenLite.js';
    export default {
        name: 'person',
        data () {
            return {
                isOpen: false,
                transform: '',
                bgFillTweened: this.bgFill,
                bgShapeTweened: this.bgShape
            }
        },
        methods: {
            open: function (event) {
                this.isOpen = true;
            },
            close: function(event) {
                this.isOpen = false;
            }
        },
        props: ['id', 'imageURL', 'role', 'name', 'biography', 'bgFill', 'bgShape', 'description', 'blurItems', 'clearBlur'],
        watch: {
            bgShape: function(newPath) {
                TweenLite.to(
                    this.$data,
                    0.5,
                    { bgShapeTweened: newPath }
    	        )
            },
            bgFill: function (newFill) {
			    TweenLite.to(
                    this.$data,
                    0.5,
                    { bgFillTweened: newPath }
    	        )
            },
            isOpen: function(shouldOpen) {
                if(shouldOpen) {
                    const selectedItem = document.getElementById(this.id);
                    const placement = selectedItem.getBoundingClientRect();
                    this.transform = `translateX(${-placement.x + 100}px) translateY(${-placement.y + 100}px) scale(1.3)`;
                    document.addEventListener('click', this.close, false);
                    this.blurItems(this.id);
                }  else {
                    setTimeout(() => {
                        this.transform = `translateX(0px) translateY(0px) scale(1)`;
                    }, 200)
                    this.clearBlur(this.id);
                    document.removeEventListener('click', this.close, false);
                }
            }
        },
        mounted() {
            console.log('new')
        },
        beforeDestroy() {
        }
  }
</script>

<style lang="scss">
.person, .person * {
    cursor: pointer;
}
.person {
    position: relative;
    width: 200px;
    height: 240px;
    transition: transform 0.7s cubic-bezier(.54,.05,.56,.81);
    z-index: 7;

    &.is-open, &.is-open:hover {
        transition: transform 0.7s cubic-bezier(.44,.19,.48,.95);
        z-index: 10000;

        svg {
            transition: transform 0.6s;
            transform: scale(1.75) rotate(-180deg);
        }

        .img-container {
            transform: scale(1.05)
        }
    }

    &:hover {
        svg {
            transition: transform 0.3s;
            transform: scale(1.1) rotate(30deg)
        }
        .img-container {
            transform: scale(1.05)
        }
    }

    .img-container {
        height: 160px;
        width: 120px;
        box-shadow: 0 0 12px rgba(30, 30, 30, 0.3);
        margin: 20px 40px 0;
        overflow: hidden;
        transition: transform 0.3s;

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
        z-index: 5;
    }
    svg {
        position: absolute;
        top: 0;
        z-index: 3;
        transition: transform 1s;
    }
}
.char-bg-polygon {
    fill: #999999;
    filter: url('#linear');

    &.get-out {
        fill: #6d6d6d;
    }
}

.biography {
    position: absolute;
    z-index: 3;
    top: 0;
    left: 300px;
    width: 560px;
    line-height: 1.4;
    text-indent: 32px;
    max-height: 400px;
    padding: 16px 0;
    overflow-y: auto;
}

.selected-bg {
    position: fixed;
    z-index: 2;
    width: 100vw;
    height: 100vh;
    left: -100px;
    top: -100px;
    pointer-events: none;
    background: rgba(0,0,0,0.5);
}

.biography-fade-enter-active, .biography-fade-leave-active {
    transition: opacity .5s;
}

.biography-fade-leave-active {
    transition-duration: 0.3s;
}

.biography-fade-enter-active {
    transition-delay: 1s
}
.biography-fade-enter, .biography-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>