class User {
    constructor(userName, password) {
        this.userName = userName;
        this.password = password;
    }

    logIn(inputPassword) {
        return this.password === inputPassword;
    }

    verifyPassword(inputPassword) {
        return this.logIn(inputPassword);  
    }
}

class Student extends User {
    static studentCount = 0;

    constructor(userName, password) {
        super(userName, password);
        this.studentName = userName;
        this.courses = [];
        this.grades = [];
        this.attendance = [];
        Student.studentCount++;  
    }

    accessInformation() {
        return {
            studentName: this.studentName,
            courses: this.courses.map(course => course.courseName),
            grades: this.grades,
            attendance: this.attendance,
        };
    }

    checkCourses() {
        return this.courses.map(course => course.courseName);
    }

    enroll(course) {
        if (!this.courses.includes(course)) {
            this.courses.push(course);
            course.students.push(this);
        }
    }

    static getStudentCount() {
        return `Total students: ${Student.studentCount}`;
    }

    static resetStudentCount() {
        Student.studentCount = 0;
    }
}

class SystemAdmin extends User {
    constructor(userName, password) {
        super(userName, password);
    }

    manageGrades(student, course, grade, date, status) {
        student.grades.push({ course: course.courseName, grade, date, status });
    }
}

class Course {
    constructor(courseId, courseName, creditLoad) {
        this.courseId = courseId;
        this.courseName = courseName;
        this.creditLoad = creditLoad;
        this.students = []; 
    }
}
// Example usage

// Create some courses
let math101 = new Course(1, "Math 101", 3);
let eco101 = new Course(2, "Economics 101", 4);

// Create users (students and admin)
let tracey = new Student("tracey_shammah", "password123");
let sasha = new Student("sasha_ephriam", "password456");

let admin = new SystemAdmin("admin_user", "adminpass");

// Students enroll in courses
tracey.enroll(math101);
tracey.enroll(eco101);
sasha.enroll(eco101);

// Admin manages grades for students
admin.manageGrades(tracey, math101, "A", "2024-03-04", "Completed");
admin.manageGrades(sasha, eco101, "B", "2024-03-04", "Completed");

// Students can access their information (courses, grades, etc.)
console.log("Tracey's Information:", tracey.accessInformation());
console.log("Sasha's Information:", sasha.accessInformation());

// Check the total number of students
console.log(Student.getStudentCount());

// Create a new student and enroll them in a course
let precious = new Student("precious_eze", "password789");
precious.enroll(math101);

// Accessing student's information after enrollment
console.log("Precious's Information:", precious.accessInformation());

// Check updated student count
console.log(Student.getStudentCount());
