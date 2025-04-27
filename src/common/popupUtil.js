import { $vfm } from "@/lib/vueFinalModal/Plugin";
/**
 * Xử lý hiển thị popup
 */
class PopupUtil {
  /**
   * Đối tượng cache lại các component popup
   */
  _components = {};

  /**
   * Danh sách các popup đang hiển thị
   * key: tên popup
   * value: instance
   */
  _visible = {};

  /**
   * Danh sách tên popup đang hiển thị, thường dùng khi show chưa kịp show lên, chưa check được popup hiển thị qua this._visible
   * Nếu form nào cần dùng biến này thì khi hide form nên dùng hàm hide của popupUtil
   */
  _visibleName = [];

  /**
   * Mở popup
   * @param {string} name : Tên định danh
   * @param {object} params : tham số
   */
  show(name, params) {
    if (!name) throw 'name is required';
    let ps = params || {};
    ps.name = name;

    if (!this._visibleName.includes(name)) {
      this._visibleName.push(name);
    }

    const popup = $vfm.show({ component: name }, ps);
    console.log(`Popup name: ${name}`);

    this._visible[name] = popup;

    return popup;
  }

  /**
   * Đóng tất cả popup đang mở
   */
  hideAll() {
    $vfm.hideAll();
    this._visibleName = [];
  }

  /**
   * Ẩn popup
   * @param {*} name
   * @returns
   */
  hide(name) {
    if (!name) throw 'name is required';
    const popup = $vfm.hide(name);
    this._visibleName.pop(name);
    return popup;
  }

  /**
   * Toggle popup
   * @param {*} name
   * @param {*} toggle
   * @returns
   */
  toggle(name, toggle) {
    if (!name) throw 'name is required';
    const popup = $vfm.toggle(name, toggle);

    return popup;
  }

  /**
   * Lấy ra tất cả popup
   * nvtoan2 05/05/2023
   */
  getAll() {
    return this._visible;
  }

  /**
   * Kiểm tra form có đang hiển thị không
   */
  checkVisibleName(name) {
    return this._visibleName.includes(name);
  }

  /**
   * Lấy ra popup theo tên
   * nvtoan2 05/05/2023
   */
  get(name) {
    return this._visible[name];
  }
}

export default new PopupUtil();
