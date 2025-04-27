/**
 * Object xử lý event global trên toàn bộ hệ thống
 * @author DNThang - 17.03.2020
 * HTHIEP migrate sang vue3
 */
import emitter from 'tiny-emitter/instance';

export default {
  $on: (...args) => emitter.on(...args),
  $once: (...args) => emitter.once(...args),
  $off: (...args) => emitter.off(...args),
  $emit: (...args) => emitter.emit(...args),
};


