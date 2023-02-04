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

export interface ServerToWorkerEvents {
  "user-connect": (userIds: string[]) => void;
  "user-disconnect": (userId: string) => void;
}

export interface WorkerToServerEvents {
  auth: (msg: { token: string }) => void;
  "to-user": (msg: MsgFromWorkerToUser) => void;
  "to-all-users": (msg: MsgFromWorkerToUser) => void;
  "request-server-transfer": (
    msg: {
      userId: string;
      targetServer: string;
    },
    callback: () => void
  ) => void;
  shutdown: (reason: string) => void;
}

export interface ServerToUserEvents {}

export interface UserToServerEvents {
  input: (msg: { type: string; data: unknown }) => void;
}
