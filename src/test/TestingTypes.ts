// @ts-nocheck

/** Type alias for keys of required function in the generic given `Type`.  */
type RequiredFunctionKeys<T> = {
  [P in keyof T]: T[P] extends Function ? P : never;
}[keyof T];

  /** Type alias for keys of all functions in the generic given `Type`. */
  type AllFunctionKeys<T> = {
    [P in keyof T]: T[P] extends Function | undefined ? P : never;
  }[keyof T];

  /** Type alias for the optional functions in the generic given `Type`. */
  type OptionalFunctionKeys<T> = Exclude<
  AllFunctionKeys<T>,
  RequiredFunctionKeys<T>
  >;

  /** Type alias for keys of fields in the generic given `Type`. */
  type FieldKeys<T> = keyof Omit<T, AllFunctionKeys<T>>;

/** Type alias of partial type for `T` that includes only T functions. */
export type OnlyFunctions<T> = {
  [P in AllFunctionKeys<T>]: T[P];
};

  /** Type alias of partial type for `T` that includes only T fields. */
  type OnlyFields<T> = {
    [P in FieldKeys<T>]: T[P];
  };

  /** Type alias of `T` functions as jest mocks. */
  type MockedFunctions<T> = {
    [P in RequiredFunctionKeys<T>]: jest.Mock<ReturnType<T[P]>, Parameters<T[P]>>;
  };

  /** Type alias of `T` optional functions as jest mocks. */
  type OptionalMockedFunctions<T> = {
    [P in OptionalFunctionKeys<T>]?: jest.Mock<
    ReturnType<T[P]>,
    Parameters<T[P]>
    >;
  };

/**
   * Mock type alias for the given generic type `T` where the functions are replaced by jest mocks
   * and the properties are just the same.
   */
export type MockedInterface<T> = MockedFunctions<T> &
OptionalMockedFunctions<T> &
OnlyFields<T>;
