<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">
        دوره تحصیلی
      </v-stepper-step>

      <v-divider />

      <v-stepper-step :complete="e1 > 2" step="2">
        پایه/مقطع
      </v-stepper-step>

      <v-divider />

      <v-stepper-step :complete="e1 > 3" step="3">
        رشته تحصیلی
      </v-stepper-step>

      <v-divider />

      <v-stepper-step :complete="e1 > 4" step="4">
        درس
      </v-stepper-step>

      <v-divider />

      <v-stepper-step :complete="e1 > 5" step="5">
        اطلاعات بیشتر
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-container fluid>
          <p>در کدام دوره به دنبال هم‌گروهی می‌گردید؟</p>
          <v-radio-group v-model="radios" mandatory>
            <v-radio label="دانشگاه" value="university" />
            <v-radio label="دبیرستان" value="highschool" />
          </v-radio-group>
        </v-container>
        <v-btn color="primary" @click="e1 = 2">
          ادامه
        </v-btn>

        <v-btn text @click="goBack">
          انصراف
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-container fluid>
          <p v-if="radios === 'highschool'">
            در چه پایه‌ای؟
          </p>
          <p v-if="radios === 'university'">
            در چه مقطعی؟
          </p>
          <v-radio-group
            v-if="radios === 'university'"
            v-model="radios2"
            mandatory
          >
            <v-radio label="کارشناسی" value="bsc" />
            <v-radio label="کارشناسی ارشد" value="msc" />
          </v-radio-group>
          <v-radio-group v-else v-model="radios2" mandatory>
            <v-radio label="دهم" value="10" />
            <v-radio label="یازدهم" value="11" />
            <v-radio label="دوازدهم" value="12" />
          </v-radio-group>
        </v-container>

        <v-btn color="primary" @click="e1 = 3">
          ادامه
        </v-btn>

        <v-btn text @click="goBack">
          انصراف
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-container fluid>
          <p>رشته تحصیلی شما چیست؟</p>
          <v-radio-group v-if="radios2 === 'bsc'" v-model="radios3" mandatory>
            <v-radio label="مهندسی کامپیوتر" value="ce" />
            <v-radio label="علوم کامپیوتر" value="cs" />
            <v-radio label="مهندسی برق" value="ee" />
          </v-radio-group>
          <v-radio-group
            v-else-if="radios2 === 'msc'"
            v-model="radios3"
            mandatory
          >
            <v-radio label="هوش مصنوعی" value="ai" />
            <v-radio label="بیوانفورماتیک" value="bio" />
          </v-radio-group>
          <v-radio-group v-else v-model="radios3" mandatory>
            <v-radio label="رشته ریاضی" value="mathematics" />
            <v-radio label="ٍرشته تجربی" value="expscience" />
          </v-radio-group>
        </v-container>
        <v-btn color="primary" @click="e1 = 4">
          ادامه
        </v-btn>

        <v-btn text @click="goBack">
          انصراف
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="4">
        <v-container fluid>
          <p>درس</p>

          <v-radio-group v-if="radios3 === 'ee'" v-model="radios4" mandatory>
            <v-radio label="Network 1" value="21" />
            <v-radio label="Network 2" value="22" />
            <v-radio value="23">
              <template slot="label">
                <div>
                  Others
                  <v-textarea
                    v-if="radios4 === '23'"
                    label="درس مورد نظر:"
                    outlined
                    auto-grow
                    dense
                    rows="1"
                    row-height="10"
                    v-model="slug"
                  ></v-textarea>
                </div>
              </template>
            </v-radio>
          </v-radio-group>
          <v-radio-group
            v-else-if="radios3 === 'cs'"
            v-model="radios4"
            mandatory
          >
            <v-radio label="Theory of Computation" value="27" />
            <v-radio label="Computer Systems" value="28" />
            <v-radio value="33">
              <template slot="label">
                <div>
                  Others
                  <v-textarea
                    v-if="radios4 === '33'"
                    label="درس مورد نظر:"
                    outlined
                    auto-grow
                    dense
                    rows="1"
                    row-height="10"
                    v-model="slug"
                  ></v-textarea>
                </div>
              </template>
            </v-radio>
          </v-radio-group>
          <v-radio-group
            v-else-if="radios3 === 'ce'"
            v-model="radios4"
            mandatory
          >
            <v-radio label="Compiler" value="24" />
            <v-radio label="Artificial Intelligece" value="25" />
            <v-radio label="Machine Learning" value="26" />
            <v-radio value="32">
              <template slot="label">
                <div>
                  Others
                  <v-textarea
                    v-if="radios4 === '32'"
                    label="درس مورد نظر:"
                    outlined
                    auto-grow
                    dense
                    rows="1"
                    row-height="10"
                    v-model="slug"
                  ></v-textarea>
                </div>
              </template>
            </v-radio>
          </v-radio-group>
          <v-radio-group v-else-if="radios3 === 'ai'" v-model="radios4" m>
            <v-radio label="Fundamental of AI" value="29" />
            <v-radio label="Neural Network" value="30" />
            <v-radio value="31">
              <template slot="label">
                <div>
                  Others
                  <v-textarea
                    v-if="radios4 === '31'"
                    label="درس مورد نظر:"
                    outlined
                    auto-grow
                    dense
                    rows="1"
                    row-height="10"
                    v-model="slug"
                  ></v-textarea>
                </div>
              </template>
            </v-radio>
          </v-radio-group>
          <v-radio-group
            v-else-if="radios3 === 'bio'"
            v-model="radios4"
            mandatory
          >
            <v-radio label="ML in Bioinformatics" value="34" />
            <v-radio label="NN in Bioinformatics" value="35" />
            <v-radio value="36">
              <template slot="label">
                <div>
                  Others
                  <v-textarea
                    v-if="radios4 === '36'"
                    label="درس مورد نظر:"
                    outlined
                    auto-grow
                    dense
                    rows="1"
                    row-height="10"
                    v-model="slug"
                  ></v-textarea>
                </div>
              </template>
            </v-radio>
          </v-radio-group>
          <v-radio-group
            v-else-if="radios3 === 'expscience'"
            v-model="radios4"
            mandatory
          >
            <v-radio label="Biology" value="biology" />
            <v-radio label="Physics" value="Physics" />
            <v-radio value="otherses">
              <template slot="label">
                <div>
                  Others
                  <v-textarea
                    v-if="radios4 === 'otherses'"
                    label="درس مورد نظر:"
                    outlined
                    auto-grow
                    dense
                    rows="1"
                    row-height="10"
                    v-model="slug"
                  ></v-textarea>
                </div>
              </template>
            </v-radio>
          </v-radio-group>
          <v-radio-group
            v-else-if="radios3 === 'mathematics'"
            v-model="radios4"
            mandatory
          >
            <v-radio label="Geometry" value="geometry" />
            <v-radio label="Calculus" value="calculus" />
            <v-radio value="othersm">
              <template slot="label">
                <div>
                  Others
                  <v-textarea
                    v-if="radios4 === 'othersm'"
                    label="درس مورد نظر:"
                    outlined
                    auto-grow
                    dense
                    rows="1"
                    row-height="10"
                    v-model="slug"
                  ></v-textarea>
                </div>
              </template>
            </v-radio>
          </v-radio-group>
        </v-container>
        <v-btn color="primary" @click="e1 = 5">
          ادامه
        </v-btn>

        <v-btn text @click="goBack">
          انصراف
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="5">
        <v-container fluid>
          <p>لطفا اطلاعات زیر را وارد کنید.</p>
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="duration"
                    label="به مدت چند هفته مایلید با هم‌گروهی خود به مطالعه این درس بپردازید؟"
                  />
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="hours"
                    label="حداقل چند ساعت در هفته می‌توانید برای مطالعه این درس زمان بگذارید؟"
                  />
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="description"
                    label="اگر توضیحات بیشتری لازم می‌دانید، ذکر کنید:"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-container>
        <v-btn color="primary" @click="ClickHandler5">
          ادامه
        </v-btn>

        <v-btn text @click="goBack">
          انصراف
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import { postReq } from "~/utils/services";

export default {
  data() {
    return {
      radios: null,
      radios2: null,
      radios3: null,
      radios4: null,
      radios5: null,
      duration: 4,
      hours: 3,
      slug: "",
      description: " ",
      courseCode: 0,
      e1: 1
    };
  },
  methods: {
    ClickHandler5() {
      const payload = {
        hours_per_week: this.hours,
        weeks: this.duration,
        description: this.description,
        slug: this.slug || "None"
      };

      if (parseInt(this.radios4)) {
        payload.specified_topic = this.radios4;
      } else {
        if (this.radios4 == "biology") {
          if (this.radios2 == 10) {
            payload.specified_topic = 37;
          } else if (this.radios2 == 11) {
            payload.specified_topic = 38;
          } else {
            payload.specified_topic = 39;
          }
        } else if (this.radios4 == "Physics") {
          if (this.radios2 == 10) {
            payload.specified_topic = 40;
          } else if (this.radios2 == 11) {
            payload.specified_topic = 41;
          } else {
            payload.specified_topic = 42;
          }
        } else if (this.radios4 == "geometry") {
          if (this.radios2 == 10) {
            payload.specified_topic = 43;
          } else if (this.radios2 == 11) {
            payload.specified_topic = 44;
          } else {
            payload.specified_topic = 45;
          }
        } else if (this.radios4 == "calculus") {
          if (this.radios2 == 10) {
            payload.specified_topic = 46;
          } else if (this.radios2 == 11) {
            payload.specified_topic = 47;
          } else {
            payload.specified_topic = 48;
          }
        } else if (this.radios4 == "otherses") {
          if (this.radios2 == 10) {
            payload.specified_topic = 49;
          } else if (this.radios2 == 11) {
            payload.specified_topic = 50;
          } else {
            payload.specified_topic = 51;
          }
        } else if (this.radios4 == "othersm") {
          if (this.radios2 == 10) {
            payload.specified_topic = 52;
          } else if (this.radios2 == 11) {
            payload.specified_topic = 53;
          } else {
            payload.specified_topic = 54;
          }
        }
      }

      postReq(this, "api/demands/create", payload)
        .then(res => {
          console.log(res);
        })
        .catch(console.error);
      this.$router.push({ name: "profile" });
    },
    goBack() {
      this.$router.push({ name: "profile" });
    }
  }
};
</script>
