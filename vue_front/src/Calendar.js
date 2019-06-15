import Api from '@/assets/api.js';
import moment from 'moment' ; //moment library

export default {

    /**
     *  Sign in the user upon button click.
     */
    handleAuthClick: function(event) {
      gapi.auth2.getAuthInstance().signIn();
    },

    /**
     *  Sign out the user upon button click.
     */
    handleSignoutClick: function(event) {
      gapi.auth2.getAuthInstance().signOut();
    },

    calendarInit: function(googleCalendarKey, socket){
      console.log("I'M IN CALENDARINIT")
      console.log('socket: ', socket);
      // Client ID and API key from the Developer Console
      let CLIENT_ID = googleCalendarKey.CLIENT_ID;
      let API_KEY = googleCalendarKey.API_KEY;

      // Array of API discovery doc URLs for APIs used by the quickstart
      let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      let SCOPES = "https://www.googleapis.com/auth/calendar.readonly";


      const getAmPM =  (hour) => {
        let ap ="오전";
        if(hour == 12)
          ap = "오후"
        else if (hour > 12){
          hour -= 12;
          ap = "오후";
        }
        let result = {'hour': hour, "ampm": ap};
        return result
      }
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
          console.log(JSON.stringify(error, null, 2));
        });
      }

      /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */
       const updateSigninStatus = (isSignedIn) => {
         if (isSignedIn) {
           console.log('로그인 되어 있음');
           listUpcomingEvents();
         } else {
           console.log('로그인 되어 있지 않음');
           this.handleAuthClick();
         }
       }

      /**
       * Append a pre element to the body containing the given message
       * as its text node. Used to display the results of the API call.
       *
       * @param {string} message Text to be placed in pre element.
       */

      /**
       * Print the summary and start datetime/date of the next ten events in
       * the authorized user's calendar. If no events are found an
       * appropriate message is printed.
       */
      function listUpcomingEvents() {
        // 오늘 기준 어제와 다다음날 시간을 가져오는 이유는 현재 시간을 가져왔을 때 현재시간 기준으로
        // 구분할 때 시간이 지난 정보는 출력되지 않을 수 있기 때문에 넉넉하게 -1 +1날짜를 더해서
        // 데이터를 가져오고 가져온 데이터를 오늘 내일을 구별하여 가공하기 위함.

        let date = new Date();
        let min  = moment(date).subtract(1,'days').format();
        let max  = moment(date).add(2,'days').format();

        //2019-06-02T20:14:19+09:00
        // T를 기준으로 날짜와 시간을 구분 이후 -를 기준으로 day만 가져오기
        let today = moment(date).format().split('T')[0].split('-')[2];
        let tomorrow = moment(date).add(1,'days').format().split('T')[0].split('-')[2];

        console.log('today, tomorrow');
        console.log(today, tomorrow);
        gapi.client.calendar.events.list({
          'calendarId': 'ket8780@gmail.com',
          'timeMin': min,
          'timeMax': max,
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        }).then(function(response) {
          let items = response.result.items;
          let payLoad = {today:[], tomorrow:[]};
          if (items.length > 0) {
            console.log(items);
            console.log('Upcoming events:');
            let validatedItems = items.reduce((acc, item) => {
              let startTime = item.start.dateTime;
              let startDay = startTime.split('T')[0].split('-')[2];
              let temp = [];
              let timeArr;

              //start시간
              timeArr = item.start.dateTime.split('T')[1].split(':');
              let timeObj = getAmPM(timeArr[0]);

              temp.push(timeObj.ampm+' '+timeObj.hour+'시 '+timeArr[1]+'분');
              //End시간
              timeArr = item.end.dateTime.split('T')[1].split(':');
              timeObj = getAmPM(timeArr[0]);
              temp.push(timeObj.hour+'시 '+timeArr[1]+'분');
              //몇일인지
              temp.push(startDay);
              if(startDay == today){
                acc.today.push({title: item.summary, start: temp[0], end: temp[1], day: temp[2]});
              }
              if( startDay == tomorrow){
                acc.tomorrow.push({title: item.summary, start: temp[0], end: temp[1], day: temp[2]});
              }
              return acc;
            }, payLoad);
            console.log(validatedItems);
            socket.emit('syncCalendar',validatedItems);
          } else {
            console.log('No upcoming events found.');
            socket.emit('syncCalendar', payLoad);
          }
        });

      }
    handleClientLoad();
  }, // the end of calendarInit



} // the end of export default
