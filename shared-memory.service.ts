import { connect } from "https://deno.land/x/redis@v0.29.0/mod.ts";
import type { Redis } from "https://deno.land/x/redis@v0.29.0/mod.ts";

export class SharedMemoryService {
  private redis!: Redis;

  async init() {
    this.redis = await connect({
      hostname: "redis-master",
      port: 6379,
      password: Deno.env.get("REDIS_PASSWORD"),
    });
  }

  async destroy() {
    await this.redis.quit();
  }

  async getUserIdForConnectionId(connectionId: string) {
    return (await this.redis.get(
      `user-id-for-socket:${connectionId}`
    )) as string;
  }

  async setUserIdForConnectionId(connectionId: string, userId: string) {
    return await this.redis.set(`user-id-for-socket:${connectionId}`, userId);
  }

  async deleteUserIdForConnectionId(connectionId: string) {
    return await this.redis.del(`user-id-for-socket:${connectionId}`);
  }

  async getGameIdForUserId(userId: string) {
    return (await this.redis.get(`game-id-for-user:${userId}`)) as string;
  }

  async setGameIdForUserId(userId: string, gameId: string) {
    return await this.redis.set(`game-id-for-user:${userId}`, gameId);
  }

  async deleteGameIdForUserId(userId: string) {
    return await this.redis.del(`game-id-for-user:${userId}`);
  }
}
