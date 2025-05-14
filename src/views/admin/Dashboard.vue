<template>
  <div class="content-page" id="content-page">
    <b-container fluid>
      <b-row>
        <!--  row 1 -->
        <b-col md="6" lg="4" class="iq-counter">
          <b-card class="card-block card-stretch card-height">
            <div class="d-flex align-items-center">
              <div
                class="rounded-circle p1 bg-primary d-flex align-items-center justify-content-center"
                style="width: 66px; height: 66px; font-size: 22px"
              >
                <i class="ph ph-user text-white"></i>
              </div>
              <div class="text- ms-3 mt-3 d-flex flex-column gap-2">
                <h2>
                  <vue3-autocounter
                    ref="counter"
                    :start-amount="0"
                    :end-amount="dashBoard1.user"
                    separator=""
                    :duration="2"
                  />
                </h2>
                <h5 class="">Users</h5>
              </div>
            </div>
            <div class="action-dedtail">
              <router-link to="/admin/user-list">Xem chi tiết</router-link>
            </div>
          </b-card>
        </b-col>
        <b-col md="6" lg="4" class="iq-counter">
          <b-card class="card-block card-stretch card-height">
            <div class="d-flex align-items-center">
              <div
                class="rounded-circle p1 bg-primary d-flex align-items-center justify-content-center"
                style="width: 66px; height: 66px; font-size: 22px"
              >
                <i class="ph ph-user text-white"></i>
              </div>
              <div class="text- ms-3 mt-3 d-flex flex-column gap-2">
                <h2>
                  <vue3-autocounter
                    ref="counter"
                    :start-amount="0"
                    :end-amount="dashBoard1.genre"
                    separator=""
                    :duration="2"
                  />
                </h2>
                <h5 class="">Thể loại</h5>
              </div>
            </div>
            <div class="action-dedtail">
              <router-link to="/admin/category-list">Xem chi tiết</router-link>
            </div>
          </b-card>
        </b-col>
        <b-col md="6" lg="4" class="iq-counter">
          <b-card class="card-block card-stretch card-height">
            <div class="d-flex align-items-center">
              <div
                class="rounded-circle p1 bg-warning d-flex align-items-center justify-content-center"
                style="width: 66px; height: 66px; font-size: 22px"
              >
                <i class="ph ph-shopping-cart text-white"></i>
              </div>
              <div class="text-left ms-3 mt-3 d-flex flex-column gap-2">
                <h2>
                  <vue3-autocounter
                    ref="counter"
                    :start-amount="0"
                    :end-amount="dashBoard1.order"
                    :duration="2"
                  />
                </h2>
                <h5>Đơn hàng</h5>
              </div>
            </div>
            <div class="action-dedtail">
              <router-link to="/admin/order-list">Xem chi tiết</router-link>
            </div>
          </b-card>
        </b-col>
        <!-- end -->
      </b-row>
      <!-- row 2 -->
      <b-row class="d-flex justify-content-between">
        <b-col md="6" lg="4" class="iq-counter">
          <b-card class="card-block card-stretch card-height">
            <div class="d-flex align-items-center">
              <div
                class="rounded-circle p1 bg-danger d-flex align-items-center justify-content-center"
                style="width: 66px; height: 66px; font-size: 22px"
              >
                <i class="ph ph-book text-white"></i>
              </div>
              <div class="text-left ms-3 mt-3 d-flex flex-column gap-2">
                <h2>
                  <vue3-autocounter
                    ref="counter"
                    :start-amount="0"
                    :end-amount="dashBoard1.book"
                    :duration="2"
                  />
                </h2>
                <h5>Sách</h5>
              </div>
            </div>
            <div class="action-dedtail">
              <router-link to="/admin/book-list">Xem chi tiết</router-link>
            </div>
          </b-card>
        </b-col>
        <b-col md="6" lg="4" class="iq-counter">
          <b-card class="card-block card-stretch card-height">
            <div class="d-flex align-items-center">
              <div
                class="rounded-circle p1 bg-danger d-flex align-items-center justify-content-center"
                style="width: 66px; height: 66px; font-size: 22px"
              >
                <i class="ph ph-basket text-white"></i>
              </div>
              <div class="text-left ms-3 mt-3 d-flex flex-column gap-2">
                <h2>
                  <vue3-autocounter
                    ref="counter"
                    :start-amount="0"
                    :end-amount="dashBoard1.bookSale"
                    :duration="2"
                  />
                </h2>
                <h5>Sách đã bán</h5>
              </div>
            </div>
          </b-card>
        </b-col>
        <b-col md="6" lg="4" class="iq-counter">
          <b-card class="card-block card-stretch card-height">
            <div class="d-flex align-items-center">
              <div
                class="rounded-circle p1 bg-danger d-flex align-items-center justify-content-center"
                style="width: 66px; height: 66px; font-size: 22px"
              >
                <i class="ph ph-basket text-white"></i>
              </div>
              <div class="text-left ms-3 mt-3 d-flex flex-column gap-2">
                <h2>
                  <vue3-autocounter
                    ref="counter"
                    :start-amount="0"
                    :end-amount="dashBoard1.book - dashBoard1.bookSale"
                    :duration="2"
                  />
                </h2>
                <h5>Sách tồn kho</h5>
              </div>
            </div>
          </b-card>
        </b-col>
      </b-row>
      <!-- row 3 -->
      <b-row>
        <b-col lg="4" class="iq-counter">
          <b-card class="card-block card-stretch card-height">
            <div class="d-flex align-items-center">
              <div
                class="rounded-circle p1 bg-info d-flex align-items-center justify-content-center"
                style="width: 66px; height: 66px; font-size: 22px"
              >
                <i class="ph ph-cell-tower text-white"></i>
              </div>
              <div class="text-left ms-3 mt-3 d-flex flex-column gap-2">
                <h2>
                  <vue3-autocounter
                    ref="counter"
                    :start-amount="0"
                    :end-amount="dashBoard1.orderPaid"
                    separator=""
                    :duration="2"
                  />
                </h2>
                <h5>Đơn đã thanh toán + hoàn thành</h5>
              </div>
            </div>
          </b-card>
        </b-col>
        <b-col
          md="4"
          v-tooltip="
            'Tổng doanh thu = Tiền đơn hàng đã thanh toán + đơn hàng đã hoàn thành'
          "
        >
          <b-card>
            <div class="d-flex align-items-center justify-content-between">
              <div class="bg-success-subtle rounded p-3">
                <svg
                  class="text-success"
                  mlns="http://www.w3.org/2000/svg"
                  width="35px"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div>
                <h1 class="text-success text-end">
                  <vue3-autocounter
                    ref="counter"
                    :start-amount="0"
                    :duration="2"
                    :end-amount="dashBoard2.sumRevenue"
                  />
                  Đ
                </h1>
                <p class="text-success mb-0">Tổng doanh thu</p>
              </div>
            </div>
          </b-card>
        </b-col>
        <b-col md="4"
          ><b-card>
            <div class="d-flex align-items-center justify-content-between">
              <div class="bg-success-subtle rounded p-3">
                <svg
                  class="text-success"
                  mlns="http://www.w3.org/2000/svg"
                  width="35px"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div>
                <h1 class="text-success text-end">
                  <vue3-autocounter
                    ref="counter"
                    :start-amount="0"
                    :end-amount="dashBoard2.totalImport"
                  />
                  Đ
                </h1>
                <p class="text-success mb-0">Tổng tiền nhập sách</p>
              </div>
            </div>
          </b-card></b-col
        >
      </b-row>
      <b-row>
        <b-card>
          <h3>Doanh thu theo tháng</h3>
          <b-col class="mb-5">
            <apexchart
              ref="revenue"
              type="line"
              height="100%"
              :options="optionsRe"
              :series="revenueSum"
            ></apexchart>
          </b-col>
        </b-card>
        <b-card>
          <h3>Số lượng sách bán theo tháng</h3>
          <b-col class="mb-5">
            <apexchart
              class="chart-book"
              ref="book"
              type="line"
              height="100%"
              :options="optionsBook"
              :series="bookSum"
            ></apexchart>
          </b-col>
        </b-card>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { onMounted, ref, reactive } from "vue";
import dashboardApi from "@/api/System/dashboardApi.js";
import ApexCharts from "apexcharts";
// import Vue3autocounter from 'vue3-autocounter'
import { mFormat } from "@/common/mFomat";
import MNodata from "@/components/MNodata/MNodata.vue";

export default {
  name: "DashBoard",
  components: {
    ApexCharts,
    MNodata,
  },
  setup() {
    const userCount = ref(100);
    const dashBoard1 = ref({});
    const dashBoard2 = ref({});
    const categories = [
      "Th1",
      "Th2",
      "Th3",
      "Th4",
      "Th5",
      "Th6",
      "Th7",
      "Th8",
      "Th9",
      "Th10",
      "Th11",
      "Th12",
    ];
    const optionsRe = ref({
      yaxis: {
        tickAmount: 5, // Giảm số lượng tick để dễ đọc hơn
        min: function (min) {
          return min > 0 ? 0 : Math.floor(min / 10000) * 10000; // Làm tròn xuống theo 10,000
        },
        max: function (max) {
          // Đảm bảo max tối thiểu là 50,000 nếu dữ liệu nhỏ
          const baseMax = max < 50000 ? 50000 : max;
          // Làm tròn lên theo 10,000 và thêm 1 khoảng 20% padding
          return Math.ceil(baseMax / 10000) * 10000 * 1.2;
        },
        forceNiceScale: true,
        labels: {
          formatter: function (value) {
            return mFormat.formatAmount(value);
          },
          style: {
            fontSize: "13px",
            fontFamily: "Inter",
            colors: ["#AEB2C7"],
            fontWeight: 400,
          },
        },
      },
      events: {
        beforeZoom: function () {
          return false;
        },
        beforeResetZoom: function () {
          return false;
        },
        selection: function () {
          return false;
        },
      },
      xaxis: {
        categories: categories,
        labels: {
          style: {
            colors: Array(12).fill("#AEB2C7"),
            fontSize: "13px",
            fontFamily: "Inter",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#ddd",
        strokeDashArray: 0,
        position: "back",
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      chart: {
        type: "line",
        height: 600,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
        selection: {
          enabled: false,
        },
        offsetX: 15, // Padding trái
        offsetY: 15,
      },
      stroke: {
        curve: "smooth",
        width: 4,
        colors: ["#5D5FEF"],
      },
      colors: ["#5D5FEF"],
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#FF5BEF"],
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 3,
        colors: ["#FFF"], // fill màu trắng
        strokeColors: "#7A7DF2", // stroke màu Secondary
        strokeWidth: 3, // độ dày stroke 3px
        fillOpacity: 1,
        // Thêm drop shadow
        discrete: [
          {
            seriesIndex: 0,
            dataPointIndex: -1,
            size: 2,
            strokeColor: "#7A7DF2",
            strokeWidth: 3,
            fillColor: "#FFF",
            css: {
              filter: "drop-shadow(0px 4px 4px rgba(96, 91, 255, 0.17))",
            },
          },
        ],
      },
      tooltip: {
        enabled: true,
        x: {
          show: true,
        },
        y: {
          formatter: function (val) {
            return mFormat.formatAmount(val);
          },
        },
      },
    });

    const optionsBook = ref({
      yaxis: {
        tickAmount: 5, // Số lượng mốc chia
        min: function (min) {
          // Làm tròn xuống bội số của 5
          return min > 0 ? 0 : Math.floor(min / 5) * 5;
        },
        max: function (max) {
          // Đảm bảo giá trị tối thiểu là 20 nếu dữ liệu nhỏ
          const baseMax = max < 20 ? 20 : max;
          // Làm tròn lên bội số của 5 và thêm 1 khoảng padding
          return Math.ceil(baseMax / 5) * 5 + 5;
        },
        forceNiceScale: true,
        labels: {
          formatter: function (value) {
            return mFormat.formatAmount(value);
          },
          style: {
            fontSize: "13px",
            fontFamily: "Inter",
            colors: ["#AEB2C7"],
            fontWeight: 400,
          },
        },
      },
      events: {
        beforeZoom: function () {
          return false;
        },
        beforeResetZoom: function () {
          return false;
        },
        selection: function () {
          return false;
        },
      },
      xaxis: {
        categories: categories,
        labels: {
          style: {
            colors: Array(12).fill("#AEB2C7"),
            fontSize: "13px",
            fontFamily: "Inter",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#ddd",
        strokeDashArray: 0,
        position: "back",
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      chart: {
        type: "line",
        height: 600,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
        selection: {
          enabled: false,
        },
        offsetX: 15, // Padding trái
        offsetY: 15,
      },
      stroke: {
        curve: "smooth",
        width: 4,
        colors: ["#5D5FEF"],
      },
      colors: ["#5D5FEF"],
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#FF5BEF"],
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 3,
        colors: ["#FFF"], // fill màu trắng
        strokeColors: "#7A7DF2", // stroke màu Secondary
        strokeWidth: 3, // độ dày stroke 3px
        fillOpacity: 1,
        // Thêm drop shadow
        discrete: [
          {
            seriesIndex: 0,
            dataPointIndex: -1,
            size: 2,
            strokeColor: "#7A7DF2",
            strokeWidth: 3,
            fillColor: "#FFF",
            css: {
              filter: "drop-shadow(0px 4px 4px rgba(96, 91, 255, 0.17))",
            },
          },
        ],
      },
      tooltip: {
        enabled: true,
        x: {
          show: true,
        },
        y: {
          formatter: function (val) {
            return mFormat.formatAmount(val);
          },
        },
      },
    });

    const revenueSum = ref([
      {
        name: "Doanh thu",
        data: [],
      },
    ]);

    const bookSum = ref([
      {
        name: "Sách",
        data: [],
      },
    ]);

    async function getDataDashBoard1() {
      try {
        const res = await dashboardApi.getDataDashboard1();
        if (res) {
          dashBoard1.value = res;
        }
      } catch (ex) {
        console.log(ex);
      }
    }

    async function getDataDashBoard2() {
      try {
        const res = await dashboardApi.getDataDashboard2();
        if (res) {
          dashBoard2.value = res;
          revenueSum.value[0].data = dashBoard2.value.revenue;
          bookSum.value[0].data = dashBoard2.value.bookMonth;
        }
      } catch (ex) {
        console.log(ex);
      }
    }

    return {
      dailysale,
      userCount,
      getDataDashBoard1,
      getDataDashBoard2,
      dashBoard1,
      dashBoard2,
      optionsRe,
      optionsBook,
      revenueSum,
      bookSum,
    };
  },
  created() {
    this.getDataDashBoard1();
    this.getDataDashBoard2();
  },
};

const lastDate = ref(0);
const data = ref([]);
const TICKINTERVAL = 864e5;
const XAXISRANGE = 7776e5;
const dailysale = reactive({
  series: [
    {
      name: "Net Profit",
      data: [44, 55, 57, 56, 61, 58, 63],
    },
  ],
  options: {
    chart: {
      type: "bar",
    },
    colors: ["#0dd6b8"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["s", "m", "t", "w", "t", "f", "s"],
    },
    yaxis: {
      min: 0,
      max: 80,
      tickAmount: 4,
      title: {
        text: "",
      },
      labels: {
        offsetX: -20,
        offsetY: 0,
      },
    },
    grid: {
      padding: {
        left: -5,
        right: 0,
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands";
        },
      },
    },
  },
});

onMounted(() => {
  //   const chart = new ApexCharts(document.querySelector("#wave-chart-7"), {
  //     chart: {
  //       height: 70,
  //       type: "area",
  //       animations: { enabled: true, dynamicAnimation: { speed: 1000 } },
  //       sparkline: { enabled: true },
  //       group: "sparklines",
  //     },
  //     series: [{ data: data.value }],
  //     xaxis: { type: "datetime", range: XAXISRANGE },
  //     yaxis: { max: 100 },
  //     stroke: { curve: "smooth", width: 3 },
  //     fill: { type: "gradient", gradient: { opacityFrom: 0.5, opacityTo: 0 } },
  //     colors: ["#0dd6b8"],
  //   });
  //   chart.render();
  //   setInterval(() => {
  //     addNewPoint({ min: 10, max: 90 });
  //     chart.updateSeries([{ data: data.value }]);
  //   }, 1000);
});
</script>
<style lang="scss" scoped>
.action-dedtail {
  text-align: right;
}
</style>
