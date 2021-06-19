<template>
  <v-app>
    <v-app-bar :clipped-left="clipped" fixed app dense color="indigo lighten-2">
      <v-toolbar-title v-text="routeTitle" />
    </v-app-bar>
    <v-main
      ><v-container style="height: 100vh">
        <nuxt />
      </v-container>
    </v-main>
    <v-footer dark padless>
      <v-card flat tile class="indigo lighten-1 white--text text-center">
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0 px-16">
          ما در این سایت قصد داریم افرادی را که اهداف زیادی دارند اما به علت نداشتن یک همپا
          و همراه و همچنین انگیزه کافی از رسیدن به این اهداف دست می کشند و در میانه راه آنها را رها می کنند
          در کنار هم جمع کنیم، همچنین به آنها در پیدا کردن همراهی با اهداف مشابه یاری نماییم.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Groupify</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  computed: {
    routeTitle() {
      return {
        default: "صفحه اصلی",
        dashboard: "داشبورد",
        form: "فرم",
        login: "ورود",
        makerequest: "ارسال درخواست",
        profile: "پروفایل",
        requestbox: "درخواست‌های دریافتی",
        signup: "ساخت حساب کاربری"
      }[this.$route.name];
    }
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
      miniVariant: false,
      right: true,
      rightDrawer: false,
    };
  }
};
</script>
