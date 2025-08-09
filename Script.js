// === Fetch and display a random quote ===
function loadQuote() {
    fetch("https://api.quotable.io/random")
        .then(response => response.json())
        .then(data => {
            const quoteEl = document.getElementById("quote");
            if (quoteEl) {
                quoteEl.textContent = `"${data.content}" — ${data.author}`;
            }
        })
        .catch(() => {
            const quoteEl = document.getElementById("quote");
            if (quoteEl) {
                quoteEl.textContent = "Couldn't load a quote right now. Try again later!";
            }
        });
}

// === Display Timetable as Monday-Sunday Table ===
function displayTimetableTable() {
    const timetable = JSON.parse(localStorage.getItem('timetableData')) || [];
    const tbody = document.getElementById('timetable-body');
    if (!tbody) return;

    let days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    let row = "<tr>";
    days.forEach(day => {
        let entries = timetable.filter(item => item.day === day)
                               .map(item => `${item.subject} (${item.time})`)
                               .join("<br>");
        row += `<td>${entries || "-"}</td>`;
    });
    row += "</tr>";
    tbody.innerHTML = row;
}

// === Add timetable entry (Toolkit) ===
function addTimetable() {
    const subject = document.getElementById('subject').value;
    const time = document.getElementById('time').value;
    const day = document.getElementById('day').value;
    if (!subject || !time || !day) return;

    let timetable = JSON.parse(localStorage.getItem('timetableData')) || [];
    timetable.push({ subject, time, day });
    localStorage.setItem('timetableData', JSON.stringify(timetable));

    alert('Timetable entry added!');
}

// === Display Reminders with Check/Remove ===
function displayReminders() {
    const reminders = JSON.parse(localStorage.getItem('reminderData')) || [];
    const list = document.getElementById('reminders-display');
    if (!list) return;
    list.innerHTML = "";

    reminders.forEach((reminder, index) => {
        const li = document.createElement('li');

        // Create checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.onchange = () => markReminderDone(index);

        // Create text container
        const text = document.createElement('span');
        text.innerHTML = `<strong>${reminder.task}</strong> - ${reminder.details} 
                          <em>(Due: ${reminder.date})</em>`;

        // Append to li
        li.appendChild(checkbox);
        li.appendChild(text);

        list.appendChild(li);
    });
}

function markReminderDone(index) {
    let reminders = JSON.parse(localStorage.getItem('reminderData')) || [];
    reminders.splice(index, 1);
    localStorage.setItem('reminderData', JSON.stringify(reminders));
    displayReminders();
}

// === Notes Save/Load ===
function saveNotes() {
    const notes = document.getElementById('notes').value;
    localStorage.setItem('quickNotes', notes);
    document.getElementById('save-status').innerText = "Notes saved!";
    setTimeout(() => {
        document.getElementById('save-status').innerText = "";
    }, 2000);
}

function loadNotes() {
    const savedNotes = localStorage.getItem('quickNotes');
    if (savedNotes) document.getElementById('notes').value = savedNotes;
}

// === On Page Load ===
window.onload = function () {
    loadQuote();           // Load a random quote
    displayTimetableTable();
    displayReminders();
    loadNotes();
};
