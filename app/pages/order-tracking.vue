<template>
  <NuxtLayout>
    <section
      class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12"
    >
      <div class="container mx-auto px-4">
        <!-- Header -->
        <div class="text-center mb-12">
          <div
            class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6"
          >
            <svg
              class="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              ></path>
            </svg>
          </div>
          <h1 class="text-4xl font-bold text-gray-800 mb-4">
            Track Your Order
          </h1>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Get real-time updates on your order status and delivery progress
          </p>
        </div>

        <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <!-- Left Column: Order Tracking Form -->
            <div
              class="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
            >
              <div class="mb-8">
                <div class="flex items-center mb-6">
                  <div
                    class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4"
                  >
                    <svg
                      class="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h2 class="text-2xl font-bold text-gray-800">
                      Enter Tracking Code
                    </h2>
                    <p class="text-gray-600">
                      Input your order tracking number below
                    </p>
                  </div>
                </div>

                <form @submit.prevent="trackOrder()" class="space-y-6">
                  <div class="relative">
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Order Tracking Number</label
                    >
                    <input
                      type="text"
                      class="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
                      placeholder="Enter your tracking number..."
                      v-model="sale_code"
                      required
                    />
                    <div class="absolute right-4 top-12">
                      <svg
                        class="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                        ></path>
                      </svg>
                    </div>
                  </div>

                  <button
                    type="submit"
                    :disabled="isLoading"
                    class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:transform-none flex items-center justify-center space-x-2"
                  >
                    <svg
                      v-if="isLoading"
                      class="animate-spin w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <svg
                      v-else
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                    <span>{{ isLoading ? "Tracking..." : "Track Order" }}</span>
                  </button>
                </form>
              </div>

              <!-- Order Status Results -->
              <div
                v-if="!isLoading && orderStatus"
                class="order-status space-y-8 animate-fade-in"
              >
                <!-- 3-Stage Progress Tracker -->
                <div
                  class="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 border"
                >
                  <h3 class="text-xl font-bold text-gray-800 mb-8 text-center">
                    Order Progress
                  </h3>

                  <div class="relative">
                    <!-- Progress Line -->
                    <div
                      class="absolute top-6 left-8 right-8 h-1 bg-gray-200 rounded-full"
                    >
                      <div
                        class="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-1000"
                        :style="{ width: getProgressWidth() }"
                      ></div>
                    </div>

                    <!-- Stage Items -->
                    <div class="relative flex justify-between items-center">
                      <!-- Stage 1: Order Placed -->
                      <div class="flex flex-col items-center">
                        <div
                          class="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg transition-all duration-500"
                          :class="getStageClass(0)"
                        >
                          <svg
                            v-if="orderStatus.verify_status >= 0"
                            class="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            ></path>
                          </svg>
                          <span v-else>1</span>
                        </div>
                        <div class="mt-3 text-center">
                          <p class="text-sm font-semibold text-gray-700">
                            Order Placed
                          </p>
                          <p class="text-xs text-gray-500">
                            {{ formatDate(orderStatus.sale_date) }}
                          </p>
                        </div>
                      </div>

                      <!-- Stage 2: Order Confirmed -->
                      <div class="flex flex-col items-center">
                        <div
                          class="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg transition-all duration-500"
                          :class="getStageClass(1)"
                        >
                          <svg
                            v-if="orderStatus.verify_status >= 1"
                            class="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            ></path>
                          </svg>
                          <span v-else>2</span>
                        </div>
                        <div class="mt-3 text-center">
                          <p class="text-sm font-semibold text-gray-700">
                            Confirmed
                          </p>
                          <p class="text-xs text-gray-500">Processing</p>
                        </div>
                      </div>

                      <!-- Stage 3: Delivered -->
                      <div class="flex flex-col items-center">
                        <div
                          class="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg transition-all duration-500"
                          :class="getStageClass(2)"
                        >
                          <svg
                            v-if="orderStatus.verify_status >= 2"
                            class="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                            ></path>
                            <path
                              d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z"
                            ></path>
                          </svg>
                          <span v-else>3</span>
                        </div>
                        <div class="mt-3 text-center">
                          <p class="text-sm font-semibold text-gray-700">
                            Delivered
                          </p>
                          <p class="text-xs text-gray-500">Complete</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Order Details Card -->
                <div
                  class="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
                >
                  <h2
                    class="text-2xl font-bold text-gray-800 mb-6 flex items-center"
                  >
                    <svg
                      class="w-6 h-6 mr-3 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                    Order Details
                  </h2>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div class="space-y-4">
                      <div
                        class="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                      >
                        <span class="font-medium text-gray-600">Order ID:</span>
                        <span class="font-semibold text-gray-800"
                          >#{{ orderStatus.sale_code }}</span
                        >
                      </div>
                      <div
                        class="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                      >
                        <span class="font-medium text-gray-600">Status:</span>
                        <span
                          class="px-3 py-1 rounded-full text-sm font-semibold"
                          :class="
                            getStatusBadgeClass(orderStatus.verify_status)
                          "
                        >
                          {{ mapOrderStatus(orderStatus.verify_status) }}
                        </span>
                      </div>
                      <div
                        class="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                      >
                        <span class="font-medium text-gray-600"
                          >Total Amount:</span
                        >
                        <span class="font-bold text-green-600 text-lg"
                          >${{ orderStatus.total }}</span
                        >
                      </div>
                    </div>

                    <div class="space-y-4">
                      <div
                        class="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                      >
                        <span class="font-medium text-gray-600"
                          >Order Date:</span
                        >
                        <span class="font-semibold text-gray-800">{{
                          formatDate(orderStatus.sale_date)
                        }}</span>
                      </div>
                      <div
                        class="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                      >
                        <span class="font-medium text-gray-600">Payment:</span>
                        <span
                          class="px-3 py-1 rounded-full text-sm font-semibold"
                          :class="
                            orderStatus.paid_amount
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          "
                        >
                          {{ orderStatus.paid_amount ? "Paid" : "Pending" }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- Products Table -->
                  <div class="bg-gray-50 rounded-2xl p-6">
                    <h3
                      class="text-xl font-bold text-gray-800 mb-6 flex items-center"
                    >
                      <svg
                        class="w-5 h-5 mr-2 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        ></path>
                      </svg>
                      Products Ordered
                    </h3>

                    <div class="overflow-x-auto">
                      <table class="w-full bg-white rounded-xl shadow-sm">
                        <thead>
                          <tr
                            class="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                          >
                            <th
                              class="px-6 py-4 text-left text-sm font-semibold rounded-tl-xl"
                            >
                              Product Name
                            </th>
                            <th
                              class="px-6 py-4 text-left text-sm font-semibold"
                            >
                              Product ID
                            </th>
                            <th
                              class="px-6 py-4 text-left text-sm font-semibold"
                            >
                              Quantity
                            </th>
                            <th
                              class="px-6 py-4 text-left text-sm font-semibold rounded-tr-xl"
                            >
                              Price
                            </th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                          <tr
                            v-for="(
                              product, index
                            ) in orderStatus.sale_products"
                            :key="product.product_id"
                            class="hover:bg-blue-50 transition-colors duration-200"
                          >
                            <td
                              class="px-6 py-4 text-sm font-medium text-gray-900"
                            >
                              {{ product.product_name }}
                            </td>
                            <td class="px-6 py-4 text-sm text-gray-600">
                              #{{ product.product_id }}
                            </td>
                            <td class="px-6 py-4 text-sm text-gray-600">
                              <span
                                class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full"
                              >
                                {{ product.quantity }}
                              </span>
                            </td>
                            <td
                              class="px-6 py-4 text-sm font-semibold text-green-600"
                            >
                              ${{ product.price }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column: Illustrations -->
            <div class="space-y-8">
              <!-- Delivery Illustration -->
              <div
                class="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100"
              >
                <div
                  class="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center"
                >
                  <svg
                    class="w-16 h-16 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M8 16l-4-4m0 0l4-4m-4 4h16M16 4h2a2 2 0 012 2v12a2 2 0 01-2 2h-2"
                    ></path>
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-gray-800 mb-3">
                  Fast & Secure Delivery
                </h3>
                <p class="text-gray-600 leading-relaxed">
                  We ensure your orders are delivered quickly and safely to your
                  doorstep with real-time tracking updates.
                </p>
              </div>

              <!-- Features -->
              <div class="grid grid-cols-1 gap-6">
                <div
                  class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100"
                >
                  <div class="flex items-center mb-4">
                    <div
                      class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4"
                    >
                      <svg
                        class="w-6 h-6 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <h4 class="font-bold text-gray-800">Real-time Updates</h4>
                      <p class="text-sm text-gray-600">
                        Get instant notifications
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100"
                >
                  <div class="flex items-center mb-4">
                    <div
                      class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4"
                    >
                      <svg
                        class="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <h4 class="font-bold text-gray-800">Secure Tracking</h4>
                      <p class="text-sm text-gray-600">
                        Protected order information
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100"
                >
                  <div class="flex items-center mb-4">
                    <div
                      class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4"
                    >
                      <svg
                        class="w-6 h-6 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <h4 class="font-bold text-gray-800">Fast Delivery</h4>
                      <p class="text-sm text-gray-600">
                        Quick order processing
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
    2: "Delivered",
  };
  return statusMap[status] || "Unknown";
};

// Helper to format date
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Get progress width for the progress bar
const getProgressWidth = () => {
  if (!orderStatus.value) return "0%";

  switch (orderStatus.value.verify_status) {
    case 0:
      return "33%";
    case 1:
      return "66%";
    case 2:
      return "100%";
    default:
      return "0%";
  }
};

// Get stage class for styling
const getStageClass = (stageIndex) => {
  if (!orderStatus.value) return "bg-gray-300 text-gray-600";

  const currentStatus = orderStatus.value.verify_status;

  if (currentStatus >= stageIndex) {
    return "bg-gradient-to-r from-green-400 to-green-600 text-white transform scale-110";
  } else {
    return "bg-gray-300 text-gray-600";
  }
};

// Get status badge class
const getStatusBadgeClass = (status) => {
  switch (status) {
    case 0:
      return "bg-yellow-100 text-yellow-800";
    case 1:
      return "bg-blue-100 text-blue-800";
    case 2:
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
</script>

<style lang="scss" scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Custom scrollbar for table */
.overflow-x-auto::-webkit-scrollbar {
  height: 6px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
