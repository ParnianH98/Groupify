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
      <v-col lg="55" md="10" sm="12">
        <v-row class="mt-2" align="center" justify="space-around">
          <v-btn color="deep-purple lighten-1" @click="clickHandler('profile')">
            پروفایل
          </v-btn>
          <v-btn
            color="deep-purple lighten-2"
            @click="clickHandler('makerequest')"
          >
            ارسال درخواست
          </v-btn>
          <v-btn
            color="deep-purple lighten-3"
            @click="clickHandler('requestbox')"
          >
            درخواست‌های دریافتی
          </v-btn>
        </v-row>
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
    clickHandler(newrout) {
      this.$router.push({ name: newrout });
    },
    loadPage() {
      getReq(this, "api/groups/all")
        .then(({ data }) => {
          this.items = data;
        })
        .catch(err => {
          snackbar = true;
        });
    }
  },
  data: () => ({
    items: [],
    snackbar: false,
    text: `retrieve error!`
  })
};
</script>
