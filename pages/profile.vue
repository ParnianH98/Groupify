<template>
    <v-row>
        <v-col>
          <v-card
           max-width="560"
           class="mx-auto"
           >
            <v-row class="fill-height">
              <v-card-title class="Black--text pl-12 pt-12">
                  <v-btn
                    v-if="!isEditingProf"
                    icon
                    class="mr-4"
                    @click="startProfEdit"
                    >
                      <v-icon>mdi-pencil</v-icon>
                  </v-btn>

                  <v-btn
                    v-else
                    icon
                    class="mr-4"
                    @click="closeProfEdit"
                    >
                      <v-icon>mdi-close</v-icon>
                  </v-btn>

                    <v-spacer></v-spacer>

                  <div class="display-1 pl-12 pt-12">
                    Profile information
                  </div>
              </v-card-title>
            </v-row>

            <v-list two-line >
              <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="indigo">
                      mdi-account
                    </v-icon>
                  </v-list-item-icon>

                  <v-list-item-content v-if="!this.isEditingProf">
                    <v-list-item-title>{{ UserName }}</v-list-item-title>
                    <v-list-item-subtitle>User Name</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-text-field 
                    v-else
                    v-model="UserName"
                    label="User Name"
                    disabled
                  ></v-text-field>

                </v-list-item>

                <v-list-item>

                  <v-list-item-action></v-list-item-action>

                    <v-list-item-content v-if="!this.isEditingProf">
                      <v-list-item-title>{{ FirstName }}</v-list-item-title>
                      <v-list-item-subtitle>First Name</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-text-field
                      v-else
                      v-model="firstName"
                      :error-messages="FirstNameErrors"
                      label="First Name"
                      required
                      @input="$v.firstName.$touch()"
                      @blur="$v.firstName.$touch()"
                    ></v-text-field>

                </v-list-item>

                <v-list-item>

                  <v-list-item-action></v-list-item-action>

                    <v-list-item-content v-if="!this.isEditingProf">
                      <v-list-item-title>{{ LastName }}</v-list-item-title>
                      <v-list-item-subtitle>Last Name</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-text-field
                    v-else
                    v-model="lastName"
                    :error-messages="LastNameErrors"
                    label="Last Name"
                    required
                    @input="$v.lastName.$touch()"
                    @blur="$v.lastName.$touch()"
                    ></v-text-field>

                </v-list-item>

                <v-divider inset></v-divider>

                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="indigo">
                      mdi-email
                    </v-icon>
                  </v-list-item-icon>

                  <v-list-item-content v-if="!this.isEditingProf">
                    <v-list-item-title>{{ Email }}</v-list-item-title>
                    <v-list-item-subtitle>Email Adress</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-text-field
                    v-else
                    v-model="email"
                    :error-messages="emailErrors"
                    label="E-mail"
                    required
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                  ></v-text-field>

                </v-list-item>

                <v-divider v-if="this.isEditingProf" inset></v-divider>

                <v-list-item v-if="this.isEditingProf">
                  <v-list-item-content>
                    <v-list-item-title>Change Password</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item v-if="this.isEditingProf">
                  <v-list-item-action></v-list-item-action>

                  <v-text-field
                    v-model="password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    :error-messages="passwordErrors"
                    label="Password"
                    hint="At least 6 characters"
                    counter
                    @click:append="show1 = !show1"
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                  ></v-text-field>

                </v-list-item>
                <v-list-item v-if="this.isEditingProf">
                  <v-list-item-action></v-list-item-action>

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

                </v-list-item>
                <v-list-item v-if="showSaveBtn">
                  <v-btn
                      :disabled="this.$v.$anyError || (this.$v.password.$dirty && !this.$v.repeatPassword.required)"
                      class="mr-4"
                      @click="SaveProf"
                    >
                      Save
                    </v-btn>
                </v-list-item>
                <v-list-item v-if="!this.isEditingProf">
                  <v-btn
                  class="mr-4"
                  @click="logOut"
                  >
                    Log Out
                  </v-btn>
                </v-list-item>
              </v-list>
          </v-card>
        </v-col>
        <v-col>
            <v-card
             max-width="550"
            class="mx-auto"
            >
              <v-row class="fill-height">
                <v-card-title class="Black--text pl-12 pt-12">
                    <div class="display-1 pl-12 pt-12">
                      List of Lables
                    </div>
                </v-card-title>
              </v-row>
            
              <v-list>
                <v-list-item v-for="(lable, index) in Lables" :key="index">
                  <v-list-item-action v-if="index != 0"></v-list-item-action>
                  {{label}}
                </v-list-item>
                <v-list-item>
                  <v-btn
                      class="mr-4"
                      @click="AddNewLable"
                    >
                      Add New Label
                    </v-btn>
                </v-list-item>
              </v-list>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, email , minLength , sameAs } from 'vuelidate/lib/validators'

export default {
  name: 'profile',

  mixins: [validationMixin],

  validations: {
      firstName: { required },
      lastName: { required },
      email: { required, email },
      password: { minLength: minLength(8) },
      repeatPassword: { required, sameAsPassword: sameAs('password')},
    },

  beforeCreate() {
    //getLables()
  },
  
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      repeatPassword:'',
      UserName:'',
      FirstName:'',
      LastName:'',
      Email:'',
      Password:'',
      Lables:[],
      isEditingProf: false,
      show1: false,
      show2: false,
    };
  },

  computed: {
      FirstNameErrors () {
        const errors = []
        if (!this.$v.firstName.$dirty) return errors
        !this.$v.firstName.required && errors.push('First Name is required.')
        return errors
      },
      LastNameErrors () {
        const errors = []
        if (!this.$v.lastName.$dirty) return errors
        !this.$v.lastName.required && errors.push('Last Name is required.')
        return errors
      },
      passwordErrors (){
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.minLength && errors.push('Password must be at least 8 characters long.')
        this.$v.password.$dirty && !this.$v.repeatPassword.required && errors.push('Password must be repeated.')
        return errors
      },
      repeatPasswordErrors (){
        const errors = []
        if (!this.$v.repeatPassword.$dirty) return errors
        this.$v.password.$dirty && !this.$v.repeatPassword.required && errors.push('Password must be repeated.')
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
      showSaveBtn () {
        if (!this.isEditingProf) return false
        if (this.$v.password.$dirty) return true
        if (this.$v.firstName.$dirty) return true
        if (this.$v.lastName.$dirty) return true
        if (this.$v.email.$dirty) return true
        return false
      }
    },

    methods: {
      getLables () {
        //get lables from api
      },
      AddNewLable() {
        this.$router.push({name:'inspire'})
      },
      SaveProf () {
        this.FirstName = this.firstName
        this.LastName = this.lastName
        this.Email = this.email
        if (this.$v.password.$dirty) this.Password = this.password
        this.closeProfEdit()
      },
      startProfEdit () {
        this.isEditingProf = true
        this.firstName = this.FirstName
        this.lastName = this.LastName
        this.email = this.Email
        this.password = ''
        this.repeatPassword = ''
      },
      closeProfEdit () {
        this.$v.$reset()
        this.isEditingProf = false
        this.firstName = ''
        this.lastName = ''
        this.email = ''
        this.password = ''
        this.repeatPassword = ''
      },
      logOut(){
        localStorage.setItem('access', false)
        this.$axios.setHeader('Authorization')
        localStorage.removeItem('refresh')
        this.$router.push({name: 'login'})
      },
    },
};
</script>
