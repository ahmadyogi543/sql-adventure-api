// RECORDS

export type UserProgress = {
  user_id: number;
  values: number[];
};

export type User = {
  id: number;
  username: string;
  password_hash: string;
  score: number;
};

// RETURN VALUES
export type GetAllUsersResult = {
  users: User[];
  error: Error | null;
};

export type GetAllUsersProgress = {
  usersProgress: UserProgress[];
  error: Error | null;
};

export type GetOneUserResult = {
  user: User | null;
  error: Error | null;
};

export type GetOneUserProgress = {
  userProgress: UserProgress | null;
  error: Error | null;
};

export type AddOneUserResult = {
  user: { id: number; username: string } | null;
  error: Error | null;
};
