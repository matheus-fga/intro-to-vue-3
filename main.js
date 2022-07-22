const app = Vue.createApp({
  data() {
    return {
      cart: [],
      premium: true,
    }
  },
  methods: {
    updateCart(id, action) {
      if (action === 'add') {
        this.cart.push(id);
      } else if (action === 'remove') {
        const productToBeRemoved = this.cart.lastIndexOf(id);

        if (productToBeRemoved > -1) {
          this.cart.splice(productToBeRemoved, 1);
        }
      }
    }
  }
})
