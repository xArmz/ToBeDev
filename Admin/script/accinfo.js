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

// แสดงข้อมูลในตาราง
async function displayDataFor() {
    const studentData = await getData();
    if (!studentData || studentData.length === 0) return; // ถ้าไม่มีข้อมูล ให้หยุดทำงาน

    let tableContent = studentData.map(student => `
        <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.city}</td>
        </tr>
    `).join('');

    document.getElementById("studentListFor").innerHTML = tableContent;
}

// เรียงลำดับตาราง
function sortTable(columnIndex) {
    let table = document.getElementById("sortableTable");
    let tbody = table.querySelector("tbody");
    let rows = Array.from(tbody.querySelectorAll("tr"));

    let isAscending = tbody.dataset.sortOrder === "asc";
    
    rows.sort((rowA, rowB) => {
        let cellA = rowA.cells[columnIndex].innerText.trim();
        let cellB = rowB.cells[columnIndex].innerText.trim();

        // เช็คว่าเป็นตัวเลขหรือไม่
        let isNumber = !isNaN(cellA) && !isNaN(cellB);
        if (isNumber) {
            return isAscending ? cellA - cellB : cellB - cellA;
        } else {
            return isAscending ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
        }
    });

    tbody.dataset.sortOrder = isAscending ? "desc" : "asc";
    tbody.innerHTML = ""; // ล้างข้อมูลเก่า
    rows.forEach(row => tbody.appendChild(row)); // ใส่ข้อมูลที่เรียงใหม่
}

// ให้สามารถใช้ฟังก์ชันนี้จาก HTML ได้
window.sortTable = sortTable;

// โหลดข้อมูลเมื่อหน้าเว็บเสร็จ
document.addEventListener("DOMContentLoaded", displayDataFor);