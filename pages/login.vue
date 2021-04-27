<template>
  <v-container>
    <v-container>
      <form> 
        <v-card-title class="Black--text pl-12 pt-12">
            <div class="display-1 pl-12 pt-12">
              Wellcome!
            </div>
        </v-card-title>
        <v-text-field
        v-model="UserName"
        label="User Name"
        required
        ></v-text-field>
        <v-text-field
        v-model="Password"
        :type="'password'"
        label="Password"
        required
        ></v-text-field>

        <v-btn
          class="mr-4"
          @click="submit"
          >
              Log in
        </v-btn>
      </form>
    </v-container>

    <v-spacer></v-spacer>

    <v-container>
        <div>
            New yo to our site?
            <v-btn small
            @click="goToSignUp">
            Sing Up
            </v-btn> 
        </div>
    </v-container>
  </v-container>
    
</template>

<script>
import { postReq } from "~/utils/services"

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
      localStorage.setItem('accesss', res.data.access_token)
      localStorage.setItem('refresh', res.data.refresh_token)
      },
    goToSignUp () {
      this.$router.push({name:'signup'});
    }
  },
}
</script>