<template>
  <div class="no-data d-flex">
    <img
      src="../../../public/assets/images/no-data/nodata.svg"
      style="width: 50%"
    />
    <div class="empty-des">Không có dữ liệu</div>
  </div>
</template>

<script>
export default {
  name: "MNodata",
};
</script>

<style scope>
.no-data {
  flex-direction: column;
  align-items: center;
  gap: 15px 0;
}
</style>
