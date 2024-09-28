import { DefaultSession } from 'next-auth';

// Extend the session and JWT types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      bio?: string;      // Add bio
      avatar?: string;   // Add avatar
    } & DefaultSession['user'];
  }

  interface JWT {
    id: string;
    bio?: string;      // Add bio
    avatar?: string;   // Add avatar
  }
}
