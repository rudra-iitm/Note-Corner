"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";


export default function ReactBigCalendar() {
    const events = [
        { title: 'Meeting', start: new Date() }
      ]
    return(
        <div className="w-full h-full mt-4 p-40">
        <FullCalendar
          schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
          initialView="dayGridMonth"
          displayEventTime={true}
          selectable={true}
          plugins={[
            dayGridPlugin,
            interactionPlugin,
            timeGridPlugin,
            resourceTimeGridPlugin
          ]}
          eventClick={event => {
            console.log(event.event._def.publicId);
          }}
          events={events}
        />
      </div>

    )
}
// class App extends React.Component {
//   calendarComponentRef = React.createRef();
//   state = {
//     events: [
//       { id: 1, title: "event 1", date: "2019-12-01" },
//       {
//         title: "event 2",
//         start: "2019-12-01",
//         end: "2019-12-05",
//         allDay: true,
//         HostName: "William"
//       },
//       {
//         title: "event 3",
//         start: "2019-12-05",
//         end: "2019-12-07",
//         allDay: true
//       },
//       {
//         title: "event 4",
//         start: "2019-12-05",
//         end: "2019-12-07",
//         allDay: true
//       },
//       {
//         title: "event 5",
//         start: "2019-12-05",
//         end: "2019-12-07",
//         allDay: true
//       },
//       {
//         title: "event 6",
//         start: "2019-12-05",
//         end: "2019-12-07",
//         allDay: true
//       }
//     ]
//   };

//   handleDateClick = arg => {
//     alert(arg.dateStr);
//   };

//   handleSelectedDates = info => {
//     alert("selected " + info.startStr + " to " + info.endStr);
//     const title = prompt("What's the name of the title");
//     console.log(info);
//     if (title != null) {
//       const newEvent = {
//         title,
//         start: info.startStr,
//         end: info.endStr
//       };
//       const data = [...this.state.events, newEvent];
//       this.setState({ events: data });
//       console.log("here", data);
//     } else {
//       console.log("nothing");
//     }
//   };

//   render() {
//     return (
//          );
//   }
// }

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
