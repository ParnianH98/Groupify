<template>
  <div>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">
          انتخاب لیبل
        </v-stepper-step>

        <v-divider />

        <v-stepper-step step="2">
          نتایج جستوجو
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-container fluid>
            <p v-if="selectedlabel === null">
              .شما هنوز لیبلی ندارید. ابتدا در پروفایل لیبل اضافه کنید
            </p>
            <p v-else>
              <v-chip-group>
                <v-chip class="ma-2" color="indigo">
                  نام درس:
                  {{ selectedlabel.topic.name }}
                </v-chip>
                <v-chip v-if="selectedlabel.slug !== 'None'" class="ma-2">
                  توضیحات نام درس:
                  {{ item.slug }}
                </v-chip>
                <v-chip class="ma-2">
                  ساعت در هفته:
                  {{ selectedlabel.hours_per_week }}
                </v-chip>
                <v-chip class="ma-2">
                  هفته:
                  {{ selectedlabel.weeks }}
                </v-chip>
                <v-chip class="ma-2">
                  توضیحات بیشتر:
                  {{ selectedlabel.description }}
                </v-chip>
              </v-chip-group>
            </p>
            <v-radio-group v-model="selectedlabel" mandatory>
              <v-radio
                v-for="(item, index) in Labels"
                :key="index"
                :label="String(item.topic.name)"
                :value="item"
              />
            </v-radio-group>
          </v-container>

          <v-btn v-if="selectedlabel !== null" color="primary" @click="search">
            جستوجو
          </v-btn>

          <v-btn text @click="goBack">
            انصراف
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-container fluid>
            <v-list>
              <v-list-item v-for="(item, index) in similarUsers" :key="index">
                <v-list-item-content>
                  <p>
                    <v-chip class="ma-2" color="indigo">
                      نام کاربری:
                      {{ item.owner.username }}
                    </v-chip>
                    <v-chip class="ma-2">
                      امتیاز:
                      {{ item.owner.avgRate }}
                    </v-chip>
                    <v-chip class="ma-2" color="indigo">
                      نام درس:
                      {{ item.topic.name }}
                    </v-chip>
                    <v-chip v-if="item.slug !== 'None'" class="ma-2">
                      توضیحات نام درس:
                      {{ item.slug }}
                    </v-chip>
                    <v-chip class="ma-2">
                      ساعت در هفته:
                      {{ item.hours_per_week }}
                    </v-chip>
                    <v-chip class="ma-2">
                      هفته:
                      {{ item.weeks }}
                    </v-chip>
                    <v-chip class="ma-2">
                      توضیحات بیشتر:
                      {{ item.description }}
                    </v-chip>
                  </p>
                  <v-btn @click="sendrequest(index)">
                    ارسال درخواست
                  </v-btn>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-container>

          <v-btn color="primary" @click="goBack">
            بازگشت به داشبورد
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
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
import { postReq, getReq } from "~/utils/services";

export default {
  name: "Makerequest",

  async mounted() {
    await this.getLabels();
  },

  head () {
    return {
      title: 'Makerequest'
    }
  },

  data() {
    return {
      snackbar: false,
      text: `retrieve error!`,
      e1: 1,
      selectedlabel: null,
      Labels: [],
      similarUsers: []
    };
  },

  methods: {
    async getLabels() {
      // get labels from api
      try {
        const res = await getReq(this, "/api/demands/owned");
        this.Labels = res;
      } catch (err) {
        this.snackbar = !this.snackbar;
      }
    },
    async search() {
      // get similar user with selectedlable from api
      this.e1 = 2;
      try {
        const res = await postReq(this, "/api/demands/search", {
          topic: this.selectedlabel.topic.id,
          hours_per_week: this.selectedlabel.hours_per_week,
          weeks: this.selectedlabel.weeks
        });
        this.similarUsers = res;
      } catch (err) {
        this.snackbar = !this.snackbar;
      }
    },
    async sendrequest(x) {
      // send the request to api to similarUsers[x]
      const group = this.similarUsers[x].id;
      try {
        const res = await postReq(this, "api/join", {
          specified_group: group
        });
        this.similarUsers.splice(x, 1);
      } catch (err) {
        this.snackbar = !this.snackbar;
      }
    },
    goBack() {
      // return to dashboard
      this.$router.push({ name: "dashboard" });
    }
  }
};
</script>
