import Course from "./Course.js";
export class CourseHandler {
  constructor() {
    this.courses = [];
  }
  getCourseCount() {
    return this.courses.length;
  }
  deleteCourse(id) {
    const courseIndex = this.courses.findIndex((course) => course.id === id);
    if (courseIndex === -1) {
      console.log("❌ Course not found!");
    }
    const deletedCourse = this.courses.splice(courseIndex, 1)[0];
    console.log("🗑️ Course deleted:", deletedCourse);
  }
  async createCourse(name, teacher, duration) {
    const course = new Course(name, teacher, duration);
    this.courses.push(course);
    console.log("✅ Course added:", course);
  }
  showCourses() {
    if (this.getCourseCount() === 0) {
      console.log("You havent add any course yet");
    } else {
      console.log("📚 Course List:");
      this.courses.forEach((c) =>
        console.log(
          `- Course Id: ${c.id}, ${c.name} by ${c.teacherName} (${c.duration} hrs)`
        )
      );
    }
  }
  async updateCourse(id, updateData) {
    const courseIndex = this.courses.findIndex((course) => course.id === id);
    if (courseIndex === -1) {
      console.log("❌ Course not found!");
      return;
    }
    const course = this.courses[courseIndex];
    const { name, teacher, duration } = updateData;
    // Use spread operator to create clean update object
    const updates = {
      ...(name && name.trim() && { name }),
      ...(teacher && teacher.trim() && { teacherName: teacher }),
      ...(duration !== undefined && duration >= 0 && { duration }),
    };
    // Apply updates using Object.assign
    Object.assign(course, updates);
    console.log("✅ Course updated:", course);
  }
  // Bonus: Bulk update using rest parameters
  async updateCourses(...courseUpdates) {
    console.log(`🔄 Updating ${courseUpdates.length} courses...`);
    for (const { id, ...updateData } of courseUpdates) {
      await this.updateCourse(id, updateData);
    }
    console.log("✅ Bulk update completed!");
  }
  findCourseById(id) {
    return this.courses.find((course) => course.id === id);
  }
  findCoursesByTeacher(teacherName) {
    return this.courses.filter((course) =>
      course.teacherName.toLowerCase().includes(teacherName.toLowerCase())
    );
  }
  getTotalDuration() {
    return this.courses.reduce((total, course) => total + course.duration, 0);
  }
}
