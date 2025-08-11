<template>
  <NuxtLayout>
    <section class="py-10">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">My Order</h2>

        <!-- Order Table -->
        <div class="overflow-x-auto bg-white shadow-md rounded-lg">
          <table
            class="min-w-full bg-white text-center border-collapse border border-gray-200"
          >
            <thead>
              <tr class="bg-gray-100">
                <th class="px-4 py-2 border border-gray-200 text-gray-700">
                  Order ID
                </th>
                <th class="px-4 py-2 border border-gray-200 text-gray-700">
                  Date
                </th>
                <th class="px-4 py-2 border border-gray-200 text-gray-700">
                  Products
                </th>
                <th class="px-4 py-2 border border-gray-200 text-gray-700">
                  Total (BD)
                </th>
                <th class="px-4 py-2 border border-gray-200 text-gray-700">
                  Cancelled
                </th>
                <th class="px-4 py-2 border border-gray-200 text-gray-700">
                  Order Method
                </th>
                <th class="px-4 py-2 border border-gray-200 text-gray-700">
                  Payment Status
                </th>
              </tr>
            </thead>

            <tbody>
              <tr class="text-center">
                Not Order Found
              </tr>
              <tr
                v-for="(item, index) in orderData"
                :key="item?.id"
                class="hover:bg-gray-50"
              >
                <td class="px-4 py-2 border border-gray-200">
                  <router-link
                    :to="{
                      path: `/order-tracking`,
                      query: { sale_code: item?.sale_code },
                    }"
                    class="text-green-600 font-medium"
                  >
                    {{ index + 1 }} P:{{ item?.id }}
                  </router-link>
                </td>
                <td class="px-4 py-2 border border-gray-200">
                  {{ formatDate(item?.sale_date) }}
                </td>
                <!-- <td class="px-4 py-2 border border-gray-200 text-left">
                  <div
                    v-for="(productItem, index) in item?.sale_products"
                    :key="index"
                    class="flex items-center mb-2"
                  >
                    <img
                      :src="`${imgBase}${productItem?.product_image}`"
                      class="w-8 h-8 rounded mr-2"
                      alt="Product image"
                      @error="$event.target.src = `${defaultImage}`"
                    />
                  </div>
                </td> -->
                <td class="px-4 py-2 border border-gray-200 text-left">
                  <div
                    v-for="(productItem, index) in item?.sale_products"
                    :key="index"
                    class="mb-2"
                  >
                    <span class="px-1">{{ productItem?.product_name }}</span>
                  </div>
                </td>
                <td class="px-4 py-2 border border-gray-200">
                  {{ Math.round(item?.total) }} BD
                </td>
                <td class="px-4 py-2 border border-gray-200">
                  <span
                    :class="
                      item?.cancelled == 0 ? 'text-gray-500' : 'text-red-500'
                    "
                  >
                    {{ item?.cancelled == 0 ? "No" : "Yes" }}
                  </span>
                </td>
                <td class="px-4 py-2 border border-gray-200">
                  {{ item?.payment_method?.name }}
                </td>
                <td class="px-4 py-2 border border-gray-200">
                  <span
                    :class="
                      item?.paid_amount ? 'text-green-500' : 'text-red-500'
                    "
                  >
                    {{ item?.paid_amount ? "Paid" : "Unpaid" }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <a-pagination
          class="mt-3"
          v-if="!loading"
          v-model:current="current"
          :total="backupData?.total"
          :show-size-changer="false"
          v-model:pageSize="pageSize"
          :show-total="(total) => `Total ${total} items`"
          @change="pagination"
        />
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup>
import { apiBasePharma, getTokenConfig } from "@/config";
import axios from "axios";

const loading = ref(false);
const orderData = ref([]);
const backupData = ref();
const current = ref(1);
const pageSize = ref(20);

const paginationInfo = ref();

const getOrderInfo = async () => {
  try {
    loading.value = true;
    const res = await axios.get(
      `${apiBasePharma}/all-order-list-paginated?page=1&search=&paginate=20`,
      getTokenConfig()
    );
    loading.value = false;

    orderData.value = res?.data?.data;
    backupData.value = res.data;

    pageSize.value = res?.data?.per_page;
    current.value = res?.data?.current_page;
    console.log(paginationInfo.value);
  } catch (error) {
    loading.value = false;
    console.log(error.message);
  }
};

const pagination = async (page) => {
  current.value = page;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Add leading zero if month < 10
  const day = ("0" + date.getDate()).slice(-2); // Add leading zero if day < 10
  return `${day}-${month}-${year}`;
};

onMounted(async () => {
  await getOrderInfo();
});
</script>

<style lang="scss" scoped></style>
