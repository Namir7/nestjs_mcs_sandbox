import type { ServerWebSocket } from "bun";

const _storage = new Map();

interface Storage<T> {
  getSockets(userId: string): Set<T> | null;

  getCount(): number;

  pushSocket(userId: string, socket: T): void;

  removeSocket(userId: string, socket: T): void;
}

export class StorageService<T = ServerWebSocket<unknown>>
  implements Storage<T>
{
  private _storage: Map<string, Set<T>>;

  constructor() {
    this._storage = _storage;
  }

  getSockets(userId: string) {
    return this._storage.get(userId) || null;
  }

  getCount() {
    let count = 0;

    this._storage.forEach((sockets) => {
      count += sockets.size;
    });

    return count;
  }

  pushSocket(userId: string, socket: T) {
    const sockets = this._storage.get(userId);

    if (sockets) {
      sockets.add(socket);
    } else {
      this._storage.set(userId, new Set());

      const sockets = this._storage.get(userId);

      sockets!.add(socket);
    }
  }

  removeSocket(userId: string, socket: T) {
    const sockets = this._storage.get(userId);

    if (!sockets) return;

    sockets.delete(socket);

    if (sockets.size === 0) {
      this._storage.delete(userId);
    }
  }
}
