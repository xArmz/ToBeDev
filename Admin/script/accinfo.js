async function getData() {
    const url = 'http://localhost:3001/students'; // API URL
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error.message);
        return [];
    }
}

// Fetch and display student data dynamically
async function displayDataFor() {
    const studentData = await getData();
    let tableBody = document.getElementById("studentListFor");

    if (!tableBody) {
        console.error("Table element not found!");
        return;
    }

    tableBody.innerHTML = ""; // Clear previous data

    if (!studentData || studentData.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='4' class='text-center'>No customer data available</td></tr>";
        return;
    }

    let tableContent = studentData.map(student => `
        <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.city}</td>
        </tr>
    `).join('');

    tableBody.innerHTML = tableContent;
}


// Ensure the script runs only after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    let tableBody = document.getElementById("studentListFor");

    if (tableBody) {
        tableBody.innerHTML = "<tr><td colspan='4' class='text-center'>Select an option above</td></tr>";
    }

    document.querySelectorAll(".dropdown-item").forEach(item => {
        item.addEventListener("click", function (e) {
            e.preventDefault();
            const type = this.getAttribute("data-type");
            loadTableData(type);
        });
    });
});

// Expose sortTable function to be used in HTML onclick events
window.sortTable = sortTable;