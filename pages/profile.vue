<template>
  <div>
    <v-row>
      <v-col>
        <v-card max-width="560" class="mx-auto">
          <v-row class="fill-height">
            <v-card-title class="Black--text pl-12 pt-12">
              <v-tooltip v-if="!isEditingProf" top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    class="mr-4"
                    v-bind="attrs"
                    v-on="on"
                    @click="startProfEdit"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>
                
                <span>ویرایش پروفایل</span>
              </v-tooltip>
              <v-tooltip v-else top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn 
                  icon 
                  class="mr-4"
                  v-bind="attrs"
                  v-on="on" 
                  @click="closeProfEdit">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </template>

                <span>خروج از ویرایش پروفایل</span>
              </v-tooltip>

              <v-spacer />

              <div>
                اطلاعات شخصی
              </div>
            </v-card-title>
          </v-row>

          <v-list two-line>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="indigo">
                  mdi-account
                </v-icon>
              </v-list-item-icon>

              <v-list-item-content v-if="!this.isEditingProf">
                <v-list-item-title>{{ UserName }}</v-list-item-title>
                <v-list-item-subtitle>نام کاربری</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-content v-if="!this.isEditingProf">
                <v-list-item-title>{{ rate }}</v-list-item-title>
                <v-list-item-subtitle>امتیاز</v-list-item-subtitle>
              </v-list-item-content>

              <v-text-field
                v-else
                v-model="UserName"
                label="نام کاربری"
                disabled
              />
            </v-list-item>

            <v-list-item>
              <v-list-item-action />

              <v-list-item-content v-if="!this.isEditingProf">
                <v-list-item-title>{{ FirstName }}</v-list-item-title>
                <v-list-item-subtitle>نام</v-list-item-subtitle>
              </v-list-item-content>

              <v-text-field
                v-else
                v-model="firstName"
                :error-messages="FirstNameErrors"
                label="نام"
                required
                @input="$v.firstName.$touch()"
                @blur="$v.firstName.$touch()"
              />
            </v-list-item>

            <v-list-item>
              <v-list-item-action />

              <v-list-item-content v-if="!this.isEditingProf">
                <v-list-item-title>{{ LastName }}</v-list-item-title>
                <v-list-item-subtitle>نام خانوادگی</v-list-item-subtitle>
              </v-list-item-content>

              <v-text-field
                v-else
                v-model="lastName"
                :error-messages="LastNameErrors"
                label="نام خانوادگی"
                required
                @input="$v.lastName.$touch()"
                @blur="$v.lastName.$touch()"
              />
            </v-list-item>

            <v-divider inset />

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="indigo">
                  mdi-email
                </v-icon>
              </v-list-item-icon>

              <v-list-item-content v-if="!this.isEditingProf">
                <v-list-item-title>{{ Email }}</v-list-item-title>
                <v-list-item-subtitle>آدرس ایمیل</v-list-item-subtitle>
              </v-list-item-content>

              <v-text-field
                v-else
                v-model="email"
                :error-messages="emailErrors"
                label="آدرس ایمیل"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
              />
            </v-list-item>

            <v-divider v-if="this.isEditingProf" inset />

            <v-list-item v-if="showSaveBtn">
              <v-btn :disabled="this.$v.$anyError" class="mr-4" @click="SaveProf">
                ذخیره
              </v-btn>
            </v-list-item>
            <v-list-item v-if="!this.isEditingProf">
              <v-btn class="mr-4" @click="logOut">
                خروج
              </v-btn>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col>
        <v-card max-width="560" class="mx-auto">
          <v-row class="fill-height">
            <v-card-title class="Black--text pl-12 pt-12">
              <div>
                لیست لیبل ها
              </div>
            </v-card-title>
          </v-row>

          <v-list max-width="490">
            <v-list-item v-for="(item, index) in Labels" :key="index">
              <v-chip-group>
                <v-chip class="ma-2" color="indigo">
                  نام درس:
                  {{ item.topic.name }}
                </v-chip>
                <v-chip v-if="item.slug !== 'None'" class="ma-2">
                  توضیحات نام درس:
                  {{ item.slug }}
                </v-chip>
                <v-chip v-if="item.show" class="ma-2">
                  ساعت در هفته:
                  {{ item.hours_per_week }}
                </v-chip>
                <v-chip v-if="item.show" class="ma-2">
                  هفته:
                  {{ item.weeks }}
                </v-chip>
                <v-chip class="ma-2" v-if="item.show">
                  توضیحات بیشتر:
                  {{ item.description }}
                </v-chip>
              </v-chip-group>
              <v-spacer></v-spacer>
              <v-tooltip v-if="!item.show" top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn 
                    icon 
                    class="mr-4"
                    v-bind="attrs"
                    v-on="on" 
                    @click="showlabe(index)">
                      <v-icon>mdi-eye</v-icon>
                  </v-btn>
                </template>

                <span>نمایش اطلاعات لیبل</span>
              </v-tooltip>
              <v-tooltip v-else top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn 
                    icon 
                    class="mr-4"
                    v-bind="attrs"
                    v-on="on" 
                    @click="showlabe(index)">
                      <v-icon>mdi-eye-off</v-icon>
                  </v-btn>
                </template>

                <span>حذف نمایش اطلاعات لیبل</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn 
                    icon 
                    color="red"
                    v-bind="attrs"
                    v-on="on" 
                    @click="deletelabel(index)">
                      <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>

                <span>حذف لیبل</span>
              </v-tooltip>
            </v-list-item>
            <v-list-item>
              <v-btn class="mr-4" @click="AddNewLabel">
                افزودن لیبل جدید
              </v-btn>
              <v-btn color="primary" @click="goBack">
                بازگشت به داشبورد
              </v-btn>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import { getReq, delReq, putReq } from "~/utils/services";

export default {
  name: "Profile",

  mixins: [validationMixin],

  validations: {
    firstName: { required },
    lastName: { required },
    email: { required, email }
  },

  async mounted() {
    await this.getInfo()
    var i;
    for (i = 0; i < this.Labels.length; i++) {
      this.Labels[i].show = false;
    }
  },

  head() {
    return {
      title: "Profile"
    };
  },

  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      rate: 0,
      userid: 0,
      UserName: "",
      FirstName: "",
      LastName: "",
      Email: "",
      Labels: [],
      isEditingProf: false,
      snackbar: false,
      text: `retrieve error!`
    };
  },

  computed: {
    FirstNameErrors() {
      const errors = [];
      if (!this.$v.firstName.$dirty) {
        return errors;
      }
      !this.$v.firstName.required && errors.push("نام لازم است.");
      return errors;
    },
    LastNameErrors() {
      const errors = [];
      if (!this.$v.lastName.$dirty) {
        return errors;
      }
      !this.$v.lastName.required && errors.push("نام خانوادگی لازم است.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) {
        return errors;
      }
      !this.$v.email.email && errors.push("ایمیل باید معتبر باشد.");
      !this.$v.email.required && errors.push("ایمیل لازم است.");
      return errors;
    },
    showSaveBtn() {
      if (!this.isEditingProf) {
        return false;
      }
      if (this.$v.firstName.$dirty) {
        return true;
      }
      if (this.$v.lastName.$dirty) {
        return true;
      }
      if (this.$v.email.$dirty) {
        return true;
      }
      return false;
    }
  },

  methods: {
    async getInfo() {
      // get labels and user info from api
      try {
        const res = await getReq(this, "api/user/topics/");
        const data = res[0]
        this.rate = data.avgRate;
        this.userid = data.id;
        this.FirstName = data.first_name;
        this.LastName = data.last_name;
        this.UserName = data.username;
        this.Email = data.email;
        const res2 = await getReq(this, "/api/demands/owned");
        this.Labels = res2;
        var i;
        for (i = 0; i < this.Labels.length; i++) {
          this.Labels[i].show = false;
        }
      } catch (err) {
        this.snackbar = !this.snackbar;
      }
    },
    AddNewLabel() {
      this.$router.push({ name: "form" });
    },
    async SaveProf() {
      try{
        await putReq(this, `api/update_profile/${this.userid}/`,{
          username: this.UserName,
          email: this.email,
          first_name: this.firstName,
          last_name: this.lastName
        });
        this.FirstName = this.firstName;
        this.LastName = this.lastName;
        this.Email = this.email;
      }catch(er){
        this.snackbar = !this.snackbar;
      }
      this.closeProfEdit();
    },
    startProfEdit() {
      this.isEditingProf = true;
      this.firstName = this.FirstName;
      this.lastName = this.LastName;
      this.email = this.Email;
    },
    closeProfEdit() {
      this.$v.$reset();
      this.isEditingProf = false;
      this.firstName = "";
      this.lastName = "";
      this.email = "";
    },
    async deletelabel(x) {
      //delete request
      var lab = this.Labels[x];
      try{
        await delReq(this, `api/delete/${lab.id}`);
        this.Labels.splice(x, 1);
      } catch (er){
        this.snackbar = !this.snackbar;
      }
    },
    showlabe(x) {
      var lab = this.Labels[x];
      lab.show = !lab.show;
      this.Labels.splice(x, 1, lab);
    },
    logOut() {
      localStorage.setItem("loggedin", false);
      this.$axios.setHeader("Authorization");
      localStorage.removeItem("refresh");
      localStorage.removeItem("access");
      localStorage.removeItem("refreshT");
      localStorage.removeItem("accessT");
      this.$router.push({ name: "login" });
    },
    goBack() {
      // return to dashboard
      this.$router.push({ name: "dashboard" });
    }
  }
};
</script>
