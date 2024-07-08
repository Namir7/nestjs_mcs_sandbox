export type User = {
  id: string;
  name: string;
  email: string;
};

export type Student = User;

export type Course = {
  id: string;
  name: string;
  students: Student[];
};

export type School = {
  name: string;
  domain: string;
  slug: string;
};

export type Partner = {
  user: User;
};

export type Subscription = {
  endAt: Date;
};

export type Plan = {
  name: string;
  endAt: Date;
};

export type Requisite = {
  id: string;
  code: string;
  value: string;
};
