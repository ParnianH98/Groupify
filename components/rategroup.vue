<template>
  <v-card class="elevation-16 mx-auto" max-width="400" color="indigo lighten-4">
    <v-card-title class="text-h5">
      امتیازدهی
    </v-card-title>
    <v-card-text>
      گروه شما پایان یافته است. به هم‌تیمی(های) خود امتیاز دهید!
      <!-- <v-list-item v-for="(i, index) in partnerName">
        <template v-if="i.">

        </template>
      </v-list-item> -->
      <div class="text-center mt-12">
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
      <v-btn color="primary" text>
        ثبت امتیاز
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  async mounted() {
    try {
      const res = await getReq(this, `api/groups/members/${this.groupeNumber}`);
      this.partnerName = res;
      console.log(this.partnerName);
    } catch (err) {
      console.log("er");
    }
  },
  name: "RateGroup",
  props: { groupeNumber: Number },

  data: () => ({
    rating: 0,
    partnerName: []
  })
};
</script>
