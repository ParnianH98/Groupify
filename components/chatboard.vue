<template>
  <v-container>
    <div v-if="this.groupeNumber === 0">
      <v-card-title>
        <div>گفتگو در گروه</div>
      </v-card-title>
      <div>هنوز گروهی را انتخاب نکرده اید</div>
    </div>
    <div v-else>
      <v-responsive class="overflow-y-auto" max-height="300">
        <v-list color="indigo lighten-4">
          <v-list-item-title>
            <v-card-title>
              <div>گفتگو در گروه</div>

              <v-btn
                color="black"
                icon
                :loading="isLoadingMs"
                class="mr-4"
                @click="getMessages"
              >
                <v-icon> mdi-refresh </v-icon>
              </v-btn>
            </v-card-title>
          </v-list-item-title>
          <v-list-item v-for="(item, index) in messages" :key="index">
            <v-list-item-action>
              <v-row>
                <v-avatar :color="getColor(item)" right>
                  {{ getAuthorInitials(item) }}
                </v-avatar>
                <v-spacer />
                <v-card
                  max-width="230"
                  min-height="24"
                  color="indigo lighten-5"
                >
                  <v-card-text>
                    {{ item.text }}
                  </v-card-text>
                </v-card>
                <v-spacer />
                <v-icon v-if="!item.is_read" color="blue" x-small left>
                  mdi-circle
                </v-icon>
              </v-row>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-responsive>
      <v-textarea
        v-model="newInput"
        append-outer-icon="mdi-send"
        :disabled="notReadyToSend"
        auto-grow
        rows="1"
        filled
        clear-icon="mdi-close-circle"
        clearable
        label="New Message"
        type="text"
        @click:append-outer="sendMessage"
        @click:clear="clearMessage"
      ></v-textarea>
    </div>
  </v-container>
</template>

<script>
import { postReq, putReq, getReq } from "~/utils/services";
export default {
  name: "ChatBoard",

  props: { groupeNumber: Number, username: String},

  data() {
    return {
      messages: [],
      newInput: "",
      isSendingMs: false,
      isLoadingMs: false
    };
  },

  computed: {
    notReadyToSend() {
      if (this.isSendingMs) {
        return true;
      } else {
        if (this.groupeNumber === 0) {
          return true;
        }
      }
    }
  },

  methods: {
    getAuthorInitials(massage) {
      const author = massage.sender;
      const l = author.length - 1;
      const initial = author.charAt(0) + author.charAt(l);
      return initial;
    },
    getColor(massage) {
      const author = massage.sender;
      if (author === this.username) {
        return "teal lighten-1";
      } else {
        return "red lighten-1";
      }
    },
    clearMessage() {
      this.newInput = "";
    },
    async getMessages() {
      //get messages from api
      this.isLoadingMs = !this.isLoadingMs;
      try {
        const res = await getReq(this, `chat/${this.groupeNumber}/`);
        this.messages = res;
        this.$emit("update", this.isLoadingMs);
        await putReq(this, `chat/update/${this.groupeNumber}/`);
        this.isLoadingMs = !this.isLoadingMs;
      } catch (err) {
        this.snackbar = !this.snackbar;
        this.isLoadingMs = !this.isLoadingMs;
      }
    },
    async sendMessage() {
      //send message to api
      this.isSendingMs = !this.isSendingMs;
      try {
        const res = await postReq(this, "api/messages/", {
          sender: this.username,
          receiver: this.groupeNumber,
          is_read: false,
          text: this.newInput
        });

        this.getMessages();

        this.clearMessage();

        this.isSendingMs = !this.isSendingMs;
      } catch (err) {
        this.snackbar = !this.snackbar;
        this.isSendingMs = !this.isSendingMs;
      }
    }
  }
};
</script>
