import { defineAsyncComponent } from "vue";


const UpdateStatusPopup = defineAsyncComponent(() =>
  import("@/components/MModal/UpdateStatusPopup.vue")
)

const OrderDetailPopup = defineAsyncComponent(() =>
  import("@/components/MModal/OrderDetailPopup.vue")
)

const EditCategoryPopup = defineAsyncComponent(() =>
  import("@/components/MModal/EditCategoryPopup.vue")
)
const AddCategoryPopup = defineAsyncComponent(() =>
  import("@/components/MModal/AddCategoryPopup.vue")
)

const EditUserPopup = defineAsyncComponent(() =>
  import("@/components/MModal/EditUserPopup.vue")
)

const AddUserPopup = defineAsyncComponent(() =>
  import("@/components/MModal/AddUserPopup.vue")
)

const SepayQrPopup = defineAsyncComponent(() =>
  import("@/components/MModal/SepayQrPopup.vue")
);

const AddressOrder = defineAsyncComponent(() =>
  import("@/components/MModal/AddressOrder.vue")
);

const ConfirmMail = defineAsyncComponent(() =>
  import("@/views/auth/ConfirmMail.vue")
);

export function popupRegister(app) {
  app.component("ConfirmMail", ConfirmMail);
  app.component("AddressOrder", AddressOrder);
  app.component("SepayQrPopup", SepayQrPopup);
  app.component("AddUserPopup", AddUserPopup);
  app.component("EditUserPopup", EditUserPopup);
  app.component("AddCategoryPopup", AddCategoryPopup);
  app.component("EditCategoryPopup", EditCategoryPopup);
  app.component("OrderDetailPopup", OrderDetailPopup);
  app.component("UpdateStatusPopup", UpdateStatusPopup);
}