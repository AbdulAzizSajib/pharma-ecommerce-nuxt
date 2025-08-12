<template>
  <NuxtLayout>
    <div class="">
      <!-- Breadcrumb -->
      <div
        class="relative hidden lg:block h-[90px] overflow-hidden bg-slate-100 rounded-lg"
      >
        <div class="flex justify-center">
          <img class="w-1/3" :src="breadCrumb_img" alt="Breadcrumbs Image" />
        </div>
        <div
          class="absolute inset-0 flex justify-center items-center text-white"
        >
          <nav
            aria-label="breadcrumb"
            class="w-full p-4 dark:bg-gray-100 dark:text-gray-800"
          >
            <ol class="flex h-8 space-x-2">
              <li class="flex items-center text-black">
                <HomeOutlined />
              </li>
              <li class="flex items-center space-x-2">
                <i class="fa-solid fa-angle-right"></i>
                <nuxt-link
                  to="/"
                  class="flex items-center px-1 capitalize hover:underline text-black"
                >
                  Home
                </nuxt-link>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <!-- Page Title -->
      <h2
        class="text-2xl lg:text-2xl border font-bold my-5 text-center py-2 rounded-lg bg-slate-100"
      >
        My Shopping Cart
      </h2>

      <!-- Main Grid Layout -->
      <div class="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5">
        <!-- Left Column: Cart Products -->
        <div class="lg:col-span-2">
          <div class="border-l border-r rounded-lg overflow-x-auto">
            <table class="text-left w-full min-w-[600px] border-spacing-2">
              <thead class="bg-gray-100">
                <tr class="border-b border-gray-300">
                  <th class="py-2 px-4 font-semibold text-sm text-gray-700">
                    Product
                  </th>
                  <th
                    class="py-2 px-4 font-semibold text-sm text-gray-700 text-right"
                  >
                    Price (BDT)
                  </th>
                  <th
                    class="py-2 px-4 font-semibold text-sm text-gray-700 text-center"
                  >
                    Quantity
                  </th>
                  <th
                    class="py-2 px-4 font-semibold text-sm text-gray-700 text-center"
                  >
                    Pack/Pcs
                  </th>
                  <th
                    class="py-2 px-4 font-semibold text-sm text-gray-700 text-center"
                  >
                    Total quantity
                  </th>
                  <th
                    class="py-2 px-4 font-semibold text-sm text-gray-700 text-right"
                  >
                    Subtotal (BDT)
                  </th>
                  <th
                    class="py-2 px-4 font-semibold text-sm text-gray-700 text-right"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="cartProduct.length == 0">
                  <td
                    class="text-lg text-red-600 font-semibold text-center"
                    colspan="7"
                  >
                    Your Shopping Bag is Empty!
                  </td>
                </tr>
                <tr
                  v-for="(product, index) in cartProduct"
                  :key="index"
                  class="border-b border-gray-300"
                >
                  <td class="py-2 px-4">
                    <div class="flex items-center gap-3">
                      <div class="avatar">
                        <div class="mask mask-squircle h-12 w-12">
                          <a-image
                            :width="50"
                            :height="50"
                            class="object-cover"
                            :src="`${imgBasePharma}/${product?.product_images[0]?.path}`"
                          />
                        </div>
                      </div>
                      <div>
                        <h1 class="text-sm">
                          {{
                            product?.name?.length > 20
                              ? product?.name?.slice(0, 20)
                              : product?.name
                          }}
                        </h1>
                      </div>
                    </div>
                  </td>
                  <td class="py-2 px-4 text-right">
                    <span>{{ Number(product.price).toFixed(2) }}</span>
                  </td>
                  <td class="py-2 px-4">
                    <div class="flex justify-center items-center">
                      <button
                        @click="
                          () => {
                            let stock = product?.stock_batches?.length
                              ? calculateStock(product?.stock_batches)
                              : 0;
                            if (product.quantity < stock) product.quantity++;
                            else {
                              showNotification('warning', 'Sorry! Stock Out');
                              product.quantity = stock;
                            }
                            updateQty(product);
                          }
                        "
                        class="btn btn-outline btn-sm"
                      >
                        +
                      </button>
                      <input
                        class="w-12 mx-2 text-center rounded-md border border-gray-300"
                        v-model="product.quantity"
                        @focus="$event?.target?.select()"
                        @input="
                          () => {
                            if (product.quantity < 0) product.quantity = 0;
                            let stock = product?.stock_batches?.length
                              ? calculateStock(product?.stock_batches)
                              : 0;
                            if (product.quantity > stock) {
                              showNotification('warning', 'Sorry! Stock Out');
                              product.quantity = stock;
                            }
                            updateQty(product);
                          }
                        "
                        type="number"
                        min="0"
                      />
                      <button
                        @click="
                          () => {
                            if (product.quantity > 0) product.quantity--;
                            else product.quantity = 0;
                            updateQty(product);
                          }
                        "
                        class="btn btn-outline btn-sm"
                      >
                        -
                      </button>
                    </div>
                  </td>
                  <td class="py-2 px-4">
                    <select
                      class="border rounded-sm py-1 px-2 text-sm border-gray-300"
                      v-model="product.pack_select"
                      @change="updateQty(product)"
                    >
                      <option value="1">Pcs (1)</option>
                      <option value="2">
                        Pack ({{ product?.pack_size?.quantity }})
                      </option>
                    </select>
                  </td>
                  <td class="py-2 px-4 text-right">
                    <span>{{ product.total_quantity }}</span>
                  </td>
                  <td class="py-2 px-4 text-right">
                    <span>{{ formatNumber(product?.total_price) }}</span>
                  </td>
                  <td class="py-2 px-4 text-right">
                    <button class="text-lg text-red-500">
                      <a-popconfirm
                        title="Are you sure delete?"
                        ok-text="Yes"
                        cancel-text="No"
                        @confirm="
                          cartProduct.splice(index, 1);
                          updateQty(product);
                        "
                      >
                        <DeleteOutlined />
                      </a-popconfirm>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Right Column: Cart Summary -->
        <div class="border rounded-lg p-4 space-y-3">
          <h2 class="text-xl font-semibold mb-3">Cart Total</h2>
          <table class="w-full">
            <tbody>
              <tr class="border-b">
                <td class="py-2">Subtotal:</td>
                <td class="text-right py-2">
                  {{ formatNumber(totalPrice || 0) }} BDT
                </td>
              </tr>

              <tr class="border-b">
                <td class="py-2 font-semibold">Total:</td>
                <td class="text-right py-2 font-semibold">
                  {{ formatNumber(totalPrice || 0) }} BDT
                </td>
              </tr>
            </tbody>
          </table>

          <nuxt-link to="/checkout">
            <button
              @click="checkoutHandler"
              class="btn w-full rounded-full bg-[#6996cf] text-white text-lg capitalize mt-4"
            >
              Proceed to Checkout
            </button>
          </nuxt-link>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref } from "vue";

import { DeleteOutlined, HomeOutlined } from "@ant-design/icons-vue";
import { useCartStore } from "@/stores/cart";
import { storeToRefs } from "pinia";
import default_img from "@/assets/images/Banner/default.jpg";
import breadCrumb_img from "@/assets/images/breadCrumb.jpeg";

import { formatNumber, imgBasePharma } from "@/config";
import { showNotification } from "@/util/notification";

const cartStore = useCartStore();
const { cartProduct, totalPrice } = storeToRefs(cartStore);

const calculateStock = (stockes) => {
  const total = stockes?.reduce((sum, batch) => {
    const balanced_quantity = parseFloat(batch?.balanced_quantity);
    return sum + (isNaN(balanced_quantity) ? 0 : balanced_quantity);
  }, 0);
  return Number(total).toFixed(2);
};

const updateQty = (product) => {
  if (product?.pack_select == 2) {
    product.total_quantity =
      Number(product?.pack_size?.quantity || 0) * Number(product?.quantity);
  } else {
    product.total_quantity = Number(product?.quantity);
  }
  product.total_price = Math.round(
    Number(product.total_quantity || 0) * Number(product?.price || 0)
  );

  totalPrice.value = cartProduct.value?.reduce((sum, product) => {
    return sum + (product.total_price || 0);
  }, 0);
};

const checkoutHandler = (e) => {
  if (totalPrice.value <= 0) {
    e.preventDefault();
    showNotification(
      "error",
      "Your cart is empty. Please add items to proceed to checkout."
    );
  }
};
</script>

<style lang="scss" scoped></style>
