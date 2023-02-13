import { taskConstants } from "src/constants"

interface IBaseTask {
  name: string,
  description: string,
  priority: taskConstants.taskPriorityEnum,
  estimateTime: number,
  note: string,
}

export type ITask = IBaseTask & any;