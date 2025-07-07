let idCounter = 1;
class Course {
  id: number;
  name: string;
  teacherName: string;
  duration = 0;
  constructor(
    name = "Untited Course",
    teacherName = "Unassign name",
    duration = 0
  ) {
    this.id = idCounter++;
    this.name = name || "Untitled Course";
    this.teacherName = teacherName || "Unassigned name";
    this.duration = duration || 0;
  }
  setId() {
    this.id = this.id + 1;
  }
  setName(newName: string) {
    this.name = newName;
  }
  setTeacherName(newTeacherName: string) {
    this.teacherName = newTeacherName;
  }
  setDuration(newDuration: number) {
    this.duration = newDuration;
  }
}
export default Course;
