const app = Vue.createApp({
  data() {
    return {
      cart: 0,
      product: {
        name: 'Socks',
        description: 'Soft cotton socks',
      },
      image: './assets/images/socks_green.jpg',
      inventory: 15,
      details: ['50% cotton', '30% wool', '20% polyester'],
      variants: [
        { id: 2234, color: 'green', image: './assets/images/socks_green.jpg' },
        { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg' },
      ]
    }
  },
  methods: {
    addToCart() {
      if (this.inventory >= 1) {
        this.cart += 1;
        this.inventory -= 1;
      }
    },
    removeFromCart() {
      if (this.cart >= 1) {
        this.cart -= 1;
        this.inventory += 1;
      }
    },
    updateImage(variantImage) {
      this.image = variantImage;
    },
  }
})
