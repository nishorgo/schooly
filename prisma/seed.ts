import { Day, PrismaClient, UserSex } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // ADMIN
  await prisma.admin.create({
    data: {
      id: "admin1",
      username: "admin1",
    },
  });
  await prisma.admin.create({
    data: {
      id: "admin2",
      username: "admin2",
    },
  });

  // GRADE
  for (let i = 1; i <= 6; i++) {
    await prisma.grade.create({
      data: {
        level: i,
      },
    });
  }

  // CLASS
  for (let i = 1; i <= 6; i++) {
    await prisma.class.create({
      data: {
        name: `${i}A`, 
        gradeId: i, 
        capacity: Math.floor(Math.random() * (20 - 15 + 1)) + 15,
      },
    });
  }

  // SUBJECT
  const subjectData = [
    { name: "Mathematics" },
    { name: "Science" },
    { name: "English" },
    { name: "History" },
    { name: "Geography" },
    { name: "Physics" },
    { name: "Chemistry" },
    { name: "Biology" },
    { name: "Computer Science" },
    { name: "Art" },
  ];

  for (const subject of subjectData) {
    await prisma.subject.create({ data: subject });
  }

  // TEACHER
  const teacherNames = [
    "Emma Thompson", "Michael Chen", "Sophia Rodriguez", "Liam O'Connor", "Olivia Patel",
    "Noah Kim", "Ava Nguyen", "Ethan Singh", "Isabella Martinez", "Mason Johnson",
    "Mia Williams", "Alexander Lee", "Charlotte Brown", "William Davis", "Amelia Taylor",
    "James Wilson", "Harper Anderson", "Benjamin Moore", "Evelyn Jackson", "Lucas White",
    "Abigail Harris", "Daniel Martin", "Emily Thomas", "Henry Garcia", "Elizabeth Clark",
    "Samuel Robinson", "Sofia Lewis", "Joseph Walker", "Victoria Hall", "David Allen",
    "Grace Young", "Christopher King", "Chloe Wright", "Andrew Scott", "Zoe Green"
  ];

  const addresses = [
    "123 Maple Street, Springfield, IL 62701",
    "456 Oak Avenue, Riverside, CA 92501",
    "789 Pine Road, Lakeside, NY 14750",
    "101 Cedar Lane, Mountain View, CO 80401",
    "202 Elm Court, Seaside, FL 32459",
    "303 Birch Drive, Hillside, TX 78641",
    "404 Willow Way, Valleytown, OR 97301",
    "505 Spruce Circle, Meadowville, WA 98101",
    "606 Ash Street, Sunnydale, AZ 85001",
    "707 Beech Boulevard, Forestville, MI 48001",
    "808 Chestnut Avenue, Brookside, GA 30301",
    "909 Dogwood Road, Cliffside, NC 28001",
    "1010 Fir Lane, Harborview, MA 02101",
    "1111 Hickory Street, Plainsville, OH 44101",
    "1212 Juniper Court, Mountainside, UT 84101",
    "1313 Linden Drive, Lakeview, MN 55101",
    "1414 Magnolia Way, Hilltop, PA 17101",
    "1515 Poplar Place, Valleyview, NJ 07101",
    "1616 Redwood Road, Cliffview, SC 29201",
    "1717 Sycamore Street, Bayside, VA 23201",
    "1818 Walnut Avenue, Parkside, KY 40201",
    "1919 Yew Court, Creekside, WI 53201",
    "2020 Alder Lane, Woodside, IN 46201",
    "2121 Birchwood Drive, Highlands, NM 87501",
    "2222 Cedarwood Way, Lowlands, ND 58201",
    "2323 Elmwood Road, Plainview, SD 57201",
    "2424 Firwood Street, Ridgetop, WY 82001",
    "2525 Gumwood Court, Lakeland, ID 83201",
    "2626 Hazelwood Avenue, Hillcrest, NE 68501",
    "2727 Ironwood Lane, Valleyside, KS 66601",
    "2828 Jacaranda Place, Cliffside, MT 59601",
    "2929 Koa Street, Seaside, HI 96801",
    "3030 Laurel Drive, Riverside, AK 99501",
    "3131 Manzanita Way, Mountainview, WV 25301",
    "3232 Nutwood Road, Lakeside, ME 04330"
  ];

  const usedTeacherEmails = new Set();

  for (let i = 0; i < 35; i++) {
    const [firstName, lastName] = teacherNames[i].split(' ');
    let email;
    do {
      email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@school.edu`;
    } while (usedTeacherEmails.has(email));
    usedTeacherEmails.add(email);

    await prisma.teacher.create({
      data: {
        id: `teacher${i + 1}`,
        username: `teacher${i + 1}`,
        name: firstName,
        surname: lastName,
        email: email,
        phone: `${Math.floor(100 + Math.random() * 900)}-${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
        address: addresses[i],
        bloodType: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"][Math.floor(Math.random() * 8)],
        sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
        subjects: { connect: [{ id: (i % 10) + 1 }] },
        classes: { connect: [{ id: (i % 6) + 1 }] },
        birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 25 - Math.floor(Math.random() * 30))),
      },
    });
  }

  // LESSON
  for (let i = 1; i <= 30; i++) {
    await prisma.lesson.create({
      data: {
        name: `Lesson${i}`, 
        day: Day[
          Object.keys(Day)[
            Math.floor(Math.random() * Object.keys(Day).length)
          ] as keyof typeof Day
        ], 
        startTime: new Date(new Date().setHours(new Date().getHours() + 1)), 
        endTime: new Date(new Date().setHours(new Date().getHours() + 3)), 
        subjectId: (i % 10) + 1, 
        classId: (i % 6) + 1, 
        teacherId: `teacher${(i % 15) + 1}`, 
      },
    });
  }

  // PARENT
  const parentFirstNames = [
    "John", "Mary", "David", "Sarah", "Michael", "Jennifer", "Robert", "Lisa", "William", "Elizabeth",
    "Richard", "Linda", "Thomas", "Patricia", "Charles", "Barbara", "Daniel", "Margaret", "Joseph", "Susan",
    "Mark", "Dorothy", "Donald", "Karen", "George", "Nancy", "Kenneth", "Betty", "Steven", "Helen"
  ];

  const parentLastNames = [
    "Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor",
    "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson",
    "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "Hernandez", "King"
  ];

  const usedParentEmails = new Set();

  for (let i = 1; i <= 250; i++) {
    let firstName, lastName, email;
    do {
      firstName = parentFirstNames[Math.floor(Math.random() * parentFirstNames.length)];
      lastName = parentLastNames[Math.floor(Math.random() * parentLastNames.length)];
      email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`;
    } while (usedParentEmails.has(email));

    usedParentEmails.add(email);

    await prisma.parent.create({
      data: {
        id: `parentId${i}`,
        username: `parent${i}`,
        name: firstName,
        surname: lastName,
        email: email,
        phone: `${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        address: generateAddress(),
      },
    });
  }

  // STUDENT
  const firstNames = [
    "Emma", "Liam", "Olivia", "Noah", "Ava", "Ethan", "Sophia", "Mason", "Isabella", "William",
    "Mia", "James", "Charlotte", "Benjamin", "Amelia", "Lucas", "Harper", "Alexander", "Evelyn", "Daniel",
    "Abigail", "Henry", "Emily", "Samuel", "Elizabeth", "Michael", "Avery", "Owen", "Ella", "Sebastian",
    "Scarlett", "Christopher", "Grace", "Joseph", "Chloe", "David", "Zoey", "John", "Lily", "Andrew",
    "Madison", "Lincoln", "Layla", "Wyatt", "Penelope", "Gabriel", "Riley", "Jack", "Nora", "Luke"
  ];

  const lastNames = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
    "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
    "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson",
    "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores",
    "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts"
  ];

  function generateAddress() {
    const streets = [
      "Maple Street", "Oak Avenue", "Pine Road", "Cedar Lane", "Birch Boulevard",
      "Elm Court", "Willow Way", "Spruce Drive", "Ash Circle", "Poplar Path",
      "Chestnut Avenue", "Sycamore Street", "Magnolia Boulevard", "Cypress Lane", "Beech Road"
    ];

    const cities = [
      "Springfield", "Rivertown", "Lakeside", "Hillcrest", "Meadowbrook",
      "Forestville", "Sunnydale", "Brookhaven", "Oakville", "Maplewood"
    ];

    const states = [
      "CA", "TX", "FL", "NY", "PA", "IL", "OH", "GA", "NC", "MI",
      "NJ", "VA", "WA", "AZ", "MA", "TN", "IN", "MO", "MD", "WI"
    ];

    const number = Math.floor(Math.random() * 9000) + 1000;
    const street = streets[Math.floor(Math.random() * streets.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const state = states[Math.floor(Math.random() * states.length)];
    const zip = Math.floor(Math.random() * 90000) + 10000;
    return `${number} ${street}, ${city}, ${state} ${zip}`;
  }

  const usedEmails = new Set();

  for (let i = 1; i <= 300; i++) {
    let firstName, lastName, email;
    do {
      firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`;
    } while (usedEmails.has(email));

    usedEmails.add(email);

    await prisma.student.create({
      data: {
        id: `student${i}`,
        username: `student${i}`,
        name: firstName,
        surname: lastName,
        email: email,
        phone: `${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        address: generateAddress(),
        bloodType: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"][Math.floor(Math.random() * 8)],
        sex: Math.random() < 0.5 ? UserSex.MALE : UserSex.FEMALE,
        parentId: `parentId${Math.ceil(i / 12) % 25 || 25}`,
        gradeId: (i % 6) + 1,
        classId: (i % 6) + 1,
        birthday: new Date(new Date().setFullYear(new Date().getFullYear() - Math.floor(Math.random() * 5 + 8))),
      },
    });
  }

  // EXAM
  for (let i = 1; i <= 10; i++) {
    await prisma.exam.create({
      data: {
        title: `Exam ${i}`, 
        startTime: new Date(new Date().setHours(new Date().getHours() + 1)), 
        endTime: new Date(new Date().setHours(new Date().getHours() + 2)), 
        lessonId: (i % 30) + 1, 
      },
    });
  }

  // ASSIGNMENT
  for (let i = 1; i <= 10; i++) {
    await prisma.assignment.create({
      data: {
        title: `Assignment ${i}`, 
        startDate: new Date(new Date().setHours(new Date().getHours() + 1)), 
        dueDate: new Date(new Date().setDate(new Date().getDate() + 1)), 
        lessonId: (i % 30) + 1, 
      },
    });
  }

  // RESULT
  for (let i = 1; i <= 10; i++) {
    await prisma.result.create({
      data: {
        score: 90, 
        studentId: `student${i}`, 
        ...(i <= 5 ? { examId: i } : { assignmentId: i - 5 }), 
      },
    });
  }

  
  // ATTENDANCE
  const workingDays = [Day.MONDAY, Day.TUESDAY, Day.WEDNESDAY, Day.THURSDAY, Day.FRIDAY];
  const currentDate = new Date();
  const mondayOfThisWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1));

  for (let i = 1; i <= 300; i++) {
    for (let dayOffset = 0; dayOffset < 5; dayOffset++) {
      const attendanceDate = new Date(mondayOfThisWeek);
      attendanceDate.setDate(attendanceDate.getDate() + dayOffset);
      
      await prisma.attendance.create({
        data: {
          date: attendanceDate,
          present: Math.random() < 0.8, // 90% chance of being present
          studentId: `student${i}`,
          lessonId: (i % 30) + 1,
        },
      });
    }
  }

  // EVENT
  const events = [
    { title: "Parent-Teacher Conference", description: "Annual meeting for parents and teachers to discuss student progress" },
    { title: "Science Fair", description: "Students showcase their scientific projects and experiments" },
    { title: "Career Day", description: "Professionals from various fields visit to share insights about their careers" },
    { title: "Book Fair", description: "Week-long event promoting reading with books available for purchase" },
    { title: "Sports Day", description: "Annual athletic competition featuring various sports and activities" },
    { title: "Art Exhibition", description: "Showcase of student artwork from all grade levels" },
    { title: "Math Olympiad", description: "Competition to test students' mathematical skills and problem-solving abilities" },
    { title: "Cultural Diversity Day", description: "Celebration of different cultures represented in our school community" },
    { title: "Environmental Awareness Workshop", description: "Interactive session on sustainability and eco-friendly practices" },
    { title: "Music Recital", description: "Students perform musical pieces they've been practicing throughout the year" },
    { title: "Debate Tournament", description: "Inter-school debate competition on current affairs and social issues" },
    { title: "Coding Bootcamp", description: "Intensive weekend workshop introducing students to programming basics" },
    { title: "Graduation Ceremony", description: "Celebration of students completing their academic journey" },
    { title: "School Play", description: "Annual theatrical performance showcasing students' acting talents" },
    { title: "College Fair", description: "Representatives from various universities provide information to prospective students" },
    { title: "Spelling Bee", description: "Competition to test students' spelling skills across different grade levels" },
    { title: "Health and Wellness Fair", description: "Promoting healthy lifestyles with information booths and activities" },
    { title: "Technology Expo", description: "Showcase of latest educational technology and student tech projects" },
    { title: "Poetry Slam", description: "Students perform original poetry in a competitive format" },
    { title: "International Food Festival", description: "Celebration of global cuisines prepared by students and families" }
  ];

  for (let i = 0; i < events.length; i++) {
    await prisma.event.create({
      data: {
        title: events[i].title,
        description: events[i].description,
        startTime: new Date(new Date().setHours(new Date().getHours() + i + 1)),
        endTime: new Date(new Date().setHours(new Date().getHours() + i + 3)),
        classId: (i % 5) + 1,
      },
    });
  }

  // ANNOUNCEMENT
  const announcements = [
    { title: "School Closure Due to Severe Weather", description: "Due to the forecasted snowstorm, all classes will be canceled tomorrow. Stay safe and warm!" },
    { title: "New Library Hours", description: "Starting next week, the school library will be open until 6 PM on weekdays to accommodate students' study needs." },
    { title: "Upcoming Vaccination Drive", description: "A free flu vaccination clinic will be held in the school gymnasium next Tuesday. Please return the consent form by Friday." },
    { title: "Changes to Lunch Menu", description: "We're excited to introduce new healthy options in our cafeteria starting next month. Check the website for the updated menu." },
    { title: "Parent-Teacher Conference Schedule", description: "The fall parent-teacher conferences are scheduled for October 15-16. Please sign up for your preferred time slot online." },
    { title: "Annual School Play Auditions", description: "Auditions for this year's production of 'Romeo and Juliet' will be held next Wednesday after school in the auditorium." },
    { title: "New Security Measures", description: "Starting next week, all visitors must check in at the main office and wear a visitor's badge while on campus." },
    { title: "Fundraiser for School Trip", description: "The sophomore class is selling chocolate bars to raise funds for their Washington D.C. trip. Your support is appreciated!" },
    { title: "Update to School Dress Code", description: "Please note that starting next semester, ripped jeans will no longer be allowed as part of the school dress code." },
    { title: "New After-School Tutoring Program", description: "We're launching a peer tutoring program every Tuesday and Thursday from 3-4 PM in the library. All students are welcome!" }
  ];

  for (let i = 0; i < announcements.length; i++) {
    await prisma.announcement.create({
      data: {
        title: announcements[i].title,
        description: announcements[i].description,
        date: new Date(new Date().setDate(new Date().getDate() + i)),
        classId: (i % 5) + 1,
      },
    });
  }

  console.log("Seeding completed successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });