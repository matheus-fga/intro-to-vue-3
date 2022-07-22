const app = Vue.createApp({
  data() {
    return {
      cart: 0,
      product: {
        name: 'Socks',
        description: 'Soft cotton socks',
      },
      brand: 'Vue Mastery',
      selectedVariant: 0,
      details: ['50% cotton', '30% wool', '20% polyester'],
      variants: [
        { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
        { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 },
      ]
    }
  },
  methods: {
    addToCart() {
      if (this.inventory >= 1) {
        this.cart += 1;
        this.variants[this.selectedVariant].quantity -= 1;
      }
    },
    removeFromCart() {
      if (this.cart >= 1) {
        this.cart -= 1;
        this.variants[this.selectedVariant].quantity += 1;
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
    }
  }
})
