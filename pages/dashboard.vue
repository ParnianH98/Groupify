<template>
  <v-row justify="space-around">
    <v-menu
      v-for="([text, rounded], index) in btns"
      :key="text"
      :rounded="rounded"
      offset-y
    >
      <template v-slot:activator="{ on: { click } }">
        <v-btn
          @click="clickHandler"
          :color="colors[index]"
          class="white--text ma-5"
          v-on="on"
        >
          {{ text }}
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="item in items" :key="item" link>
          <v-list-item-title v-text="item"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-row>
</template>

<script>
export default {
  methods: {
    clickHandler() {
      if (this.radios2 === "service") {
        this.$router.push({ name: "dashboard" });
      } else {
        this.e1 = 4;
      }
    }
  },
  data: () => ({
    btns: [
      ["منتور", "b-xl"],
      ["ارسال درخواست", "b-xl"],
      ["لیست درخواست‌ها", "lg"],
      ["پروفایل", "0"]
    ],
    colors: ["light-green", "light-blue", "teal", "purple"],
    fonts: ["B Nazanin"],
    items: [...Array(4)].map((_, i) => `Item ${i}`)
  })
};
</script>
