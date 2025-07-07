interface ICourse {
  createCourse(name: string, teacher: string, duration: number): Promise<void>;
  showCourses(): void;
  updateCourse(id: number, updateData: CourseUpdateData): Promise<void>;
  deleteCourse(id: number): void;
  getCourseCount(): number;
}
interface CourseUpdateData {
  name?: string;
  teacher?: string;
  duration?: number;
}
