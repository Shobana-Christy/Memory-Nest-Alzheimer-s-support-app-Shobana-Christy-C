
// fetch reminders list from git hub,
// async ensures caller of this function will not wait for the response
export async function fetchReminders() {
    try {
        // await ensures the request will wait for the response
        let response = await fetch("https://raw.githubusercontent.com/Shobana-Christy/data/91592a7c3dd2a904838d79b444a2315d586b9d6a/reminder-data.txt");
        if (response.ok) {
            return response.json();
        }
    } catch (error) {
        return [];
    }
    return [];
}

// retrieve the json from public folder
// async ensures caller of this function will not wait for the response
export async function fetchAlbums() {
    try {
        let response = await fetch("/albums.json");
        if (response.ok) {
            return response.json();
        }
    } catch (error) {
        return [];
    }

    return [];
}

