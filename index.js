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
