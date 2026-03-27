export interface Student {
  id: string;
  name: string;
  rollNo: string;
  class: string;
  status: 'Active' | 'Inactive';
  parentName: string;
  contact: string;
}

const firstNames = ['James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Nancy', 'Daniel', 'Lisa', 'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson'];

export const generateMockStudents = (): Student[] => {
  const students: Student[] = [];
  let id = 1;

  for (let grade = 1; grade <= 12; grade++) {
    for (const section of ['A', 'B', 'C']) {
      for (let roll = 1; roll <= 30; roll++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const parentFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        
        students.push({
          id: id.toString(),
          name: `${firstName} ${lastName}`,
          rollNo: `${grade}${section}${roll.toString().padStart(2, '0')}`,
          class: `${grade}-${section}`,
          status: Math.random() > 0.1 ? 'Active' : 'Inactive',
          parentName: `${parentFirstName} ${lastName}`,
          contact: `+1 ${Math.floor(Math.random() * 900 + 100)} ${Math.floor(Math.random() * 900 + 100)} ${Math.floor(Math.random() * 9000 + 1000)}`,
        });
        id++;
      }
    }
  }

  return students;
};

export const students = generateMockStudents();

export const allClassNames = Array.from({ length: 12 }, (_, i) => [
  `${i + 1}-A`,
  `${i + 1}-B`,
  `${i + 1}-C`
]).flat();

export const getStudentsByClass = (className: string): Student[] => {
  return students.filter(s => s.class === className);
};
