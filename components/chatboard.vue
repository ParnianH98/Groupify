<template>
  <v-container>
    <v-responsive class="overflow-y-auto" max-height="300">
      <v-list>
        <v-list-item-title>
          <v-card-title>
            <div>{{ groupeNumber }} گفتگو در گروه</div>

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
              <v-avatar color="indigo">
                {{ getAuthorInitials(item.sender) }}
              </v-avatar>
              <v-card max-width="230" min-height="24" color="indigo lighten-5">
                <v-card-text>
                  {{ item.text }}
                </v-card-text>
              </v-card>
              <v-spacer />
              <v-icon v-if="!item.isread" color="blue" x-small right>
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
  </v-container>
</template>

<script>
import { postReq, getReq } from "~/utils/services";
export default {
  name: "ChatBoard",

  props: { groupeNumber: Number },

  data() {
    return {
      username: "",
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
      const author = massage.username;
      const l = author.length - 1;
      const initial = author.charAt(0) + author.charAt(l);
      return initial;
    },
    clearMessage() {
      this.newInput = "";
    },
    async getMessages() {
      //get messages from api
      this.isLoadingMs = !this.isLoadingMs;
      try {
        const res = await getReq(this, `chat/${this.groupeNumber}/`);
        console.log(res);
        this.messages = res;
        this.isLoadingMs = !this.isLoadingMs;
      } catch (err) {
        console.log(err);
        this.isLoadingMs = !this.isLoadingMs;
      }
      /*this.messages = [{
                    sender: {username: 'mohi', id:1},
                    reciver: this.groupeNumber,
                    text: 'hello',
                    isread: true,
                },
                {
                    sender: {username: "mohi", id:1},
                    reciver: this.groupeNumber,
                    text: 'hello',
                    isread: true,
                },
                {
                    sender: {username: "mohi", id:1},
                    reciver: this.groupeNumber,
                    text: 'سلام',
                    isread: false,
                }]*/
    },
    async sendMessage() {
      //send message to api
      this.isSendingMs = !this.isSendingMs;
      try {
        const res = await postReq(this, "api/messages/", {
          sender: this.username,
          reciver: this.groupeNumber,
          text: this.newInput
        });

        console.log(res);

        this.getMessages();

        this.clearMessage();

        this.isSendingMs = !this.isSendingMs;
      } catch (err) {
        console.log(err);
        this.isSendingMs = !this.isSendingMs;
      }
    }
  }
};
</script>
