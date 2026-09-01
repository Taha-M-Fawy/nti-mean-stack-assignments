alert("Welcome to my site");

let userName = prompt("Enter Your Name");

if (userName !== null && userName.trim() !== "") {
    alert(`Welcome ${userName}!`);
} else {
    alert("Welcome Guest!");
}

var classMarks = [
    [85, 90, 78, 92], // Class 1
    [70, 88, 65, 80], // Class 2
    [95, 82, 89, 91]  // Class 3
];

let listElement = document.getElementById("list");

for (var i = 0; i < classMarks.length; i++) {
    listElement.innerHTML += `<li><strong>--- Class ${i + 1} ---</strong></li>`;
    
    for (var j = 0; j < classMarks[i].length; j++) {
        console.log("Student " + (j + 1) + " Mark: " + classMarks[i][j]);
        
        listElement.innerHTML += `<li>Student ${j + 1} Mark: ${classMarks[i][j]}</li>`;
    }
}


for (var i = 0; i < classMarks.length; i++) {
    var sum = 0;

    for (var j = 0; j < classMarks[i].length; j++) {
        sum += classMarks[i][j];
    }

    var average = sum / classMarks[i].length;
    var grade = "";

    switch (true) {
        case (average >= 85):
            grade = "A";
            break;
        case (average >= 70 && average < 85):
            grade = "B";
            break;
        case (average >= 50 && average < 70):
            grade = "C";
            break;
        default:
            grade = "F";
            break;
    }

    console.log(`Class ${i + 1}: Average = ${average.toFixed(2)}, Grade = ${grade}`);
}
