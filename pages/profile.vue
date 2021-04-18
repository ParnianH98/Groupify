<template>
  <v-row>
    <v-col>
      <v-card max-width="550" class="mx-auto">
        <v-row class="fill-height">
          <v-card-title class="Black--text pl-12 pt-12">
            <v-btn icon class="mr-4" @click="isEditingProf = !isEditingProf">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>

            <v-spacer></v-spacer>

            <div class="display-1 pl-12 pt-12">
              Profile information
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

            <v-list-item-content>
              <v-list-item-title>{{ UserName }}</v-list-item-title>
              <v-list-item-subtitle>User Name</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-action></v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ FirstName }}</v-list-item-title>
              <v-list-item-subtitle>First Name</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-action></v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ LastName }}</v-list-item-title>
              <v-list-item-subtitle>Last Name</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo">
                mdi-email
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ Email }}</v-list-item-title>
              <v-list-item-subtitle>Email Adress</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
    <v-col>
      <v-card max-width="550" class="mx-auto">
        <v-row class="fill-height">
          <v-card-title class="Black--text pl-12 pt-12">
            <v-btn icon class="mr-4" @click="isEditingLable = !isEditingLable">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>

            <v-spacer></v-spacer>

            <div class="display-1 pl-12 pt-12">
              List of Lables
            </div>
          </v-card-title>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      FirstName: "",
      LastName: "",
      Email: "",
      PhoneNum: 0,
      Lables: [],
      isEditingProf: false,
      isEditingLable: false
    };
  }
};
</script>
