<template>
  <div class="admin_forum_info category_widget__box">
    <div class="cateogry_widget__text">
      <div class="category_widget__text__title">Forum info</div>
    </div>
    <div>
      <fancy-input
        placeholder="Forum name"
        v-model="name"
        :error="errors.forumName"
      ></fancy-input>
    </div>
    <div>
      <fancy-input
        placeholder="Forum description"
        v-model="description"
        :error="errors.forumDescription"
      ></fancy-input>
    </div>
    <div class="admin_forum_info__label">
      <toggle-switch v-model="showDescription"></toggle-switch>
      <span>Show forum description on homepage</span>
    </div>
    <loading-button :loading="loading" @click="save"
      >Save settings</loading-button
    >
  </div>
</template>

<script>
import FancyInput from "./FancyInput";
import LoadingButton from "./LoadingButton";
import ToggleSwitch from "./ToggleSwitch";

import AjaxErrorHandler from "../assets/js/errorHandler";

export default {
  name: "AdminForumInfo",
  components: {
    FancyInput,
    LoadingButton,
    ToggleSwitch,
  },
  data() {
    return {
      name: "",
      description: "",
      showDescription: false,
      loading: false,
      errors: {
        forumName: "",
        forumDescription: "",
      },
    };
  },
  methods: {
    save() {
      this.errors.forumName = "";
      this.errors.forumDescription = "";

      if (!this.name.trim().length) {
        this.errors.forumName = "Forum name can't be blank";
        return;
      }

      this.loading = true;

      let settingsReq = this.axios.put("/api/v1/settings", {
        forumName: this.name,
        forumDescription: this.description || "",
        showDescription: this.showDescription,
      });

      settingsReq
        .then((res) => {
          this.loading = false;

          this.$store.commit("setSettings", res.data);
        })
        .catch((e) => {
          this.loading = false;

          AjaxErrorHandler(this.$store)(e, (error, modalErrors) => {
            if (this.errors[error.path] !== undefined) {
              this.errors[error.path] = error.message;
            } else {
              modalErrors.push(error.message);
            }
          });
        });
    },
  },
  mounted() {
    this.axios
      .get("/api/v1/settings")
      .then((res) => {
        this.name = res.data.forumName || "";
        this.description = res.data.forumDescription || "";
        this.showDescription = res.data.showDescription;
      })
      .catch(AjaxErrorHandler(this.$store));
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";

.admin_forum_info {
  @at-root #{&}__label {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;

    & > span {
      font-size: 0.9rem;
      margin-left: 0.5rem;
    }
  }
}
</style>
