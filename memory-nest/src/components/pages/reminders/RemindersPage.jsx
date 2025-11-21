import { Link } from "react-router";
import Tile from "../../common/Tile";
import { useEffect, useState } from "react";
import LoadingPage from "../LoadingPage";
import Reminder from "./reminder";
import { FaTrash } from "react-icons/fa";
import ReminderForm from "./ReminderForm";


const RemindersPage = ({ isLoading, reminders }) => {
    let [showAddEditReminder, setShowAddEditReminder] = useState(false);
    let [remindersList, setRemindersList] = useState(reminders);
    const initialReminderData = {
        id: null,
        name: null,
        date: null,
        time: null,
        recurring: false,
        notes: null
    };

    let [reminder, setReminder] = useState(initialReminderData);

    const handleSave = (newOrUpdatedReminder) => {
        const {name, date, time, recurring, notes} = {...newOrUpdatedReminder};
        if (reminder.name) { // means reminder is not having initial values null
            let localRemindersList = [...remindersList];
            let reminderToUpdate = localRemindersList.find(r => r.id == reminder.id);
            reminderToUpdate.name = name;
            reminderToUpdate.date = date;
            reminderToUpdate.time = time;
            reminderToUpdate.recurring = recurring;
            reminderToUpdate.notes = notes;
            setRemindersList(localRemindersList);
        } else {
            const id = Date.now();
            const newReminder = new Reminder(id, name, date, time, recurring, notes);
            setRemindersList([...remindersList, newReminder]);
        }
        setShowAddEditReminder(false);
    };

    const showEdit = (reminderId) => {
        const reminder = remindersList.find(reminder => reminder.id == reminderId);
        setShowAddEditReminder(true);
        setReminder(reminder);
    }

    const toggleReminder = () => {
        setShowAddEditReminder(!showAddEditReminder);
        if (!showAddEditReminder) {
            setReminder(initialReminderData);
        }
    }

    const handleDelete = (event, reminderId) => {
        event.preventDefault();
        event.stopPropagation();
        const remindersAfterDelete = [...remindersList].filter(r => r.id != reminderId);
        setRemindersList(remindersAfterDelete);
    }

    return (
        <main>
            <div className="main-page-header">

                <div className="sub-nav">
                    <Link to="/home" className="link">Home</Link>
                </div>

                <h3>Reminders</h3>
            </div>
            <div className="add-link">
                <a className="link" onClick={toggleReminder} ><span>+</span>Add reminder</a>
            </div>

            <div id="main-content-reminders">
                {
                    isLoading &&
                    (<LoadingPage dataName="reminders" />)
                }
                {
                    !isLoading && remindersList && remindersList.length == 0 &&
                    (<p><em>No reminders are set</em></p>)
                }
                {
                    !isLoading && remindersList && remindersList.length > 0 && (

                        remindersList.map((reminder) => (
                            <Link className="link" key={reminder.id} onClick={() => showEdit(reminder.id)}>
                                <Tile>
                                    <div className="reminder-content">
                                        <h3>{reminder.name}</h3>
                                        <p>{reminder.time ? `${reminder.date} ${reminder.time}` : reminder.date}</p>
                                        <p>{reminder.notes}</p>
                                    </div>
                                    <div className="reminder-action">
                                        <button name="delete"
                                            className="reminder-delete-icon"
                                            onClick={(event) => handleDelete(event, reminder.id)}>
                                            <FaTrash />
                                        </button>
                                    </div>
                                </Tile>
                            </Link>
                        ))
                    )
                }

            </div>

            {
                (showAddEditReminder) &&
                <ReminderForm reminder={reminder} onClose={toggleReminder} onSave={handleSave}/>
            }

        </main>
    )
};

export default RemindersPage;
