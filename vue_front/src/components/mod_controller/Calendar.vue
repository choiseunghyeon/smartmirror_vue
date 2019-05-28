<template lang="html">
  <v-app dark id="inspire">

    <v-toolbar
      color="indigo darken-2" dense
      fixed clipped-left app >
      <!-- <v-icon class="mx-3">fab fa-youtube</v-icon> -->
      <v-menu :nedge-width="100">
        <v-toolbar-title slot="activator" class="mr-3">
          <span class="title">{{ toolbar_title }}</span>
          <v-icon dark>arrow_drop_down</v-icon>
        </v-toolbar-title>
        <v-list>
          <v-list-tile v-for="obj in toolbar_title_lists" :key="obj.title" @click="changeToolbar(obj)">
            <v-list-tile-title v-text="obj.title"></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container fill-height style="padding: 0;">
        <v-layout justify-center>
          <v-flex xs12 shrink>
            <p>Google Calendar API Quickstart</p>

            <!--Add buttons to initiate auth sequence and sign out-->
            <button id="authorize_button" :class="{ active : isActive.authorize }" @click="handleAuthClick">Authorize</button>
            <button id="signout_button" :class="{ active : isActive.signout }" @click="handleSignoutClick">Sign Out</button>

            <pre id="content" style="white-space: pre-wrap;"></pre>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  <!-- <v-snackbar
    v-model="snackbar.flag"
    :timeout="snackbar.time"
    top="top"
  >
    {{ snackbar.text }}
    <v-progress-circular v-if="snackbar.progress == true"
        indeterminate
        color="red"
      ></v-progress-circular>
    <v-btn
      color="pink"
      flat
      @click="setSnackBar"
    >
      Close
    </v-btn>
  </v-snackbar> -->
  <v-footer class="pa-3">
  </v-footer>
  </v-app>
</template>
<script>
import Api from '@/assets/api.js';
import moment from 'moment'; //moment library

export default {
  name: "Calendar",
  created: function(){
    this.calendarInit();
  },
  data: function(){
    return { keyword:'',drawer: true,
      toolbar_title_lists: [
        {title:"Youtube", routeName: 'popular'},
        {title:"Lamp", routeName: 'lamp'},
        {title:"Calendar", routeName: 'calendar'},
      ],
      toolbar_title: "Calendar",
      isActive: {
        authorize: true,
        signout:true,
      },
    }
  },
  methods: {
    changeToolbar(obj){
      this.$router.push({name: obj.routeName});
    },
    /**
     *  Sign in the user upon button click.
     */
    handleAuthClick(event) {
      gapi.auth2.getAuthInstance().signIn();
    },

    /**
     *  Sign out the user upon button click.
     */
    handleSignoutClick(event) {
      gapi.auth2.getAuthInstance().signOut();
    },

    calendarInit(){
      console.log("I'MIN CALENDARINIT")
      // Client ID and API key from the Developer Console
      let CLIENT_ID = '285876530910-puioub7pjqlji4i30ej5irvpog14hmbo.apps.googleusercontent.com';
      let API_KEY = 'AIzaSyD17_13yKTheoV8C6ZKXwGFm0RODhEaYFU';

      // Array of API discovery doc URLs for APIs used by the quickstart
      let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      let SCOPES = "https://www.googleapis.com/auth/calendar.readonly";



      /**
       *  On load, called to load the auth2 library and API client library.
       */
      const handleClientLoad = () => {
        console.log("In handleClientLoad");
        console.log(gapi);
        gapi.load('client:auth2', initClient);
      }

      /**
       *  Initializes the API client library and sets up sign-in state
       *  listeners.
       */
      const initClient = () => {
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES
        }).then(function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        }, function(error) {
          appendPre(JSON.stringify(error, null, 2));
        });
      }

      /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */
       const updateSigninStatus = (isSignedIn) => {
         if (isSignedIn) {
           console.log(this.isActive.authorize);
           this.isActive.authorize = true;
           this.isActive.signout = false;
           listUpcomingEvents();
         } else {
           console.log(this.isActive.authorize);
             this.isActive.authorize = false;
             this.isActive.signout = true;
         }
       }

      /**
       * Append a pre element to the body containing the given message
       * as its text node. Used to display the results of the API call.
       *
       * @param {string} message Text to be placed in pre element.
       */
      function appendPre(message) {
        let pre = document.getElementById('content');
        let textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
      }

      /**
       * Print the summary and start datetime/date of the next ten events in
       * the authorized user's calendar. If no events are found an
       * appropriate message is printed.
       */
      function listUpcomingEvents() {
        // ISO포맷으로 바꾸면 US시간으로 바뀌는듯 하다 따라서 한국과 몇시간 차이가 생긴다.
        // 따라서 timeMax의 값을 넉넉하게 3일후로 잡았다.
        let today     = moment(new Date()).format();
        let tomorrow  = moment(new Date()).add(3,'days').format();
        console.log(today, tomorrow);
        gapi.client.calendar.events.list({
          'calendarId': 'ket8780@gmail.com',
          'timeMin': today,
          'timeMax': tomorrow,
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        }).then(function(response) {
          let events = response.result.items;
          appendPre('Upcoming events:');

          if (events.length > 0) {
            for (let i = 0; i < events.length; i++) {

              let event = events[i];
              console.log(event);
              let when = event.start.dateTime;
              if (!when) {
                when = event.start.date;
              }
              appendPre(event.summary + ' (' + when + ')')
            }
          } else {
            appendPre('No upcoming events found.');
            gapi.load('client', start);
          }
        });

      }
    handleClientLoad();
    },

  }
}
</script>

<style lang="css">
active {
  display: none;
}
</style>
