//ดึงข้อมูลจากไฟล์ Json.json ไปแสดงผล
const list = document.getElementById("list")
let output = ''
fetch("09-User.json")
.then(res=>res.json())
.then(json=>{
    console.log(json)
}).catch(err=>{
    console.log(err)
})