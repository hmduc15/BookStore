<template>
  <div class="book-comments d-flex">
    <!-- Comment form -->
    <div class="comment-form mb-4">
      <h4>Viết đánh giá của bạn</h4>
      <b-form @submit.prevent="submitComment">
        <Rating
          class="mb-3 mt-3"
          style="float: right"
          v-model="rating"
          :stars="5"
        />
        <b-form-textarea
          v-model="commentText"
          placeholder="Nhập đánh giá của bạn về cuốn sách này..."
          rows="3"
          required
        ></b-form-textarea>
        <b-button type="submit" variant="primary" class="mt-3"
          >Gửi đánh giá</b-button
        >
      </b-form>
    </div>

    <!-- Comments list -->
    <div class="comments-list">
      <MCommentItem
        v-for="comment in comments"
        :key="comment.comment_id"
        :comment="comment"
        :bookId="bookId"
        @reply-submitted="handleReplySubmitted"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, getCurrentInstance, nextTick } from "vue";
import Rating from "primevue/rating";
import Avatar from "primevue/avatar";
import { mFormat } from "@/common/mFomat";
import MCommentItem from "@/components/MComment/MCommentItem.vue";
import { moduleContext } from "@/store/pinia/store";
import commentAPi from "@/api/System/commentAPi";

export default {
  name: "MCommnent",
  components: { Rating, Avatar, MCommentItem },
  props: {
    lstComment: {
      default: [],
      type: Array,
    },
    bookId: {
      default: "",
      type: String,
    },
  },
  watch: {
    lstComment: {
      immediate: true,
      handler(newVal, oldval) {
        if (newVal) {
          this.initData(newVal);
        }
      },
    },
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const rating = ref(0);
    const commentText = ref("");
    const isLike = ref(false);
    const isReply = ref(false);
    const context = moduleContext().getContext;

    let comments = ref([]);

    function initData(data) {
      comments.value = data;
    }

    const submitComment = async () => {
      const newComment = {
        book_id: props.bookId,
        account_id: context.account_id,
        name: context.name,
        rating: rating.value,
        content: commentText.value,
        likes: 0,
        created_by: context.name,
      };

      comments.value.push(newComment);
      commentText.value = "";
      rating.value = 0;

      try {
        const res = await commentAPi.addComment(newComment);
        if (res) {
          proxy.$toast.success(
            proxy.$t("i18nMessage.GlobalMessage.CmtSuccess")
          );
        }
      } catch (e) {
        console.log(e);
        proxy.$toast.error(
          proxy.$t("i18nMessage.GlobalMessage.ErrorContactAd")
        );
      }
    };

    const likeComment = (commentId) => {
      isLike.value = !isLike.value;
      const comment = comments.value.find((c) => c.id === commentId);
      if (comment) {
        isLike.value ? comment.likes++ : comment.likes--;
      }
    };

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString();
    };

    function replyTo(id) {
      isReply.value = true;
    }

    function toggleReplyBox(id) {
      isReply.value = false;
    }

    return {
      rating,
      commentText,
      comments,
      submitComment,
      likeComment,
      formatDate,
      isLike,
      isReply,
      replyTo,
      toggleReplyBox,
      mFormat,
      initData,
    };
  },
};
</script>

<style scoped>
@import url(./MComment.scss);
</style>
