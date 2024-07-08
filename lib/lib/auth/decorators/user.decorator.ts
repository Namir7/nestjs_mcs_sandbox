import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export type UserContext = {
  id: string;
};

export const User = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(context);

    const user: UserContext = gqlContext.getContext().req.user;

    return user;
  },
);

export const UserId = createParamDecorator<string>(
  (_: unknown, ctx: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(ctx);

    const user: UserContext = gqlContext.getContext().req.user;

    return user?.id;
  },
);
