import { moduleContext } from '@/store/pinia/module/moduleContext';
import commonFuntion from '@/common/commonFuntion';
import cookieKey from '@/common/contanst/cookieKey';

export const useContextStorage = () => {

  /**
   * Set context vào local storage để làm source context gốc
   * @param {*} context 
   */
  const setSourceContextStorage = (context) => {
    //#region compatible with old version
    try {
      if (context) {
        localStorage.setItem('session_context', JSON.stringify(context));
        sessionStorage.setItem('session_context', JSON.stringify(context));
      }
    } catch (error) {
      console.log(error);
    }
    //#endregion
  }

  const getSoureContextStorage = (key) => {
    return parseContext(key);
  }

  /**
   * Set context của tab hiện tại vào cookie
   */
  const setCookieContext = () => {
    const context = moduleContext().getContext;
    if (context) {
      const daySeconds = 86400;
      commonFunction.setCookie(CookieKey.database_id, Context.database_id, daySeconds);
      commonFunction.setCookie(CookieKey.BudgetCode, Context.BudgetCode, daySeconds);
    }
  }

  /**
   * remove context khi inactive tab
   */
  const removeCookieContext = () => {
    commonFunction.removeCookie(CookieKey.DatabaseId);
    commonFunction.removeCookie(CookieKey.BudgetCode);
  }

  /**
   * Parse context từ session storage
   * @param {*} key 
   * @returns 
   */
  const parseContext = (key) => {
    let contextInSession = sessionStorage.getItem(key);
    if (!contextInSession) {
      const contextInLocalStorage = localStorage.getItem(key);
      if (contextInLocalStorage) {
        contextInSession = contextInLocalStorage;
        sessionStorage.setItem(key, contextInSession);
      } else {
        return null;
      }
    }
    if (typeof contextInSession === 'string') {
      const contextObject = JSON.parse(contextInSession);
      return contextObject;
    }
    return null;
  }

  /**
   * Set lại context vào session storage
   * @param {*} key 
   * @param {*} context 
   */
  const setContext = (key, context) => {
    sessionStorage.setItem(key, JSON.stringify(context));
  }

  const clearStorage = () => {
    sessionStorage.removeItem('session_context');
    localStorage.removeItem('session_context')
  }

  const onLogoutSession = () => {
    clearStorage();
  }

  return { setSourceContextStorage, getSoureContextStorage, setCookieContext, parseContext, setContext, removeCookieContext, onLogoutSession };
}