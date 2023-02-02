export interface MsgFromUserToWorker<T = unknown> {
  userId: string;
  data: T;
}

export interface MsgFromWorkerToAllUsers<T = unknown> {
  type: string;
  data: T;
}

export interface MsgFromWorkerToUser<T = unknown>
  extends MsgFromWorkerToAllUsers<T> {
  userId: string;
}
