<template>
    <v-container>
        <v-responsive
        class="overflow-y-auto"
        max-height="300"
        >
            <v-list>
                <v-list-item-title>
                    <v-card-title>
                        <div>
                            گفت و گو در گروه
                        </div>

                        <v-btn 
                        color="black"
                        icon 
                        class="mr-4" 
                        @click="getMessages"
                        >
                            <v-icon> mdi-refresh </v-icon>
                        </v-btn>
                    </v-card-title>
                </v-list-item-title>
                <v-list-item v-for="(item, index) in messages" :key="index">
                    <v-row>
                        <v-avatar color="indigo">
                            {{ getAuthorInitials(item.sender) }}
                        </v-avatar>
                        <v-snackbar
                        :timeout="-1"
                        :value="true"
                        color="blue-grey"
                        absolute
                        rounded="pill"
                        >  
                            {{ item.text }}
                        </v-snackbar>
                        <v-icon
                        v-if="!item.isread"
                        color="blue"
                        x-small
                        right
                        >
                            mdi-circle
                        </v-icon>
                    </v-row>
                </v-list-item>
            </v-list>
        </v-responsive>
        <v-text-field
            v-model="newInput"
            append-outer-icon="mdi-send"
            :disabled="isSending"
            filled
            clear-icon="mdi-close-circle"
            clearable
            label="New Message"
            type="text"
            @click:append-outer="sendMessage"
            @click:clear="clearMessage"
          ></v-text-field>
    </v-container>
</template>

<script>
import { postReq } from "~/utils/services";
export default {
    name: 'ChatBoard',

    data() {
        return{
            username: 'Delbarsh',
            messages: [],
            newInput: '',
            groupeNumber: 0,
            isSending: false,
        }
    },

    methods: {
        getAuthorInitials(massage) {
            const author = massage.username
            const l = author.length - 1
            const initial = author.charAt(0) + author.charAt(l)
            return initial
        },
        clearMessage () {
            this.newInput = ''
        },
        getMessages () {
            //get messages from api
        },
        async sendMessage () {
            //send message to api
            this.isSending = !this.isSending
            try{
                const res = await postReq('api/messages/',
                {
                    sender: this.username,
                    reciver: this.groupeNumber,
                    text: this.newInput
                })

                console.log(res)

                this.getMessages()

                this.clearMessage()

                this.isSending = !this.isSending
            } catch(err){
                console.log(err)
                this.isSending = !this.isSending
            }
        },
    }
}
</script>