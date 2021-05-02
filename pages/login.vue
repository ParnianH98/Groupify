<template>
  <v-container>
    <v-container>
      <form> 
        <v-card-title class="Black--text pl-12 pt-12">
            <div class="display-1 pl-12 pt-12 rlt">
            نام کاربری و رمز ورود را وارد کنید
            </div>
        </v-card-title>
        <v-text-field
        v-model="UserName"
        label="نام کاربری"
        required
        ></v-text-field>
        <v-text-field
        v-model="Password"
        :type="'password'"
        label="رمز ورود"
        required
        ></v-text-field>

        <v-btn
          class="mr-4"
          @click="submit"
          >
            ورود
        </v-btn>
      </form>
    </v-container>

    <v-spacer></v-spacer>

    <v-container>
        <div>
            عضو نیستید؟
            <v-btn small
            @click="goToSignUp">
            ثبت نام
            </v-btn> 
        </div>
    </v-container>
  </v-container>
    
</template>

<script>
import { postReq, refreshToken } from "~/utils/services"

export default {
  head(){
    return{
      title: 'Login'
    }
  },
  
  name: 'login',

  data: () => ({
    UserName: '',
    Password: '',
    text:[]
    }),

  methods: {
    async submit () {
      let res = await postReq(this,'api/token/',
        {
        username: this.UserName,
        password: this.Password,
        }
      ) 
      console.log(res)
      this.$axios.setToken(res.data.access_token, 'Bearer')
      localStorage.setItem('accesss', true)
      localStorage.setItem('refresh', res.data.refresh_token)
      refreshToken(this)
      this.$router.push({name:'dashboard'})
      },
    goToSignUp () {
      this.$router.push({name:'signup'});
    }
  },
}
</script>