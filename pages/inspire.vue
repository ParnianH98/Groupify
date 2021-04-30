<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">
        در کدام دوره به دنبال هم‌گروهی می‌گردید؟
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step v-if="radios === 'highschool'" step="2">
        در چه پایه‌ای؟
      </v-stepper-step>
      <v-stepper-step v-if="radios === 'university'" step="2">
        در چه مقطعی؟
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step  :complete="e1 > 3" step="3">
        رشته تحصیلی شما چیست؟
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step  :complete="e1 > 4" step="4">
        درس مورد نظر خود را انتخاب کنید.
      </v-stepper-step>
      </template>

      <v-divider></v-divider>


      <v-stepper-step :complete="e1 > 5" step="5">
        لطفا اطلاعات زیر را وارد کنید.
      </v-stepper-step>

    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-container fluid>
          <p>{{ radios || "null" }}</p>
          <v-radio-group v-model="radios" mandatory>
            <v-radio label="دانشگاه" value="university"></v-radio>
            <v-radio label="دبیرستان" value="highschool"></v-radio>
          </v-radio-group>
        </v-container>
        <v-btn color="primary" @click="e1 = 2">
          Continue
        </v-btn>

        <v-btn text>
          Cancel
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-container fluid>
          <p>{{ radios2 || "null" }}</p>
          <v-radio-group
            v-if="radios === 'university'"
            v-model="radios2"
            mandatory
          >
            <v-radio label="کارشناسی" value="bsc"></v-radio>
            <v-radio label="کارشناسی ارشد" value="msc"></v-radio>
          </v-radio-group>
          <v-radio-group v-else v-model="radios2" mandatory>
            <v-radio label="دهم" value="10"></v-radio>
            <v-radio label="یازدهم" value="11"></v-radio>
            <v-radio label="دوازدهم" value="12"></v-radio>
          </v-radio-group>
        </v-container>

        <v-btn color="primary" @click="e1 = 3">
          Continue
        </v-btn>

        <v-btn text>
          Cancel
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-container fluid>
          <p>{{ radios3 || "null" }}</p>
          <v-radio-group
            v-if="radios2 === 'bsc'"
            v-model="radios3"
            mandatory
          >
            <v-radio label="مهندسی کامپیوتر" value="ce"></v-radio>
            <v-radio label="علوم کامپیوتر" value="cs"></v-radio>
            <v-radio label="مهندسی برق" value="ee"></v-radio>
          </v-radio-group>
          <v-radio-group v-else-if="radios2==='msc'" v-model="radios3" mandatory>
            <v-radio label="هوش مصنوعی" value="َai"></v-radio>
            <v-radio label="بیوانفورماتیک" value="bio"></v-radio>
          </v-radio-group>
          <v-radio-group v-else v-model="radios2" mandatory>
            <v-radio label="رشته ریاضی" value="mathematics"></v-radio>
            <v-radio label="ٍرشته تجربی" value="expscience"></v-radio>
          </v-radio-group>
          
        </v-container>
        <v-btn color="primary" @click="e1 = 4">
          Continue
        </v-btn>

        <v-btn text>
          Cancel
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="4">
        <v-container fluid>
          <p>{{ radios4 || "null" }}</p>
          
          <v-radio-group v-if="radios3 === 'ee'" v-model="radios4" mandatory>
            <v-radio label="Network 1" value="nw1"></v-radio>
            <v-radio label="Network 2" value="nw2"></v-radio>
            <v-radio label="Others" value="othersee"></v-radio>
          </v-radio-group>
          <v-radio-group v-else-if="radios3 === 'ce'" v-model="radios4" mandatory>
            <v-radio label="Compiler" value="compiler"></v-radio>
            <v-radio label="Artificial Intelligece" value="ai"></v-radio>
            <v-radio label="Machine Learning" value="ml"></v-radio>
            <v-radio label="Others" value="othersce"></v-radio>
          </v-radio-group>
          <v-radio-group v-else-if="radios3 === 'cs'" v-model="radios4" mandatory>
            <v-radio label="Theory of Computation" value="theocomp"></v-radio>
            <v-radio label="Computer Systems" value="compsys"></v-radio>
            <v-radio label="Others" value="otherscs"></v-radio>
          </v-radio-group>
          <v-radio-group v-else-if="radios3 === 'ai'" v-model="radios4" mandatory>
            <v-radio label="Electromagnetic" value="electromagnetic"></v-radio>
            <v-radio label="Optic" value="optic"></v-radio>
            <v-radio label="Others" value="othersp"></v-radio>
          </v-radio-group>
          </v-radio-group>
          <v-radio-group v-else-if="radios3==='bio'"  v-model="radios4" mandatory>
            <v-radio label="ML in Bioinformatics" value="mlinbio"></v-radio>
            <v-radio label="Mathematics" value="mathematics"></v-radio>
            <v-radio label="Geometery" value="geometery"></v-radio>
            <v-radio label="Others" value="othersm2"></v-radio>

          </v-radio-group>
          <v-radio-group v-else-if="radios3==='expscience'" v-model="radios4" mandatory>
            <v-radio label="Biology" value="biology"></v-radio>
            <v-radio label="Physics" value="Physics"></v-radio>
            <v-radio label="Others" value="otherses"></v-radio>
          </v-radio-group>
          <v-radio-group v-else-if="radios3==='mathematics'" v-model="radios4" mandatory>
            <v-radio label="Geometry" value="geometry"></v-radio>
            <v-radio label="Calculus" value="calculus"></v-radio>
            <v-radio label="Others" value="otherses"></v-radio>
          </v-radio-group>
        </v-container>
        <v-btn color="primary" @click="e1 = 5">
          Continue
        </v-btn>

        <v-btn text>
          Cancel
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="5">
        <v-container fluid>
          <p>{{ radios5 || "null" }}</p>
          <v-form>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    v-model="title"
                    :rules="rules"
                    counter="25"
                    label="به مدت چند هفته مایلید با هم‌گروهی خود به مطالعه این درس بپردازید؟"
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    v-model="title"
                    :rules="wordsRules"
                    counter="5"
                    label="حداقل چند ساعت در هفته می‌توانید برای مطالعه این درس زمان بگذارید؟"
                    :counter-value="v => v.trim().split(' ').length"
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    v-model="title"
                    :rules="wordsRules"
                    counter="5"
                    label="اگر توضیحات بیشتری لازم می‌دانید، ذکر کنید:"
                    :counter-value="v => v.trim().split(' ').length"
                  ></v-text-field>
                </v-col>

        
              </v-row>
            </v-container>
          </v-form>




        </v-container>
        <v-btn color="primary" @click="ClickHandler5">
          Continue
        </v-btn>

        <v-btn text>
          Cancel
        </v-btn>
      </v-stepper-content>



    </v-stepper-items>
  </v-stepper>
</template>

<script>
export default {
  methods:{
    ClickHandler5(){
      this.$router.push({name:'dashboard'});
    }
  },
  data() {
    return {
      radios: null,
      radios2: null,
      radios3: null,
      e1: 1
    };
  }
}
</script>
