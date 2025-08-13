<template>
  <NuxtLayout>
    <!-- category part -->
    <section class="w-full border">
      <div class="px-2 py-10 lg:px-10">
        <div class="lg:grid lg:grid-cols-12 lg:gap-x-6">
          <div class="hidden space-y-6 lg:col-span-3 lg:block">
            <div
              class="flex bg-[#6996cf] text-white px-4 border py-2 rounded-xl items-center justify-between"
            >
              <h2 class="text-xl tracking-wider">filter</h2>
            </div>

            <div class="">
              <div class="flex justify-between item-center">
                <h3 class="text-lg">All Category</h3>
                <button
                  class="bg-rose-300 px-4 py-1 rounded text-white"
                  @click="uncheckRadioButton"
                >
                  Uncheck Category
                </button>
              </div>
              <!-- <input
                placeholder="search category"
                type="text"
                class="border w-full px-2 py-1 mt-4 rounded"
              /> -->
              <ul class="mt-2 max-h-96 overflow-y-auto scrollable-list">
                <li class="flex items-center justify-between">
                  <div class="flex items-center">
                    <ul>
                      <li
                        v-if="categorysLoading"
                        class="flex justify-center items-center gap-4"
                      >
                        <img class="" :src="gif" alt="" />
                        <p>Loading...</p>
                      </li>

                      <li v-else v-for="(cat, index) in categorys" :key="index">
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
              <div class="flex justify-between item-center">
                <h3 class="text-lg">All Supplier</h3>
                <button
                  class="bg-rose-300 px-4 py-1 rounded text-white"
                  @click="uncheckSupplierButton"
                >
                  Uncheck Supplier
                </button>
              </div>
              <!-- <input
                placeholder="search Supplier"
                type="text"
                class="border w-full px-2 py-1 mt-4 rounded"
              /> -->
              <ul class="mt-2 max-h-96 overflow-y-auto scrollable-list">
                <li class="flex items-center justify-between">
                  <div class="flex items-center">
                    <ul>
                      <li
                        v-if="suppliersLoading"
                        class="flex justify-center items-center gap-4"
                      >
                        <img class="" :src="gif" alt="" />
                        <p>Loading...</p>
                      </li>
                      <li v-else v-for="(cat, index) in supplier" :key="index">
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
                <select v-model="sort_by" @change="getAlldata" class="border-2">
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
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
              <div class="flex justify-center item-center">
                <!-- <p class="text-xl" v-if="loading">Loading ..................</p> -->

                <img v-if="loading" class="" :src="gif" alt="" />

                <p
                  class="text-xl"
                  v-else-if="!loading && allProduct.length <= 0"
                >
                  No data Found!
                </p>
              </div>

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
            <a-pagination
              class="mt-3"
              v-model:current="currentPage"
              :total="backupData?.total"
              :show-size-changer="false"
              v-model:pageSize="pageSize"
              :show-total="(total) => `Total ${total} items`"
              @change="pagination"
            />
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
import { useRoute } from "vue-router";
import gif from "../../assets/images/Yellow.gif";

const allProduct = ref([]);
import medisine from "../../assets/images/medisine.jpeg";
import { Icon } from "@iconify/vue";
//
const loading = ref(false);

//
import { useCartStore } from "@/stores/cart";
import { showNotification } from "@/util/notification";
const cartStore = useCartStore();
const { getCart } = cartStore;
//

const currentPage = ref(1);
const pageSize = ref(50);
//
const categorys = ref([]);
const category_id = ref();
const categorysLoading = ref(false);
//
const supplier = ref([]);
const supplier_id = ref();
const suppliersLoading = ref(false);
//
const sort_by = ref("asc");
//
const route = useRoute();
const category_ID = route.query.category_ID;
const supplier_ID = route.query.supplier_ID;

//
const backupData = ref();

const getCategorys = async () => {
  try {
    categorysLoading.value = true;
    const res = await axios.get(`${apiBasePharma}/category_all`);
    categorysLoading.value = false;
    if (res.data) {
      categorys.value = res?.data;
    }
  } catch (error) {
    categorysLoading.value = false;
    console.log(error.message);
  }
};

const getSupplier = async () => {
  try {
    suppliersLoading.value = true;
    const res = await axios.get(`${apiBasePharma}/all-supplier`);
    suppliersLoading.value = false;
    if (res.data) {
      supplier.value = res?.data;
    }
  } catch (error) {
    console.log(error.message);
    suppliersLoading.value = false;
  }
};

const getAlldata = async () => {
  try {
    loading.value = true;
    const res = await axios.get(
      `${apiBasePharma}/all-products-paginated?page=${
        currentPage.value
      }&search=&paginate=${pageSize.value}&category_id=${
        category_id.value || category_ID || ""
      }&supplier_id=${supplier_id.value || supplier_ID || ""}&sort_by=${
        sort_by.value || ""
      }`
    );
    loading.value = false;
    if (res.data) {
      allProduct.value = res?.data?.data;
      backupData.value = res?.data;
      console.log(allProduct.value);
    }
  } catch (error) {
    console.log(error.message);
    loading.value = false;
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

const handleAddToCart = (products) => {
  console.log(products);
  getCart(products);
  showNotification("success", `${products.name} added to cart!`);
};

const pagination = async (page) => {
  currentPage.value = page;
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
