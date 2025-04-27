
import { defineComponent } from "vue";
import { mixinSuper } from "@/common/mixinSuper";

export default defineComponent({
  name: 'BasePoup',
  mixins: [mixinSuper],
  data() {
    return {
      model: {}
    }
  },
  methods: {
    beforeOpen(e) {
      const me = this;
      me._popup = me.$vfm.dynamicModals[me.$vfm.dynamicModals.length - 1];
      if (e.ref.params._rawValue) {
        this._formName = e.ref.params._rawValue.name;
        this._report = e.ref.params._rawValue;
        this._formParam = e.ref.params._rawValue;

        this._report.KeyReload = Math.floor(Math.random() * 110720) + '';
      }
      this.bindData(this._formParam);
    },
    bindData(data) {
      const me = this;
      me.model = data;
    },
    beforeClose() {
      delete this._formName;
      delete this._report;
      delete this._formParam;
      this.model = {};
      this.hide();
    },
    validateControl() {
      const me = this;
      let lstControl = me.$refs;
      let isInvalid = false;

      for (const ref in lstControl) {
        if (
          typeof lstControl[ref].validate === "function" &&
          lstControl[ref].validate()
        ) {
          isInvalid = true
          return isInvalid;
        }
      }

      return false;
    },

    hide(callback) {
      const me = this;
      me._suppendClose = true;

      if (!me._popup) {
        me._popup = me.$vfm.dynamicModals[me.$vfm.dynamicModals.length - 1];
      }

      me._popup.value = false;

      me.$nextTick(() => {
        me._suppendClose = true;
        delete me._popup;
        if (callback && typeof callback == 'function') {
          callback();
        }
      });
    }



  }
})