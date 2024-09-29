import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      bio?: string;
      avatar?: string;
    } & DefaultSession['user'];
  }

  interface JWT {
    id: string;
    bio?: string;
    avatar?: string;
  }
}
