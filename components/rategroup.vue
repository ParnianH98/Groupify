<template>
  <v-card class="elevation-16 mx-auto" width="300">
    <v-card-title class="text-h5">
      Rate Our Framework
    </v-card-title>
    <v-card-text>
      گروه شما پایان یافته است. به هم‌تیمی خود امتیاز دهید!

      <div class="text-center mt-12">
        <v-rating
          v-model="rating"
          color="yellow darken-3"
          background-color="grey darken-1"
          empty-icon="$ratingFull"
          half-increments
          hover
          large
        ></v-rating>
      </div>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="justify-space-between">
      <v-btn color="primary" text>
        Rate Now
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "RateGroup",
  props: { groupeNumber: Number },

  data: () => ({
    rating: 4.5
  })
};
</script>
