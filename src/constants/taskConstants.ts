export const taskPriority = {
  IMPORTANT_AND_URGENT: 'IMPORTANT_AND_URGENT',
  URGENT: 'URGENT',
  IMPORTANT: 'IMPORTANT',
  NEITHER: 'NEITHER'
} as const;

// Method 1
// export const taskPriorityArr = Object.values(taskPriority);
// export type taskPriorityEnum = typeof taskPriorityArr[number];

// Method 2
type keyOfTaskPriority = keyof typeof taskPriority;
export type taskPriorityEnum = typeof taskPriority[keyOfTaskPriority];