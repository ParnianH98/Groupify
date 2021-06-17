<template>
  <div>
    <v-card width="800" color="indigo lighten-1">
      <v-card-title>
        <span> {{ tester }} گروه‌های فعال من</span>

        <v-spacer></v-spacer>

        <v-menu bottom right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="(item, i) in menuItems" :key="i">
              <v-list-item-title @click="menuHandler(pageItems[i])">
                {{ item.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-title>
      <v-row>
        <v-col width="400">
          <v-card max-width="400" min-width="300">
            <v-list two-line color="indigo lighten-4">
              <v-list-item-group active-class="pink--text">
                <template v-for="(item, index) in items">
                  <v-list-item :key="item.id">
                    <template v-slot:default="{ active }">
                      <v-list-item-content @click="groupeNumber = item.id">
                        <v-list-item-title
                          v-text="item.topic.name"
                        ></v-list-item-title>

                        <v-list-item-subtitle
                          v-text="item.description"
                        ></v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-row>
                          <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                v-if="item.owner.id === "
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
                              <v-btn
                                v-if="item.hasPermission"
                                icon
                                color="error"
                                rounded
                                v-bind="attrs"
                                v-on="on"
                                @click="delGP(item.id)"
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
        </v-col>
        <v-col width="400">
          <v-card>
            <chat-board :groupeNumber="groupeNumber" />
          </v-card>
        </v-col>
      </v-row>
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
import ChatBoard from "~/components/chatboard.vue";
import RateGroup from "~/components/rategroup.vue";

import { getReq, postReq } from "~/utils/services";
import { mdiDelete, mdiAlphaWCircle } from "@mdi/js";
export default {
  mounted() {
    this.loadPage();
  },
  components: {
    ChatBoard,
    RateGroup
  },
  methods: {
    menuHandler(newrout) {
      this.$router.push({ name: String(newrout) });
    },
    loadPage() {
      getReq(this, "api/demands/owned")
        .then(({ data }) => {
          this.items = data;
        })
        .catch(err => {
          this.snackbar = true;
        });
    },
    delGP(id) {
      postReq(this, `api/delete/${id}/`)
        .then(() => {
          this.loadPage();
        })
        .catch(() => {
          this.snackbar = true;
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
        is_pending: true,
        description: "ریاضی",
        hasPermission: true,
        topic: { id: 28, name: compsys },
        owner: { id: 4, username: test }
      },
      {
        id: 2,
        is_pending: false,
        description: "شیمی",
        topic: { id: 24, name: compiler },
        owner: { id: 5, username: test1 }
      }
    ],
    groupeNumber: 0,
    snackbar: false,
    text: `retrieve error!`,
    icons: {
      mdiDelete,
      mdiAlphaWCircle
    }
  })
};
</script>
