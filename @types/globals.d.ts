interface User {
  username: string;
  photoUrl: string;
}

declare global {
  User;
}
