<template>
    <v-container>
        <v-responsive
        class="overflow-y-auto"
        max-height="400"
        >
            <v-list>
                <v-list-item v-for="(item, index) in messages" :key="index">
                    <v-row>
                        <v-avatar color="indigo">
                            {{ getAuthorInitials(item) }}
                        </v-avatar>
                        <v-snackbar
                        :timeout="-1"
                        :value="true"
                        color="blue-grey"
                        absolute
                        right
                        rounded="pill"
                        >
                            {{ item.text }}
                        </v-snackbar>
                        <v-icon
                        v-if="item.isread"
                        dark
                        right
                        >
                            mdi-checkbox-marked-circle
                        </v-icon>
                    </v-row>
                </v-list-item>
            </v-list>
        </v-responsive>
        <v-text-field
            v-model="newInput"
            :append-outer-icon="mdi-send"
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
export default {
    name: 'ChatBoard',

    data() {
        return{
            messages: [],
            newInput: '',
            groupeNumber: 0,
            isSending: false,
        }
    },

    methods: {
        getAuthorInitials(massage) {
            const author = massage.username
            const l = author.lenght()
            const initial = author.charAt(0) + author.charAt(l)
            return initial
        },
        clearMessage () {
            this.newInput = ''
        },
        sendMessage () {
            //send message to api
            this.messages.append({
                username: 'Delbarsh',
                text: this.newInput,
                isread: false,
                togroup: this.groupeNumber,
            })
            this.clearMessage()
        },
    }
}
</script>