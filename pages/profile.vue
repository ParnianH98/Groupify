<template>
  <v-row>
    <v-col>
      <v-card max-width="560" class="mx-auto">
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

            <v-btn v-else icon class="mr-4" @click="closeProfEdit">
              <v-icon>mdi-close</v-icon>
            </v-btn>

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

        <v-list>
          <v-list-item v-for="(item, index) in Labels" :key="index">
            <v-chip-group>
              <v-chip class="ma-2" color="indigo">
                نام درس:
                {{ item.topic.name }}
              </v-chip>
              <v-chip v-if="item.show" class="ma-2">
                ساعت در هفته:
                {{ item.hours_per_week }}
              </v-chip>
              <v-chip v-if="item.show" class="ma-2">
                هفته:
                {{ item.weeks }}
              </v-chip>
              <v-chip v-if="item.show" class="ma-2">
                توضیحات:
                {{ item.slug }}
              </v-chip>
              <v-chip class="ma-2" v-if="item.show">
                توضیحات بیشتر:
                {{ item.description }}
              </v-chip>
            </v-chip-group>
            <v-spacer></v-spacer>
            <v-btn v-if="!item.show" icon class="mr-4" @click="showlabe(index)">
              <v-icon>mdi-eye</v-icon>
            </v-btn>
            <v-btn v-else icon class="mr-4" @click="showlabe(index)">
              <v-icon>mdi-eye-off</v-icon>
            </v-btn>
            <v-btn icon class="mr-4" @click="deletelabel(index)">
              <v-icon>mdi-close</v-icon>
            </v-btn>
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
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import { getReq } from "~/utils/services";

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
    /*this.Labels = [
      {
        id: 1,
        owner: {
          id: 1,
          username: "mohi"
        },
        active: false,
        created_at: "2021-05-02T14:18:50.864946Z",
        hours_per_week: 4,
        topic: {
          id: 9,
          name: "Compiler"
        },
        weeks: 7,
        slug: "studying compiler for this semester",
        description: "fridays and saturdays at faculty lobbby"
      },
      {
        id: 2,
        owner: {
          id: 1,
          username: "mohi"
        },
        active: false,
        created_at: "2021-05-02T14:18:50.864946Z",
        hours_per_week: 6,
        topic: {
          id: 12,
          name: "Network"
        },
        weeks: 4,
        slug: "studying for this semester",
        description: "saturdays at faculty lobbby"
      }
    ];*/
    var i;
    for (i = 0; i < this.Labels.length; i++) {
      this.Labels[i].show = false;
    }
  },

  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      UserName: "p.hatami98",
      FirstName: "پرنیان",
      LastName: "حاتمی",
      Email: "p.hatami98@gmail.com",
      Labels: [],
      isEditingProf: false
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
      // get labels from api
      try {
        const res = await getReq(this, "/api/user/topics/");
        console.log(res)
        this.Labels = []
        var i;
        for (i = 0; i < this.Labels.length; i++) {
          this.Labels[i].show = false;
        }
      } catch (err) {
        console.log(err);
      }
    },
    AddNewLabel() {
      this.$router.push({ name: "form" });
      console.log(this.Labels);
    },
    SaveProf() {
      this.FirstName = this.firstName;
      this.LastName = this.lastName;
      this.Email = this.email;
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
    deletelabel(x) {
      //delete request
      this.Labels.splice(x, 1);
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
