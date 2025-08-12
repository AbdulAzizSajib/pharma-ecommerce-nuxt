<template>
  <NuxtLayout>
    <!-- Slider -->
    <div class="grid grid-cols-3 gap-x-4">
      <div class="col-span-2 mb-3">
        <!-- <a-skeleton /> -->
        <swiper :modules="modules" :navigation="true" class="w-full">
          <swiper-slide v-for="(slide, index) in sliders" :key="index">
            <img
              class="w-full h-[645px] object-cover rounded-lg"
              :src="slide.image"
              alt="Slide Image"
            />
          </swiper-slide>
        </swiper>
      </div>
      <div>
        <div>
          <div class="mb-3">
            <img
              class="w-full h-1/2 object-cover rounded-lg"
              :src="miniImgOne"
              alt="img"
            />
          </div>
          <div class="mb-3">
            <img
              class="w-full object-cover rounded-lg"
              :src="miniImgTwo"
              alt="img"
            />
          </div>
        </div>
      </div>
    </div>

    <!--Categories -->

    <div class="flex item-center gap-16 my-5">
      <a-skeleton v-if="companiesloading" />
      <a-skeleton v-if="companiesloading" />
      <a-skeleton v-if="companiesloading" />
      <a-skeleton v-if="companiesloading" />
      <a-skeleton v-if="companiesloading" />
    </div>
    <div class="hidden md:block my-5">
      <swiper
        :slidesPerView="10"
        :spaceBetween="30"
        :freeMode="true"
        :autoplay="{
          delay: 2500,
          disableOnInteraction: false,
        }"
        :pagination="{
          clickable: true,
        }"
        :modules="modules"
        class="mySwiper"
      >
        <swiper-slide v-for="cat in companies" :key="cat?.id">
          <div class="w-full flex flex-col justify-center items-center">
            <div
              class="bg-[#c0d3ec] w-32 h-32 flex justify-center items-center cursor-pointer text-white font-bold text-2xl uppercase rounded-lg text-2xl"
            >
              <span>
                {{
                  cat?.company_name?.split(" ").length === 2
                    ? cat?.company_name?.split(" ")[0].charAt(0) +
                      cat?.company_name?.split(" ")[1].charAt(0)
                    : cat?.company_name?.charAt()
                }}
              </span>
            </div>

            <h2 class="mt-2 font-semibold text-lg text-center">
              {{ cat?.company_name?.split(" ")?.at(0) }}
            </h2>
          </div>
        </swiper-slide>
      </swiper>
    </div>

    <!-- collection -->

    <div class="flex item-center gap-16 my-5">
      <a-skeleton v-if="collection_loading" />
      <a-skeleton v-if="collection_loading" />
      <a-skeleton v-if="collection_loading" />
      <a-skeleton v-if="collection_loading" />
      <a-skeleton v-if="collection_loading" />
    </div>
    <template v-for="collection in collections">
      <div class="flex justify-between items-center px-4 mt-3">
        <div>
          <h2
            class="lg:text-xl font-bold bg-[#6996cf] text-white px-4 py-1 rounded"
          >
            {{ collection?.supplier?.company_name }}
          </h2>
        </div>
        <div>
          <nuxt-link :to="{ name: 'shop' }">
            <button class="bg-[#6996cf] text-white px-6 py-1 rounded">
              View All
            </button>
          </nuxt-link>
        </div>
      </div>
      <div class="mb-3">
        <div
          class="grid gap-4 mt-4 px-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-4"
        >
          <div
            class="overflow-hidden border rounded product-card"
            v-for="(item, index) in collections"
            :key="index"
          >
            <!-- Product Image -->
            <div class="relative border-b overflow-hidden rounded-t">
              <nuxt-link
                :to="{ name: 'product-id', params: { id: item?.id || 0 } }"
              >
                <a-image :src="medisine" />
              </nuxt-link>
            </div>

            <!-- Product Content -->
            <div
              class="p-3 bg-[#c0d3ec] border-t-0 border-2 border-[#6996cf] rounded-b"
            >
              <!-- Product Info -->
              <p class="text-lg text-white font-semibold">
                {{ item?.name }}
              </p>
              <h2
                class="text-sm truncate text-white"
                :title="item?.category?.name"
              >
                {{ item?.category?.name }}
              </h2>

              <!-- Price -->
              <div class="flex items-center gap-2 mt-2">
                <span class="text-lg lg:text-2xl font-bold text-white"
                  >{{ item?.product_prices?.selling_price }} ৳</span
                >
              </div>

              <!-- Add to Cart Button -->
              <button
                @click="handleAddToCart(item)"
                type="button"
                class="w-full mt-3 text-xs lg:text-sm font-medium border-2 border-[#6996cf] bg-[#6996cf] text-white transition duration-200 rounded px-4 py-2"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import sliderImg_one from "@/assets/images/Banner/sliderImg_one.jpg";
// import sliderImg_two from "@/assets/images/Banner/4.jpeg";
import miniImgOne from "@/assets/images/Banner/mini_one.jpeg";
import miniImgTwo from "@/assets/images/Banner/mini_two.jpeg";
import { showNotification } from "@/util/notification";
import { useCartStore } from "@/stores/cart";
const cartStore = useCartStore();
const { getCart } = cartStore;

const sliders = [{ image: sliderImg_one }];

const modules = [Autoplay, Navigation];

import medisine from "../../assets/images/medisine.jpeg";

// Axios and other imports
import { apiBasePharma } from "@/config";

import { ref, onMounted } from "vue";
import axios from "axios";
import { toast } from "vue3-toastify";

// State for storing companies
const companies = ref([]);
const companiesloading = ref(false);

// Function to fetch companies
const getCompanies = async () => {
  try {
    companiesloading.value = true;
    const res = await axios.get(`${apiBasePharma}/all-supplier`);
    companiesloading.value = false;
    if (res.data) {
      companies.value = res.data;
    }
  } catch (error) {
    console.log(error);
    companiesloading.value = false;
  }
};

const collection_loading = ref(false);
const collections = ref([]);
const getCollection = async () => {
  collection_loading.value = true;
  try {
    const res = await axios.get(`${apiBasePharma}/best-selling-product`);
    collection_loading.value = false;
    if (res.data) {
      collections.value = res.data;
    }
  } catch (error) {
    console.log(error.message);
    collection_loading.value = false;
  }
};

const handleAddToCart = (products) => {
  console.log(products);
  getCart(products);
  showNotification("success", `${products.name} added to cart!`);
  //   toast.success(`${products.name} added to cart!`, {
  //     position: "top-center",
  //     autoClose: 2000,
  //   });
};

onMounted(async () => {
  await getCompanies();
  await getCollection();
});
</script>

<style>
.swiper-button-next,
.swiper-button-prev {
  color: #ffffff !important;
}

@media (max-width: 768px) {
  .swiper-button-next,
  .swiper-button-prev {
    transform: scale(0.5) !important;
  }
}
</style>
