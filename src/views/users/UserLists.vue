<template>
    <b-row>
        <b-col sm="12">
            <b-card no-body>
                <b-card-header class="d-flex justify-content-between mb-0">
                    <div class="header-title">
                        <h4 class="card-title">User List</h4>
                    </div>
                </b-card-header>
                <b-card-body class="user-searchTables">
                    <div class="custom-table-effect custom-table-search user-searchTable user-table mx-4">
                        <table id="datatable" ref="tableRef" class="mb-0 table table-bordered">
                        </table>
                    </div>
                </b-card-body>
            </b-card>
        </b-col>
    </b-row>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2';
import useDataTable from '@/hooks/useDatatable';

const generatePath = (path) => {
    return window.origin + import.meta.env.BASE_URL + path;
};

const tableData = ref([
    {
        profile: generatePath('/assets/images/avatars/01.jpg'),
        name: "Anna Sthesia",
        contact: "(760) 756 7568",
        email: "annasthesia@gmail.com",
        country: "USA",
        status: "Active",
        company: "Acme Corporation",
        join_date: "2019/12/01"
    },
    {
        profile: generatePath('/assets/images/avatars/03.jpg'),
        name: "Brock Lee",
        contact: "+62 5689 458 658",
        email: "brocklee@gmail.com",
        country: "Indonesia",
        status: "Active",
        company: "Soylent Corp",
        join_date: "2019/12/01"
    },
    {
        profile: generatePath('/assets/images/avatars/02.jpg'),
        name: "Dan Druff",
        contact: "+55 6523 456 856",
        email: "dandruff@gmail.com",
        country: "Brazil",
        status: "Pending",
        company: "Umbrella Corporation",
        join_date: "2019/12/01"
    },
    {
        profile: generatePath('/assets/images/avatars/04.jpg'),
        name: "Hans Olo",
        contact: "+91 2586 253 125",
        email: "hansolo@gmail.com",
        country: "India",
        status: "Inactive",
        company: "Vehement Capital",
        join_date: "2019/12/01"
    },
    {
        profile: generatePath('/assets/images/avatars/05.jpg'),
        name: "Lynn Guini",
        contact: "+27 2563 456 589",
        email: "lynnguini@gmail.com",
        country: "Africa",
        status: "Active",
        company: "Massive Dynamic",
        join_date: "2019/12/01"
    },
    {
        profile: generatePath('/assets/images/avatars/06.jpg'),
        name: "Eric Shun",
        contact: "+55 25685 256 589",
        email: "ericshun@gmail.com",
        country: "Brazil",
        status: "Pending",
        company: "Globex Corporation",
        join_date: "2019/12/01"
    },
    {
        profile: generatePath('/assets/images/avatars/07.jpg'),
        name: "Aaron Ottix",
        contact: "(760) 765 2658",
        email: "budwiser@ymail.com",
        country: "USA",
        status: "Hold",
        company: "Acme Corporation",
        join_date: "2019/12/01"
    },
    {
        profile: generatePath('/assets/images/avatars/09.jpg'),
        name: "Marge Arita",
        contact: "+27 5625 456 589",
        email: "margearita@gmail.com",
        country: "Africa",
        status: "Complite",
        company: "Vehement Capital",
        join_date: "2019/12/01"
    },
    {
        profile: generatePath('/assets/images/avatars/10.jpg'),
        name: "Bill Dabear",
        contact: "+55 2563 456 589",
        email: "billdabear@gmail.com",
        country: "Brazil",
        status: "Active",
        company: "Massive Dynamic",
        join_date: "2019/12/01"
    }
]);

const columns = ref([
    {
        data: null,
        title: "Profile",
        orderable: false,
        render: function (row) {
            return `
            <img src="${row.profile}" class="img-fluid avatar-40 rounded" alt="">`;
        }
    },
    { data: 'name', title: 'Name' },
    { data: 'contact', title: 'Contact' },
    { data: 'email', title: 'Email' },
    { data: 'country', title: 'Country' },
    { data: 'status', title: 'Status' },
    { data: 'company', title: 'Company' },
    { data: 'join_date', title: 'Join Date' },
    {
        data: null,
        orderable: false,
        searchable: false,
        title: 'Action',
        render: function () {
            return `
            <div class="d-flex gap-2 align-items-center">
                                            <a class="btn btn-primary-subtle px-1 py-1 rounded d-flex" data-toggle="tooltip"
                                                data-placement="top" title="Add" href="${generatePath('user/user-add')}">
                                                <i class="ph ph-user-plus"></i>
                                            </a>
                                            <a class="btn btn-warning-subtle px-1 py-1 rounded d-flex" data-toggle="tooltip"
                                                data-placement="top" title="Edit" href="${generatePath('user/user-edit')}">
                                                <i class="ph ph-pencil-simple"></i>
                                            </a>
                                            <a class="btn btn-danger-subtle px-1 py-1 rounded d-flex" data-toggle="tooltip"
                                                data-placement="top" title="Delete" href="#" data-table="action">
                                                <i class="ph ph-trash"></i>
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

const col = document.createElement("div")
const flex = document.createElement("div")

col.classList.add("col-md-6", "d-flex", "justify-content-md-end", "justify-content-center")
flex.classList.add("d-flex", "gap-2")

const linkText = ["Print", "Excel", "Pdf"]

onMounted(() => {
    setTimeout(() => {
        const user_table = document.getElementById('datatable_wrapper');
        const filter = document.querySelector('[type="search"]');
        const filterLabel = document.querySelector('.dataTables_filter');
        const label = filterLabel.querySelector('label');

        // Remove the text part but keep the input element
        label.childNodes.forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                node.textContent = ''; // Clear the text node
            }
        });

        const user_table_child = user_table.firstElementChild
        user_table_child.firstElementChild.remove()
        user_table_child.id = "custom-row"
        const custom_row = document.getElementById("custom-row")
        custom_row.style.marginTop = "0.5rem"
        user_table.firstElementChild.appendChild(col)
        col.appendChild(flex)
        filter.placeholder = "Search"
        // linkText.forEach(element => {
        //     const link = document.createElement("a")
        //     link.classList.add("mx-3")
        //     link.text = element;
        //     link.href = "";
        //     col.firstElementChild.appendChild(link)
        // });
        for (let i = 0; i < linkText.length; i++) {
            const link = document.createElement("a")
            if (i == linkText.length - 1) {
                link.classList.add("mx-3")
            }
            else {
                link.classList.add("mx-3")
            }
            link.text = linkText[i];
            link.href = "";
            col.firstElementChild.appendChild(link)
        }

    }, 10);
})

</script>

<style></style>