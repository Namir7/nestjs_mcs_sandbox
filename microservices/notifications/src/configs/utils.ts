type Options<T> = {
  default?: T;
};

const useDefaultMessage = (name: string, defaultValue: unknown) =>
  `"${name}" env param not defined default value used - ${defaultValue}`;

const rejectMessage = (name: string, value: unknown) =>
  `"${name}" env param is not defined or not valid: ${value}`;

// TODO: add polymorf hight order function
// ex: resolveCommon( params, resolvers: [ parse ], options )

export const resolveStr = (
  name: string,
  value: unknown,
  options?: Options<string>,
) => {
  const parsed = value as string;

  if (options?.default && value === undefined) {
    console.error(useDefaultMessage(name, options.default));

    return options.default;
  }

  if (parsed === undefined) {
    throw new Error(rejectMessage(name, value));
  }

  return parsed;
};

export const resolveInt = (
  name: string,
  value: unknown,
  options?: Options<number>,
): number => {
  const parsed = parseInt(value as string);

  if (options?.default && value === undefined) {
    console.error(useDefaultMessage(name, options.default));

    return options.default;
  }

  if (!(typeof parsed === 'number' && Number.isInteger(parsed))) {
    throw new Error(rejectMessage(name, value));
  }

  return parsed;
};

export const resolveBool = (
  name: string,
  value: unknown,
  options?: Options<boolean>,
): boolean => {
  const isBoolStr = ['false', 'true'].includes(value as string);

  if (options?.default && value === undefined) {
    console.error(useDefaultMessage(name, options.default));

    return options.default;
  }

  if (!isBoolStr) {
    throw new Error(rejectMessage(name, value));
  }

  return value === 'true' ? true : false;
};
