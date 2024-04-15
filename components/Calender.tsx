"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePicker } from "./ui/date-picker";
import { Trash2 } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

const seperator = "/^&*/";
const eventColors = ["red","blue","pink","yellow","green"];

const renderEventContent = (eventInfo: any) => {
  const { event : { title } } = eventInfo;
  const [event, time, ind, range] = title.split(seperator);
  return (
    <div className={`${range == "true" ? "" : "rounded-xl"} flex flex-col gap-[2px] px-2 py-1 ${ind == 0 ? "bg-red-600": ""} ${ind == 1 ? "bg-blue-600" : ""} ${ind == 2 ? "bg-pink-600" : ""} ${ind == 3 ? "bg-yellow-600" : ""} ${ind == 4 ? "bg-green-600" : ""}`}>
      <p className="font-medium">{time}</p>
      <p className="text-md">{event}</p>
    </div>
  );
};

export default function ReactBigCalendar() {
    const addEventButton = useRef<HTMLButtonElement>(null);
    const [event, setEvent] = useState("");
    const [time, setTime] = useState("");
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();
    const [isedit, setIsEdit] = useState(false);
    const [id, setId] = useState("");
    const [events, setEvents] = useState<{
        title: string;
        start: Date;
        end?: Date;
    }[]>([]);

    useEffect(() => {
      async function getData() {
        const { data } = await axios.get("/api/event");
        if (data && data.length > 0) setEvents(data);
      }
      getData();
    }, [])

    const showAddEventDialog = (e : any) => {
      setId("");
      setEvent("");
      setTime("");
      setStartDate(new Date(e.dateStr));
      setEndDate(new Date(e.dateStr));
      setIsEdit(false);
      addEventButton.current?.click();
    }
    const addEvent = async () => {
      setEvent("");
      setTime("");
      let range = false;
      if (endDate && startDate) {
        if (endDate?.getTime() > startDate?.getTime()+1000*60*60*24) {
          range = true;
        }
      }
      if (isedit) {
        const temp = { title: event+seperator+time+seperator+Math.floor(Math.random() * eventColors.length).toString()+seperator+range.toString()+seperator+id, start: startDate!, end: endDate }
        setEvents(prev => prev.map((e) => {
          if (e.title.split(seperator)[4] == id) {
            return { title: event+seperator+time+seperator+Math.floor(Math.random() * eventColors.length).toString()+seperator+range.toString()+seperator+id, start: startDate!, end: endDate }
          }
          return e;
        }))

        await axios.post("/api/event", {events: [...events, temp]})
      }else {
        const uniqueId = uuidv4();
        console.log(uniqueId);
        setEvents(prev => [...prev,{ title: event+seperator+time+seperator+Math.floor(Math.random() * eventColors.length).toString()+seperator+range.toString()+seperator+uniqueId, start: startDate!, end: endDate }])
        const temp = { title: event+seperator+time+seperator+Math.floor(Math.random() * eventColors.length).toString()+seperator+range.toString()+seperator+id, start: startDate!, end: endDate }
        await axios.post("/api/event", {events: [...events, temp]})
      }
    }
    const showEditEventDialog = (e : any) => {
      const { event : { title, start, end } } = e;
      const [event, time, _color, _range, uniqueId] = title.split(seperator);
      console.log("id",uniqueId);
      setId(uniqueId);
      setEvent(event);
      setTime(time);
      setStartDate(start);
      setEndDate(end);
      setIsEdit(true);
      addEventButton.current?.click();
    }
    const deleteEvent = async () => {
      setEvents(prev => prev.filter((e) => e.title.split(seperator)[4] != id));
      setEvent("");
      setTime("");
      setStartDate(undefined);
      setEndDate(undefined);
      setIsEdit(false);
      const temp = { title: event+seperator+time+seperator+Math.floor(Math.random() * eventColors.length).toString()+seperator+range.toString()+seperator+id, start: startDate!, end: endDate }
      await axios.post("/api/event", {events: [...events, temp]})
    }
    return(
      <>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="hidden" ref={addEventButton} variant="outline">Edit Profile</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add and Event</DialogTitle>
              <DialogDescription>
                Add an event on your calendar. You can add a title, date, and time.
                Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="event" className="text-right">
                  Event
                </Label>
                <Input id="event" value={event} onChange={(e) => setEvent(e.target.value)} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">
                  Time
                </Label>
                <Input type="time" id="time" value={time} onChange={(e) => {
                  setTime(e.target.value);
                }} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Start Date
                </Label>
                <DatePicker date={startDate} setDate={setStartDate}/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  End Date
                </Label>
                <DatePicker date={endDate} setDate={setEndDate}/>
              </div>
            </div>
            <DialogFooter>
              {isedit ? <Button variant="destructive" onClick={deleteEvent}><Trash2 size={16}/></Button> : null}
              <Button onClick={addEvent} type="submit">{isedit ? "Save changes" : "Add Eevent"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <div className="w-full h-full mt-4 p-40">
          <FullCalendar
            schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
            initialView="dayGridMonth"
            displayEventTime={false}
            selectable={true}
            plugins={[
              dayGridPlugin,
              interactionPlugin,
              timeGridPlugin,
              resourceTimeGridPlugin
            ]}
            dateClick={showAddEventDialog}
            events={events}
            eventContent={renderEventContent}
            eventClick={showEditEventDialog}
          />
        </div>
      </>

    )
}