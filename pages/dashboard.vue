<template>
  <div>
    <v-card width="800" color="indigo lighten-1">
      <v-card-title>
        <span> گروه‌های فعال من</span>

        <v-btn
          color="black"
          icon
          class="mr-4"
          @click="loadPage"
        >
          <v-icon> mdi-refresh </v-icon>
        </v-btn>

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
                <template v-for="(item, index)  in items" >
                  <div :key="index">
                    <v-list-item v-show="!item.isOwner || !item.is_pending">
                      <template v-slot:default="{ active }">
                        <v-list-item-content
                          @click="
                            group = {
                              number: item.id,
                              is_pending: item.is_pending,
                              isOwner: item.isOwner
                            }
                          "
                        >
                          <v-list-item-title
                            v-text="item.topic.name"
                          ></v-list-item-title>

                          <v-list-item-subtitle
                            v-text="item.description"
                          ></v-list-item-subtitle>
                        </v-list-item-content>

                        <v-badge
                          v-show="item.newMesseges !== 0"
                          left
                          color="blue"
                          :content="item.newMesseges"
                        />

                        <v-list-item-action>
                          <v-row>
                            <v-tooltip top>
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                  v-show="item.isOwner"
                                  icon
                                  color="error"
                                  rounded
                                  v-bind="attrs"
                                  v-on="on"
                                  @click="endGP(item.id)"
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
                    ></v-divider>
                  </div>
                </template>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>
        <v-col width="400">
          <rate-group
            :groupeNumber="group.number"
            :username="username"
            :isOwner="group.isOwner"
            @update="delGP"
            v-if="this.group.is_pending"
          />
          <v-card v-else color="indigo lighten-4">
            <chat-board :groupeNumber="group.number" :username="username" @update="reload" />
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

import { getReq, delReq } from "~/utils/services";
import { mdiDelete, mdiAlphaWCircle } from "@mdi/js";
export default {
  async mounted() {
    await this.loadPage();
  },
  head () {
    return {
      title: 'Dashboard'
    }
  },
  components: {
    ChatBoard,
    RateGroup
  },
  methods: {
    menuHandler(newrout) {
      this.$router.push({ name: String(newrout) });
    },
    async loadPage() {
      try {
        const res = await getReq(this, "api/dashboard/");
        this.items = res;
        const resuser = await getReq(this, "api/user/topics/");
        this.username = resuser[0].username;
        this.userid = resuser[0].id;
        // this.group = { number: 0, is_pending: false }
        var i;
        for (i = 0; i < this.items.length; i++) {
          this.items[i].isOwner = this.userid === this.items[i].owner.id;
        }
      } catch (err) {
        this.snackbar = true;
      }
    },
    endGP(id) {
      this.group.is_pending = true;
      this.group.number = id;
    },
    async reload(value) {
      if(value){
        const res = await getReq(this, "api/dashboard/");
        this.items = res;
        var i;
        for (i = 0; i < this.items.length; i++) {
          this.items[i].isOwner = this.userid === this.items[i].owner.id;
        }
      }
    },
    async delGP(value) {
      if (value) {
        try{
        await delReq(this, `api/pending_delete/${this.group.number}/`);
        this.group.number = 0;
        this.group.is_pending = false;
        }catch(err){
          this.snackbar = true;
        }
      }
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
    group: { number: 0, is_pending: false },
    username: "test",
    userid: 4,
    snackbar: false,
    text: `retrieve error!`,
    icons: {
      mdiDelete,
      mdiAlphaWCircle
    }
  })
};
</script>
