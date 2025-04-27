import { moduleContext } from '@/store/pinia/store';
import LocalForage from 'localforage';

// Implement the driver here.
class IndexedDB {
  _db = null;
  _dbName = 'bookstore';
  _keyField = '_k';
  _valueField = '_v';
  _table = 'cache';

  constructor() {
    const me = this;
    const Context = moduleContext()?.getContext;
    if (Context) {
      me._table = String(Context.database_id);
      try {
        this._db = LocalForage;
        this._db.config({
          driver: LocalForage.INDEXEDDB,
          name: `${me._dbName}_${me._table}`,
          version: 1.0,
          storeName: 'keyvaluepairs', // Should be alphanumeric, with underscores.
          description: 'Index db for bookstore'
        });
      } catch (err) {
        //   console.error(err);
      }
    }
  }

  /**
   * Lấy thông tin dữ liệu lưu trong index theo key
   * @param {*} key
   * @param {*} fn
   * @returns
   */
  async get(key, fn) {
    key = `bookstore_${key}`;
    let data = await this._db.getItem(key, fn);
    try {
      //Thực hiện ép kiểu về date objec do stringtyfy đưa kiểu date về string
      const dateFormat = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
      function reviver(key, value) {
        if (typeof value === 'string' && dateFormat.test(value)) {
          return new Date(value);
        }
        return value;
      }
      data = JSON.parse(data, reviver);
    } catch (error) { }
    return data;
  }

  /**
   * Lưu trữ dữ liệu vào indexdb
   * @param {*} key
   * @param {*} data
   * @param {*} fn
   */
  async set(key, data, fn) {
    key = `bookstore_${key}`;
    let stringData = '';
    if (typeof data === 'object') {
      stringData = JSON.stringify(data);
    } else {
      stringData = data;
    }
    await this._db.setItem(key, stringData, fn);
  }

  /**
   * Xóa dữ liệu trong indexdb theo key
   * @param {*} key
   * @param {*} fn
   */
  async delete(key, fn) {
    key = `bookstore_${key}`;
    await this._db.removeItem(key, fn);
  }

  /**
   * Clear toàn bộ dữ liệu trong indexdb
   */
  async clear() {
    await this._db.clear();
  }

  getTable() {
    return this._table;
  }

  /**
   * Lấy ra toàn bộ keys
   */
  async getKeys() {
    return await this._db.keys();
  }
}

export default IndexedDB;
