<template>
  <NuxtLayout>
    <!-- Slider -->
    <div class="grid grid-cols-3 gap-x-4">
      <div class="col-span-2 mb-3">
        <!-- <a-skeleton /> -->
        <swiper :modules="modules" :navigation="true" class="w-full">
          <swiper-slide v-for="(slide, index) in sliders" :key="index">
            <img
              class="w-full h-[645px] object-cover"
              :src="slide.image"
              alt="Slide Image"
            />
          </swiper-slide>
        </swiper>
      </div>
      <div>
        <div>
          <div class="mb-3 border">
            <img
              class="w-full h-1/2 object-cover"
              :src="miniImgOne"
              alt="img"
            />
          </div>
          <div class="mb-3 border">
            <img class="w-full object-cover" :src="miniImgTwo" alt="img" />
          </div>
        </div>
      </div>
    </div>

    <!--Categories -->
    <div class="hidden md:block my-5">
      <swiper
        :slidesPerView="10"
        :spaceBetween="30"
        :freeMode="true"
        :pagination="{
          clickable: true,
        }"
        :modules="modules"
        class="mySwiper"
      >
        <swiper-slide v-for="cat in companies" :key="cat?.id">
          <div class="w-full flex flex-col justify-center items-center">
            <div
              class="bg-[#61acf3] rounded-full w-16 h-16 flex justify-center items-center cursor-pointer text-white font-bold text-2xl uppercase"
            >
              {{
                cat?.company_name?.split(" ").length === 2
                  ? cat?.company_name?.split(" ")[0].charAt(0) +
                    cat?.company_name?.split(" ")[1].charAt(0)
                  : cat?.company_name?.charAt()
              }}
            </div>

            <h2 class="mt-2 font-semibold text-base text-center">
              {{ cat?.company_name?.split(" ")?.at(0) }}
            </h2>
          </div>
        </swiper-slide>
      </swiper>
    </div>

    <!-- collection -->
    <template v-for="collection in collections">
      <div class="flex justify-between items-center px-4 mt-3">
        <div>
          <h2 class="lg:text-xl font-bold">
            {{ collection?.supplier?.company_name }}
          </h2>
        </div>
        <div>
          <nuxt-link :to="{ name: 'shop' }">
            <button class="btn-primary">View All</button>
          </nuxt-link>
        </div>
      </div>
      <div class="mb-3">
        <div
          class="grid gap-4 mt-4 px-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-4"
        >
          <a-skeleton v-if="collection_loading" />
          <a-skeleton v-if="collection_loading" />
          <a-skeleton v-if="collection_loading" />
          <a-skeleton v-if="collection_loading" />

          <!-- <ProductCard
            v-for="(item, index) in collections"
            :key="index"
            :name="item?.name"
            :id="item?.id"
            :title="item?.category?.name"
            :price="item?.product_prices?.selling_price"
            :products="item"
            :imageSrc="item"
          /> -->

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
                <a-image
                  :width="350"
                  :height="350"
                  src="https://www.antdv.com/#error"
                  fallback="data:image/png;base64,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"
                />
              </nuxt-link>
            </div>

            <!-- Product Content -->
            <div
              class="p-3 bg-[#e3fff3] border-t-0 border-2 border-[#00C36E] rounded-b"
            >
              <!-- Product Info -->
              <p class="text-lg text-gray-600 font-semibold">
                {{ item?.name }}
              </p>
              <h2 class="text-sm truncate" :title="item?.category?.name">
                {{ item?.category?.name }}
              </h2>

              <!-- Price -->
              <div class="flex items-center gap-2 mt-2">
                <span class="text-lg lg:text-2xl font-bold text-[#007C46]"
                  >{{ item?.product_prices?.selling_price }} ৳</span
                >
              </div>

              <!-- Add to Cart Button -->
              <button
                @click="handleAddToCart(item)"
                type="button"
                class="w-full mt-3 text-xs lg:text-sm font-medium border-2 border-[#007C46] bg-[#007C46] text-white hover:text-[#007C46] hover:bg-transparent transition duration-200 rounded px-4 py-2"
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
import sliderImg_one from "@/assets/images/Banner/1.jpeg";
import sliderImg_two from "@/assets/images/Banner/4.jpeg";
import miniImgOne from "@/assets/images/Banner/7.jpeg";
import miniImgTwo from "@/assets/images/Banner/5.jpeg";
import { showNotification } from "@/util/notification";
import { useCartStore } from "@/stores/cart";
const cartStore = useCartStore();
const { getCart } = cartStore;

const sliders = [{ image: sliderImg_two }, { image: sliderImg_one }];

const modules = [Autoplay, Navigation];

// Axios and other imports
import { apiBasePharma } from "@/config";

import { ref, onMounted } from "vue";
import axios from "axios";
import { toast } from "vue3-toastify";

// State for storing companies
const companies = ref([]);
const loading = ref(false);

// Function to fetch companies
const getCompanies = async () => {
  loading.value = true;
  try {
    const res = await axios.get(`${apiBasePharma}/all-supplier`);
    loading.value = false;
    if (res.data) {
      companies.value = res.data;
    }
  } catch (error) {
    console.log(error);
    loading.value = false;
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
