<template>
  <v-card class="elevation-16 mx-auto" max-width="400" color="indigo lighten-4">
    <v-card-title class="text-h5">
      امتیازدهی
    </v-card-title>
    <v-card-text>
      گروه شما پایان یافته است. به هم‌تیمی(های) خود امتیاز دهید!
      <v-list-item v-for="(item, index) in partnerName" :key="item.id">
        <template v-if="item.username !== username">
          {{ item.username }}
        </template>
      </v-list-item>
      <div class="text-right mt-12">
        <v-btn dark color="teal lighten-3" @click="findPartner"
          >لیست هم‌تیمی(ها)
        </v-btn>
        <v-rating
          v-model="rating"
          color="yellow darken-3"
          empty-icon="$ratingFull"
          background-color="indigo lighten-5"
          half-increments
          hover
          large
        ></v-rating>
      </div>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="justify-space-between">
      <v-btn color="primary" text @click="enter">
        ثبت امتیاز
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { getReq, postReq } from "~/utils/services";

export default {
  async mounted() {},
  methods: {
    async enter() {
      try {
        const res = await postReq(this, "api/token/", {
          entered: 2 * this.rating
        });
        console.log(this.rating);
      } catch (err) {
        console.log(err);
      }
    },
    async findPartner() {
      try {
        const res = await postReq(
          this,
          `api/groups/members/${this.groupeNumber}`
        );
        this.partnerName = res;
      } catch (err) {
        console.log("er");
      }
    }
  },
  name: "RateGroup",
  props: { groupeNumber: Number, username: String },

  data: () => ({
    rating: 0,
    partnerName: []
  })
};
</script>
