<template>
  <v-container>
    <v-container>
      <form>
        <v-card-title class="Black--text pl-12 pt-12">
          <div class="display-1 pl-12 pt-12">
            Sign Up Form
          </div>
        </v-card-title>
        <v-text-field
          v-model="UserName"
          :counter="10"
          label="User Name"
          required
          @input="$v.UserName.$touch()"
          @blur="$v.UserName.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="FirstName"
          label="First Name"
          required
          @input="$v.FirstName.$touch()"
          @blur="$v.FirstName.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="LastName"
          label="Last Name"
          required
          @input="$v.LastName.$touch()"
          @blur="$v.LastName.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="email"
          label="E-mail"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        ></v-text-field>

        <v-btn class="mr-4" @click="submit">
          submit
        </v-btn>
        <v-btn @click="clear">
          clear
        </v-btn>
      </form>
    </v-container>

    <v-spacer></v-spacer>

    <v-container>
      <div>
        Already a member?
        <v-btn small>
          Log in
        </v-btn>
      </div>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    UserName: "",
    FirstName: "",
    LastName: "",
    email: ""
  }),

  computed: {},

  methods: {
    submit() {
      this.$v.$touch();
    },
    clear() {
      this.$v.$reset();
      this.UserName = "";
      this.FirstName = "";
      this.LastName = "";
      this.email = "";
    }
  }
};
</script>
