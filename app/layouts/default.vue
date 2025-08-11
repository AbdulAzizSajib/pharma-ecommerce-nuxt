<template>
  <div class="container mx-auto">
    <!-- Header -->
    <nav class="flex whitespace-nowrap justify-between items-center py-4">
      <!-- logo -->
      <div class="flex items-center">
        <div class="logo grow">
          <nuxt-link
            class="xl:text-xl font-bold text-primary leading-none"
            to="/"
          >
            <span> Pharma Ecommerce</span>
          </nuxt-link>
        </div>
        <!-- <div class="shop mx-4 hidden md:block">
          <nuxt-link ::to="{ name: 'shop' }" class="text-md text-primary">
            <div class="flex items-center">
              <Icon class="size-9 mr-2" icon="stash:shop-solid" />

              <span class="hidden lg:block">Shop</span>
            </div>
          </nuxt-link>
        </div> -->
        <div class="hidden md:block mx-4">
          <nuxt-link
            :to="{ name: 'order-tracking' }"
            class="text-md text-primary"
          >
            <div class="flex items-center">
              <Icon class="size-8 mr-2" icon="mdi:truck" />

              <span class="hidden lg:block">Order Tracking</span>
            </div>
          </nuxt-link>
        </div>
      </div>

      <div class="row mx-4 hidden md:block w-full">
        <a-select
          show-search
          :filterOption="false"
          @search="searchHandle($event)"
          class="w-full capitalize"
        >
          <a-select-option v-for="item in searchData" :key="item.id">
            <nuxt-link :to="`/product/${item?.id}`">
              <div class="rounded-md capitalize">
                <h3 class="font-bold text-lg">{{ item?.name }}</h3>

                <p class="text-sm text-gray-600">
                  Category: {{ item?.category?.name }}
                </p>

                <p class="text-sm text-gray-600">
                  Supplier: {{ item?.supplier?.company_name }}
                </p>

                <p class="text-sm text-gray-600">
                  Price:{{ item?.pack_size?.selling_price }}
                </p>
              </div>
            </nuxt-link>
          </a-select-option>
        </a-select>
      </div>
      <!-- cart -->

      <div class="hidden md:flex space-x-1 items-center">
        <nuxt-link
          :to="{ name: 'wishlist' }"
          class="p-2 rounded-full bg-primary hover:bg-primary-dark transition duration-300"
          title="Wishlist"
        >
          <Icon class="size-6 mr-2" icon="mdi-light:heart" />
        </nuxt-link>
        |
        <nuxt-link :to="{ name: 'cart' }" class="relative" title="Cart">
          <a-badge :count="cartProduct?.length">
            <button class="">
              <Icon class="size-7 mr-2" icon="bitcoin-icons:cart-outline" />
            </button>
          </a-badge>
        </nuxt-link>
      </div>

      <a-dropdown class="lg:block ml-4" :trigger="['click']">
        <button type="button" class="">
          <div class="w-8 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="@/assets/images/human.png"
            />
          </div>
        </button>
        <template #overlay class="">
          <a-menu>
            <a-menu-item>
              <nuxt-link to="/order"> My Orders</nuxt-link>
            </a-menu-item>
            <a-menu-item>
              <nuxt-link to="/profile"> profile Setting</nuxt-link>
            </a-menu-item>
            <a-menu-item>
              <template v-if="isLoggedIn">
                <button
                  @click="handleLogout"
                  class="flex items-center text-start justify-start rounded-full bg-primary hover:bg-primary-dark transition duration-300"
                  title="Logout"
                >
                  <p>Logout</p>
                  <Icon class="size-4 ml-2" icon="hugeicons:logout-04" />
                </button>
              </template>

              <template v-else>
                <nuxt-link
                  :to="{ name: 'login' }"
                  class="flex items-center text-start justify-start bg-primary hover:bg-primary-dark transition duration-300"
                  title="Signup"
                >
                  <p>login</p>
                  <Icon
                    class="size-6 ml-2"
                    icon="material-symbols-light:login"
                  />
                </nuxt-link>
              </template>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <!-- Mobile Menu Button -->
      <div class="md:hidden">
        <button class="text-primary" @click="isMenuOpen = !isMenuOpen">
          <svg
            class="block h-5 w-5 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </button>
      </div>
    </nav>
    <!-- Mobile Menu  -->
    <div class="relative" v-show="isMenuOpen">
      <nav
        class="fixed top-0 left-0 h-screen p-5 z-50 bg-white border-r overflow-y-auto"
      >
        <div class="flex justify-between items-center mb-3">
          <p class="text-lg font-semibold">All Menu</p>
          <button class="navbar-close" @click="isMenuOpen = false">
            <svg
              class="h-6 w-6 text-black cursor-pointer hover:text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <!-- Menus -->

        <ul class="list-none">
          <li class="mb-2"></li>
          <li class="mb-2">
            <nuxt-link class="block font-semibold" to="/">Home</nuxt-link>
          </li>
          <li class="mb-2">
            <nuxt-link class="block font-semibold" :to="{ name: 'shop' }"
              >Shop</nuxt-link
            >
          </li>
          <li class="mb-2">
            <nuxt-link
              class="block font-semibold"
              :to="{ name: 'order-tracking' }"
              >Order Tracking</nuxt-link
            >
          </li>

          <li class="mb-2">
            <nuxt-link class="block font-semibold" :to="{ name: 'wishlist' }"
              >Wishlist</nuxt-link
            >
          </li>
          <li class="mb-2">
            <a-badge :count="cartProduct?.length">
              <nuxt-link class="block font-semibold pr-4" :to="{ name: 'cart' }"
                >Cart</nuxt-link
              >
            </a-badge>
          </li>
          <li class="mb-2">
            <nuxt-link class="block font-semibold" :to="{ name: 'login' }"
              >Signup</nuxt-link
            >
          </li>
        </ul>
        <!-- Categories -->
        <h2 class="font-bold text-base uppercase mt-5 mb-3">
          Product Categories
        </h2>
        <ul class="list-none">
          <li class="mb-2" v-for="cat in featured_categories">
            <nuxt-link class="block font-semibold" to="/">{{
              cat?.title
            }}</nuxt-link>
          </li>
        </ul>
      </nav>
    </div>

    <!-- main container -->
    <main class="min-h-screen"><slot></slot></main>
  </div>
  <!-- footer -->
  <footer class="bg-slate-600 text-white py-7">
    <div class="container mx-auto">
      <div class="md:grid grid-cols-4 gap-3">
        <!-- Left Side: Logo, Title, Short Description, Address, and Contact -->
        <div class="col-span-2 mb-3">
          <!-- Logo and Title -->
          <div class="flex items-center justify-start md:justify-start gap-2">
            <h2 class="text-xl font-bold text-white">Pharma Ecommerce</h2>
          </div>
          <!-- Short Description -->
          <h2 class="text-lg font-semibold">
            Your Trusted Online Pharmacy in Bangladesh
          </h2>
          <p class="font-light text-justify text-gray-300 max-w-[500px]">
            Discover a wide range of high-quality medicines, wellness products,
            and healthcare essentials, all available at your fingertips. With
            fast home delivery and affordable prices, we bring the pharmacy to
            your door—making healthcare easier, more convenient, and more
            accessible for everyone in Bangladesh.
          </p>

          <!-- Address and Contact -->
          <div class="mt-3">
            <HomeOutlined class="align-baseline" />
            <span class="text-white leading-7 pl-2"> ACI Center, Tejgaon </span>
          </div>
          <div class="md:flex w-full">
            <div class="flex items-center mr-3 mt-1">
              <PhoneFilled />
              <span class="text-white leading-7 ml-2"> 01782521705 </span>
            </div>
            <div class="flex items-center mt-1">
              <MailFilled />
              <span class="text-white leading-7 ml-2">
                pharmaecommerce.com
              </span>
            </div>
          </div>
        </div>

        <!-- Right Side: Static Service and Help Links -->
        <div class="grid grid-cols-2 gap-4">
          <!-- Services Section -->
          <div class="mb-3 text-left">
            <h6 class="lg:text-xl font-bold text-white mb-4">Services</h6>
            <p class="mb-1">
              <nuxt-link to="/" class="text-gray-300 link link-hover">
                About Us
              </nuxt-link>
            </p>
            <p class="mb-1">
              <nuxt-link to="/" class="text-gray-300 link link-hover">
                FAQ
              </nuxt-link>
            </p>
            <p class="mb-1">
              <nuxt-link to="/" class="text-gray-300 link link-hover">
                Contact
              </nuxt-link>
            </p>
          </div>

          <!-- Help Section -->
          <div class="mb-3 text-center md:text-left">
            <h6 class="lg:text-xl text-start font-bold text-white mb-4">
              Help
            </h6>

            <p class="mb-1">
              <nuxt-link to="/" class="text-gray-300 link link-hover">
                Refund Policy
              </nuxt-link>
            </p>
            <p class="mb-1">
              <nuxt-link to="/" class="text-gray-300 link link-hover">
                Privacy Policy
              </nuxt-link>
            </p>
            <p class="mb-1">
              <nuxt-link to="/" class="text-gray-300 link link-hover">
                Sitemap
              </nuxt-link>
            </p>
          </div>
        </div>
      </div>
    </div>

    <hr class="my-6 border-gray-500" />

    <!-- Footer Bottom: Copyright and Social Links -->
    <div class="container mx-auto">
      <div class="md:flex justify-between items-center">
        <!-- Copyright Text -->
        <div class="mt-3">
          <p class="text-white text-center md:text-left">
            &copy; 2025 Pharma Ecommerce. All Rights Reserved.
          </p>
        </div>

        <!-- Static Social Media Links -->
        <div class="mt-3">
          <div
            class="flex flex-wrap items-center justify-center md:justify-start"
          >
            <Icon class="size-6 mr-2" icon="logos:facebook" />
            <Icon class="size-6 mr-2" icon="logos:youtube-icon" />
            <Icon class="size-6 mr-2" icon="skill-icons:instagram" />
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Icon } from "@iconify/vue";
const searchData = ref([]);

const featured_categories = ref([]);
const isLoggedIn = ref("");

const isMenuOpen = ref(false);
import { useCartStore } from "@/stores/cart";

import { storeToRefs } from "pinia";
import { apiBasePharma } from "@/config";
import axios from "axios";
const cartStore = useCartStore();
const { cartProduct } = storeToRefs(cartStore);

const searchHandle = async (event) => {
  // console.log(event.target.value);
  try {
    const res = await axios.get(
      `${apiBasePharma}/products/search?term=${event}`
    );
    if (res?.data) {
      searchData.value = res.data.products;
      console.log(searchData.value);
    } else {
      searchData.value = [];
    }
  } catch (error) {
    searchData.value = [];
    console.error("Search error:", error);
  }
};
const handleLogout = () => {
  console.log("logOut");
  localStorage.removeItem("token" || "");
  localStorage.removeItem("user" || "");
};

onMounted(() => {
  isLoggedIn.value = localStorage.getItem("token") || "";
});
</script>

<style lang="scss" scoped></style>
