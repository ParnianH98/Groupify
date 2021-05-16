<template>
  <div>
    <v-row>
      <v-col lg="2" mt="20" md="20" sm="12">
        <v-card max-width="500" min-width="300">
          <v-list two-line color="purple darken-3">
            <v-list-item-group active-class="pink--text" multiple>
              <template v-for="(item, index) in items">
                <v-list-item :key="item.title">
                  <template v-slot:default="{ active }">
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="item.title"
                      ></v-list-item-title>

                      <v-list-item-subtitle
                        class="text--primary"
                        v-text="item.headline"
                      ></v-list-item-subtitle>

                      <v-list-item-subtitle
                        v-text="item.subtitle"
                      ></v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-list-item-action-text
                        v-text="item.action"
                      ></v-list-item-action-text>

                      <v-icon v-if="!active" color="grey lighten-1">
                        mdi-star-outline
                      </v-icon>

                      <v-icon v-else color="yellow darken-3">
                        mdi-star
                      </v-icon>
                    </v-list-item-action>
                  </template>
                </v-list-item>

                <v-divider
                  v-if="index < items.length - 1"
                  :key="index"
                ></v-divider>
              </template>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" offset-sm="3">
        <v-card height="200px">
          <v-card-title class="purple white--text">
            <span class="headline">Dashboard</span>

            <v-spacer></v-spacer>

            <v-menu bottom right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn dark icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item v-for="(item, i) in menuItems" :key="i">
                  <v-list-item-title @click="menuHandler(pageItems(i))">{{
                    item.title
                  }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { getReq } from "~/utils/services";
export default {
  mounted() {
    this.loadPage();
  },
  methods: {
    menuHandler(newrout) {
      this.$router.push({ name: newrout });
    },
    loadPage() {
      getReq(this, "api/demands/owned")
        .then(({ data }) => {
          this.items = data;
        })
        .catch(err => {
          snackbar = true;
        });
    }
  },
  data: () => ({
    menuItems: [
      { title: "پروفایل" },
      { title: "ارسال درخواست" },
      { title: "درخواست‌های دریافتی" }
    ],
    pageItems: ["profile", "makerequest", "requestbox"],
    items: [],
    snackbar: false,
    text: `retrieve error!`
  })
};
</script>
