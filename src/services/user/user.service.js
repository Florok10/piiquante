const { UserNotFoundError } = require('./user.error');
const UserModel = require('./user.model');
const User = require('./user.model');

const passwordReg = RegExp(
  '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]+$'
);

const userInputSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'email not valid' }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, { message: 'password too short' })
    .refine((v) => passwordReg.test(v), {
      message: 'The password does not match the rules',
    }),
});

const index = () => {};
const create = () => {};
const findById = async (id) => {
  const user = await UserModel.findById(id).catch(() => null);
  if (user === null) throw new UserNotFoundError();
};
const update = () => {};
const remove = () => {};
