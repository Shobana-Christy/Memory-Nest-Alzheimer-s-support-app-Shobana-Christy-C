
export async function fetchReminders() {
    try {
        let response = await fetch("https://raw.githubusercontent.com/Shobana-Christy/data/91592a7c3dd2a904838d79b444a2315d586b9d6a/reminder-data.txt");
        if (response.ok) {
            return response.json();
        }
    } catch (error) {
        return [];
    }
    return [];
}

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

