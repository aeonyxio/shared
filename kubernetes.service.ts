import {
  BatchV1Api,
  BatchV1NamespacedApi,
} from "https://deno.land/x/kubernetes_apis@v0.3.2/builtin/batch@v1/mod.ts";
import { autoDetectClient } from "https://deno.land/x/kubernetes_client@v0.4.0/mod.ts";

export class KubernetesService {
  private batch!: BatchV1NamespacedApi;

  async init() {
    const kubernetes = await autoDetectClient();
    this.batch = new BatchV1Api(kubernetes).namespace("default");
  }

  launchGameServer(gameId: string) {
    return this.batch.createJob({
      metadata: {
        name: `game-server-${gameId}`,
      },
      spec: {
        ttlSecondsAfterFinished: 1,
        template: {
          metadata: {
            labels: { app: "game-server" },
          },
          spec: {
            restartPolicy: "Never",
            containers: [
              {
                name: "game-server",
                image: "game-server",
                imagePullPolicy: "IfNotPresent",
                env: [
                  {
                    name: "GAME_ID",
                    value: gameId,
                  },
                  {
                    name: "JWT_SECRET",
                    value: Deno.env.get("JWT_SECRET"),
                  },
                ],
              },
            ],
          },
        },
        backoffLimit: 4,
      },
    });
  }
}
