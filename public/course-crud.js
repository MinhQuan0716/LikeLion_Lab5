import readline from "node:readline";
import { CourseHandler } from "./CourseHandle.js";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const courseHandler = new CourseHandler();
// Helper function for prompting user input
function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer));
  });
}

// Display the menu
function displayMenu() {
  console.log("\n--- Terminal Menu ---");
  console.log("1. Add course info");
  console.log("2. Show course info");
  console.log("3. Update course info");
  console.log("4. Delete course");
  console.log("5. Exit");
  console.log("---------------------\n");
}
const listCourse = [];
// Function to create course from user input
async function createCourseFromCLI() {
  while (true) {
    const name = await ask("Enter course name (press Enter to skip): ");
    const teacher = await ask("Enter teacher's name (press Enter to skip): ");
    const durationInput = await ask(
      "Enter duration in hours (press Enter to skip): "
    );

    // const duration = parseInt(durationInput);
    // const course = new Course(
    //   name || undefined,
    //   teacher || undefined,
    //   isNaN(duration) ? undefined : duration
    // );

    // listCourse.push(course);
    await courseHandler.createCourse(name, teacher, durationInput);
    console.log("\n✅ Course added:");

    const more = await ask("Do you want to add another course? (y/n): ");
    if (more.toLowerCase() !== "y") {
      break;
    }
  }

  console.log("\n📦 All courses entered:");
}
async function printCourse() {
  courseHandler.showCourses();
}

// Function to update course from user input
async function updateCourseFromCLI() {
  // First, show existing courses
  console.log("\n📚 Current courses:");
  courseHandler.showCourses();

  if (courseHandler.getCourseCount() === 0) {
    console.log("❌ No courses available to update.");
    return;
  }

  const idInput = await ask("\nEnter the Course ID to update: ");
  const id = parseInt(idInput);

  if (isNaN(id)) {
    console.log("❌ Invalid Course ID. Please enter a number.");
    return;
  }

  // Check if course exists
  const existingCourse = courseHandler.findCourseById(id);
  if (!existingCourse) {
    console.log("❌ Course not found!");
    return;
  }

  console.log(`\n📝 Updating course: ${existingCourse.name}`);
  console.log("💡 Press Enter to keep current values\n");

  // Get update data
  const newName = await ask(`Course name (current: ${existingCourse.name}): `);
  const newTeacher = await ask(
    `Teacher name (current: ${existingCourse.teacherName}): `
  );
  const newDurationInput = await ask(
    `Duration in hours (current: ${existingCourse.duration}): `
  );

  // Prepare update data object
  const updateData = {};

  if (newName.trim()) {
    updateData.name = newName.trim();
  }

  if (newTeacher.trim()) {
    updateData.teacher = newTeacher.trim();
  }

  if (newDurationInput.trim()) {
    const newDuration = parseInt(newDurationInput);
    if (!isNaN(newDuration) && newDuration >= 0) {
      updateData.duration = newDuration;
    }
  }

  // Check if any updates were made
  if (Object.keys(updateData).length === 0) {
    console.log("ℹ️ No changes made.");
    return;
  }

  // Apply updates
  await courseHandler.updateCourse(id, updateData);

  console.log("\n📚 Updated course list:");
  courseHandler.showCourses();
}

// Function to delete course from user input
async function deleteCourseFromCLI() {
  console.log("\n📚 Current courses:");
  courseHandler.showCourses();

  if (courseHandler.getCourseCount() === 0) {
    console.log("❌ No courses available to delete.");
    return;
  }

  const idInput = await ask("\nEnter the Course ID to delete: ");
  const id = parseInt(idInput);

  if (isNaN(id)) {
    console.log("❌ Invalid Course ID. Please enter a number.");
    return;
  }

  const existingCourse = courseHandler.findCourseById(id);
  if (!existingCourse) {
    console.log("❌ Course not found!");
    return;
  }

  console.log(`\n🗑️ Are you sure you want to delete: ${existingCourse.name}?`);
  const confirm = await ask("Type 'yes' to confirm: ");

  if (confirm.toLowerCase() === "yes") {
    await courseHandler.deleteCourse(id);
    console.log("\n📚 Updated course list:");
    courseHandler.showCourses();
  } else {
    console.log("❌ Delete cancelled.");
  }
}

// Handle user's choice
async function handleChoice(choice) {
  switch (choice) {
    case "1":
      await createCourseFromCLI();
      break;
    case "2":
      printCourse();
      break;
    case "3":
      await updateCourseFromCLI();
      break;
    case "4":
      await deleteCourseFromCLI();
      break;
    case "5":
      console.log("👋 Exiting...");
      rl.close(); // Close the readline interface
      return true;
    default:
      console.log("❌ Invalid choice. Please try again.");
  }
  return false;
}

// Run the menu loop
async function runMenu() {
  let exit = false;
  while (!exit) {
    displayMenu();
    const choice = await ask("Enter your choice: ");
    exit = await handleChoice(choice);
  }
}

// Start the app
runMenu();
