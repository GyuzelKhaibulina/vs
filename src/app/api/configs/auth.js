import GoogleProvider from 'next-auth/providers/google';
import { AuthOptions } from 'next-auth';

export const authConfig  = ({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })
    ]
});

