<template>
  <v-container>
    <v-container>
      <form>
        <v-card-title class="Black--text pl-12 pt-12">
          <div>
            نام کاربری و رمز ورود را وارد کنید
          </div>
        </v-card-title>
        <div v-if="this.isLoading">
            <v-progress-linear
              indeterminate
              color="blue"
              ></v-progress-linear>
        </div>
        <v-text-field
          v-model="UserName"
          :disabled="isLoading"
          label="نام کاربری"
          required
        />
        <v-text-field
          v-model="Password"
          :disabled="isLoading"
          :type="'password'"
          label="رمز ورود"
          required
        />

        <v-btn
          :disabled="beDisable"
          class="mr-4"
          @click="submit"
        >
          ورود
        </v-btn>
      </form>
    </v-container>

    <v-spacer />

    <v-container>
      <div>
        عضو نیستید؟
        <v-btn
          small
          @click="goToSignUp"
        >
          ثبت نام
        </v-btn>
      </div>
    </v-container>

    <v-snackbar v-model="snackbar">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { postReq } from '~/utils/services'

export default {

  name: 'Login',

  data: () => ({
    snackbar: false,
    text: `retrieve error!`,
    UserName: '',
    Password: '',
    isLoading: false
  }),

  head () {
    return {
      title: 'Login'
    }
  },

  beforeCreate () {
    localStorage.setItem('loggedin', false)
  },

  computed:{
    beDisable(){
      if(this.isLoading) return true
      return (this.UserName === '') || (this.Password === '')
    }
  },

  methods: {
    async submit () {
      this.isLoading = !this.isLoading;
      try{
        const res = await postReq(this, 'api/token/',
          {
            username: this.UserName,
            password: this.Password
          }
        );
        const timeNow = Date.now();
        this.isLoading = !this.isLoading;
        this.$axios.setToken(res.access, 'Bearer');
        localStorage.setItem('loggedin', true);
        localStorage.setItem('access',res.access);
        localStorage.setItem('accessT', timeNow);
        localStorage.setItem('refresh', res.refresh);
        localStorage.setItem('refreshT', timeNow);
        this.$router.push({ name: 'dashboard' });
      } catch (err){
        this.snackbar = !this.snackbar;
        this.isLoading = !this.isLoading;
      }
    },
    goToSignUp () {
      this.$router.push({ name: 'signup' });
    }
  }
}
</script>
