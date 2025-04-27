<template>
    <b-row>
        <b-col>
            <b-card no-body>
                <b-card-header
                    class="d-flex justify-content-between align-items-center position-relative mb-0">
                    <div class="iq-header-title">
                        <h4 class="mb-0">Author Lists</h4>
                    </div>
                    <div class="iq-card-header-toolbar d-flex align-items-center">
                        <router-link to="/admin/add-author" class="btn btn-primary">Add New Author</router-link>
                    </div>
                </b-card-header>
                <b-card-body>
                    <div class="custom-table-effect table-responsive custom-table-search mb-0">
                        <table id="datatable" ref="tableRef" class="mb-0 table table-bordered custom-datatable-border">
                        </table>
                    </div>
                </b-card-body>
            </b-card>
        </b-col>
    </b-row>
</template>

<script setup>
import { ref } from 'vue'
import Swal from 'sweetalert2';
import useDataTable from '@/hooks/useDatatable';

const generatePath = (path) => {
  return window.origin + import.meta.env.BASE_URL + path;
};

const tableData = ref([
    {
        no: 1,
        profile: generatePath('/assets/images/avatars/01.jpg'),
        author_name: "Jhone Steben",
        author_email: "Jhone.Steben12@gmail.com",
        author_desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rhoncus non elit a scelerisque. <br>Etiam feugiat luctus est, vel commodo odio rhoncus sit amet."
    },
    {
        no: 2,
        profile: generatePath('/assets/images/avatars/02.jpg'),
        author_name: "John Klok",
        author_email: "John.Klok12@gmail.com",
        author_desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rhoncus non elit a scelerisque. <br>Etiam feugiat luctus est, vel commodo odio rhoncus sit amet."
    },
    {
        no: 3,
        profile: generatePath('/assets/images/avatars/03.jpg'),
        author_name: "Ichae Semos",
        author_email: "Ichae.Semos12@gmail.com",
        author_desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rhoncus non elit a scelerisque. <br>Etiam feugiat luctus est, vel commodo odio rhoncus sit amet."
    },
    {
        no: 4,
        profile: generatePath('/assets/images/avatars/04.jpg'),
        author_name: "Jules Boutin",
        author_email: "Jules.Boutin12@gmail.com",
        author_desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rhoncus non elit a scelerisque. <br>Etiam feugiat luctus est, vel commodo odio rhoncus sit amet."
    },
    {
        no: 5,
        profile: generatePath('/assets/images/avatars/05.jpg'),
        author_name: "Kusti Franti",
        author_email: "Kusti.Franti12@gmail.com",
        author_desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rhoncus non elit a scelerisque. <br>Etiam feugiat luctus est, vel commodo odio rhoncus sit amet."
    },
    {
        no: 6,
        profile: generatePath('/assets/images/avatars/06.jpg'),
        author_name: "David King",
        author_email: "David.King12@gmail.com",
        author_desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rhoncus non elit a scelerisque. <br>Etiam feugiat luctus est, vel commodo odio rhoncus sit amet."
    },
    {
        no: 7,
        profile: generatePath('/assets/images/avatars/07.jpg'),
        author_name: "Henry Jurk",
        author_email: "Henry.Jurk12@gmail.com",
        author_desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rhoncus non elit a scelerisque. <br>Etiam feugiat luctus est, vel commodo odio rhoncus sit amet."
    },
    {
        no: 8,
        profile: generatePath('/assets/images/avatars/08.jpg'),
        author_name: "Attilio Marzi",
        author_email: "Attilio.Marzi12@gmail.com",
        author_desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rhoncus non elit a scelerisque. <br>Etiam feugiat luctus est, vel commodo odio rhoncus sit amet."
    },
    {
        no: 9,
        profile: generatePath('/assets/images/avatars/09.jpg'),
        author_name: "Argele Intili",
        author_email: "Argele.Intili12@gmail.com",
        author_desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rhoncus non elit a scelerisque. <br>Etiam feugiat luctus est, vel commodo odio rhoncus sit amet."
    },
    {
        no: 10,
        profile: generatePath('/assets/images/avatars/10.jpg'),
        author_name: "Attilio Marzi",
        author_email: "Attilio.Marzi12@gmail.com",
        author_desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rhoncus non elit a scelerisque. <br>Etiam feugiat luctus est, vel commodo odio rhoncus sit amet."
    }
]);

const columns = ref([
    {
        data: 'no', title: 'No'
    },
    {
        data: null,
        title: 'Profile',
        render: function (row) {
            return `
            <img src="${row.profile}" class="img-fluid avatar-50 rounded" alt="">`;
        }
    },
    { data: 'author_name', title: 'Author Name' },
    { data: 'author_email', title: 'Author Email' },
    { data: 'author_desc', title: 'Author Description' },
    {
        data: null,
        orderable: false,
        searchable: false,
        title: 'Action',
        render: function () {
            return `
            <div class="d-flex gap-1 align-items-center list-user-action">
                                        <a class="bg-success-subtle   rounded" data-toggle="tooltip"
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
]);

const tableRef = ref(null)
useDataTable({
    tableRef: tableRef,
    columns: columns.value,
    data: tableData.value,
    actionCallback: () => {
        deleteSwal();
    }
})

const deleteSwal = () => {
    Swal.fire({
        title: 'Are you sure?',
        text: 'You want to delete this item',
        icon: 'error',
        showCancelButton: true,
        backdrop: 'rgba(60,60,60,0.8)',
        confirmButtonText: 'Yes, delete it!',
        confirmButtonColor: '#c03221',
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
        }
    });
};
</script>