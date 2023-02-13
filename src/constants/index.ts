export * as routeConstants from './routeConstants'
export * as taskConstants from './taskConstants';

export const sliceStatus = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed'
} as const;
export type SliceStatusEnum = typeof sliceStatus[keyof typeof sliceStatus]