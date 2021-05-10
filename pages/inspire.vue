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

        <v-btn text>
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

        <v-btn text>
          انصراف
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-container fluid>
          <p>رشته تحصیلی شما چیست؟</p>
          <v-radio-group
            v-if="radios2 === 'bsc'"
            v-model="radios3"
            mandatory
          >
            <v-radio label="مهندسی کامپیوتر" value="ce" />
            <v-radio label="علوم کامپیوتر" value="cs" />
            <v-radio label="مهندسی برق" value="ee" />
          </v-radio-group>
          <v-radio-group v-else-if="radios2==='msc'" v-model="radios3" mandatory>
            <v-radio label="هوش مصنوعی" value="َai" />
            <v-radio label="بیوانفورماتیک" value="bio" />
          </v-radio-group>
          <v-radio-group v-else v-model="radios2" mandatory>
            <v-radio label="رشته ریاضی" value="mathematics" />
            <v-radio label="ٍرشته تجربی" value="expscience" />
          </v-radio-group>
        </v-container>
        <v-btn color="primary" @click="e1 = 4">
          ادامه
        </v-btn>

        <v-btn text>
          انصراف
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="4">
        <v-container fluid>
          <p>درس</p>

          <v-radio-group v-if="radios3 === 'ee'" v-model="radios4" mandatory>
            <v-radio label="Network 1" value="nw1" />
            <v-radio label="Network 2" value="nw2" />
            <v-radio label="Others" value="othersee" />
          </v-radio-group>
          <v-radio-group v-else-if="radios3 === 'ce'" v-model="radios4" mandatory>
            <v-radio label="Compiler" value="compiler" />
            <v-radio label="Artificial Intelligece" value="ai" />
            <v-radio label="Machine Learning" value="ml" />
            <v-radio label="Others" value="othersce" />
          </v-radio-group>
          <v-radio-group v-else-if="radios3 === 'cs'" v-model="radios4" mandatory>
            <v-radio label="Theory of Computation" value="theocomp" />
            <v-radio label="Computer Systems" value="compsys" />
            <v-radio label="Others" value="otherscs" />
          </v-radio-group>
          <v-radio-group v-else-if="radios3 === 'ai'" v-model="radios4" mandatory>
            <v-radio label="Electromagnetic" value="electromagnetic" />
            <v-radio label="Optic" value="optic" />
            <v-radio label="Others" value="othersp" />
          </v-radio-group>
          </v-radio-group>
          <v-radio-group v-else-if="radios3==='bio'" v-model="radios4" mandatory>
            <v-radio label="ML in Bioinformatics" value="mlinbio" />
            <v-radio label="Mathematics" value="mathematics" />
            <v-radio label="Geometery" value="geometery" />
            <v-radio label="Others" value="othersm2" />
          </v-radio-group>
          <v-radio-group v-else-if="radios3==='expscience'" v-model="radios4" mandatory>
            <v-radio label="Biology" value="biology" />
            <v-radio label="Physics" value="Physics" />
            <v-radio label="Others" value="otherses" />
          </v-radio-group>
          <v-radio-group v-else-if="radios3==='mathematics'" v-model="radios4" mandatory>
            <v-radio label="Geometry" value="geometry" />
            <v-radio label="Calculus" value="calculus" />
            <v-radio label="Others" value="otherses" />
          </v-radio-group>
        </v-container>
        <v-btn color="primary" @click="e1 = 5">
          ادامه
        </v-btn>

        <v-btn text>
          انصراف
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="5">
        <v-container fluid>
          <p>لطفا اطلاعات زیر را وارد کنید.</p>
          <v-form>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    v-model="duration"
                    label="به مدت چند هفته مایلید با هم‌گروهی خود به مطالعه این درس بپردازید؟"
                  />
                </v-col>

                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    v-model="hours"
                    label="حداقل چند ساعت در هفته می‌توانید برای مطالعه این درس زمان بگذارید؟"
                  />
                </v-col>

                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    v-model="title"
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

        <v-btn text>
          انصراف
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
export default {
  data () {
    return {
      radios: null,
      radios2: null,
      radios3: null,
      radios4: null,
      radios5: null,
      duration: 4,
      hours: 3,
      title: ' ',
      courseCode: 0,
      e1: 1
    }
  },
  methods: {
    ClickHandler5 () {
      try{
        const res = postReq(this, "api/topics/children/<int:id>",{
          coursecode = this.courseCode
        })
      console.log(res)
      this.$router.push({ name: 'makerequest' })
      }catch (e){
        console.log(e)
      }
    },
  }
}
</script>
