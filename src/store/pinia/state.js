// Initial Setting State
export const initialState = {
  saveLocal: 'sessionStorage',
  storeKey: 'bookstosetting-vue',
  setting: {
    app_name: {
      value: 'Booksto'
    },
    theme_scheme_direction: {
      value: 'ltr'
    },
    theme_scheme: {
      value: 'light'
    },
    theme_color: {
      colors: {},
      value: 'default'
    },
    theme_font_size: {
      value: 'theme-fs-md'
    },
    page_layout: {
      value: 'container-fluid'
    },
    sidebar_color: {
      value: 'sidebar-white'
    },
    sidebar_type: {
      value: []
    },
    sidebar_menu_style: {
      value: 'text-hover'
    },
  }
}

// Default Setting State
export const defaultState = {
  saveLocal: 'sessionStorage',
  storeKey: 'bookstosetting-vue',
  setting: {
    app_name: {
      target: '[data-setting="app_name"]',
      type: 'text',
      value: 'Booksto'
    },
    theme_scheme_direction: {
      target: 'html',
      choices: ['ltr', 'rtl'],
      type: 'layout_design',
      value: 'ltr'
    },
    theme_scheme: {
      target: 'html',
      choices: ['light', 'dark', 'auto'],
      type: 'layout_design',
      value: 'light'
    },
    theme_color: {
      target: 'html',
      choices: ['color-1', 'color-2', 'color-3', 'color-4', 'color-5', 'default'],
      type: 'default',
      colors: {},
      value: 'default'
    },
    theme_font_size: {
      target: 'html',
      choices: ['theme-fs-sm', 'theme-fs-md', 'theme-fs-lg'],
      type: 'layout_design',
      value: 'theme-fs-md'
    },
    page_layout: {
      target: '#page_layout',
      choices: ['container', 'container-fluid'],
      type: 'layout_design',
      value: 'container'
    },
    sidebar_color: {
      target: '[data-toggle="main-sidebar"]',
      choices: ['sidebar-white', 'sidebar-dark', 'sidebar-color'],
      type: 'layout_design',
      value: 'sidebar-white'
    },
    sidebar_type: {
      target: '[data-toggle="main-sidebar"]',
      choices: ['sidebar-hover', 'sidebar-mini', 'sidebar-soft'],
      type: 'layout_design',
      value: []
    },
    sidebar_menu_style: {
      target: '[data-toggle="main-sidebar"]',
      choices: ['sidebar-default navs-rounded', 'sidebar-default navs-rounded-all', 'sidebar-default navs-pill', 'sidebar-default navs-pill-all'],
      type: 'layout_design',
      value: 'text-hover'
    },
  }
}
