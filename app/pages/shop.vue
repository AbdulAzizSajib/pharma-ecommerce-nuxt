<template>
  <NuxtLayout>
    <div class="relative h-[100px] hidden lg:block overflow-hidden">
      <!-- <img
        class="w-full"
        src="@/assets/images/Breadcrumbs.png"
        alt="Breadcrumbs Image"
      /> -->
      <div class="absolute inset-0 flex justify-center items-center text-white">
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
              <Nuxt-link
                to="/"
                class="flex items-center px-1 capitalize hover:underline"
              >
                Home
              </Nuxt-link>
            </li>
            <li class="flex items-center space-x-2">
              <i class="bi bi-chevron-right"></i>
            </li>
            <li class="flex items-center space-x-2">Shop</li>
          </ol>
        </nav>
      </div>
    </div>

    <!-- category part -->
    <section class="w-full border">
      <div class="px-2 py-10 lg:px-10">
        <div class="lg:grid lg:grid-cols-12 lg:gap-x-6">
          <div class="hidden space-y-6 lg:col-span-3 lg:block">
            <div
              class="flex bg-green-700 text-white px-4 border py-2 rounded-3xl items-center justify-between"
            >
              <h2 class="text-xl tracking-wider">filter</h2>
            </div>
            <div class="">
              <div class="flex justify-between item-center mx-5">
                <h3 class="text-lg">All Category</h3>
                <button
                  class="bg-red-300 px-4 py-1 rounded text-white"
                  @click="uncheckRadioButton"
                >
                  Uncheck Category
                </button>
              </div>
              <ul class="mt-2 max-h-96 overflow-y-auto scrollable-list">
                <li class="flex items-center justify-between">
                  <div class="flex items-center">
                    <ul>
                      <li v-for="(cat, index) in categorys" :key="index">
                        <input
                          v-model="category_id"
                          :value="cat.id"
                          type="radio"
                          class=""
                          @change="getAlldata"
                        />
                        {{ cat?.name }}
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>

            <div class="">
              <div class="flex justify-between item-center mx-5">
                <h3 class="text-lg">All Supplier</h3>
                <button
                  class="bg-red-300 px-4 py-1 rounded text-white"
                  @click="uncheckSupplierButton"
                >
                  Uncheck Supplier
                </button>
              </div>
              <ul class="mt-2 max-h-96 overflow-y-auto scrollable-list">
                <li class="flex items-center justify-between">
                  <div class="flex items-center">
                    <ul>
                      <li v-for="(cat, index) in supplier" :key="index">
                        <input
                          v-model="supplier_id"
                          :value="cat.id"
                          type="radio"
                          class=""
                          @change="getAlldata"
                        />
                        {{ cat?.company_name }}
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="h-[400px] w-full rounded-lg px-2 lg:col-span-9 lg:h-full">
            <!-- tilte result etc -->
            <div class="p-2 flex justify-between items-center">
              <div class="flex gap-2 items-center">
                <h2>Sort By:</h2>
                <select v-model="sortOrder" class="border-2">
                  <option value="A-Z">A-Z</option>
                  <option value="Z-A">Z-A</option>
                </select>
              </div>
              <h2>
                <span class="font-semibold">
                  {{ allProduct.length }}
                </span>
                Results Found
              </h2>
            </div>
            <!-- prodcuts -->

            <div class="mb-3">
              <div
                class="grid gap-4 mt-4 px-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-4"
              >
                <div
                  class="overflow-hidden border rounded product-card"
                  v-for="(item, index) in allProduct"
                  :key="index"
                >
                  <!-- Product Image -->
                  <div class="relative border-b overflow-hidden rounded-t">
                    <nuxt-link
                      :to="{
                        name: 'product-id',
                        params: { id: item?.id || 0 },
                      }"
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
            <!-- <a-pagination
              class="mt-3"
              v-if="!isFetching"
              v-model:current="current1"
              :total="paginationInfo?.total"
              :show-size-changer="false"
              v-model:pageSize="pageSize"
              :show-total="(total) => `Total ${total} items`"
              @change="pagination"
            /> -->
          </div>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup>
import { apiBasePharma } from "@/config";
import axios from "axios";
import { ref } from "vue";

const allProduct = ref([]);
import medisine from "../../assets/images/medisine.jpeg";

const currentPage = ref(1);
const pageSize = ref(50);
const categorys = ref([]);
const category_id = ref();
//
const supplier = ref([]);
const supplier_id = ref();

const getCategorys = async () => {
  try {
    const res = await axios.get(`${apiBasePharma}/category_all`);
    if (res.data) {
      categorys.value = res?.data;
    }
  } catch (error) {
    console.log(error.message);
  }
};
const getSupplier = async () => {
  try {
    const res = await axios.get(`${apiBasePharma}/all-supplier`);
    if (res.data) {
      supplier.value = res?.data;
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getAlldata = async () => {
  try {
    const res = await axios.get(
      `${apiBasePharma}/all-products-paginated?page=1&search=&paginate=20&category_id=${
        category_id.value || ""
      }&supplier_id=${supplier_id.value || ""}`
    );
    if (res.data) {
      allProduct.value = res?.data?.data;
      console.log(allProduct.value);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const uncheckRadioButton = async () => {
  category_id.value = null;
  await getAlldata();
};
const uncheckSupplierButton = async () => {
  supplier_id.value = null;
  await getAlldata();
};

onMounted(async () => {
  await getAlldata();
  await getCategorys();
  await getSupplier();
});
</script>

<style lang="scss" scoped>
.scrollable-list::-webkit-scrollbar {
  width: 8px;
}

.scrollable-list::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}

.scrollable-list::-webkit-scrollbar-track {
  background: #f1f1f1;
}
</style>
