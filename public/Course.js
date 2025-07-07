let idCounter = 1;
class Course {
    constructor(name = "Untited Course", teacherName = "Unassign name", duration = 0) {
        this.duration = 0;
        this.id = idCounter++;
        this.name = name || "Untitled Course";
        this.teacherName = teacherName || "Unassigned name";
        this.duration = duration || 0;
    }
    setId() {
        this.id = this.id + 1;
    }
    setName(newName) {
        this.name = newName;
    }
    setTeacherName(newTeacherName) {
        this.teacherName = newTeacherName;
    }
    setDuration(newDuration) {
        this.duration = newDuration;
    }
}
export default Course;
