<template>
  <NuxtLayout>
    <section class="p-20">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center">
          <!-- Left Column: Order Tracking Form -->
          <div class="md:w-1/2 mb-8 md:mb-0 md:pr-10">
            <h1 class="text-3xl font-bold text-gray-800 mb-4">
              Track Your Order
            </h1>
            <p class="text-gray-600 mb-6">
              Have an order? Want to know where your order is now?
            </p>

            <form @submit.prevent="trackOrder()" class="space-y-4">
              <p class="text-gray-600">Enter the track code of your order</p>
              <input
                readonly
                type="text"
                class="w-full px-4 py-2 border border-gray-400 rounded focus:outline-none"
                placeholder="Your Order Tracking Number..."
                v-model="sale_code"
                required
              />
              <button
                type="submit"
                class="w-full md:w-auto px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Submit
              </button>
            </form>

            <div class="order-status mt-6">
              <template v-if="!isLoading && orderStatus">
                <h2 class="text-2xl font-semibold text-gray-800 mt-6">
                  Status of the Order
                </h2>
                <p><strong>Order ID:</strong> {{ orderStatus.sale_code }}</p>
                <p>
                  <strong>Status:</strong>
                  {{ mapOrderStatus(orderStatus.verify_status) }}
                </p>
                <p><strong>Total Amount:</strong> {{ orderStatus.total }}</p>
                <p>
                  <strong>Order Date:</strong>
                  {{ formatDate(orderStatus.sale_date) }}
                </p>
                <p>
                  <strong>Payment Done:</strong>
                  {{ orderStatus.paid_amount ? "Yes" : "No" }}
                </p>

                <h3 class="mt-4 text-xl font-semibold">Products Ordered:</h3>
                <table
                  class="min-w-full table-auto mt-4 border-separate border-spacing-0"
                >
                  <thead>
                    <tr class="bg-gray-100">
                      <th
                        class="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b"
                      >
                        Product Name
                      </th>
                      <th
                        class="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b"
                      >
                        Product ID
                      </th>
                      <th
                        class="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b"
                      >
                        Quantity
                      </th>
                      <th
                        class="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b"
                      >
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="product in orderStatus.sale_products"
                      :key="product.product_id"
                      class="border-b hover:bg-gray-50"
                    >
                      <td class="px-4 py-2 text-sm text-gray-800">
                        {{ product.product_name }}
                      </td>
                      <td class="px-4 py-2 text-sm text-gray-800">
                        {{ product.product_id }}
                      </td>
                      <td class="px-4 py-2 text-sm text-gray-800">
                        {{ product.quantity }}
                      </td>
                      <td class="px-4 py-2 text-sm text-gray-800">
                        {{ product.price }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </template>
            </div>
          </div>

          <!-- Right Column: Image -->
          <div class="md:w-1/2 flex justify-center">
            <!-- Optional image for delivery -->
          </div>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup>
import { apiBasePharma } from "@/config";
import axios from "axios";

const route = useRoute();

let sale_code = ref(route.query.sale_code || "");
let orderStatus = ref(null);
const isLoading = ref(false);

const trackOrder = async () => {
  try {
    isLoading.value = true;
    const res = await axios.get(
      `${apiBasePharma}/order-tracking?sale_code=${sale_code.value}`
    );
    isLoading.value = false;

    // Map the response data to orderStatus structure
    orderStatus.value = {
      sale_code: res.data.sale_code,
      verify_status: res.data.verify_status,
      total: res.data.total,
      sale_date: res.data.sale_date,
      paid_amount: res.data.paid_amount,
      sale_products: res.data.sale_products,
    };
  } catch (error) {
    isLoading.value = false;
    console.error("Error fetching order data:", error.message);
  }
};

// Helper to map order status to human-readable form
const mapOrderStatus = (status) => {
  const statusMap = {
    0: "Pending",
    1: "Confirmed",
    2: "Cancelled",
  };
  return statusMap[status] || "Unknown";
};

// Helper to format date
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
</script>

<style lang="scss" scoped>
/* No custom styles are needed because Tailwind CSS handles most of the styling */
</style>
