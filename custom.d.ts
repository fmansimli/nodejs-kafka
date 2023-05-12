declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

interface User {
  _id: string;
  tid: string;
  roles: string[];
}
