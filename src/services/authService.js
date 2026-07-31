import { DUMMY_USERS } from '../data/dummyUsers';

// TEMPORARY dummy auth service. This is the ONLY file that needs to
// change when the FastAPI backend is ready — swap the body of
// loginDummy() for a real `axios.post('/auth/login', { email, password })`
// call that returns { user, token }. AuthContext, LoginPage, and every
// route guard call this the same way regardless of what's inside it,
// so none of them need to change when the real endpoint arrives.
export function loginDummy({ email, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!email || !password) {
        reject(new Error('Email and password are required'));
        return;
      }

      const match = DUMMY_USERS.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (!match) {
        reject(new Error('Invalid email or password'));
        return;
      }

      resolve({
        user: {
          name: match.name,
          email: match.email,
          role: match.role,
        },
        token: 'dummy-token', // placeholder until JWT is wired up
      });
    }, 400);
  });
}