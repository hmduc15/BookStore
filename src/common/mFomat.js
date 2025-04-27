import numeral from "numeral";
import moment from 'moment';
import i18nEnum from "@/i18ns/vi/i18nEnum";
import contanst from "./contanst";

let mo = moment;
numeral.register('locale', 'vi', {
  delimiters: {
    thousands: '.',
    decimal: ',',
  },
  abbreviations: {
    thousand: 'nghìn',
    million: 'triệu',
    billion: 'tỷ',
    trillion: 'nghìn tỷ',
  },
  ordinal: function (number) {
    return '.';
  },
  currency: {
    symbol: '', //'₫'
  },
});


let parseStringToDate = function (sDate) {
  if (typeof sDate == 'string') {
    let dte = mo(sDate);
    if (!dte.isValid()) {
      dte = dte.toDate();
      return dte;
    }
  }
};

let mFormat = {

  formatEnum(value, enumName) {
    if (typeof value == 'number' || value || typeof value == 'boolean') {
      let formatValue = Number(value);
      if (Number.isNaN(formatValue)) {
        formatValue = value;
      }
      if (enumName) {
        let enumObj = contanst[enumName];
        if (enumObj) {
          if (!Object.keys(enumObj)) {
            return '';
          }
          let key = Object.keys(enumObj).find(k => enumObj[k] === formatValue);
          if (key) {
            let rs = i18nEnum[enumName];
            if (rs) {
              let text = rs[key];
              return text;
            }
          } else {
            return formatValue;
          }
        } else {
          return formatValue;
        }
      } else {
        return formatValue;
      }
    }
    return '';
  },

  formatDate(value) {
    if (!value) {
      return '-';
    }

    let ret,
      dte = value;

    if (!(dte instanceof Date)) {
      if (value) {
        value = value.replace('Z', '');
      }
      dte = mo(value);
      if (!dte.isValid()) {
        let dateFormat = 'DD/MM/YYYY';
        dte = mo(value, dateFormat.toUpperCase());
        if (!dte.isValid()) {
          throw new Error('DEV: value <' + value + '> format Date invalid.');
        }
      }

      dte = new Date(dte.year(), dte.month(), dte.date());
      // dte = dte.toDate();
    }
    ret = dte.toLocaleDateString('vi', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    return ret;
  },


  formatAmount(num, options) {
    let result = num;

    if (typeof num === 'undefined' || num === null) {
      return '-';
    }

    //Nếu số tiền = 0 mà config isShowZero = false thì return '' luôn
    if (options) {
      if (result == 0 && !options.isShowZero) {
        return '';
      }
    }

    //ĐVThi sửa bug 90688- số lượng không hiển thị định dạng sau dấu chấm
    if (num != undefined && num != null) {
      let digits = 0,
        buildDigits = 0;

      if (num.toString().search(/e/) !== -1) {
        result = result.toString();
      } else {
        mFormat.formatSeperator(options);
        result = numeral(Number(num)).format('0,' + buildDigits.toFixed(digits));
      }
      result = mFormat.formatNegative(result);
    }

    return result;
  },

  formatNegative(value) {
    if (value.startsWith('-')) {
      let dbOptions = store.state[ModuleDbOption]?.dbOptions;
      let CurrencyNegativePattern = dbOptions ? dbOptions.CurrencyNegativePattern : 0;
      switch (CurrencyNegativePattern) {
        case 0:
          value = ['(', value.substr(1), ')'].join('');
          break;
        case 1:
          value = '-' + value.substr(1);
          break;
        case 2:
          value = '- ' + value.substr(1);
          break;
        case 3:
          value = value.substr(1) + '-';
          break;
        case 4:
          value = value.substr(1) + ' -';
          break;
      }
    }

    return value;
  },

  formatSeperator(options) {
    numeral.localeData().delimiters.decimal = ',';
    numeral.localeData().delimiters.thousands = '.';
  },
}

export default numeral;

export { mFormat }