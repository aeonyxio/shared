import { create, verify, Payload } from "https://deno.land/x/djwt@v2.8/mod.ts";

export interface JwtPayload extends Payload {
  id: string;
  roles: string[];
}

export class JwtService {
  private key!: CryptoKey;

  async init(secret: string | undefined) {
    if (!secret) throw new Error("no secret present");
    const encoder = new TextEncoder();
    const keyBuf = encoder.encode(secret);

    const key = await crypto.subtle.importKey(
      "raw",
      keyBuf,
      { name: "HMAC", hash: "SHA-512" },
      true,
      ["sign", "verify"]
    );

    this.key = key;
  }

  create({ roles, id }: { id: string; roles: string[] }) {
    return create({ alg: "HS512", typ: "JWT" }, { roles, id }, this.key);
  }

  async verify(jwt: string) {
    const payload = await verify(jwt, this.key);
    return payload as JwtPayload;
  }
}
