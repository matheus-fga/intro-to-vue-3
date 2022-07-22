app.component('product-display', {
  props: {
    premium: {
      type: Boolean,
      required: true
    },
    cart: {
      type: Array,
      required: true
    }
  },
  template: 
  /*html*/
  `<div class="product-display">
    <div class="product-container">
      <div class="product-image">
        <img v-bind:src="image" :class="{'out-of-stock-img': inventory < 1}">
      </div>
      <div class="product-info">
        <h1>{{ title }}</h1>
        <p>Inventory: {{ inventory }}</p>
        <p v-if="inventory > 10">In Stock</p>
        <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
        <p v-else>Out of Stock</p>
        <p>Shipping: {{ shipping }}</p>
        <p>{{ product.description }}</p>
        <product-details :details="details"></product-details>
        <div 
          class="color-circle"
          v-for="(variant, index) in variants" 
          :key="variant.id" 
          @mouseover="updateVariant(index)"
          :style="{ backgroundColor: variant.color }"
        >
        </div>
        <button 
          class="button"
          :class="{ disabledButton: inventory < 1 }" 
          :disabled="inventory < 1"
          @click="addToCart" 
        >
          Add to Cart
        </button>
        <button 
          class="button"
          :class="{ disabledButton: !cart.includes(variants[selectedVariant].id)}" 
          :disabled="!cart.includes(variants[selectedVariant].id)"
          @click="removeFromCart"
        >
          Remove Cart
        </button>
      </div>
    </div>
  </div>`,
  data() {
    return {
      product: {
        name: 'Socks',
        description: 'Soft cotton socks',
      },
      brand: 'Vue Mastery',
      selectedVariant: 0,
      details: ['50% cotton', '30% wool', '20% polyester'],
      variants: [
        { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
        { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 11 },
      ]
    }
  },
  methods: {
    addToCart() {
      if (this.inventory >= 1) {
        this.$emit('update-cart', this.variants[this.selectedVariant].id, 'add');
        this.variants[this.selectedVariant].quantity -= 1;
      }
    },
    removeFromCart() {
      if (this.cart.length >= 1) {
        if (this.cart.includes(this.variants[this.selectedVariant].id)) {
          this.variants[this.selectedVariant].quantity += 1;
        }
        
        this.$emit('update-cart', this.variants[this.selectedVariant].id, 'remove');
      }
    },
    updateVariant(index) {
      this.selectedVariant = index;
    },
  },
  computed: {
    title() {
      return `${this.brand} ${this.product.name}`;
    },
    image() {
      return this.variants[this.selectedVariant].image;
    },
    inventory() {
      return this.variants[this.selectedVariant].quantity;
    },
    shipping() {
      if (this.premium) {
        return 'Free';
      }
      
      return 2.99;
    }
  }
});