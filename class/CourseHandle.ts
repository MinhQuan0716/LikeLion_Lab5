import Course from "./Course";

// Interface for update data
interface CourseUpdateData {
  name?: string;
  teacher?: string;
  duration?: number;
}
export class CourseHandler implements ICourse {
  getCourseCount(): number {
    return this.courses.length;
  }
  deleteCourse(id: number): void {
    const courseIndex = this.courses.findIndex((course) => course.id === id);

    if (courseIndex === -1) {
      console.log("❌ Course not found!");
    }

    const deletedCourse = this.courses.splice(courseIndex, 1)[0];
    console.log("🗑️ Course deleted:", deletedCourse);
  }
  private courses: Course[] = [];

  async createCourse(
    name: string,
    teacher: string,
    duration: number
  ): Promise<void> {
    const course = new Course(name, teacher, duration);
    this.courses.push(course);
    console.log("✅ Course added:", course);
  }

  showCourses(): void {
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

  async updateCourse(id: number, updateData: CourseUpdateData): Promise<void> {
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
  async updateCourses(
    ...courseUpdates: Array<{ id: number } & CourseUpdateData>
  ): Promise<void> {
    console.log(`🔄 Updating ${courseUpdates.length} courses...`);

    for (const { id, ...updateData } of courseUpdates) {
      await this.updateCourse(id, updateData);
    }

    console.log("✅ Bulk update completed!");
  }
  findCourseById(id: number): Course | undefined {
    return this.courses.find((course) => course.id === id);
  }

  findCoursesByTeacher(teacherName: string): Course[] {
    return this.courses.filter((course) =>
      course.teacherName.toLowerCase().includes(teacherName.toLowerCase())
    );
  }

  getTotalDuration(): number {
    return this.courses.reduce((total, course) => total + course.duration, 0);
  }
}
