import type { MongoClient } from 'mongodb';

declare global {
  namespace globalThis {
    // eslint-disable-next-line no-var
    var _mongo: Promise<MongoClient>;
  }
}
