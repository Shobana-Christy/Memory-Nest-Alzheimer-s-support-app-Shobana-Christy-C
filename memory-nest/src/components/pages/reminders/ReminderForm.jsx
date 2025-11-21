import { useState } from "react";
import Button from "../../common/Button";

const ReminderForm = ({ reminder, onClose, onSave }) => {
    const initialReminderData = {
        id: null,
        name: null,
        date: null,
        time: null,
        recurring: false,
        notes: null
    };
    // if reminder.name is not available, then consider it as Add reminder
    const formValues = reminder.name ? reminder : initialReminderData;

    let [form, setForm] = useState(formValues);

    const handleChange = (event) => {
        const element = event.target;
        const elementName = element.name;
        const elementValue = element.value;
        let copyForm = { ...form };
        copyForm[elementName] = elementValue;
        setForm(copyForm);
    };

    const getDateForInput = (date) => {
        return date ? date.replaceAll("/", "-") : null;
    }

    const handleClick = (event) => {
        event.preventDefault();
        const addOrUpdatedReminder = {...form};
        setForm(initialReminderData);
        onSave(addOrUpdatedReminder);
    }

    return (

        <div className="mask-layer">
            <div className="popup-container">
                <h4>{reminder.name ? "Edit" : "Add"} Reminder</h4>

                <input type="text" name="name" placeholder="Name"
                    onChange={handleChange} value={form.name || ""} />

                <input type="date" name="date" placeholder="Date"
                    onChange={handleChange} value={getDateForInput(form.date || "")} />

                <input type="time" name="time" placeholder="Time"
                    onChange={handleChange} value={form.time || ""} />

                <textarea name="notes" rows={5} placeholder="Notes"
                    onChange={handleChange} value={form.notes || ""} ></textarea>

                <Button type="submit" onClick={handleClick} label={"Save"}></Button>
                <Button onClick={onClose} label={"Cancel"}></Button>
            </div>
        </div>
    )
}
export default ReminderForm;
