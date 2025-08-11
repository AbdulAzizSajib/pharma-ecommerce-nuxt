import { defineStore } from "pinia";

export const useCartStore = defineStore("cartStore", {
  state: () => ({
    isLoading: false,
    cartProduct: [],
    cuPon: 0,
    isOrderDone: false,
    totalPrice: 0,
  }),

  getters: {},

  actions: {
    calculateTotal() {
      this.totalPrice = this.cartProduct?.reduce((sum, product) => {
        return sum + (product?.total_price || 0);
      }, 0);
    },
    getCart(product) {
      let quantity = 1;
      let price = Number(product?.product_prices?.selling_price || 0);
      const index = this.cartProduct?.findIndex(
        (item) => item?.id == product?.id
      );
      if (index != -1) {
        this.cartProduct[index].quantity = this.cartProduct[index].quantity + 1;
        this.cartProduct[index].price =
          this.cartProduct[index].price * this.cartProduct[index].quantity;
      } else {
        this.cartProduct = [
          {
            ...product,
            quantity: quantity,
            total_quantity: quantity,
            price: price,
            total_price: price * quantity,
            pack_select: "1",
          },
          ...this.cartProduct,
        ];
      }

      console.log("this.cartProduct", this.cartProduct);

      this.calculateTotal();
    },
    //
    async clearCart() {
      this.cartProduct = [];
      this.totalPrice = 0;
    },
  },
  persist: true,
});
