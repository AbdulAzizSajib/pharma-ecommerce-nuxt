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
                  Order Method
                </th>
                <th class="px-4 py-2 border border-gray-200 text-gray-700">
                  Payment Status
                </th>
                <th class="px-4 py-2 border border-gray-200 text-gray-700">
                  Order Cancel
                </th>
              </tr>
            </thead>

            <tbody>
              <tr v-if="loading">
                <td colspan="9" class="w-full px-4 py-2 border border-gray-200">
                  Not Order Found ...
                </td>
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
                    {{ item?.sale_code }}
                  </router-link>
                </td>
                <td class="px-4 py-2 border border-gray-200">
                  {{ formatDate(item?.sale_date) }}
                </td>

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
                <td class="px-4 py-2 border border-gray-200">
                  <a-popconfirm
                    title="Are you sure you want to cancel the order?"
                    :disabled="
                      item.verify_status == 1 || item.verify_status == 2
                    "
                    @confirm="handleCancel(item.id)"
                    placement="top"
                  >
                    <button
                      :disabled="
                        item.verify_status == 1 || item.verify_status == 2
                      "
                      class="flex items-center px-4 py-2 border rounded-lg transition-colors duration-200 ease-in-out"
                      :class="{
                        'text-green-500':
                          item?.verify_status == 0 ||
                          item?.verify_status == null,
                        'text-red-500 bg-red-100':
                          item?.verify_status == 1 || item?.verify_status == 2,
                        'bg-gray-300':
                          item?.verify_status == 1 || item?.verify_status == 2,
                        'hover:bg-green-200':
                          item?.verify_status == 0 ||
                          (item?.verify_status == null &&
                            !item.verify_status == 1 &&
                            !item.verify_status == 2),
                      }"
                    >
                      <span class="flex items-center">
                        <span>
                          {{
                            item?.verify_status == 0 ||
                            item?.verify_status == null
                              ? "Pending"
                              : "Order Cancelled"
                          }}
                        </span>
                        <Icon
                          v-if="
                            item?.verify_status == 0 ||
                            item?.verify_status == null
                          "
                          class="size-4 ml-3 text-red-500 font-bold"
                          icon="hugeicons:cancel-01"
                          :ssr="true"
                        />
                      </span>
                    </button>
                  </a-popconfirm>
                </td>
              </tr>
            </tbody>
          </table>
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
    </section>
  </NuxtLayout>
</template>

<script setup>
import { apiBasePharma, getTokenConfig } from "@/config";
import axios from "axios";
import { Icon } from "@iconify/vue";
import { showNotification } from "@/util/notification";

const loading = ref(false);
const orderData = ref([]);
const backupData = ref();
const currentPage = ref(1);
const pageSize = ref(15);

const paginationInfo = ref();

const getOrderInfo = async () => {
  try {
    loading.value = true;
    const res = await axios.get(
      `${apiBasePharma}/all-order-list-paginated?page=${currentPage.value}&search=&paginate=${pageSize.value}`,
      getTokenConfig()
    );
    loading.value = false;

    orderData.value = res?.data?.data;
    backupData.value = res.data;

    // pageSize.value = res?.data?.per_page;
    // current.value = res?.data?.current_page;
    console.log(paginationInfo.value);
  } catch (error) {
    loading.value = false;
    console.log(error.message);
  }
};

const pagination = async (page) => {
  currentPage.value = page;
  await getOrderInfo();
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Add leading zero if month < 10
  const day = ("0" + date.getDate()).slice(-2); // Add leading zero if day < 10
  return `${day}-${month}-${year}`;
};

const handleCancel = async (id) => {
  try {
    const res = await axios.post(
      `${apiBasePharma}/sale/request-to-suspend/${id}`
    );
    if (res.data) {
      showNotification("success", res.data.message);
      await getOrderInfo();
    }
  } catch (error) {
    console.log(error.message);
  }
};

onMounted(async () => {
  await getOrderInfo();
});
</script>

<style lang="scss" scoped></style>
