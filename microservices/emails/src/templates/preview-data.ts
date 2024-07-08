import {
  School,
  Subscription,
  User,
  Course,
  Partner,
  Plan,
  Requisite,
} from "common/types";

export const school: School = {
  name: "Twilio",
  domain: "example.com",
  slug: "twilio",
};

export const users: User[] = [
  {
    id: "00000000-0000-0000-0000-000000000000",
    name: "Nika",
    email: "mail@example.com",
  },
  {
    id: "00000000-0000-0000-0000-000000000001",
    name: "Francis",
    email: "mail@example.com",
  },
  {
    id: "00000000-0000-0000-0000-000000000002",
    name: "Alexy Borodinov",
    email: "mail@example.com",
  },
];

export const courses: Course[] = [
  {
    id: "00000000-0000-0000-0000-000000000000",
    name: "Frontend developer",
    students: [users[0], users[1]],
  },
  {
    id: "00000000-0000-0000-0000-000000000001",
    name: "Street Art",
    students: [users[2]],
  },
];

export const course: Course = courses[0];

export const user: User = users[0];

export const partner: Partner = {
  user: users[0],
};

export const plan: Plan = {
  name: "Standard",
  endAt: new Date(),
};

export const subscription: Subscription = {
  endAt: new Date(),
};

export const requisites: Requisite[] = [
  {
    id: "00000000-0000-0000-0000-000000000000",
    code: "Kaspi Bank",
    value: "KZ67722S000004168957",
  },
  {
    id: "00000000-0000-0000-0000-000000000001",
    code: "Sberbank",
    value: "30101810500000000641",
  },
];

export const requisite: Requisite = requisites[0];
