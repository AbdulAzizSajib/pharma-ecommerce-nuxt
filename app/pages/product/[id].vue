<template>
  <NuxtLayout>
    <div>
      <div class="relative h-[100px] hidden lg:block overflow-hidden">
        <!-- <img
        class="w-full"
        src="@/assets/images/Breadcrumbs.png"
        alt="Breadcrumbs Image"
      /> -->
        <div
          class="absolute inset-0 flex justify-center items-center text-white"
        >
          <nav
            aria-label="breadcrumb"
            class="w-full p-4 dark:bg-gray-100 dark:text-gray-800"
          >
            <ol class="flex h-8 space-x-2">
              <li class="flex items-center">
                <a
                  rel="noopener noreferrer"
                  href="#"
                  title="Back to homepage"
                  class="hover:underline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-5 h-5 pr-1 dark:text-gray-600"
                  >
                    <path
                      d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                    ></path>
                  </svg>
                </a>
              </li>
              <li class="flex items-center space-x-2">
                <i class="fa-solid fa-angle-right"></i>
                <nuxt-link
                  to="/"
                  class="flex items-center px-1 capitalize hover:underline"
                >
                  Home
                </nuxt-link>
              </li>
              <li class="flex items-center space-x-2">
                <RightOutlined />
                <span
                  rel="noopener noreferrer"
                  href="#"
                  class="flex items-center px-1 capitalize"
                  >{{ productDetail?.product?.name }}</span
                >
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <section class="mt-8">
        <div class="px-4">
          <div></div>
          <div class="grid grid-cols-1 px-5 gap-12 lg:grid-cols-5 lg:gap-12">
            <div class="lg:col-span-3 lg:row-end-1">
              <div class="lg:flex">
                <div class="lg:order-2 lg:ml-5">
                  <div class="overflow-hidden rounded-lg">
                    <!-- <Loader v-if="isFetching" /> -->
                    <a-image
                      :width="600"
                      :height="400"
                      class="object-cover"
                      :src="`${imgBasePharma}/${productDetail?.product?.product_images[0]?.path}`"
                    />
                  </div>
                </div>

                <!-- <div class="mt-2 w-full lg:w-32 lg:flex-shrink-0">
                  <div class="flex flex-row items-start lg:flex-col">
                    <button
                      type="button"
                      class="flex-0 border items-center w-full flex justify-center aspect-square mb-3 h-20 overflow-hidden rounded-lg text-center"
                    >
                      <a-image
                        class="object-cover border"
                        :src="default_img"
                        alt=""
                      />
                    </button>
                    <button
                      type="button"
                      class="flex-0 border items-center w-full flex justify-center aspect-square mb-3 h-20 overflow-hidden rounded-lg text-center"
                    >
                      <a-image
                        class="object-cover border"
                        :src="default_img"
                        alt=""
                      />
                    </button>
                    <button
                      type="button"
                      class="flex-0 border items-center w-full flex justify-center aspect-square mb-3 h-20 overflow-hidden rounded-lg text-center"
                    >
                      <a-image
                        class="object-cover border"
                        :src="default_img"
                        alt=""
                      />
                    </button>
                  </div>
                </div> -->
              </div>
            </div>

            <div class="lg:col-span-2 lg:row-span-2 lg:row-end-2">
              <h1
                class="flex items-center gap-2 font-bold text-gray-900 text-sm lg:text-xl"
              >
                {{ productDetail?.product?.name }}
              </h1>
              <p class="text-sm p-1">
                Generics : {{ productDetail?.product?.generic?.name }}
              </p>
              <p class="text-sm p-1">
                Categories : {{ productDetail?.categories?.at(0)?.name }}
              </p>

              <h2 class="mt-2 text-xl font-bold text-gray-900">
                {{ productDetail?.product?.product_prices?.selling_price }} BDT
              </h2>

              <hr class="border mt-3" />

              <div class="flex justify-between">
                <div>
                  <h2 class="flex items-center">
                    Brand:
                    <span class="my-2">
                      {{ productDetail?.product?.supplier?.company_name }}</span
                    >
                  </h2>
                </div>
              </div>

              <div
                class="mt-2 space-x-3 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0"
              >
                <div class="flex items-end rounded-lg">
                  <div
                    class="flex justify-between space-x-5 items-center py-2 px-1 border"
                  >
                    <button @click="quantity++" class="text-xl btn btn-outline">
                      +
                    </button>
                    <input
                      class="w-12 outline-none text-center text-xl"
                      v-model="quantity"
                      type="number"
                    />
                    <button
                      @click="quantity > 0 && quantity--"
                      class="text-xl btn btn-outline"
                    >
                      -
                    </button>
                  </div>
                </div>

                <button
                  @click="handleAddToCart"
                  type="button"
                  class="w-full xl:text-lg font-medium tracking-widest uppercase rounded-full border-2 border-[#007C46] bg-[#007C46] py-3 px-10 text-white hover:text-[#007C46] hover:bg-transparent"
                >
                  Add to Cart
                </button>
                <button
                  @click="handleAddWishlist"
                  type="button"
                  class="btn text-lg rounded-full"
                >
                  <HeartOutlined />
                </button>
              </div>

              <ul class="mt-8 space-y-2">
                <li
                  class="flex items-center text-left text-sm font-medium text-gray-600"
                >
                  <span class="mr-2">Category :</span>
                  {{ productDetail?.category?.title }}
                </li>
                <li
                  class="flex items-center text-left text-sm font-medium text-gray-600"
                >
                  <span class="mr-2">Tags :</span>

                  <a-tag
                    v-for="(tag, index) in productDetail?.tags
                      ?.split(',')
                      .filter((tag) => tag.trim() !== '')"
                    :key="index"
                    class="capitalize"
                    color="green"
                  >
                    {{ tag.trim() }}
                  </a-tag>
                </li>
              </ul>
            </div>
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
const cartStore = useCartStore();
const { getCart } = cartStore;
// const { cartProduct } = storeToRefs(cartStore);
const quantity = ref(1);
const handleAddToCart = () => {
  // getCart(productDetail.value);

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

<style lang="scss" scoped></style>
