import './App.css'
import React, { useState, useEffect } from "react"
import axios from "axios"
import DateTimePicker from "react-datetime-picker"

function App() {

  const [reminderMsg, setReminderMsg] = useState("")
  const [remindAt, setRemindAt] = useState()
  const [reminderList, setReminderList] = useState([])

  useEffect(() => {
    axios.get("http://localhost:9000/getAllReminder").then(res => setReminderList(res.data))
  }, [])

  const addReminder = () => {
    axios.post("http://localhost:9000/addReminder", { reminderMsg, remindAt })
      .then(res => setReminderList(res.data))
    setReminderMsg("")
    setRemindAt()
  }

  const deleteReminder = (id) => {
    axios.post("http://localhost:9000/deleteReminder", { id })
      .then(res => setReminderList(res.data))
  }

  return (
    <div className="App">
      <div class="box-container">
        <div class="color"></div>
        <div class="color"></div>
        <div class="color"></div><div class="color"></div>
      </div>
      <div className="box">
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="container">
          <div className="form">
            <h1>To-Do Reminder</h1>
            <div className="inputBox">
              <input type="text" placeholder="Add reminder note..." value={reminderMsg} onChange={e => setReminderMsg(e.target.value)} />
            </div>
            <div className="inputBox1">
              <DateTimePicker
                value={remindAt}
                onChange={setRemindAt}
                minDate={new Date()}
                minutePlaceholder="mm"
                hourPlaceholder="hh"
                dayPlaceholder="DD"
                monthPlaceholder="MM"
                yearPlaceholder="YYYY"
              />
            </div>
            <div className="inputBox">
              <div className="button" onClick={addReminder}>Add Reminder</div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="box-reminder"> */}
        <div className="homepage_body">
          {reminderList.map((reminder) => (
            <div className="reminder_card" key={reminder._id}>
              <h2>{reminder.reminderMsg}</h2>
              <h3>Upcoming Task At:</h3>
              {reminder.remindAt && (
                <p>
                  {String(
                    new Date(
                      reminder.remindAt.toLocaleString(undefined, {
                        timezone: "Asia/Kolkata",
                      })
                    )
                  )}
                </p>
              )}
              
                <div className="button" onClick={() => deleteReminder(reminder._id)}>
                  Delete
                </div>
              </div>
           
          ))}
        </div>

      </div>
    // </div>
  )
}

export default App;
