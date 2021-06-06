<template>
  <div>
    <v-col lg="2" mt="20" md="20" sm="12">
      <v-card max-width="500" min-width="300">
        <v-list two-line color="indigo lighten-4">
          <v-list-item-group active-class="pink--text" multiple>
            <template v-for="(item, index) in items">
              <v-list-item :key="item.title" @click="selectedGroup = item">
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>

                  <v-list-item-subtitle
                    v-text="item.description"
                  ></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-row>
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          icon
                          v-bind="attrs"
                          v-on="on"
                          color="green"
                          @click="updateStatus(item.id, true)"
                        >
                          <v-icon dark right>
                            mdi-checkbox-marked-circle
                          </v-icon>
                        </v-btn>
                      </template>
                      <span>قبول درخواست</span>
                    </v-tooltip>

                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          icon
                          v-bind="attrs"
                          v-on="on"
                          color="error"
                          @click="updateStatus(item.id, false)"
                        >
                          <v-icon dark right>
                            mdi-cancel
                          </v-icon>
                        </v-btn>
                      </template>
                      <span>رد درخواست</span>
                    </v-tooltip>
                  </v-row>
                </v-list-item-action>
              </v-list-item>

              <v-divider
                v-if="index < items.length - 1"
                :key="index"
              ></v-divider>
            </template>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-col>
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
import { getReq, postReq } from "~/utils/services";
export default {
  mounted() {
    this.loadPage();
  },
  methods: {
    loadPage() {
      getReq(this, "api/requests/owned")
        .then(({ data }) => {
          this.items = data;
        })
        .catch(err => {
          snackbar = true;
        });
    },
    updateStatus(id, status) {
      postReq(this, `api/requests/owned/${id}`, {
        data: { accepted: status },
        method: "PUT"
      })
        .then(() => {
          this.loadPage();
        })
        .catch(() => {
          snackbar = true;
        });
    },
    groupFind() {
      getReq(this, `api/requests/owned/${this.selectedGroup.id}`)
        .then(() => {
          //this.loadPage();
        })
        .catch(() => {
          snackbar = true;
        });
    }
  },
  watch: {
    selectedGroup(newVal) {
      if (newVal) {
        this.groupFind();
      }
    }
  },
  data: () => ({
    items: [
      { id: 1, title: "apple", description: "sgsgbs", status: null },
      { id: 2, title: "apple", description: "sgsgbs", status: null },
      { id: 3, title: "apple", description: "sgsgbs", status: null },
      { id: 4, title: "apple", description: "sgsgbs", status: null }
    ],
    selectedGroup: null,
    snackbar: false,
    accepted: null,
    text: `retrieve error!`
  })
};
</script>
