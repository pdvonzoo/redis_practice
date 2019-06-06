import * as bcrypt from "bcryptjs";

import { ResolverMap } from "../../types/graphql-utill";
import { User } from "../../entity/User";
import { invalidEmail } from "../register/errorMessages";
import { confirmEmailError } from "./errorMessage";

const errorResponse = [
  {
    path: "email",
    message: invalidEmail
  }
];

export const resolvers: ResolverMap = {
  Query: {
    something2: () => "something"
  },
  Mutation: {
    login: async (_, { email, password }: GQL.ILoginOnMutationArguments) => {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return errorResponse;
      }

      if (!user.confirmed) {
        return [
          {
            path: "email",
            message: confirmEmailError
          }
        ];
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        return errorResponse;
      }

      return null;
    }
  }
};
