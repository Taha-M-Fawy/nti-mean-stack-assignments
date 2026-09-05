// ================= Part 1: FacultySystemDB =================
use("FacultySystemDB");

// 1. Insert One Document
db.students.insertOne({
  FirstName: "Taha",
  LastName: "Fawy",
  Age: 21,
  Faculty: { Name: "Computer Science", Address: "Qena" },
  Grades: [
    { CourseName: "MongoDB", Grade: "A", Pass: true }
  ],
  IsFired: false
});

// 2. Insert Many Documents
db.students.insertMany([
  {
    FirstName: "Ahmed",
    LastName: "Ali",
    Age: 20,
    Faculty: { Name: "Engineering", Address: "Cairo" },
    Grades: [
      { CourseName: "Math", Grade: "B", Pass: true }
    ],
    IsFired: true
  },
  {
    FirstName: "Sara",
    LastName: "Ahmed",
    Age: 22,
    Faculty: null,
    Grades: [
      { CourseName: "Database", Grade: "F", Pass: false }
    ],
    IsFired: false
  }
]);

// 3. Retrieval Queries
db.students.find();

db.students.find({ FirstName: "Taha" });

db.students.find({
  $or: [
    { FirstName: "Ahmed" },
    { LastName: "Ahmed" }
  ]
});

db.students.find({ FirstName: { $ne: "Ahmed" } });

db.students.find({ Age: { $lt: 21 } });

db.students.find({ IsFired: true });

db.students.find({
  Age: { $gte: 21 },
  Faculty: { $ne: null }
});

// Projection 
db.students.find(
  { FirstName: "Taha" },
  { FirstName: 1, LastName: 1, IsFired: 1, _id: 0 }
);

// 4. Update
db.students.updateOne(
  { FirstName: "Taha" },
  { $set: { LastName: "Mohammed" } }
);

// 5. Indexing
db.students.createIndex({ LastName: 1 });

// 6. Delete Operations
// Delete selected field
// db.students.updateOne(
//   { FirstName: "Taha" },
//   { $unset: { Age: "" } }
// );

// Delete fired students
// db.students.deleteMany({ IsFired: true });

// Delete all students (all documents)
// db.students.deleteMany({});

// Delete collection
// db.students.drop();

// Delete the whole DB
// db.dropDatabase();


// ================= Part 2: FacultySystemV2 & Bonus =================
use("FacultySystemV2");

// Create Faculty Collection
db.Faculty.insertOne({
  _id: 1,
  FacultyName: "Computer Science",
  Address: "Qena"
});

// Create Course Collection
db.Course.insertMany([
  { _id: 10, CourseName: "MongoDB", FinalMark: 100 },
  { _id: 20, CourseName: "NodeJS", FinalMark: 100 }
]);

// Create Student Collection (Referencing)
db.student.insertOne({
  FirstName: "Taha",
  LastName: "Fawy",
  IsFired: false,
  FacultyID: 1, 
  courses: [   
    { CourseID: 10, grade: 95 },
    { CourseID: 20, grade: 90 }
  ]
});

// Bonus: Display each student along with course grades ($lookup)
db.student.aggregate([
  { $unwind: "$courses" },
  {
    $lookup: {
      from: "Course",
      localField: "courses.CourseID",
      foreignField: "_id",
      as: "courseDetails"
    }
  },
  { $unwind: "$courseDetails" },
  {
    $project: {
      _id: 0,
      FirstName: 1,
      LastName: 1,
      CourseName: "$courseDetails.CourseName",
      Grade: "$courses.grade"
    }
  }
]);