<template>
  <div>
    <v-card width="400" color="indigo lighten-1">
      <v-card-title>
        <span>گروه‌های فعال من</span>

        <v-spacer></v-spacer>

        <v-menu bottom right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="(item, i) in menuItems" :key="i">
              <v-list-item-title @click="menuHandler(pageItems[i])">{{
                item.title
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-title>
      <!-- <v-col lg="2" mt="20" md="20" sm="12"> -->
      <v-card max-width="400" min-width="300">
        <v-list two-line color="indigo lighten-4">
          <v-list-item-group active-class="pink--text" multiple>
            <template v-for="(item, index) in items">
              <v-list-item :key="item.title">
                <template v-slot:default="{ active }">
                  <v-list-item-content>
                    <v-list-item-title v-text="item.title"></v-list-item-title>

                    <v-list-item-subtitle
                      v-text="item.description"
                    ></v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-row>
                      <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            v-if="item.hasPermission"
                            icon
                            color="blue"
                            v-bind="attrs"
                            v-on="on"
                            @click="updateStatus(item.id, false)"
                          >
                            <v-icon dark>
                              {{ icons.mdiAlphaWCircle }}
                            </v-icon>
                          </v-btn>
                        </template>
                        <span>تعداد هفته‌های فعالیت</span>
                      </v-tooltip>

                      <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-rating
                            v-model="rating"
                            color="yellow"
                            background-color="grey darken-1"
                            empty-icon="$ratingFull"
                            half-increments
                            hover
                            large
                          ></v-rating>
                        </template>
                        <span>امتیاز شما به این گروه</span>
                      </v-tooltip>

                      <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            v-if="item.hasPermission"
                            icon
                            color="error"
                            rounded
                            v-bind="attrs"
                            v-on="on"
                            @click="updateStatus(item.id, false)"
                          >
                            <v-icon>
                              {{ icons.mdiDelete }}
                            </v-icon>
                          </v-btn>
                        </template>
                        <span>حذف این گروه</span>
                      </v-tooltip>
                    </v-row>
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
      <!-- </v-col> -->
    </v-card>
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
import { mdiDelete, mdiAlphaWCircle } from "@mdi/js";
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
    items: [
      {
        id: 1,
        title: "گروه 1",
        description: "ریاضی",
        status: null,
        hasPermission: true
      },
      { id: 2, title: "گروه 2", description: "شیمی", status: null },
      { id: 3, title: "گروه 3", description: "فیزیک", status: null },
      { id: 4, title: "گروه 4", description: "زیست", status: null }
    ],
    snackbar: false,
    text: `retrieve error!`,
    icons: {
      mdiDelete,
      mdiAlphaWCircle
    },
    rating: 4.5
  })
};
</script>
