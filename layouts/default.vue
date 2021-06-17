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

        <v-card-text class="white--text pt-0">
          Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet.
          Mauris cursus commodo interdum. Praesent ut risus eget metus luctus
          accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim
          a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula
          lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus
          iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum
          tempor vel ut orci. Orci varius natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus.
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
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/"
        },
        {
          icon: "mdi-chart-bubble",
          title: "form",
          to: "/form"
        }
      ],
      icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
      tester: "delbar&pari"
    };
  }
};
</script>
