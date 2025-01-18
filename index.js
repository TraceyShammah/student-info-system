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
// create some courses
let math101 = new Course(1, "Math 101", 3);
let sci101 = new Course(2, "Science 101", 4);

// Create users (students and admin)
let john = new Student("john_doe", "password123");
let jane = new Student("jane_smith", "password456");

let admin = new SystemAdmin("admin_user", "adminpass");

// Students enroll in courses
john.enroll(math101);
john.enroll(sci101);
jane.enroll(sci101);

// Admin manages grades for students
admin.manageGrades(john, math101, "A", "2025-01-18", "Completed");
admin.manageGrades(jane, sci101, "B", "2025-01-18", "Completed");

// Students can access their information (courses, grades, etc.)
console.log("John's Information:", john.accessInformation());
console.log("Jane's Information:", jane.accessInformation());

// Check the total number of students
console.log(Student.getStudentCount());

// Create a new student and enroll them in a course
let tom = new Student("tom_jones", "password789");
tom.enroll(math101);

// Accessing student's information after enrollment
console.log("Tom's Information:", tom.accessInformation());

// Check updated student count
console.log(Student.getStudentCount());

