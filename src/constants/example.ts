// Example 1
// Indexed access types
type Person = { age: number; name: string; alive: boolean };
type Age = Person["age"]; // type Age = number
type I1 = Person["age" | "name"]; // type I1 = string | number
type I2 = Person[keyof Person]; // type I2 = string | number | boolean

//only use types when indexing
type AliveOrName = "alive" | "name";
type I3 = Person[AliveOrName]; // type I3 = string | boolean

// Example 2
const KeyToVal = {
  key1: 'user_reject',
  key2: 'un_support_chain',
  key3: 'no_eth_provider',
} as const;

type Keys = keyof typeof KeyToVal;
type Values = typeof KeyToVal[Keys];

export default {}