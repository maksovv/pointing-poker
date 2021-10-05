/* eslint-disable @typescript-eslint/no-explicit-any */
import { Manager, Socket } from 'socket.io-client';
import { DefaultEventsMap, ReservedOrUserEventNames } from 'socket.io-client/build/typed-events';
import { ManagerReservedEvents } from '../types/types';
import socket from '../utils/soketIO';

export const on = (token: string, listener: (...args: any[]) => void): Socket<DefaultEventsMap, DefaultEventsMap> =>
  socket.on(token, listener);

export const emit = (token: string, ...args: any[]): Socket<DefaultEventsMap, DefaultEventsMap> =>
  socket.emit(token, ...args);

export const once = (token: string, listener: (...args: any[]) => void): Socket<DefaultEventsMap, DefaultEventsMap> =>
  socket.once(token, listener);

export const io = (
  // eslint-disable-next-line @typescript-eslint/ban-types
  token: ReservedOrUserEventNames<ManagerReservedEvents, {}>,
  listener: (...args: any[]) => void,
): Manager<DefaultEventsMap, DefaultEventsMap> => socket.io.on(token, listener);

export const connect = (): Socket<DefaultEventsMap, DefaultEventsMap> => socket.connect();
