<template>
    <div class="cartcontrol">
        <transition name="move">
            <div class="cart-decrease icon-remove_circle_outline"
            v-show="food.count > 0" @click="decreaseCart">
        
            </div>
        </transition>
        
        <div class="cart-count" v-show="food.count > 0">
        {{food.count}}
        </div>
        <div class="cart-add icon-add_circle" @click="addCart">
        
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Vue from 'vue';
    export default {
        props: {
            food: {
                type: Object
            }
        },
        created() {
            // console.log(this.food);
        },
        methods: {
            addCart(event) {
                if (!event._constructed) {  // 如果不是自己点击的 就return掉
                    return;
                }
                if (!this.food.count) {
                    Vue.set(this.food, 'count', 1);
                } else {
                    this.food.count++;
                }
                let add = new Vue();
                add.$emit('cart.add', event.target);  // 派发一个事件，把DOM对象作为事件参数传入
            },
            decreaseCart(event) {
                if (!event._constructed) {  // 如果不是自己点击的 就return掉
                    return;
                }
                if (this.food.count) {
                    this.food.count--;
                }
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .cartcontrol
        font-size: 0
        .move-transition
            opacity: 1
            transform: translate3D(0, 0, 0)
        .move-enter, .move-leave
            opacity: 0
            transform: translate3D(24px, 0, 0)
        .cart-decrease, .cart-add
            display: inline-block
            padding: 6px
            line-height: 24px
            font-size: 24px
            color: rgb(0, 160, 220)
        .cart-count
            display: inline-block
            vertical-align: top
            width: 12px
            padding-top: 6px
            line-height: 24px
            text-align: center
            font-size: 10px
            color: rgb(147,253,259)
        .cart-add
            display: inline-block
</style>
