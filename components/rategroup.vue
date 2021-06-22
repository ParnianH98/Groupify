<template>
  <v-card class="elevation-16 mx-auto" max-width="400" color="indigo lighten-4">
    <v-card-title class="text-h5">
      امتیازدهی
    </v-card-title>
    <v-card-text>
      گروه شما پایان یافته است. به هم‌تیمی(های) خود امتیاز دهید!

      <div class="text-right mt-12">
        <v-col>
          <template>
            <v-text-field
              :disabled="!this.isOwner"
              label="تعداد هفته‌های فعالیت:"
              outlined
              dense
              required
              v-model="duration"
            ></v-text-field>
          </template>
          <template>نام هم‌تیمی: {{ partnerN() }} </template>
        </v-col>
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
      <v-btn color="primary" :disabled="duration === 0" text @click="enter">
        ثبت امتیاز
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { getReq, postReq } from "~/utils/services";

export default {
  async mounted() {
    await this.findPartner();
  },
  methods: {
    async enter() {
      try {
        const res = await postReq(this, `api/rating/${this.groupeNumber}/`, {
          rate: 2 * this.rating,
          duration: this.duration,
          rated_user: this.partnerN(),
          rating_user: this.username
        });
        if (this.isOwner === false) {
          this.rated = true;
          this.$emit("update", this.rated);
        }
        console.log(this.rating);
      } catch (err) {
        console.log(err);
      }
    },
    partnerN() {
      var i;
      for (i = 0; i < this.partnerName.length; i++) {
        if (this.partnerName[i].username !== this.username) {
          return String(this.partnerName[i].username);
        }
      }
    },

    async findPartner() {
      try {
        const res = await getReq(
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
  props: { groupeNumber: Number, username: String, isOwner: Boolean },

  data: () => ({
    rating: 0,
    partnerName: [],
    duration: 0,
    rated: false
  })
};
</script>
