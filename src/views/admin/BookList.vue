<template>
  <b-row>
    <b-col>
      <b-card no-body>
        <b-card-header
          class="d-flex justify-content-between align-items-center position-relative mb-0"
        >
          <div class="iq-header-title">
            <h4 class="mb-0">Danh sách sách</h4>
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
              variant="primary"
              type="button"
              class="btn btn-primary"
              @click="handleAddBook"
              >Thêm sách</b-button
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

import {
  ref,
  onMounted,
  getCurrentInstance,
  onBeforeMount,
  watch,
  nextTick,
} from "vue";
export default {
  setup() {
    const { proxy } = getCurrentInstance();
    const generateImgPath = (path) => {
      return window._linkCdnImage + path;
    };

    const tableData = ref([
      {
        no: 1,
        name: "Reading on the Worlds",
        book_category: "General Books",
        author: "Jhone Steben",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rhoncus non elit a scelerisque. <br>Etiam feugiat luctus est, vel commodo odio rhoncus sit amet.",
        import_price: "$89",
        selling_price: "1000",
        quantity: 10,
        discount_rate: 10,
        discount_price: 10000,
        price: 10,
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
                                        <a class="bg-success-subtle btn-edit-book  rounded" data-toggle="tooltip"
                                            data-placement="top" title="Edit" href="">
                                            <i class="ph ph-pencil-simple text-success custom-ph-icons"></i>
                                        </a>
                                        <a class="bg-danger-subtle delete-btn rounded" data-toggle="tooltip"
                                            data-placement="top" title="Delete" href="#" data-table="action">
                                            <i class="ph ph-trash text-danger custom-ph-icons"></i>
                                        </a>
                                    </div>
        `;
        },
      },
      {
        data: "no",
        title: "No",
      },
      {
        data: null,
        title: "Ảnh",
        render: function (row) {
          return `
            <img src="${generateImgPath(
              row.image_url
            )}" class="img-fluid rounded" alt="" >`;
        },
      },
      { data: "name", title: "Tên sách" },
      { data: "genre_name", title: "Thể loại" },
      { data: "author", title: "Tác giả" },
      { data: "publisher", title: "Nhà xuất bản" },
      { data: "quantity", title: "Số lượng", className: "dt-right" },
      {
        data: null,
        title: "Giá nhập",
        render: function (row) {
          return mFormat.formatAmount(row.import_price);
        },
        className: "dt-right",
      },
      {
        data: null,
        title: "Giá bán",
        render: function (row) {
          return mFormat.formatAmount(row.selling_price);
        },
        className: "dt-right",
      },
      {
        data: null,
        title: "Giảm giá (%)",
        render: function (row) {
          return row.discount_rate;
        },
        className: "dt-right",
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
        proxy.handleEditBook(row);
      },
    });

    const deleteSwal = (data) => {
      Swal.fire({
        title: "Xóa sách",
        text: "Bạn có chắc chắn muốn xóa sách này không ?",
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
      const res = await bookApi.getAllBookAdmin();
      res.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
      res.forEach((item, index) => {
        item.no = index + 1;
      });
      return res;
    }

    async function handleAddBook() {
      proxy.$router.push("/admin/add-book");
    }

    async function handleRefresh() {
      await refreshTable();
    }

    function handleEditBook(data) {
      if (data) {
        var id = data.book_id;
        proxy.$router.push(`/admin/edit-book/${id}`);
      }
    }

    return {
      generateImgPath,
      deleteSwal,
      tableRef,
      handleAddBook,
      getData,
      handleRefresh,
      handleEditBook,
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
