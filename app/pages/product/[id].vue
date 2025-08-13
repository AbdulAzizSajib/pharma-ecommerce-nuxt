<template>
  <NuxtLayout>
    <div class="min-h-screen">
      <!-- Enhanced Breadcrumb -->
      <div class="relative bg-white">
        <div class="container mx-auto px-4 py-4">
          <nav class="flex items-center space-x-2 text-sm">
            <nuxt-link
              to="/"
              class="flex items-center text-gray-500 hover:text-blue-600 transition-colors"
            >
              <Icon class="size-4 mr-2" icon="ic:baseline-home" />
              Home
            </nuxt-link>
            <Icon icon="iconamoon:arrow-right-2-thin" />
            <span class="text-gray-800 font-medium truncate">{{
              productDetail?.product?.name
            }}</span>
          </nav>
        </div>
      </div>

      <!-- Main Product Section -->
      <section class="my-5">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <!-- Image Gallery Section -->
          <div class="space-y-6">
            <!-- Main Image with Zoom Effect -->
            <div class="relative group w-[80%]">
              <div
                class="aspect-square bg-white rounded-3xl shadow-xl overflow-hidden border"
              >
                <div
                  class="relative w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
                >
                  <a-image
                    :width="600"
                    :height="600"
                    class="w-full h-full object-cover rounded-2xl"
                    :src="`${imgBasePharma}/${productDetail?.product?.product_images[0]?.path}`"
                    :fallback="default_img"
                  />
                </div>
              </div>
            </div>

            <!-- Thumbnail Gallery -->
            <div class="flex space-x-4 overflow-x-auto pb-4">
              <div
                v-for="(item, index) in productDetail?.product?.product_images"
                :key="index"
                class="flex-shrink-0"
              >
                <button
                  type="button"
                  class="w-20 h-20 bg-white rounded-xl border transition-all duration-300 overflow-hidden group"
                >
                  <a-image
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    :src="`${imgBasePharma}/${item?.path}`"
                    :fallback="default_img"
                    alt="Product thumbnail"
                  />
                </button>
              </div>
            </div>
          </div>

          <!-- Product Details Section -->
          <div class="space-y-6">
            <!-- Product Title & Rating -->
            <div class="space-y-4">
              <div class="flex items-start justify-between">
                <h1
                  class="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight"
                >
                  {{ productDetail?.product?.name }}
                </h1>
              </div>
            </div>

            <!-- Product Info Cards -->
            <div class="grid grid-cols-2 gap-4">
              <div
                class="px-4 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100"
              >
                <p class="text-sm font-medium text-gray-600 mb-1">Generic</p>
                <p class="font-bold text-gray-900">
                  {{ productDetail?.product?.generic?.name }}
                </p>
              </div>
              <div
                class="px-4 py-1 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100"
              >
                <p class="text-sm font-medium text-gray-600 mb-1">Category</p>
                <p class="font-bold text-gray-900">
                  {{ productDetail?.categories?.at(0)?.name }}
                </p>
              </div>
            </div>

            <!-- Price Section -->
            <div class="p-6 bg-white rounded-2xl border">
              <div class="flex items-baseline space-x-3 mb-4">
                <p class="text-xl font-semibold">Price :</p>
                <span class="text-xl font-semibold text-gray-900">
                  {{ productDetail?.product?.product_prices?.selling_price }}
                  BDT
                </span>
              </div>
            </div>

            <!-- Brand Info -->
            <div class="p-4 bg-white rounded-2xl shadow-lg border">
              <div class="flex items-center space-x-4">
                <div
                  class="w-16 h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center"
                >
                  <svg
                    class="w-8 h-8 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2m0 0h4"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-600">Brand</p>
                  <p class="text-xl font-bold text-gray-900">
                    {{ productDetail?.product?.supplier?.company_name }}
                  </p>
                  <p class="text-sm text-gray-500">
                    Trusted pharmaceutical company
                  </p>
                </div>
              </div>
            </div>

            <!-- Quantity & Add to Cart -->
            <div class="space-y-6">
              <!-- Quantity Selector -->
              <div class="flex items-center space-x-4">
                <span class="text-lg font-semibold text-gray-700"
                  >Quantity:</span
                >
                <div
                  class="flex items-center bg-white rounded-2xl shadow-lg border overflow-hidden"
                >
                  <button
                    @click="quantity > 1 && quantity--"
                    class="px-6 py-4 text-xl font-bold text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
                    :disabled="quantity <= 1"
                  >
                    −
                  </button>
                  <input
                    v-model="quantity"
                    type="number"
                    min="1"
                    class="w-20 py-4 text-xl font-bold text-center border-0 focus:ring-0 focus:outline-none"
                  />
                  <button
                    @click="quantity++"
                    class="px-6 py-4 text-xl font-bold text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
                  >
                    +
                  </button>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="space-y-4">
                <button
                  @click="handleAddToCart"
                  class="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-5 px-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3"
                >
                  <Icon class="size-5" icon="bxs:cart" />
                  <span class="text-lg">ADD TO CART</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Related Products Section -->
      <section class="container mx-auto px-4 py-16 my-5">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            You Might Also Like
          </h2>
        </div>

        <!-- Placeholder for related products -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="i in 4"
            :key="i"
            class="bg-white rounded-2xl shadow-xl p-6 border hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <div class="aspect-square bg-gray-100 rounded-xl mb-4"></div>
            <h3 class="font-bold text-gray-900 mb-2">
              Related Product {{ i }}
            </h3>
            <p class="text-gray-600 mb-3">Product description here...</p>
            <p class="text-xl font-bold text-green-600">৳ 299</p>
          </div>
        </div>
      </section>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { apiBasePharma, imgBasePharma } from "@/config";
import axios from "axios";
import default_img from "../../assets/images/default.jpg";

const id = useRoute()?.params?.id;
const productDetail = ref();
const loading = ref(false);

const getProductDetails = async () => {
  try {
    const res = await axios.get(`${apiBasePharma}/product-show/${id}`);
    productDetail.value = res.data;
  } catch (error) {
    console.log(error.message);
  }
};

import { useCartStore } from "@/stores/cart";
import { toast } from "vue3-toastify";
import { Icon } from "@iconify/vue";

const cartStore = useCartStore();
const { getCart } = cartStore;
const quantity = ref(1);

const handleAddToCart = () => {
  getCart(
    productDetail.value?.product?.id,
    productDetail.value?.product?.name,
    productDetail.value?.categories?.at(0).name,
    productDetail.value?.product_prices?.selling_price,
    productDetail.value,
    quantity.value
  );

  toast.success(`${productDetail.value?.product?.name} added to cart!`, {
    position: "top-center",
    autoClose: 2000,
  });
};

onMounted(async () => {
  await getProductDetails();
});
</script>

<style scoped>
/* Custom animations and effects */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-in {
  animation: slideIn 0.6s ease-out forwards;
}

/* Hover effects for images */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

/* Custom scrollbar for thumbnails */
::-webkit-scrollbar {
  height: 4px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Gradient text effect */
.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
