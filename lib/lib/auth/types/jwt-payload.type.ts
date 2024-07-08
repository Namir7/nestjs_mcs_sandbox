/*
  id - superior user
  uuid - current user ?
*/

export type JwtPayload = {
  id: number;
  uuid: string;
  expired: number;
};
