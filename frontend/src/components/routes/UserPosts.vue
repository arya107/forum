<template>
  <div
    class="user_posts"
    :class="{ 'user_posts--no_border_bottom': posts && !posts.length }"
  >
    <div class="user_posts__title">Posts by {{ username }}</div>

    <template v-if="!posts">
      <thread-post-placeholder v-if="!posts"> </thread-post-placeholder>
    </template>

    <scroll-load
      :loading="loadingPosts"
      @loadNext="loadNewPosts"
      v-else-if="posts.length"
    >
      <thread-post
        v-for="(post, index) in posts"
        :key="'thread-post-' + post.id"
        :post="post"
        :show-thread="true"
        :click-for-post="true"
        :class="{ 'post--last': index === posts.length - 1 }"
      ></thread-post>
      <template v-if="loadingPosts">
        <thread-post-placeholder
          v-for="n in nextPostsCount"
          :key="'thread-post-placeholder-' + n"
        ></thread-post-placeholder>
      </template>
    </scroll-load>
    <template v-else>This user hasn't posted anything yet</template>
  </div>
</template>

<script>
import ScrollLoad from "../ScrollLoad";
import ThreadPost from "../ThreadPost";
import ThreadPostPlaceholder from "../ThreadPostPlaceholder";

import AjaxErrorHandler from "../../assets/js/errorHandler";
import logger from "../../assets/js/logger";

export default {
  name: "user",
  props: ["username"],
  components: {
    ThreadPost,
    ScrollLoad,
    ThreadPostPlaceholder,
  },
  data() {
    return {
      posts: null,
      loadingPosts: false,
      nextPostsCount: 0,
      nextURL: "",
    };
  },
  methods: {
    loadNewPosts() {
      if (this.nextURL === null) return;

      this.loadingPosts = true;

      this.axios
        .get(this.nextURL)
        .then((res) => {
          this.loadingPosts = false;

          if (!this.posts) this.posts = [];

          let currentPostsIds = this.posts.map((p) => p.id);
          let filteredPosts = res.data.Posts.filter(
            (p) => !currentPostsIds.includes(p.id)
          );

          this.posts.push(...filteredPosts);
          this.nextURL = res.data.meta.nextURL;
          this.nextPostsCount = res.data.meta.nextPostsCount;
        })
        .catch((e) => {
          this.loadingPosts = false;

          AjaxErrorHandler(this.$store)(e);
        });
    },
  },
  created() {
    this.$store.dispatch("setTitle", this.$route.params.username + " | posts");

    this.axios
      .get(`/api/v1/user/${this.$route.params.username}?posts=true`)
      .then((res) => {
        this.posts = res.data.Posts;
        this.nextURL = res.data.meta.nextURL;
        this.nextPostsCount = res.data.meta.nextPostsCount;
      })
      .catch((e) => {
        let invalidId = e.response.data.errors.find((error) => {
          return error.name === "accountDoesNotExist";
        });

        if (invalidId) {
          this.$store.commit("set404Page", true);
        } else {
          AjaxErrorHandler(this.$store)(e);
        }
      });

    logger("userPosts", this.$route.params.username);
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables.scss";

.user_posts {
  background: #fff;
  border-radius: 0.25rem;
  padding: 1rem;
  border: thin solid $color__gray--darker;

  @at-root #{&}__title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
}

@media (max-width: $breakpoint--tablet) {
  .user_posts {
    margin-top: 1rem;
    overflow: hidden;
  }
}
</style>
