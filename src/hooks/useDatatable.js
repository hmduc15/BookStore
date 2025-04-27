import { onMounted, onBeforeUnmount } from 'vue'
import $ from 'jquery'
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css'
import 'datatables.net-bs5'

const useDataTable = ({ tableRef, columns, data = [], url = null, actionCallback, isColumnHidden = false, isColumnHiddenClass = '.toggle-vis', isFilterColumn = false, isMultilang = false, searching = true, onAddUser, getData, onEditUser, onSendEmail }) => {
  onMounted(() => {
    setTimeout(async () => {
      await innitTable();
    }, 0)
  })
  async function innitTable() {
    let datatableObj = {
      dom: '<"row align-items-center gy-2"<"col-md-6" l><"col-md-6" f>><"table-responsive my-3" rt><"row align-items-center" <"col-md-6" i><"col-md-6" p>><"clear">',
      autoWidth: false,
      searching: searching,
      columns: columns,
      scrollX: true,
      scrollY: '50vh',
    }

    if (url) {
      datatableObj = {
        ...datatableObj,
        processing: true,
        serverSide: true,
        ajax: {
          url: url
        }
      }
    }

    if (data) {
      var lstData = [];
      if (typeof getData === 'function') {
        lstData = await getData();
      }

      datatableObj = {
        ...datatableObj,
        data: lstData.length > 0 ? lstData : data,
        language: {
          search: "Tìm kiếm:  ",
          lengthMenu: "Hiển thị  _MENU_  bản ghi mỗi trang",
          info: "Hiển thị _START_ đến _END_ trong tổng số _TOTAL_ bản ghi",
          infoEmpty: "Không có bản ghi nào",
          infoFiltered: "(đã lọc từ _MAX_ bản ghi)",
          paginate: {
            first: "Đầu",
            last: "Cuối",
            next: "Sau",
            previous: "Trước"
          },
          emptyTable: "Không có dữ liệu",
          loadingRecords: "Đang tải...",
          zeroRecords: "Không tìm thấy kết quả phù hợp"
        },
      }
    }

    if (isFilterColumn) {
      datatableObj = {
        ...datatableObj,
        initComplete: function () {
          const api = this.api()

          // For each column
          api
            .columns()
            .eq(0)
            .each(function (colIdx) {
              var cell = $('.filters th').eq($(api.column(colIdx).header()).index())
              var title = $(cell).text()
              if ($(api.column(colIdx).header()).index() >= 0) {
                $(cell).html('<td><input type="text" class="form-control form-control-sm" placeholder="' + title + '" /></td>')
              }
            })

          api.columns().every(function () {
            var that = this

            $('input', this.footer()).on('keyup change clear', function () {
              if (that.search() !== this.value) {
                that.search(this.value).draw()
              }
            })
          })
        }
      }
    }

    function languageSelect() {
      return Array.from(document.querySelector('#langSelector').options)
        .filter((option) => option.selected)
        .map((option) => option.getAttribute('data-path'))
    }

    const setMultiLang = () => {
      datatableObj = {
        ...datatableObj,
        language: {

        }
      }
    }
    if (isMultilang) {
      setMultiLang()
    }

    var options = {
      isEnabled: true,
      saveState: false,
      hoverClass: 'dt-colresizable-hover',
      hasBoundCheck: true,
      minBoundClass: 'dt-colresizable-bound-min',
      maxBoundClass: 'dt-colresizable-bound-max',
      isResizable: function (column) {
        return true;
      },
      onResizeStart: function (column, columns) {
      },
      onResize: function (column) {
      },
      onResizeEnd: function (column, columns) {
      },
      getMinWidthOf: function ($thNode) {
      },
      stateSaveCallback: function (settings, data) {
      },
      stateLoadCallback: function (settings) {
      }
    }
    datatableObj = {
      ...datatableObj,
      colResize: options
    }

    let datatable = $(tableRef.value).DataTable(datatableObj)


    if (typeof onAddUser === 'function') {
      $(datatable.table().body()).on('click', '.btn-add-user', function (e) {
        e.preventDefault();
        if (onAddUser) onAddUser(); //  Gọi callback từ component cha
      });
    }

    if (typeof onEditUser === 'function') {
      $(datatable.table().body()).on('click', '.btn-edit-user', function (e) {
        e.preventDefault();
        if (onEditUser) {
          const row = datatable.row($(this).closest('tr'));

          // Lấy data của row đó
          const rowData = row.data();
          onEditUser(rowData)
        }; //  Gọi callback từ component cha
      });
    }

    if (typeof onEditUser === 'function') {
      $(datatable.table().body()).on('click', '.btn-edit-book', function (e) {
        e.preventDefault();
        if (onEditUser) {
          const row = datatable.row($(this).closest('tr'));

          // Lấy data của row đó
          const rowData = row.data();
          onEditUser(rowData)
        }; //  Gọi callback từ component cha
      });
    }


    if (typeof onEditUser === 'function') {
      $(datatable.table().body()).on('click', '.btn-edit-genre', function (e) {
        e.preventDefault();
        if (onEditUser) {
          const row = datatable.row($(this).closest('tr'));

          // Lấy data của row đó
          const rowData = row.data();
          onEditUser(rowData)
        }; //  Gọi callback từ component cha
      });
    }

    if (typeof actionCallback === 'function') {
      $(datatable.table().body()).on('click', '[data-table="action"]', function () {
        const row = datatable.row($(this).closest('tr'));
        // Lấy data của row đó
        const rowData = row.data();
        actionCallback(rowData)
      })
    }

    if (typeof onSendEmail === 'function') {
      $(datatable.table().body()).on('click', '.btn-send-email', function () {
        const row = datatable.row($(this).closest('tr'));
        // Lấy data của row đó
        const rowData = row.data();
        onSendEmail(rowData)
      })
    }


    if (isColumnHidden) {
      $(isColumnHiddenClass).on('click', function (e) {
        e.preventDefault()
        const column = datatable.column($(this).attr('data-column'))
        column.visible(!column.visible())
      })
    }

    if (isMultilang) {
      document.querySelector('#langSelector').addEventListener('change', () => {
        $(tableRef.value).DataTable().destroy()
        setMultiLang()
        datatable = $(tableRef.value).DataTable(datatableObj)
      })
    }
  }

  async function refreshTable() {
    if ($.fn.DataTable.isDataTable(tableRef.value)) {
      $(tableRef.value).DataTable().destroy()
    }
    await innitTable();

  }

  onBeforeUnmount(() => {
    if ($.fn.DataTable.isDataTable(tableRef.value)) {
      $(tableRef.value).DataTable().destroy()
    }

    $(tableRef.value).empty()
  })
  return {
    refreshTable
  }
}

export default useDataTable
