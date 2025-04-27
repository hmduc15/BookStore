import role from '@/common/enum/role'

export const DefaultRoutes = (prefix) => [
    {
        path: '',
        name: prefix + '.home',
        meta: { name: 'Trang chủ', requiresAuth: true },
        component: () => import('@/views/IndexPage.vue'),
    },
    // {
    //     path: "",
    //     redirect: localStorage.getItem('bookstore_current_path') ?? "/",
    //     meta: { requiresAuth: true }
    // },
    {
        path: '/shop/category-page',
        name: prefix + '.category',
        meta: { name: 'Danh sách' },
        component: () => import('@/views/shop/CategoryPage.vue'),
    },
    {
        path: '/shop/book-page/:id',
        name: prefix + '.book-page',
        meta: { name: 'Book Page' },
        component: () => import('@/views/shop/BookPage.vue'),
    },
    {
        path: '/shop/book-pdf',
        name: prefix + '.book-pdf',
        meta: { name: 'Book Pdf' },
        component: () => import('@/views/shop/BookPdf.vue'),
    },
    {
        path: '/shop/checkout',
        name: prefix + '.checkout',
        meta: { name: 'Giỏ hàng' },
        component: () => import('@/views/shop/CheckoutPage.vue'),
    },
    {
        path: '/shop/wishlist',
        name: prefix + '.wishlist',
        meta: { name: 'Wishlist' },
        component: () => import('@/views/shop/WishlistPage.vue'),
    },
    {
        path: '/admin',
        name: prefix + '.admin',
        meta: { name: 'Trang chủ', requiresAuth: true, role: [role.Admin] },
        component: () => import('@/views/admin/Dashboard.vue'),
    },
    {
        path: '/admin/dashboard',
        name: prefix + '.dashboard',
        meta: { name: 'Admin Dashboard', requiresAuth: true, role: [role.Admin] },
        component: () => import('@/views/admin/Dashboard.vue'),
    },
    {
        path: '/admin/category-list',
        name: prefix + '.category-list',
        meta: { name: 'Danh sách thể loại', requiresAuth: true, role: [role.Admin] },
        component: () => import('@/views/admin/CategoryList.vue'),
    },
    {
        path: '/admin/add-category',
        name: prefix + '.add-category',
        meta: { name: 'Add Category', requiresAuth: true, role: [role.Admin] },
        component: () => import('@/views/admin/AddCategoryPopup.vue'),
    },
    {
        path: '/admin/author',
        name: prefix + '.author',
        meta: { name: 'Author', requiresAuth: true, role: [role.Admin] },
        component: () => import('@/views/admin/Author.vue'),
    },
    {
        path: '/admin/add-author',
        name: prefix + '.add-author',
        meta: { name: 'Add Author', requiresAuth: true, role: [role.Admin] },
        component: () => import('@/views/admin/AddAuthor.vue'),
    },
    {
        path: '/admin/book-list',
        name: prefix + '.book-list',
        meta: { name: 'Danh sách sách', requiresAuth: true, role: [role.Admin] },
        component: () => import('@/views/admin/BookList.vue'),
    },
    {
        path: '/admin/add-book',
        name: prefix + '.add-book-admin',
        meta: { name: 'Thêm sách', requiresAuth: true, role: [role.Admin] },
        component: () => import('@/views/admin/AddBookPopup.vue'),
    },
    {
        path: '/admin/edit-book/:id',
        name: prefix + '.edit-book-admin',
        meta: { name: 'Sửa thông tin sách', requiresAuth: true, role: [role.Admin] },
        component: () => import('@/views/admin/EditBookPopup.vue'),
    },
    {
        path: '/admin/user-list',
        name: prefix + '.user-list-admin',
        meta: { name: 'Danh sách người dùng', requiresAuth: true, role: [role.Admin] },
        component: () => import('@/views/admin/UserList.vue'),
    },
    {
        path: '/admin/order-list',
        name: prefix + '.order-list-admin',
        meta: { name: 'Danh sách đơn hàng', requiresAuth: true, role: [role.Admin] },
        component: () => import('@/views/admin/OrderList.vue'),
    },
    {
        path: '/user/user-profile',
        name: prefix + '.user-profile',
        meta: { name: 'User Profile' },
        component: () => import('@/views/users/UserProfile.vue'),
    },
    {
        path: '/user/user-edit',
        name: prefix + '.user-edit',
        meta: { name: 'User Edit' },
        component: () => import('@/views/users/UserEdit.vue'),
    },
    {
        path: '/user/user-add',
        name: prefix + '.user-add',
        meta: { name: 'User Add' },
        component: () => import('@/views/users/UserAdd.vue'),
    },
    {
        path: '/user/user-list',
        name: prefix + '.user-list',
        meta: { name: 'User Lists' },
        component: () => import('@/views/users/UserLists.vue'),
    },
    {
        path: '/shop/invoice/detail/:id',
        name: prefix + '.invoice-detail',
        meta: { name: 'Chi tiết đơn hàng ', requiresAuth: true },
        component: () => import('@/views/spacial-pages/InvoiceDetailPage.vue'),
    },
    {
        path: '/shop/invoice/list',
        name: prefix + '.invoice',
        meta: { name: 'Danh sách đơn hàng', requiresAuth: true },
        component: () => import('@/views/spacial-pages/OrderList.vue'),
    },
    {
        path: '/shop/book/sale',
        name: prefix + '.book-sale',
        meta: { name: 'Đăng bán sách', requiresAuth: true },
        component: () => import('@/views/shop/SaleBook.vue'),
    },

]

export const AuthRoutes = (prefix) => [
    {
        path: '/auth/comfirmEmail/:id',
        name: prefix + '.confirm-email',
        meta: { name: 'Xác nhận đăng kí tài khoản' },
        component: () => import('@/views/auth/ConfirmMailSuccess.vue')
    },
    {
        path: '/auth/sign-in',
        name: prefix + '.sign-in',
        meta: { name: 'Đăng nhập' },
        component: () => import('@/views/auth/SignIn.vue')
    },
    {
        path: '/auth/sign-up',
        name: prefix + '.sign-up',
        meta: { name: 'Đăng ký' },
        component: () => import('@/views/auth/SignUp.vue')
    },
    {
        path: '/auth/recover-pw',
        name: prefix + '.recover-pw',
        meta: { name: 'Recover Password' },
        component: () => import('@/views/auth/RecoverPw.vue')
    },
    {
        path: '/auth/confirm-mail',
        name: prefix + '.confirm-mail',
        meta: { name: 'Confirm Mail' },
        component: () => import('@/views/auth/ConfirmMail.vue')
    },
    {
        path: '/auth/lock-screen',
        name: prefix + '.lock-screen',
        meta: { name: 'Lock Screen' },
        component: () => import('@/views/auth/LockScreen.vue')
    },
    {
        path: '/auth/two-factor',
        name: prefix + '.two-factor',
        meta: { name: 'Two Factor' },
        component: () => import('@/views/auth/TwoFactor.vue')
    },
    {
        path: '/auth/account-deactivate',
        name: prefix + '.account-deactivate',
        meta: { name: 'Account Deactivate' },
        component: () => import('@/views/auth/AccountDeactivate.vue')
    },
]

export const ErrorRoutes = (prefix) => [
    {
        path: '/errors/error-404',
        name: prefix + '.error-404',
        meta: { name: 'Error 404' },
        component: () => import('@/views/extra-pages/errors/Error404.vue')
    },
    {
        path: '/errors/error-500',
        name: prefix + '.error-500',
        meta: { name: 'Error 500' },
        component: () => import('@/views/extra-pages/errors/Error500.vue')
    },
    {
        path: '/errors/maintenance',
        name: prefix + '.maintenance',
        meta: { name: 'Maintenance' },
        component: () => import('@/views/extra-pages/errors/Maintenance.vue')
    },
    {
        path: '/extra-pages/coming-soon',
        name: prefix + '.coming-soon',
        meta: { name: 'Coming Soon' },
        component: () => import('@/views/extra-pages/ComingSoon.vue')
    },
]
