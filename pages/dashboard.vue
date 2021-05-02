<template>
  <div>
    <v-row class="mt-2" align="center" justify="space-around">
      <v-btn color="purple" @click="clickHandler('profile')">
        پروفایل
      </v-btn>
      <v-btn color="light-blue accent-3" @click="clickHandler('inspire')">
        ارسال درخواست
      </v-btn>
      <v-btn color="green accent-3" @click="clickHandler('requestbox')">
        درخواست‌های دریافتی
      </v-btn>
    </v-row>

    <v-card class="mt-300" max-width="500">
      <v-list two-line>
        <v-list-item-group
          v-model="selected"
          active-class="pink--text"
          multiple
        >
          <template v-for="(item, index) in items">
            <v-list-item :key="item.title">
              <template #default="{ active }">
                <v-list-item-content>
                  <v-list-item-title v-text="item.title" />

                  <v-list-item-subtitle
                    class="text--primary"
                    v-text="item.headline"
                  />

                  <v-list-item-subtitle v-text="item.subtitle" />
                </v-list-item-content>

                <v-list-item-action>
                  <v-list-item-action-text v-text="item.action" />

                  <v-icon v-if="!active" color="grey lighten-1">
                    mdi-star-outline
                  </v-icon>

                  <v-icon v-else color="yellow darken-3">
                    mdi-star
                  </v-icon>
                </v-list-item-action>
              </template>
            </v-list-item>

            <v-divider v-if="index < items.length - 1" :key="index" />
          </template>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    selected: [2],
    items: [
      {
        action: "15 min",
        headline: "Brunch this weekend?",
        subtitle:
          "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
        title: "Ali Connors"
      },
      {
        action: "2 hr",
        headline: "Summer BBQ",
        subtitle: "Wish I could come, but I'm out of town this weekend.",
        title: "me, Scrott, Jennifer"
      },
      {
        action: "6 hr",
        headline: "Oui oui",
        subtitle: "Do you have Paris recommendations? Have you ever been?",
        title: "Sandra Adams"
      },
      {
        action: "12 hr",
        headline: "Birthday gift",
        subtitle:
          "Have any ideas about what we should get Heidi for her birthday?",
        title: "Trevor Hansen"
      },
      {
        action: "18hr",
        headline: "Recipe to try",
        subtitle:
          "We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
        title: "Britta Holt"
      }
    ]
  }),
  methods: {
    clickHandler(newrout) {
      this.$router.push({ name: newrout });
    }
  }
};
</script>
