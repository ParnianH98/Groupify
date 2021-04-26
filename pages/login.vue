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
                   submit
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
import axios from '~/node_modules/axios';
export default {
  name: 'login',

  data: () => ({
    UserName: '',
    Password: '',
    }),

  methods: {
    async submit () {
      const config = {
      url: 'api/users/register',
      data:{
        username: this.UserName,
        password: this.Password,
      }
      }

      let res = await axios.post(config)

      console.log(res);
      },
    goToSignUp () {
      this.$router.push({name:'signup'});
    }
  },
}
</script>