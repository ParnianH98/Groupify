<template>
    <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step
        :complete="e1 > 1"
        step="1"
      >
        Choose Lable:
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="e1 > 2"
        step="2"
      >
        Search Result:
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-container fluid>
          <p>{{ selectedlable || "null" }}</p>
            <v-radio-group v-model="selectedlable" mandatory>
              <v-radio v-for="(item, index) in Lables" :key="index" :label="String(item)" :value="item"></v-radio>
            </v-radio-group>
        </v-container>

        <v-btn
          color="primary"
          @click="search"
        >
          Search
        </v-btn>

        <v-btn
        text
        @click="goBack">
          Cancel
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-container fluid>
          
        </v-container>

        <v-btn
          color="primary"
          @click="goBack"
        >
          Continue
        </v-btn>

        <v-btn
        text
        @click="goBack">
          Cancel
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
export default {
    name: 'makerequest',

    beforeCreate() {
    getLables()
    },

    data() {
        return {
            e1: 1,
            selectedlable: null,
            Lables:[],
            similarUsers:[],
        }
    },

    methods: {
      getLables () {
        //get lables from api
      },
      search(){
        //get similar user from api
      },
      sendrequest(){
        //send the request to api
      },
      goBack(){
        //return to dashboard
      },
    }
}
</script>