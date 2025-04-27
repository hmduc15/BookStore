class CommonFunction {
  countMark = 0;
  /**
   * Xu lý loading
   * @param {} important 
   */
  getMainLoading() {
    let el = document.body.querySelector('#m-loading');
    return el;
  }
  mask(important) {
    important && this.countMark++;
    let el = this.getMainLoading();
    if (el) {
      el.style.display = 'flex';
    }
  }
  unmask(important) {
    important && this.countMark--;

    if (!this.countMark) {
      let el = this.getMainLoading();
      if (el) {
        setTimeout(() => {
          el.style.display = 'none';
        }, 200);
      }
    }
  }

  /**
  * Gán cookie
  */
  setCookie(name, value, seconds) {
    var expires = '';
    if (seconds) {
      var date = new Date();
      date.setTime(date.getTime() + seconds * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/' + '; domain=' + location.hostname;
  }

  /**
   * Đọc cookie
   */
  getCookie(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  /**
   * Xóa cookie
   */
  removeCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
  generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = crypto.getRandomValues(new Uint8Array(1))[0] % 16;
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }
  generateUniqueOrderCode() {
    const pad = n => String(n).padStart(2, '0');
    const now = new Date();
    return `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}${pad(Math.floor(Math.random() * 100))}`;
  }

  /**
 * Nhóm các phần tử trong mảng theo key chỉ định
 * @param {Array} array - Mảng cần nhóm
 * @param {string} key - Key dùng để nhóm
 * @returns {Object} - Đối tượng với các nhóm được phân loại theo key
 */
  groupBy(array, key) {
    return array.reduce((result, currentItem) => {
      // Lấy giá trị của key hiện tại
      const groupKey = currentItem[key];

      // Nếu nhóm chưa tồn tại, tạo mảng mới
      if (!result[groupKey]) {
        result[groupKey] = [];
      }

      // Thêm phần tử vào nhóm tương ứng
      result[groupKey].push(currentItem);

      return result;
    }, {});
  }

  validatePassword(password) {
    /**
     * Kiểm tra mật khẩu có đáp ứng các yêu cầu:
     * - Đúng 8 ký tự
     * - Có ít nhất 1 chữ hoa
     * - Có ít nhất 1 ký tự đặc biệt
     */

    // Kiểm tra độ dài
    if (password.length < 8) {
      return false;
    }

    // Kiểm tra có ít nhất 1 chữ hoa
    if (!/[A-Z]/.test(password)) {
      return false;
    }

    // Kiểm tra có ít nhất 1 ký tự đặc biệt
    // Ký tự đặc biệt: không phải chữ cái và không phải số
    if (!/[^a-zA-Z0-9]/.test(password)) {
      return false;
    }

    // Nếu tất cả điều kiện đều đúng
    return true;
  }

  async convertImageToFile(url, fileName) {
    const res = await fetch(url);
    const blob = await res.blob();

    const file = new File([blob], fileName, { type: blob.type });

    return file;

  }

}

export default new CommonFunction();