Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true,
        }
    },
    template: `
    <div class="product">
            <div class="product-image">
                <img :src="image" alt="VueSocks">
            </div>
            <div class="product-info">
                <h1>{{ title }}</h1>
                <p v-if="inStock">In Stock</p>
                <p v-else>Out of Stock</p>
                <p>Shipping: {{ shipping }}</p>
                <ul>
                    <li v-for="detail in details">{{detail}}</li>
                </ul>
                <div class="color-box" v-for="(variant, index) in variants" :key="variant.variantId"
                    :style="{ backgroundColor: variant.variantColor }"
                    @mouseover="updateProductImage(index)">
                </div>

                <button v-on:click="addToCart" :disable="!inStock" :class="{ disabledButton: !inStock }">
                    Add to Cart
                </button>

                
            </div>
        </div>
    `,
    data() {
        return {
            product: 'Socks',
            brand: 'Vue Mastery ',
            selectedVariant: 0,
            details: ["80% cotton", "20% polyester", "Gender-neutral"],
            variants: [
                {
                    variantId: 2234,
                    variantColor: "green",
                    variantImage: './assets/vmSocks-green-onWhite.jpg',
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: "blue",
                    variantImage: './assets/vmSocks-blue-onWhite.jpg',
                    variantQuantity: 0,
                }
            ],
        }
    },
    methods: {
        addToCart: function () { this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId) },
        updateProductImage: function (index) {
            this.selectedVariant = index;
        }
    },
    computed: {
        title() {
            return this.brand + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity;
        },
        shipping() {
            return this.premium ? "Free" : "2.99";
        }
    }
})

let app = new Vue({
    el: '#app',
    data: {
        premium: false,
        cart: [],
    },
    methods: {
        updateCart: function (id) {
            this.cart.push(id);
        }
    }
})