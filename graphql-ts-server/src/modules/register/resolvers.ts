import * as bcrypt from "bcryptjs";
import { ResolverMap } from "../../types/graphql-utill";
import { User } from "../../entity/User";

export const resolvers: ResolverMap = {
  Query: {
    something: () => "something"
  },
  Mutation: {
    register: async (
      _,
      { email, password }: GQL.IRegisterOnMutationArguments
    ) => {
      const hashPassword = await bcrypt.hash(password, 10);
      const user = User.create({
        email,
        password: hashPassword
      });
      await user.save();
      return true;
    }
  }
};
