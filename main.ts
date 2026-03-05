/*
    Minecraft Keeper
    A simple Minecraft Client for keeping your Minecraft account online.
*/

import "dotenv/config";

import minecraft from "minecraft-protocol";
import { setTimeout } from "node:timers/promises";

import log from "./utils/log.ts";

const HOST = process.env.MC_HOST || "127.0.0.1";
const PORT = parseInt(process.env.MC_PORT || "25565");
const USERNAME = process.env.MC_USERNAME || "Player";
const TIMEOUT = parseInt(process.env.TIMEOUT || "1");
const LOW_HEALTH_THRESHOLD = parseInt(process.env.LOW_HEALTH_THRESHOLD || "6");

const logger = log.getLogger();
const client = minecraft.createClient({
    "host": HOST,
    "port": PORT,
    "auth": "microsoft",
    "username": USERNAME
});

client.on("error", logger.error);

client.on("login", async () => {
    logger.info(`Logged in as ${client.username}`);

    client.chat("Minecraft Keeperによる接続が確立されました");
    client.chat(`この接続は${TIMEOUT}時間後に自動的に切断されます`);

    await setTimeout(1000 * 60 * 60 * TIMEOUT);

    client.end("Minecraft Keeperによる接続が終了されました");
});

client.on("packet", (data, meta) => {
    if (meta.name !== "update_health") return;
    const packet = data as {
        "health"?: number;
    };
    if (typeof packet.health !== "number") return;

    if (packet.health <= LOW_HEALTH_THRESHOLD) {
        logger.warn(`Health is too low (${packet.health}/20). Disconnecting to avoid death.`);
        client.end("Minecraft Keeperによる接続が終了されました(低体力のため)");
    } else {
        logger.warn(`Health is ${packet.health}/20. Consider disconnecting to avoid death.`);
    }
});

client.on("end", () => {
    logger.info("Connection closed");
    process.exit(0);
});
