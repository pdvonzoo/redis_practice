import { v4 } from "uuid";
import { Redis } from "ioredis";
// http://localhost:4000
// http://my-site.com
// => http://my-site.com/confrim/<id>
export const createConfirmEmailLink = async (
  url: string,
  userId: string,
  redis: Redis
) => {
  const id = v4();
  await redis.set(id, userId, "ex", 60 * 60 * 25);
  return `${url}/confirm/${id}`;
};
