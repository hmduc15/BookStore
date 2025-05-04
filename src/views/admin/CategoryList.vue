<template>
  <b-row>
    <b-col>
      <b-card no-body>
        <b-card-header
          class="d-flex justify-content-between align-items-center position-relative mb-0"
        >
          <div class="iq-header-title">
            <h4 class="mb-0">Danh sách thể loại</h4>
          </div>
          <div class="iq-card-header-toolbar d-flex align-items-center">
            <b-button
              variant="outline-success"
              type="button"
              class="btn-refresh"
              @click="handleRefresh"
              ><i class="ph ph-arrows-clockwise"></i
            ></b-button>
            <b-button
              class="btn btn-primary"
              variant="primary"
              type="button"
              @click="addGenre"
              >Thêm thể loại</b-button
            >
          </div>
        </b-card-header>
        <b-card-body>
          <div
            class="custom-table-effect table-responsive custom-table-search mb-0"
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
import { ref } from "vue";
import Swal from "sweetalert2";
import useDataTable from "@/hooks/useDatatable";
import genreApi from "@/api/System/genreApi";
import { getCurrentInstance } from "vue";
import popupUtil from "@/common/popupUtil";
import { cloneDeep } from "lodash";

export default {
  name: "Category List",
  setup() {
    const { proxy } = getCurrentInstance();
    const tableData = ref([]);

    const columns = ref([
      {
        data: null,
        orderable: false,
        searchable: false,
        width: "50px",
        title: "Action",
        render: function () {
          return `
            <div class="d-flex gap-1 align-items-center list-user-action">
                                        <a class="btn  btn-warning-subtle px-1 py-1 rounded d-flex bg-success-subtle btn-edit-genre  rounded" data-toggle="tooltip"
                                            data-placement="top" title="Sửa">
                                         <i class="ph ph-pencil-simple text-success custom-ph-icons"></i>
                                        </a>
                                        <a class="btn bg-danger-subtle delete-btn rounded px-1 py-1 rounded d-flex " data-toggle="tooltip"
                                            data-placement="top" title="Xóa"  data-table="action">
                                           <i class="ph ph-trash text-danger custom-ph-icons"></i>
                                        </a>
                                    </div>
        `;
        },
      },
      { data: "no", title: "No", width: "50px" },
      { data: "name", title: "Tên thể loại", width: "200px" },
      { data: "book_count", title: "Số lượng sách đang có", width: "200px" },
      { data: "description", title: "Mô tả" },
    ]);

    const tableRef = ref(null);
    const { refreshTable } = useDataTable({
      tableRef: tableRef,
      columns: columns.value,
      data: tableData.value,
      actionCallback: async (row) => {
        deleteSwal(row);
      },
      getData: async () => {
        return proxy.getDataGenre();
      },
      onEditUser: (row) => {
        proxy.handleEditGenre(row);
      },
    });

    const deleteSwal = (row) => {
      Swal.fire({
        title: "Xóa thể loại",
        text: "Bạn có chắc chắn muốn xóa thể loại này không ?",
        icon: "error",
        showCancelButton: true,
        backdrop: "rgba(60,60,60,0.8)",
        confirmButtonText: "Có",
        cancelButtonText: "Không",
        confirmButtonColor: "#c03221",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await genreApi.deleteUser(row);
          if (res) {
            proxy.$toast.success("Xóa thể loại thành công");
            await handleRefresh();
          } else {
            proxy.$toast.erroe("Xóa tài khoản thất bại");
          }
        }
      });
    };

    async function getDataGenre() {
      try {
        const res = await genreApi.getAllGenre();
        let lstMap = [];
        if (res && res.length > 0) {
          res.sort(
            (a, b) => new Date(b.created_date) - new Date(a.created_date)
          );
          res.forEach((item, index) => {
            item.no = index + 1;
            lstMap.push(item);
          });
        }

        return lstMap;
      } catch (ex) {
        console.log(ex);
      }
    }

    async function handleEditGenre(row) {
      if (row) {
        popupUtil.show("EditCategoryPopup", {
          genre: cloneDeep(row),
          submit: async () => {
            popupUtil.hideAll();
            await handleRefresh();
          },
        });
      }
    }

    async function addGenre() {
      popupUtil.show("AddCategoryPopup", {
        submit: async () => {
          popupUtil.hideAll();
          await handleRefresh();
        },
      });
    }

    async function handleRefresh() {
      await refreshTable();
    }

    return {
      tableData,
      columns,
      tableRef,
      deleteSwal,
      getDataGenre,
      addGenre,
      handleRefresh,
      handleEditGenre,
    };
  },
};
</script>
<style lang="scss" scoped>
.btn-refresh {
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>
