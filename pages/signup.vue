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
                :error-messages="UserNameErrors"
                counter
                label="User Name"
                required
                @input="$v.UserName.$touch()"
                @blur="$v.UserName.$touch()"
                ></v-text-field>
                <v-text-field
                v-model="FirstName"
                :error-messages="FirstNameErrors"
                label="First Name"
                required
                @input="$v.FirstName.$touch()"
                @blur="$v.FirstName.$touch()"
                ></v-text-field>
                <v-text-field
                v-model="LastName"
                :error-messages="LastNameErrors"
                label="Last Name"
                required
                @input="$v.LastName.$touch()"
                @blur="$v.LastName.$touch()"
                ></v-text-field>
                <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                label="E-mail"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
                ></v-text-field>
                <v-text-field
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                :error-messages="passwordErrors"
                label="Password"
                hint="At least 8 characters"
                counter
                required
                @click:append="show1 = !show1"
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
                ></v-text-field>
                <v-text-field
                v-model="repeatPassword"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show2 ? 'text' : 'password'"
                :error-messages="repeatPasswordErrors"
                label="Repeat Password"
                required
                @click:append="show2 = !show2"
                @input="$v.repeatPassword.$touch()"
                @blur="$v.repeatPassword.$touch()"
                ></v-text-field>

                <v-btn
                :disabled="this.$v.$anyError || !this.$v.$dirty"
                class="mr-4"
                @click="submit"
                >
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
                <v-btn small
                @click="goToLogin">
                Log in
                </v-btn> 
            </div>
        </v-container>
    </v-container>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, email , minLength , sameAs } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],

    validations: {
      UserName: { required, minLength: minLength(3) },
      FirstName: { required },
      LastName: { required },
      email: { required, email },
      password: { required, minLength: minLength(8) },
      repeatPassword: { required, sameAsPassword: sameAs('password')},
    },

    data: () => ({
      UserName: '',
      FirstName: '',
      LastName: '',
      email: '',
      password: '',
      repeatPassword: '',
      show1: false,
      show2: false,
    }),

    computed: {
      UserNameErrors () {
        const errors = []
        if (!this.$v.UserName.$dirty) return errors
        !this.$v.UserName.minLength && errors.push('User Name must be at least 3 characters long')
        !this.$v.UserName.required && errors.push('User Name is required.')
        return errors
      },
      FirstNameErrors () {
        const errors = []
        if (!this.$v.FirstName.$dirty) return errors
        !this.$v.FirstName.required && errors.push('First Name is required.')
        return errors
      },
      LastNameErrors () {
        const errors = []
        if (!this.$v.LastName.$dirty) return errors
        !this.$v.LastName.required && errors.push('Last Name is required.')
        return errors
      },
      passwordErrors (){
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.required && errors.push('Password is required.')
        !this.$v.password.minLength && errors.push('Password must be at least 8 characters long.')
        return errors
      },
      repeatPasswordErrors (){
        const errors = []
        if (!this.$v.repeatPassword.$dirty) return errors
        !this.$v.repeatPassword.required && errors.push('Password must be repeated.')
        !this.$v.repeatPassword.sameAsPassword && errors.push('You must reapeat the same Password.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
    },

    methods: {
      submit () {
        this.$v.$touch()
      },
      clear () {
        this.$v.$reset()
        this.UserName = ''
        this.FirstName = ''
        this.LastName = ''
        this.email = ''
        this.password = ''
        this.repeatPassword = ''
      },
      goToLogin () {
        this.$router.push({name:'login'});
      }
    },
  }
</script>