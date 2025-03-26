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

// Sort table columns
function sortTable(columnIndex) {
    let table = document.getElementById("sortableTable");

    if (!table) {
        console.error("Sortable table not found!");
        return;
    }

    let tbody = table.querySelector("tbody");
    let rows = Array.from(tbody.querySelectorAll("tr"));

    let isAscending = tbody.dataset.sortOrder === "asc";

    rows.sort((rowA, rowB) => {
        let cellA = rowA.cells[columnIndex].innerText.trim();
        let cellB = rowB.cells[columnIndex].innerText.trim();

        let isNumber = !isNaN(cellA) && !isNaN(cellB);
        if (isNumber) {
            return isAscending ? (Number(cellA) - Number(cellB)) : (Number(cellB) - Number(cellA));
        } else {
            return isAscending ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
        }
    });

    tbody.dataset.sortOrder = isAscending ? "desc" : "asc";
    tbody.innerHTML = "";
    rows.forEach(row => tbody.appendChild(row));
}

// Load table data based on type (Admin or Customer)
async function loadTableData(type) {
    let tableBody = document.getElementById("studentListFor");
    tableBody.innerHTML = "<tr><td colspan='4' class='text-center'>Loading...</td></tr>"; // Show loading message

    if (type === "customer") {
        await displayDataFor();
        return;
    }

    let data = {
        admin: [
            { id: 1, name: "Admin John", age: 35, city: "New York" },
            { id: 2, name: "Admin Alice", age: 30, city: "Los Angeles" },
        ]
    };

    tableBody.innerHTML = ""; // Clear previous data

    if (!data[type]) {
        tableBody.innerHTML = "<tr><td colspan='4' class='text-center'>Invalid selection</td></tr>";
        console.error("Invalid data type:", type);
        return;
    }

    let tableContent = data[type].map(row => `
        <tr>
            <td>${row.id}</td>
            <td>${row.name}</td>
            <td>${row.age}</td>
            <td>${row.city}</td>
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