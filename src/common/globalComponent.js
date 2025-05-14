import MInputVue from "@/components/MInput/MInput.vue";
import MLoading from "@/components/MLoading/MLoading.vue";
import VueAutonumeric from '@/components/MAutonumber/VueAutonumeric.vue';

import VueCountdown from '@chenfengyuan/vue-countdown';
export function useComponent(app) {
  app.component(MInputVue.name, MInputVue);
  app.component(MLoading.name, MLoading);
  app.component("VueAutonumeric", VueAutonumeric);
  app.component(VueCountdown.name, VueCountdown);
}