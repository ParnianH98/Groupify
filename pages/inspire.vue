<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">
        Student of:
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">
        Field you want to study:
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step v-if="radios === 'highschool'" step="3">
        of grade:
      </v-stepper-step>
      <v-stepper-step v-if="radios === 'university'" step="3">
        your major is:
      </v-stepper-step>
      <template v-if="radios2!=='service'">
      <v-divider></v-divider>

      <v-stepper-step v-if="radios === 'highschool'" step="4">
        want a study-mate to study:
      </v-stepper-step>
      <v-stepper-step v-if="radios === 'university'" step="4">
        want a study-mate to study:
      </v-stepper-step>
      </template>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-container fluid>
          <p>{{ radios || "null" }}</p>
          <v-radio-group v-model="radios" mandatory>
            <v-radio label="University" value="university"></v-radio>
            <v-radio label="High School" value="highschool"></v-radio>
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
            <v-radio label="Science" value="science"></v-radio>
            <v-radio label="Engineering" value="engineering"></v-radio>
            <v-radio label="Service" value="service"></v-radio>
          </v-radio-group>
          <v-radio-group v-else v-model="radios2" mandatory>
            <v-radio label="Mathematics" value="mathematics"></v-radio>
            <v-radio label="ٍExperimental Science" value="expscience"></v-radio>
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
            v-if="radios2 === 'science'"
            v-model="radios3"
            mandatory
          >
            <v-radio label="Mathematics" value="mathematics"></v-radio>
            <v-radio label="Computer Science" value="cs"></v-radio>
            <v-radio label="Physics" value="physics"></v-radio>
          </v-radio-group>
          <v-radio-group v-else-if="radios2==='engineering'" v-model="radios3" mandatory>
            <v-radio label="Computer Engineering" value="ce"></v-radio>
            <v-radio label="Electrical Engineering" value="ee"></v-radio>
          </v-radio-group>
          <v-radio-group v-else-if="radios2==='service'"  v-model="radios3" mandatory>
            <v-radio label="Calculus 1" value="calculus1"></v-radio>
            <v-radio label="Calculus 2" value="calculus2"></v-radio>
            <v-radio label="Physics 1" value="physics1"></v-radio>
            <v-radio label="Physics 2" value="physics2"></v-radio>
            <v-radio label="Others" value="otherss"></v-radio>
          </v-radio-group>
          <v-radio-group
            v-else-if="radios === 'highschool'"
            v-model="radios3"
            mandatory
          >
            <v-radio label="10" value="10"></v-radio>
            <v-radio label="11" value="11"></v-radio>
            <v-radio label="12" value="12"></v-radio>
          </v-radio-group>
          
        </v-container>
        <v-btn color="primary" @click="ClickHandler3">
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
            <v-radio label="Network 1" value="nw1"></v-radio>
            <v-radio label="Others" value="othersee"></v-radio>
          </v-radio-group>
          <v-radio-group v-else-if="radios3 === 'ce'" v-model="radios4" mandatory>
            <v-radio label="Compiler" value="compiler"></v-radio>
            <v-radio label="Artificial Intelligece" value="ai"></v-radio>
            <v-radio label="Machine Learning" value="ml"></v-radio>
            <v-radio label="Others" value="othersce"></v-radio>
          </v-radio-group>
          <v-radio-group v-else-if="radios3 === 'Mathematics" v-model="radios4" mandatory>
            <v-radio label="Probablility 1" value="probability1"></v-radio>
            <v-radio label="Probablility 2" value="probability2"></v-radio></v-radio>
            <v-radio label="Others" value="othersm"></v-radio>
          </v-radio-group>
          <v-radio-group v-else-if="radios3 === 'cs'" v-model="radios4" mandatory>
            <v-radio label="Theory of Computation" value="theocomp"></v-radio>
            <v-radio label="Computer Systems" value="compsys"></v-radio>
            <v-radio label="Others" value="otherscs"></v-radio>
          </v-radio-group>
          <v-radio-group v-else-if="radios3 === 'Physics'" v-model="radios4" mandatory>
            <v-radio label="Electromagnetic" value="electromagnetic"></v-radio>
            <v-radio label="Optic" value="optic"></v-radio>
            <v-radio label="Others" value="othersp"></v-radio>
          </v-radio-group>
          </v-radio-group>
          <v-radio-group v-else-if="radios2==='mathematics"  v-model="radios4" mandatory>
            <v-radio label="Physics" value="Physics"></v-radio>
            <v-radio label="Mathematics" value="mathematics"></v-radio>
            <v-radio label="Geometery" value="geometery"></v-radio>
            <v-radio label="Others" value="othersm2"></v-radio>

          </v-radio-group>
          <v-radio-group v-else-if="radios2==='expscience'" v-model="radios4" mandatory>
            <v-radio label="Biology" value="biology"></v-radio>
            <v-radio label="Physics" value="Physics"></v-radio>
            <v-radio label="Mathematics" value="mathematics"></v-radio>
            <v-radio label="Others" value="otherses"></v-radio>

          </v-radio-group>
        </v-container>
        <v-btn color="primary" @click="ClickHandler4">
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
    ClickHandler3(){
      if (this.radios2==='service') {
        this.$router.push({name:'dashboard'});
      }else{
        this.e1 = 4;
      }
    },ClickHandler4(){
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
