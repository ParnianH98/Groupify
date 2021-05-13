<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">
        انتخاب لیبیل
      </v-stepper-step>

      <v-divider />

      <v-stepper-step step="2">
        نتایج جستوجو
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-container fluid>
          <p>{{ String(selectedlabel.topic.name)+'| ساعت در هفته:'+String(selectedlabel.hours_per_week)+'| هفته:'+String(selectedlabel.weeks) || "شما هنوز لیبلی ندارید" }}</p>
          <v-radio-group v-model="selectedlabel" mandatory>
            <v-radio v-for="(item, index) in Labels" :key="index" :label="String(item.topic.name)" :value="item" />
          </v-radio-group>
        </v-container>

        <v-btn
          v-if="selectedlabel !== null"
          color="primary"
          @click="search"
        >
          جستوجو
        </v-btn>

        <v-btn
          text
          @click="goBack"
        >
          لغو کردن
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-container fluid>
          <v-list>
            <v-list-item v-for="(item, index) in similarUsers" :key="index">
              <v-list-item-content>
                {{ ShowSearchItem(item) }}
                <v-btn @click="sendrequest(index)">
                  ارسال درخواست
                </v-btn>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-container>

        <v-btn
          color="primary"
          @click="goBack"
        >
          بازگشت به داشبورد
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import { postReq, getReq } from '~/utils/services'

export default {
  name: 'Makerequest',

  async Create () {
    await this.getLabels()
  },

  data () {
    return {
      e1: 1,
      selectedlabel: null,
      Labels: [],
      similarUsers: []
    }
  },

  methods: {
    async getLabels () {
      // get labels from api
      try{
        const res = await getReq(this, '/api/demands/owned')
        this.Labels = res.response.data
      } catch (err) {
        console.log(err)
      }
    },
    async search () {
      // get similar user with selectedlable from api
      this.e1 = 2
      try{
        const res = await postReq(this, '/api/demands/search',
        {
          topic: this.selectedlabel.topic.id,
          hours_per_week: this.selectedlabel.hours_per_week,
          weeks: this.selectedlabel.weeks
        })
        this.similarUsers = res.response.data
      } catch (err) {
        console.log(err)
      }
    },
    showSearchItem( item ){
      const str = 'کاربر:' + String(item.owner.username) 
      str = str + '| نام درس:' + String(item.topic.name) + '| ساعت در هفته:' +String(item.hours_per_week) + '| هفته:' +String(item.weeks)
      str = str +'| توضیحات بیشتر:' + String(item.slug) + '| توضیحات بیشتر:' + String(item.description)
      return str
    },
    async sendrequest (x) {
      // send the request to api to similarUsers[x]
      const group = this.similarUsers[x].id
      try{
        const res = await postReq(this, '/api/join',
        {
          group: group 
        })
        console.log(res)
        this.similarUsers.splice(x, 1)
      } catch (err) {
        console.log(err)
      }      
    },
    goBack () {
      // return to dashboard
      this.$router.push({ name: 'dashboard' })
    }
  }
}
</script>
