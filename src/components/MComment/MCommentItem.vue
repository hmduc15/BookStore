<template>
  <div class="comment-item mb-4">
    <div class="d-flex align-items-start gap-3">
      <Avatar
        :label="comment.name.charAt(0)"
        class="mr-2"
        style="background-color: #ece9fc; color: #2a1261"
        size="large"
        shape="circle"
      />
      <div class="flex-grow-1">
        <div class="d-flex justify-content-between">
          <h5>{{ comment.name }}</h5>
          <small class="text-muted">{{
            mFormat.formatDate(comment.created_date)
          }}</small>
        </div>
        <Rating class="mb-2" v-model="comment.rating" :stars="5" readonly />

        <p class="mb-2">{{ comment.content }}</p>
        <div class="comment-actions d-flex">
          <div class="comment-btn d-flex">
            <b-button
              variant="link"
              size="sm"
              @click="toggleLike(comment)"
              class="btn-like d-flex gap-2 align-items-center"
            >
              <i class="fa fa-thumbs-up" :class="{ 'un-like': !isLiked }"></i>
              {{ comment.like }}
            </b-button>
            <b-button
              variant="link"
              size="sm"
              class="d-flex gap-2 align-items-center"
              @click="toggleReplyBox"
            >
              <i class="fa fa-commenting"></i> Trả lời
            </b-button>
          </div>
        </div>

        <!-- Reply form -->
        <div v-if="showReplyBox" class="comment-reply mt-3">
          <b-form @submit.prevent="submitReply">
            <b-form-textarea
              v-model="replyText"
              placeholder="Viết phản hồi..."
              rows="1"
              style="height: 20px"
              required
            ></b-form-textarea>
            <div class="d-flex justify-content-end gap-2 mt-2">
              <b-button
                variant="outline-secondary"
                size="sm"
                @click="toggleReplyBox"
              >
                Hủy
              </b-button>
              <b-button type="submit" variant="primary" size="sm">
                Gửi
              </b-button>
            </div>
          </b-form>
        </div>

        <!-- Replies list -->
        <div
          v-if="comment.reply && comment.reply.length > 0"
          class="replies-list mt-3"
        >
          <MCommentItem
            v-for="reply in comment.reply"
            :key="reply.comment_id"
            :comment="reply"
            @reply-submitted="handleReplySubmitted"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted } from "vue";
import Rating from "primevue/rating";
import Avatar from "primevue/avatar";
import { mFormat } from "@/common/mFomat";
import commentAPi from "@/api/System/commentAPi";
import reactionCmtApi from "@/api/Business/reactionCmtApi.js";
import actionCmt from "@/common/contanst/actionCmt.js";

export default {
  name: "MCommentItem",
  components: { Rating, Avatar },
  props: {
    comment: {
      type: Object,
      required: true,
    },
    bookId: {
      default: "",
      type: String,
    },
  },
  emits: ["reply-submitted"],
  setup(props, { emit }) {
    const isLiked = ref(false);
    const showReplyBox = ref(false);
    const replyText = ref("");

    const toggleLike = async () => {
      var reaction = {
        book_id: props.bookId,
        comment_id: props.comment.comment_id,
      };
      isLiked.value = !isLiked.value;
      if (isLiked.value) {
        props.comment.like += 1;
        reaction.action = actionCmt.Like;
      } else {
        props.comment.like -= 1;
        reaction.action = actionCmt.UnLike;
      }

      var data = {
        comment_id: props.comment.comment_id,
        like: props.comment.like,
      };
      await commentAPi.updateLike(data);

      await reactionCmtApi.updateReactionCmt(reaction);
    };

    const toggleReplyBox = () => {
      showReplyBox.value = !showReplyBox.value;
    };

    // const countLike = computed(() => {
    //   return props.comment.likes;
    // });

    const submitReply = () => {
      const newReply = {
        name: "Người dùng hiện tại",
        rating: 0,
        content: replyText.value,
        likes: 0,
        createdAt: new Date().toISOString(),
        replies: [],
      };

      if (!props.comment.reply) {
        props.comment.reply = [];
      }

      props.comment.reply.unshift(newReply);
      replyText.value = "";
      showReplyBox.value = false;

      emit("reply-submitted", newReply);
    };

    const handleReplySubmitted = (reply) => {
      emit("reply-submitted", reply);
    };

    return {
      isLiked,
      showReplyBox,
      replyText,
      toggleLike,
      toggleReplyBox,
      submitReply,
      handleReplySubmitted,
      mFormat,
    };
  },
};
</script>

<style scoped lang="scss">
.btn-like {
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
}
.un-like {
  color: #6c757d;
}
.comment-reply {
  margin-left: 20px;
  padding-left: 20px;
  border-left: 2px solid #eee;
}
.replies-list {
  margin-left: 20px;
  padding-left: 20px;
  border-left: 2px solid #eee;
}
</style>
