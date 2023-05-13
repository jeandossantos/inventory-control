declare module Express {
  export interface Request {
    user: {
      id: string;
      name: string;
      email: string;
      isAdmin: boolean;
    };
  }
}
