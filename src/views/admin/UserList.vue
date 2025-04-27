<template>
  <b-row>
    <b-col sm="12">
      <b-card no-body>
        <b-card-header class="d-flex justify-content-between mb-0">
          <div class="header-title">
            <h4 class="card-title">Danh sách tài khoản</h4>
            <div class="d-flex">
              <b-button
                variant="outline-success"
                type="button"
                class="btn-refresh"
                @click="handleRefresh"
                ><i class="ph ph-arrows-clockwise"></i
              ></b-button>
              <b-button variant="primary" type="button" @click="handleAddUser"
                >Thêm tài khoản</b-button
              >
            </div>
          </div>
        </b-card-header>
        <b-card-body class="user-searchTables">
          <div
            class="custom-table-effect custom-table-search user-searchTable user-table mx-4"
          >
            <table
              id="datatable"
              ref="tableRef"
              class="mb-0 table table-bordered"
            ></table>
          </div>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import {
  ref,
  onMounted,
  getCurrentInstance,
  onBeforeMount,
  watch,
  nextTick,
} from "vue";
import Swal from "sweetalert2";
import useDataTable from "@/hooks/useDatatable";
import userApi from "@/api/System/userApi.js";
import { mFormat } from "@/common/mFomat";
import popupUtil from "@/common/popupUtil";
import role from "@/common/enum/role";
import emailApi from "@/api/System/emailApi";
import commonFuntion from "@/common/commonFuntion";
import { cloneDeep } from "lodash";

export default {
  setup() {
    const { proxy } = getCurrentInstance();
    const generatePath = (path) => {
      return window.origin + import.meta.env.BASE_URL + path;
    };

    const tableData = ref([]);

    const columns = ref([
      {
        data: null,
        orderable: false,
        searchable: false,
        title: "",
        render: function () {
          return `
            <div class="d-flex gap-1 align-items-center list-user-action">
                                        <a class="btn-edit-book bg-success-subtle rounded" data-toggle="tooltip"
                                            data-placement="top" title="Edit" >
                                            <i class="ph ph-pencil-simple text-success custom-ph-icons"></i>
                                        </a>
                                        <a class="bg-danger-subtle delete-btn rounded" data-toggle="tooltip"
                                            data-placement="top" title="Delete"  data-table="action">
                                            <i class="ph ph-trash text-danger custom-ph-icons"></i>
                                        </a>
                                    </div>
        `;
        },
      },
      { data: "name", title: "Tên" },
      { data: "email", title: "Email" },
      { data: "phone_number", title: "Số điện thoại" },
      {
        data: "address",
        title: "Địa chỉ",
        className: "address",
        width: "200px",
      },
      {
        data: "created_date",
        title: "Ngày tạo tài khoản",
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
      {
        data: "last_active",
        title: "Ngày đăng nhập gần nhất ",
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
      actionCallback: async (row) => {
        deleteUser(row);
      },
      getData: async () => {
        return proxy.getDataUser();
      },
      onEditUser: (row) => {
        proxy.handleEditUser(row);
      },
      onSendEmail: (row) => {
        proxy.sendEmail(row);
      },
    });

    onMounted(async () => {
      await customizeDataTableUI();
    });

    const customizeDataTableUI = async () => {
      await nextTick(); // Đợi DOM cập nhật

      const wrapper = document.getElementById("datatable_wrapper");
      if (!wrapper) return;

      // Tạo các element mới
      const col = document.createElement("div");
      const flex = document.createElement("div");
      col.classList.add(
        "col-md-6",
        "d-flex",
        "justify-content-md-end",
        "justify-content-center"
      );
      flex.classList.add("d-flex", "gap-2");

      // Xử lý filter input
      const filter = wrapper.querySelector('[type="search"]');
      const filterLabel = wrapper.querySelector(".dataTables_filter");

      if (filterLabel) {
        const label = filterLabel.querySelector("label");
        if (label) {
          // Remove text nodes nhưng giữ lại input
          Array.from(label.childNodes).forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
              label.removeChild(node);
            }
          });
        }
      }

      if (filter) {
        filter.placeholder = "Tìm kiếm";
      }

      // Thêm custom controls
      const user_table_child = wrapper.firstElementChild;
      if (user_table_child) {
        user_table_child.firstElementChild?.remove();
        user_table_child.id = "custom-row";

        const custom_row = document.getElementById("custom-row");
        if (custom_row) {
          custom_row.style.marginTop = "0.5rem";
          user_table_child.appendChild(col);
          col.appendChild(flex);
        }
      }
    };

    const deleteUser = (user) => {
      Swal.fire({
        title: "Xóa tài khoản",
        text: "Bạn có chắc chắn muốn xóa tài khoản này không ?",
        icon: "error",
        showCancelButton: true,
        backdrop: "rgba(60,60,60,0.8)",
        confirmButtonText: "Có",
        cancelButtonText: "Không",
        confirmButtonColor: "#c03221",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await userApi.deleteUser(user);
          if (res) {
            proxy.$toast.success("Xóa tài khoản thành công");
            await handleRefresh();
          } else {
            proxy.$toast.error("Xóa tài khoản thất bại");
          }
        }
      });
    };

    async function getDataUser() {
      try {
        const res = await userApi.getAllUser();
        if (res && res.length > 0) {
          let listClone = [];
          res.forEach((item) => {
            var obj = {
              name: item.name,
              phone_number: item.phone_number,
              email: item.email,
              address: item.address,
              created_date: mFormat.formatDate(item.created_date),
              last_active: item.last_active,
            };
            listClone.push(obj);
          });
          tableData.value = listClone;
        }
        var lstAcc = res.filter((x) => x.role != role.Admin);
        return lstAcc;
      } catch (ex) {
        console.log(ex);
      }
    }

    async function sendEmail(params) {
      commonFuntion.mask();
      try {
        var data = {
          email: params.email,
          name: params.name,
        };
        const res = await emailApi.sendEmailReminder(data);
        if (res) {
          proxy.$toast.success("Gửi email thành công");
        }
      } catch (ex) {
        console.log(ex);
        commonFuntion.unmask();
      } finally {
        commonFuntion.unmask();
      }
    }

    async function handleAddUser() {
      popupUtil.show("AddUserPopup", {
        submit: async () => {
          popupUtil.hideAll();
          await handleRefresh();
        },
      });
    }

    function handleEditUser(data) {
      if (data) {
        popupUtil.show("EditUserPopup", {
          account: cloneDeep(data),
          submit: async () => {
            popupUtil.hideAll();
            await handleRefresh();
          },
        });
      }
    }

    async function handleRefresh() {
      await refreshTable();
    }

    return {
      generatePath,
      tableData,
      columns,
      tableRef,
      deleteUser,
      handleAddUser,
      getDataUser,
      customizeDataTableUI,
      mFormat,
      handleEditUser,
      handleRefresh,
      sendEmail,
    };
  },
};
</script>

<style>
.header-title {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.btn-refresh {
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>
