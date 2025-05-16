<template>
  <b-row>
    <b-col>
      <b-card no-body>
        <b-card-header
          class="d-flex justify-content-between align-items-center position-relative mb-0"
        >
          <div class="iq-header-title">
            <h4 class="mb-0">Danh sách đơn hàng</h4>
          </div>
          <div class="iq-card-header-toolbar d-flex align-items-center">
            <b-button
              variant="outline-success"
              type="button"
              class="btn-refresh"
              @click="handleRefresh"
              ><i class="ph ph-arrows-clockwise"></i
            ></b-button>
            <!-- <b-button
              variant="primary"
              type="button"
              disabled=""
              class="btn btn-primary"
              @click="handleAddBook"
              >Thêm sách</b-button
            > -->
          </div>
        </b-card-header>
        <b-card-body>
          <div
            class="custom-table-effect table-responsive custom-table-search mb-0"
          >
            <table
              id="datatable"
              ref="tableRef"
              class="mb-0 table table-bordered user-table"
            ></table>
          </div>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import Swal from "sweetalert2";
import useDataTable from "@/hooks/useDatatable";
import bookApi from "@/api/System/bookApi";
import { mFormat } from "@/common/mFomat";
import popupUtil from "@/common/popupUtil";
import orderSystemApi from "@/api/System/orderSystemApi";
import orderStatus from "@/common/contanst/orderStatus";
import {
  ref,
  onMounted,
  getCurrentInstance,
  onBeforeMount,
  watch,
  nextTick,
} from "vue";
import { cloneDeep } from "lodash";
export default {
  setup() {
    const { proxy } = getCurrentInstance();
    const generateImgPath = (path) => {
      return window._linkCdnImage + path;
    };

    const tableData = ref([
      {
        account_id: "f9735b81-61c3-4367-a3d4-466d202bff5e",
        order_code: "DH21560688",
        receive_name: "Duc",
        phone_number: null,
        receive_address:
          "41 ngox 134, Phường Vĩnh Phúc, Quận Ba Đình, Thành phố Hà Nội",
        ship_method: null,
        payment_method: null,
        total_price: 377000,
        status: 0,
        created_by: null,
        created_date: "2025-05-01T00:00:00",
        modified_by: null,
        modified_date: null,
        order_sys_id: "1b49034d-04f0-48fb-b2f2-31648341ba47",
      },
    ]);

    const columns = ref([
      {
        data: null,
        orderable: false,
        searchable: false,
        title: "Action",
        render: function () {
          return `
            <div class="d-flex gap-1 align-items-center list-user-action">
                                        <button class="bg-success-subtle btn-edit-book  rounded" data-toggle="tooltip"
                                            data-placement="top" title="Sửa đơn hàng">
                                            <i class="ph ph-pencil-simple text-success custom-ph-icons"></i>
                                        </button>
                                        <button class="bg-danger-subtle delete-btn rounded" data-toggle="tooltip"
                                            data-placement="top" title="Xóa đơn hàng" href="#" data-table="action">
                                            <i class="ph ph-trash text-danger custom-ph-icons"></i>
                                        </button>
                                    </div>
        `;
        },
      },
      {
        data: "no",
        title: "No",
      },
      { data: "order_code", title: "Mã đơn hàng" },
      {
        data: "status",
        title: "Trạng thái đơn hàng",
        render: function (row) {
          var text = "";
          switch (row) {
            case 5:
              text = `<span onClick class="wait-paid status">${mFormat.formatEnum(
                row,
                "orderStatus"
              )}</span>`;
              break;
            case 4:
              text = `<span class="done status">${mFormat.formatEnum(
                row,
                "orderStatus"
              )}</span>`;
              break;
            case 0:
              text = `<span class="in-progress  status">${mFormat.formatEnum(
                row,
                "orderStatus"
              )}</span>`;
              break;
            case 3:
              text = `<span class="paid  status">${mFormat.formatEnum(
                row,
                "orderStatus"
              )}</span>`;
              break;
            case 1:
              text = `<span class="cancel  status">${mFormat.formatEnum(
                row,
                "orderStatus"
              )}</span>`;
              break;
            case 2:
              text = `<span class="approved  status">${mFormat.formatEnum(
                row,
                "orderStatus"
              )}</span>`;
              break;
            default:
              text = mFormat.formatEnum(row, "orderStatus");
              break;
          }
          return text;
        },
      },
      { data: "receive_address", title: "Địa chỉ giao hàng" },
      {
        data: "payment_method",
        title: "Phương thức thanh toán",
        width: "20px",
        render: function (row) {
          return mFormat.formatEnum(row, "paymentMethod");
        },
      },
      {
        data: "total_price",
        title: "Tổng tiền",
        className: "dt-right",
        width: "200px",
        render: function (row) {
          return `${mFormat.formatAmount(row)}đ`;
        },
      },
      {
        data: "created_date",
        title: "Ngày tạo đơn hàng",
        className: "dt-right",
        render: function (data, type, row) {
          // Chỉ format khi hiển thị (type === 'display')
          if (type === "display") {
            return mFormat.formatDate(data);
          }
          // Trả về dữ liệu gốc cho sorting/filter
          return data;
        },
      },
    ]);

    const tableRef = ref(null);
    const { refreshTable } = useDataTable({
      tableRef: tableRef,
      columns: columns.value,
      data: tableData.value,
      actionCallback: (data) => {
        deleteSwal(data);
      },
      getData: async () => {
        return proxy.getData();
      },
      onEditUser: (row) => {
        proxy.handleEditOrder(row);
      },
    });

    const deleteSwal = (data) => {
      Swal.fire({
        title: "Xóa đơn hàng",
        text: "Bạn có chắc chắn muốn đơn hàng này không ?",
        icon: "error",
        showCancelButton: true,
        backdrop: "rgba(60,60,60,0.8)",
        confirmButtonText: "Có",
        cancelButtonText: "Không",
        confirmButtonColor: "#c03221",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await bookApi.deleteBook(data);
          if (res) {
            proxy.$toast.success("Xóa sách thành công");
            await handleRefresh();
          } else {
            proxy.$toast.error("Xóa sách thất bại");
          }
        }
      });
    };
    async function getData() {
      const orders = await orderSystemApi.getAllOrder();
      orders.sort(
        (a, b) => new Date(b.created_date) - new Date(a.created_date)
      );
      orders.forEach((item, index) => {
        item.no = index + 1;
      });
      return orders;
    }

    async function handleAddBook() {
      proxy.$router.push("/admin/add-book");
    }

    async function handleRefresh() {
      await refreshTable();
    }

    function handleEditOrder(data) {
      let statusEdit = [orderStatus.Created, orderStatus.UnPaid];
      if (data) {
        popupUtil.show("OrderDetailPopup", {
          order: cloneDeep(data),
          mode: statusEdit.includes(data.status) ? "edit" : "view",
          submit: async () => {
            await handleRefresh();
          },
        });
      }
    }

    return {
      generateImgPath,
      deleteSwal,
      tableRef,
      handleAddBook,
      getData,
      handleRefresh,
      handleEditOrder,
    };
  },
};
</script>
<style lang="scss">
.btn-refresh {
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-content: center;
}
.status {
  width: fit-content;
  border-radius: 20px;
  border: 1px solid;
  padding: 2px 10px 1px 10px;
  font-size: 12px;
  font-weight: bold;
  display: flex;
}
.wait-paid {
  background: rgba(246, 165, 0, 0.2);
  color: #f6a500;
  border-color: transparent;
}
.done {
  border-color: transparent;

  background-color: #d5f1d7;
  color: #41d241;
}
.in-progress {
  background: rgba(36, 137, 244, 0.2);
  color: #2489f4;
  border-color: transparent;
}
.paid {
  background-color: #d1ecf1; /* Xanh dương nhạt */
  color: #0c5460;
  border-color: transparent;
}
.cancel {
  background-color: #f8d7da; /* Nền đỏ nhạt */
  color: #721c24;
  border-color: transparent;
}
.approved {
  background-color: #fff3cd; /* Vàng nhạt */
  color: #856404;
  border-color: transparent;
}
</style>
