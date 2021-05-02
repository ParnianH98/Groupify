<template>
  <div>
    <v-row>
      <v-col lg="2" mt="20" md="20" sm="12">
        <v-card max-width="500" min-width="300">
          <v-list two-line>
            <v-list-item-group
              v-model="selected"
              active-class="pink--text"
              multiple
            >
              <template v-for="(item, index) in items">
                <v-list-item :key="item.title">
                  <template v-slot:default="{ active }">
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="item.title"
                      ></v-list-item-title>

                      <v-list-item-subtitle
                        class="text--primary"
                        v-text="item.headline"
                      ></v-list-item-subtitle>

                      <v-list-item-subtitle
                        v-text="item.subtitle"
                      ></v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-list-item-action-text
                        v-text="item.action"
                      ></v-list-item-action-text>

                      <v-icon v-if="!active" color="grey lighten-1">
                        mdi-star-outline
                      </v-icon>

                      <v-icon v-else color="yellow darken-3">
                        mdi-star
                      </v-icon>
                    </v-list-item-action>
                  </template>
                </v-list-item>

                <v-divider
                  v-if="index < items.length - 1"
                  :key="index"
                ></v-divider>
              </template>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col lg="55" md="10" sm="12">
        <v-row class="mt-2" align="center" justify="space-around">
          <v-btn color="purple" @click="clickHandler('profile')">
            پروفایل
          </v-btn>
          <v-btn
            color="light-blue accent-3"
            @click="clickHandler('makerequest')"
          >
            ارسال درخواست
          </v-btn>
          <v-btn color="green accent-3" @click="clickHandler('requestbox')">
            درخواست‌های دریافتی
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  methods: {
    clickHandler(newrout) {
      this.$router.push({ name: newrout });
    },
    loadPage() {}
  },
  data: () => ({
    selected: [2],
    items: [
      {
        action: "15 دقیقه",
        headline: "شیمی دهم اسید و باز",
        title: "اسم گروه ما اینه!"
      },
      {
        action: "2 ساعت",
        headline: "فیزیک یازدهم نوسان حل مسائل الگو",
        title: "ما فیزیک‌دانیم :D"
      }
    ]
  })
};
</script>
