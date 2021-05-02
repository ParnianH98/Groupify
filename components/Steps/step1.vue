<template>
  <div>
    <div class="text-center w-100 text--accent-4">
      <h4 class="text--secondary">
        مقطع مورد نظر خود را انتخاب کنید.
      </h4>
    </div>
    <div class="w-100 d-flex align-center justify-space-around">
      <v-btn
        x-large
        color="primary"
        class="ma-2 white--text"
        @click="handleClick('person')"
      >
        <v-icon left dark>
          بعدی
        </v-icon>
        حقیقی
      </v-btn>
      <v-btn
        x-large
        color="primary"
        class="ma-2 white--text"
        @click="handleClick('company')"
      >
        <v-icon left dark>
          mdi-office-building-outline
        </v-icon>
        حقوقی
      </v-btn>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleClick (userType) {
      this.$emit('update:type', userType)
      this.$emit('next')
    }
  }
}
</script>
