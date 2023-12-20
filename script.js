// เพิ่ม array ของชื่อลงในตัวแปร names
let names = [
    "kanyaphak tantipitham",
    "kanyaphak",
    "tantipitham",
    "latatatata",
    "fname"
];

// สร้างตัวแปรเพื่อเก็บชื่อที่ได้จากการหมุน
let selectedName = "";

// ปรับ function spin()
function spin() {
    let mainbox = document.getElementById("mainbox");
    let spinButton = document.getElementById("spinBtn");
    let number = Math.ceil(Math.random() * 1000);
    mainbox.style.transform = "rotate(" + number + "deg)";

    rotateWheel();
    function rotateWheel() {
        let mainbox = document.getElementById("mainbox");
        let currentRotation = getComputedStyle(mainbox).getPropertyValue("transform");

        // Get the current rotation angle
        let match = currentRotation.match(/(-?\d+(\.\d+)?)/);
        let currentAngle = match ? parseFloat(match[0]) : 0;

        // Generate a random target angle for the wheel to spin to
        let targetAngle = Math.ceil(Math.random() * 3600) + currentAngle;

        // Rotate the wheel continuously until it reaches the target angle
        let rotationInterval = setInterval(() => {
            currentAngle += 20; // Adjust the rotation speed as needed
            mainbox.style.transform = `rotate(${currentAngle}deg)`;

            if (currentAngle >= targetAngle) {
                clearInterval(rotationInterval);
                pickName(currentAngle % 360);
                updateWheel();   // เพิ่มฟังก์ชัน updateWheel เพื่อตรวจสอบและเพิ่มช่องวงล้อ
            }
        }, 10); // Set the rotation interval as needed  

        // หลังจากหมุนจบให้เรียกฟังก์ชัน pickName() ซึ่งจะเลือกชื่อที่ตรงกับตำแหน่งปัจจุบัน
setTimeout(() => {
    pickName(number);
    spinButton.disabled = false;
}, 1000); // 1000 milliseconds (1 วินาที) คือเวลาที่ใช้ในการหมุน

setTimeout(function(){
    Swal.fire({
        position: 'absolute',
        text: `winner name: ${selectedName}`,
        icon: 'success',
        title: 'congratulations',
        // showConfirmButton: false,
        confirmButtonText: 'OK',
        timer: 3000
      })
}, 1000)

setTimeout(function(){
    box.style.setProperty("transition", "initial");
    box.style.transform = "rotate(90deg)";
}, 1000);
    }
}

// ฟังก์ชันเลือกชื่อจากตำแหน่งที่หมุนได้
function pickName(rotation) {
    // หากมีการหมุนเกิน 360 องศา ให้ลบ 360 องศาออก
    rotation %= 360;

    // คำนวณตำแหน่งของชื่อที่ถูกเลือก
    let selectedPosition = Math.floor((rotation / 360) * names.length);

    // เก็บชื่อที่เลือกไว้ในตัวแปร selectedName
    selectedName = names[selectedPosition];

    // เรียกฟังก์ชันเพื่อแสดงว่าชื่อไหนถูกเลือก
    displaySelectedName();

    // ลบชื่อที่ถูกเลือกออกจากอาร์เรย์
  names.splice(selectedPosition, 1);


}

// ฟังก์ชันแสดงชื่อที่ถูกเลือก
function displaySelectedName() {
    // ลบ class 'selected' ออกจากทุก span
    document.querySelectorAll('.font').forEach(span => {
        span.classList.remove('selected');
    });

    let selectedSpan = document.querySelector(`.font.span${names.indexOf(selectedName) + 1}`);
    selectedSpan.classList.add('selected');

    // เพิ่ม class 'selected' ให้กับ span ที่มีชื่อที่ถูกเลือก
    document.querySelector(`.font.span${names.indexOf(selectedName) + 1}`).classList.add('selected');

    // แสดงชื่อที่ถูกเลือกใน console (ในที่นี้สามารถแทนที่ด้วยการแสดงในส่วนที่คุณต้องการ)
    console.log(`Selected Name: ${selectedName}`);
}

function updateWheel() {
    // เพิ่มช่องวงล้อเมื่อมีชื่อเพิ่มเข้ามา
    let box = document.getElementById("box");
    for (let i = names.length + 1; i <= names.length + 3; i++) {
      let newSpan = document.createElement("span");
      newSpan.className = `font span${i}`;
      newSpan.innerHTML = `<h5>name${i}</h5>`;
      box.appendChild(newSpan);
    }
  }

  function displayOutput() {
    // Display the selected name in an alert or console.log
    alert(`Congratulations! You selected: ${selectedName}`);
    // Alternatively, you can output to the console:
    // console.log(`Congratulations! You selected: ${selectedName}`);
}

// เพิ่มลูกศรเพื่อชี้ที่ชื่อที่ถูกเลือก
let arrow = document.createElement('div');
arrow.classList.add('arrow');
selectedSpan.appendChild(arrow);



