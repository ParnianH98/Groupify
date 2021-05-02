<template>
  <v-container>
    <v-container>
      <form>
        <v-card-title class="Black--text pl-12 pt-12">
          <div class="display-1 pl-12 pt-12">
            فرم ثبت نام
          </div>
        </v-card-title>
        <v-text-field
          v-model="UserName"
          :error-messages="UserNameErrors"
          counter
          label="نام کاربری"
          required
          @input="$v.UserName.$touch()"
          @blur="$v.UserName.$touch()"
        />
        <v-text-field
          v-model="FirstName"
          :error-messages="FirstNameErrors"
          label="نام"
          required
          @input="$v.FirstName.$touch()"
          @blur="$v.FirstName.$touch()"
        />
        <v-text-field
          v-model="LastName"
          :error-messages="LastNameErrors"
          label="نام خانوادگی"
          required
          @input="$v.LastName.$touch()"
          @blur="$v.LastName.$touch()"
        />
        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          label="آدرس ایمیل"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        />
        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          :error-messages="passwordErrors"
          label="رمز ورود"
          hint="حداقل 8 کاراکتر"
          counter
          required
          @click:append="show1 = !show1"
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
        />
        <v-text-field
          v-model="repeatPassword"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show2 ? 'text' : 'password'"
          :error-messages="repeatPasswordErrors"
          label="تکرار رمز ورود"
          required
          @click:append="show2 = !show2"
          @input="$v.repeatPassword.$touch()"
          @blur="$v.repeatPassword.$touch()"
        />

        <v-btn
          :disabled="this.$v.$anyError || !this.$v.$dirty"
          class="mr-4"
          @click="submit"
        >
          ثبت
        </v-btn>
        <v-btn @click="clear">
          پاک کردن
        </v-btn>
      </form>
    </v-container>

    <v-spacer />

    <v-container>
      <div>
        عضو هستید؟
        <v-btn
          small
          @click="goToLogin"
        >
          ورود
        </v-btn>
      </div>
    </v-container>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
import { postReq } from '~/utils/services'

export default {

  name: 'Signup',

  mixins: [validationMixin],
  head () {
    return {
      title: 'SignUp'
    }
  },

  validations: {
    UserName: { required, minLength: minLength(3) },
    FirstName: { required },
    LastName: { required },
    email: { required, email },
    password: { required, minLength: minLength(8) },
    repeatPassword: { required, sameAsPassword: sameAs('password') }
  },

  data: () => ({
    UserName: '',
    FirstName: '',
    LastName: '',
    email: '',
    password: '',
    repeatPassword: '',
    show1: false,
    show2: false
  }),

  computed: {
    UserNameErrors () {
      const errors = []
      if (!this.$v.UserName.$dirty) { return errors }
      !this.$v.UserName.minLength && errors.push('نام کاربری باید حداقل 3 کاراکتر داشنه باشد.')
      !this.$v.UserName.required && errors.push('نام کاربری لازم است.')
      return errors
    },
    FirstNameErrors () {
      const errors = []
      if (!this.$v.FirstName.$dirty) { return errors }
      !this.$v.FirstName.required && errors.push('نام لازم است.')
      return errors
    },
    LastNameErrors () {
      const errors = []
      if (!this.$v.LastName.$dirty) { return errors }
      !this.$v.LastName.required && errors.push('نام خانوادگی لازم است.')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) { return errors }
      !this.$v.password.required && errors.push('رمز لازم است.')
      !this.$v.password.minLength && errors.push('رمز باید حداقل 8 کاراکتر داشنه باشد.')
      return errors
    },
    repeatPasswordErrors () {
      const errors = []
      if (!this.$v.repeatPassword.$dirty) { return errors }
      !this.$v.repeatPassword.required && errors.push('رمز باید تکرار شود.')
      !this.$v.repeatPassword.sameAsPassword && errors.push('همان رمز دقیقا باید تکرار شود.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) { return errors }
      !this.$v.email.email && errors.push('ایمیل باید معتبر باشد.')
      !this.$v.email.required && errors.push('ایمیل لازم است.')
      return errors
    }
  },

  methods: {
    async submit () {
      this.$v.$touch()
      try {
        const res = await postReq(this, 'api/users/register',
          {
            username: this.UserName,
            password: this.password,
            email: this.email,
            firstname: this.FirstName,
            lastname: this.LastName
          }
        )
        console.log(res)
        this.$router.push({ name: 'login' })
      } catch (e) {
        console.log(e)
      }
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
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
