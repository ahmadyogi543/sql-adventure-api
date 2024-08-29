export type Progress = {
  id: number;
  value: number;
  lastPlayed: Date;
};

export type User = {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
  score: number;
};
