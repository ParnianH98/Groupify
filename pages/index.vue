<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title>
          خوش آمدید
        </v-card-title>
        <v-card-text>
          <p>
            در این سایت می توانبد یک همراه برای درس خواندن پیدا کنید
            برای عضو شدن روی دکمه ثبت نام کلیک کنید
            و در صورتی که عضو هستید ورود را انتخاب کنید.
          </p> 
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" nuxt to="/login">
            ورود
          </v-btn>
          <v-spacer />
          <v-btn color="primary" nuxt to="/signup">
            ثبت نام
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {

};
</script>
