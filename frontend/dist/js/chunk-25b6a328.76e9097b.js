(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-25b6a328"],{"49fd":function(e,s,t){"use strict";var r=t("925f"),u=t.n(r);u.a},6839:function(e,s,t){"use strict";t.r(s);var r=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"route_container user_route"},[t("div",{staticClass:"user_header"},[t("div",{staticClass:"user_header__icon picture_circle",style:{"background-color":e.userColor,"background-image":e.userPicture}},[e._v(" "+e._s(e.userPicture?"":e.username[0].toUpperCase())+" ")]),t("div",{staticClass:"user_header__info"},[t("span",{staticClass:"user_header__username"},[e._v(" "+e._s(e.username)+" "),e.user&&e.user.admin?t("span",{staticClass:"admin_badge admin_badge--large"},[e._v(" admin ")]):e._e()]),e.user?t("span",{staticClass:"user_header__date"},[e._v("User since "+e._s(e._f("formatDate")(e.user.createdAt,"date")))]):e._e(),e.user&&e.user.description&&e.user.description.length?t("div",{staticClass:"user_description",domProps:{innerHTML:e._s(e.user.description)}}):e._e()])]),t("div",{staticClass:"user__view_holder"},[t("div",{staticClass:"user__links"},e._l(e.menuItems,(function(s,r){return t("div",{key:"user-menu-item-"+r,staticClass:"user__links__menu_item",class:{"user__links__menu_item--selected":r===e.selected},on:{click:function(t){return e.$router.push("/user/"+e.username+"/"+s.route)}}},[e._v(" "+e._s(s.name)+" ")])})),0),t("router-view",{staticClass:"user__view",attrs:{username:e.username}})],1)])},u=[],n=(t("7db0"),t("4160"),t("b0c0"),t("ac1f"),t("1276"),t("159b"),t("c4b0")),a=t.n(n),i={name:"user",data:function(){return{menuItems:[{name:"Posts",route:"posts"},{name:"Threads",route:"threads"}],selected:0,username:this.$route.params.username,user:null}},watch:{$route:function(e){this.selected=this.getIndexFromRoute(e.path)}},computed:{userColor:function(){return this.user?this.user.color:null},userPicture:function(){return this.user&&this.user.picture?"url("+this.user.picture+")":null}},methods:{getIndexFromRoute:function(e){var s,t=e.split("/")[3];return this.menuItems.forEach((function(e,r){e.route===t&&(s=r)})),s}},created:function(){var e=this;this.selected=this.getIndexFromRoute(this.$route.path),this.axios.get("/api/v1/user/".concat(this.$route.params.username)).then((function(s){return e.user=s.data})).catch((function(s){var t=s.response.data.errors.find((function(e){return"accountDoesNotExist"===e.name}));t?e.$store.commit("set404Page",!0):a()(e.$store)(s)}))}},c=i,o=(t("49fd"),t("2877")),d=Object(o["a"])(c,r,u,!1,null,"92b63784",null);s["default"]=d.exports},"925f":function(e,s,t){}}]);
//# sourceMappingURL=chunk-25b6a328.76e9097b.js.map