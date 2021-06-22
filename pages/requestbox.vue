<template>
  <div>
    <v-col lg="2" mt="20" md="20" sm="12">
      <v-card max-width="500" min-width="300">
        <v-list two-line color="indigo lighten-4">
          <v-list-item-group active-class="pink--text" multiple>
            <template v-for="(item, index) in items">
              <v-list-item :key="index" @click="selectedGroup = item">
                <v-list-item-content>
                  <v-chip-group column>
                    <v-chip class="ma-2" color="indigo">
                      نام درس:
                      {{ item.group.topic.name }}
                    </v-chip>
                    <v-chip v-if="item.group.slug !== 'None'" class="ma-2">
                      توضیحات نام درس:
                      {{ item.group.slug }}
                    </v-chip>
                    <v-chip class="ma-2">
                      درخواست‌دهنده:
                      {{ item.user.username }}
                    </v-chip>
                    <v-chip class="ma-2">
                      امتیاز درخواست‌دهنده:
                      {{ item.user.avgRate }}
                    </v-chip>
                    <v-chip class="ma-2">
                      ساعت در هفته:
                      {{ item.group.hours_per_week }}
                    </v-chip>
                    <v-chip class="ma-2">
                      هفته:
                      {{ item.group.weeks }}
                    </v-chip>
                    <v-chip class="ma-2">
                      توضیحات بیشتر:
                      {{ item.group.description }}
                    </v-chip>
                  </v-chip-group>
                </v-list-item-content>

                <v-list-item-action>
                  <v-row>
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          icon
                          v-bind="attrs"
                          v-on="on"
                          color="green"
                          @click="updateStatus(item.id, true)"
                        >
                          <v-icon dark right>
                            mdi-checkbox-marked-circle
                          </v-icon>
                        </v-btn>
                      </template>
                      <span>قبول درخواست</span>
                    </v-tooltip>

                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          icon
                          v-bind="attrs"
                          v-on="on"
                          color="error"
                          @click="updateStatus(item.id, false)"
                        >
                          <v-icon dark right>
                            mdi-cancel
                          </v-icon>
                        </v-btn>
                      </template>
                      <span>رد درخواست</span>
                    </v-tooltip>
                  </v-row>
                </v-list-item-action>
              </v-list-item>

              <v-divider
                v-if="index < items.length - 1"
                :key="index"
              ></v-divider>
            </template>
          </v-list-item-group>
        </v-list>
      </v-card>
      <br />
      <v-btn class="mr-4" @click="goBack">
        بازگشت به داشبورد
      </v-btn>
    </v-col>
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
import { getReq, postReq, putReq } from "~/utils/services";
export default {
  mounted() {
    this.loadPage();
  },
  head () {
    return {
      title: 'RequstBox'
    }
  },
  methods: {
    async loadPage() {
      try {
        const res = await getReq(this, "api/requests/owned");
        this.items = res;
      } catch (err) {
        this.snackbar = true;
      }
    },
    updateStatus(id, status) {
      putReq(this, `api/requests/answer/${id}`, { accepted: status })
        .then(() => {
          this.loadPage();
        })
        .catch(() => {
          snackbar = true;
        });
    },
    goBack() {
      // return to dashboard
      this.$router.push({ name: "dashboard" });
    }
    // groupFind() {
    //   getReq(this, `api/requests/owned/${this.selectedGroup.id}`)
    //     .then(() => {
    //       //this.loadPage();
    //     })
    //     .catch(() => {
    //       snackbar = true;
    //     });
    // }
  },
  // watch: {
  //   selectedGroup(newVal) {
  //     if (newVal) {
  //       this.groupFind();
  //     }
  //   }
  // },
  data: () => ({
    items: [],
    selectedGroup: null,
    snackbar: false,
    accepted: null,
    text: `retrieve error!`
  })
};
</script>
