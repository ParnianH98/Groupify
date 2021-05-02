<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">
        Choose Label:
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="2">
        Search Results:
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-container fluid>
          <p>{{ selectedlabel || "You don't have any Labels yet." }}</p>
            <v-radio-group v-model="selectedlabel" mandatory>
              <v-radio v-for="(item, index) in Labels" :key="index" :label="String(item)" :value="item"></v-radio>
            </v-radio-group>
        </v-container>

        <v-btn
          v-if="selectedlable !== null"
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
          <v-list>
            <v-list-item v-for="(item, index) in similarUsers" :key="index">
              <v-list-item-content>
                {{item}}
                <v-btn @click="sendrequest(index)">
                  Send request
                </v-btn>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-container>

        <v-btn
          color="primary"
          @click="goBack"
        >
          Go Back to Dashboard
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
export default {
  name: 'makerequest',

  Create() {
  this.getLabels()
  },

  data() {
      return {
          e1: 1,
          selectedlabel: null,
          Labels:[],
          similarUsers:[],
      }
  },

  methods: {
    getLabels () {
      //get labels from api
    },
    search(){
      //get similar user with selectedlabel from api
      this.e1 = 2
    },
    sendrequest(x){
      //send the request to api to similarUsers[x]
      this.similarUsers.splice(x, 1)
    },
    goBack(){
      //return to dashboard
      this.$router.push({name: 'dashboard'})
    },
  }
}
</script>