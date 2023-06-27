export const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;
export const jwtConstants = {
    secret: 'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
  };
export const PORT = process.env.PORT || 3000