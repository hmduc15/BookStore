import role from "@/common/enum/role"

export const sidebarMenu = [
    {
        mainTitle: 'Trang chủ',
        mainLogo: 'ph-duotone ph-house',
        route: '/',
        role: [role.User]
    },
    {
        mainTitle: 'Shop',
        mainLogo: 'ph-duotone ph-storefront',
        class: "iq-drop",
        role: [role.User],
        children: [
            {
                title: 'Danh sách',
                logo: 'ph-duotone ph-squares-four',
                route: '/shop/category-page',
                miniTitle: 'CP'
            },
            // {
            //     title: 'Book Page',
            //     logo: 'ph-duotone ph-book',
            //     route: '/shop/book-page',
            //     miniTitle: 'BP'
            // },
            // {
            //     title: 'Book PDF',
            //     logo: 'ph-duotone ph-file-pdf',
            //     route: '/shop/book-pdf',
            //     miniTitle: 'BP'
            // },
            {
                title: 'Giỏ hàng',
                logo: 'ph-duotone ph-shopping-bag',
                route: '/shop/checkout',
                miniTitle: 'C'
            },
            {
                title: 'Đơn hàng',
                logo: 'ph ph-invoice',
                route: '/shop/invoice/list',
                miniTitle: 'I'
            },
            {
                title: 'Danh sách yêu thích',
                logo: 'ph-duotone ph-heart-straight',
                route: '/shop/wishlist',
                miniTitle: 'W'
            },
            {
                title: 'Đăng bán sách',
                logo: 'ph ph-address-book-tabs',
                route: '/shop/book/sale',
                miniTitle: 'W'
            },
        ]
    },
    {
        mainTitle: 'Admin',
        mainLogo: 'ph-duotone ph-user-circle-gear',
        class: "iq-drop",
        role: [role.Admin],
        children: [
            {
                title: 'Dashboard',
                logo: 'ph-duotone ph-gauge',
                route: '/admin/dashboard',
                miniTitle: 'D'
            },
            {
                title: 'Danh sách tài khoản',
                logo: 'ph ph-user-list',
                route: '/admin/user-list',
                miniTitle: 'CL'
            },
            {
                title: 'Danh sách thể loại',
                logo: 'ph-duotone ph-list-plus',
                route: '/admin/category-list',
                miniTitle: 'CL'
            },
            {
                title: 'Danh sách sách',
                logo: 'ph-duotone ph-book-bookmark',
                route: '/admin/book-list',
                miniTitle: 'B'
            },
            {
                title: 'Danh đơn hàng',
                logo: 'ph ph-shopping-bag-open',
                route: '/admin/order-list',
                miniTitle: 'B'
            },
        ]
    },
    {
        isDivider: true
    },
    // {
    //     mainTitle: 'Pages',
    //     class: "static-item",
    //     isStatic: true
    // },
    // {
    //     mainTitle: 'Special Pages',
    //     mainLogo: 'ph-duotone ph-browsers',
    //     class: "iq-drop",
    //     children: [
    //         {
    //             title: 'Kanban',
    //             logo: 'ph-duotone ph-record',
    //             route: '/spacial-pages/kanban',
    //             miniTitle: 'K'
    //         },
    //         {
    //             title: 'Calendar',
    //             logo: 'ph-duotone ph-calendar-blank',
    //             route: '/spacial-pages/calendar',
    //             miniTitle: 'C'
    //         },
    //         {
    //             title: 'Pricing',
    //             logo: 'ph-duotone ph-tag',
    //             route: '/spacial-pages/pricing',
    //             miniTitle: 'P'
    //         },
    //         {
    //             title: 'Invoice',
    //             logo: 'ph-duotone ph-chat-centered',
    //             route: '/spacial-pages/invoice',
    //             miniTitle: 'I'
    //         },
    //         {
    //             title: 'Timeline',
    //             logo: 'ph-duotone ph-clock',
    //             route: '/spacial-pages/time-line',
    //             miniTitle: 'T'
    //         },
    //     ]
    // },
    {
        mainTitle: 'Authentication',
        mainLogo: 'ph-duotone ph-lock-key-open',
        class: "iq-drop",
        role: [role.Admin, role.User],
        children: [
            {
                title: 'Login',
                logo: 'ph-duotone ph-key',
                route: '/auth/sign-in',
                miniTitle: 'L'
            },
            {
                title: 'Resister',
                logo: 'ph-duotone ph-key',
                route: '/auth/sign-up',
                miniTitle: 'R'
            },
            {
                title: 'Recover Password',
                logo: 'ph-duotone ph-voicemail',
                route: '/auth/recover-pw',
                miniTitle: 'RP'
            },
            {
                title: 'Comfirm Mail',
                logo: 'ph-duotone ph-envelope',
                route: '/auth/confirm-mail',
                miniTitle: 'CM'
            },
            {
                title: 'Lock Screen',
                logo: 'ph-duotone ph-lock',
                route: '/auth/lock-screen',
                miniTitle: 'LS'
            },
            {
                title: 'Two Factor',
                logo: 'ph-duotone ph-lock',
                route: '/auth/two-factor',
                miniTitle: 'TF'
            },
            {
                title: 'Account Deactivate',
                logo: 'ph-duotone ph-lock',
                route: '/auth/account-deactivate',
                miniTitle: 'AD'
            },
        ]
    },
    {
        mainTitle: 'Tài khoản',
        mainLogo: 'ph-duotone ph-user',
        class: "iq-drop",
        role: [role.User],
        children: [
            {
                title: 'Thông tin cá nhân',
                logo: 'ph-duotone ph-identification-card',
                route: '/user/user-profile',
                miniTitle: 'UP'
            },
            {
                title: 'User Edit',
                logo: 'ph-duotone ph-note-pencil',
                route: '/user/user-edit',
                miniTitle: 'UE'
            },
            {
                title: 'User Add',
                logo: 'ph-duotone ph-plus-circle',
                route: '/user/user-add',
                miniTitle: 'UA'
            },
            {
                title: 'User List',
                logo: 'ph-duotone ph-rows',
                route: '/user/user-list',
                miniTitle: 'UL'
            },
        ]
    },
]