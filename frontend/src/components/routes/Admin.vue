<template>
  <div class="admin">
    <div class="admin__menu">
      <div
        class="admin__menu__item"
        :key="route.path"
        v-for="route in routes"
        :class="{
          'admin__menu__item--selected': route.route.includes(selected),
        }"
        @click="$router.push('/admin/' + route.route)"
      >
        <div>
          <font-awesome-icon
            :icon="['fa', route.icon]"
            class="admin__menu__item__icon"
          />
        </div>
        <div>
          <div class="admin__menu__item__title">
            {{ route.title }}
          </div>
          <div class="admin__menu__item__description">
            {{ route.description }}
          </div>
        </div>
      </div>
    </div>
    <router-view class="admin__router_view"></router-view>
  </div>
</template>

<script>
export default {
  name: "Admin",
  data() {
    return {
      selected: null,
      routes: [
        {
          title: "Dashboard",
          route: "dashboard",
          description: "Quick links and stats about your forum",
          icon: "home",
        },
        {
          title: "General",
          route: "general",
          description: "Admin accounts, categories and settings",
          icon: "th",
        },
        {
          title: "Moderation",
          route: "moderation/reports",
          description: "View and respond to user reports",
          icon: "exclamation-circle",
        },
        {
          title: "Users",
          route: "users",
          description: "View current user accounts",
          icon: "user-circle",
        },
      ],
    };
  },
  watch: {
    $route(to) {
      this.selected = to.path.split("/")[2];
    },
  },
  created() {
    this.selected = this.$route.path.split("/")[2];

    this.$nextTick(() => {
      if (!this.$store.state.admin) {
        this.$router.push("/");
        this.$store.commit("setAccountTabs", 1);
        this.$store.commit("setAccountModalState", true);
      }
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables.scss";

.admin {
  height: calc(100% + 1rem);
  margin-top: -1rem;
  display: flex;
  flex-direction: row;

  @at-root #{&}__menu {
    width: 15rem;
    height: calc(100%);
    background-color: #fff;
    cursor: default;
    overflow-y: auto;
    border-right: thin solid $color__lightgray--darker;

    @at-root #{&}__item {
      transition: background-color 0.2s;
      padding: 1rem;
      border-bottom: thin solid $color__lightgray--darker;
      display: flex;
      flex-direction: row;
      position: relative;

      &:hover {
        background-color: $color__lightgray--primary;
      }

      &::before {
        content: "";
        position: absolute;
        left: -0.25rem;
        top: 0;
        width: 0.25rem;
        height: 100%;
        background-color: $color__gray--darkest;
        transition: left 0.2s;
      }

      @at-root #{&}--selected {
        background-color: $color__lightgray--primary;

        &::before {
          left: 0;
        }
      }

      @at-root #{&}__icon {
        margin-right: 0.5rem;
        margin-top: 0.1875rem;
      }

      @at-root #{&}__title {
        font-weight: 600;
      }
      @at-root #{&}__description {
        font-size: 0.9rem;
        color: $color__text--secondary;
        margin-top: 0.125rem;
      }
    }
  }

  @at-root #{&}__router_view {
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
}
</style>
