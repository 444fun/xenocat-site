/**
 * Servidor Xeno Cat IA — Express + xAI (Grok)
 * Serve arquivos estáticos e a rota /api/chat com streaming.
 *
 * Para rodar: npm start
 * Variável obrigatória: XAI_API_KEY no arquivo .env
 */

import express from "express";
import cors from "cors";
import { xai } from "@ai-sdk/xai";
import { streamText } from "ai";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// --- Middleware ---
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "1mb" }));

// Serve o site estático (HTML, CSS, JS, modelos .glb etc.)
app.use(express.static(__dirname));

// --- Rota de Chat IA ---
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Array de mensagens inválido." });
    }

    // Valida campos mínimos de cada mensagem
    for (const msg of messages) {
      if (!msg.role || !msg.content) {
        return res.status(400).json({ error: "Mensagem malformada." });
      }
      if (!["user", "assistant", "system"].includes(msg.role)) {
        return res.status(400).json({ error: "Role inválido." });
      }
    }

    const result = streamText({
      model: xai("grok-4"),
      system: `Você é o Xeno Cat, a mascote alienígena do site $XENO na Solana.
Seu nome é Xeno. Responda SEMPRE em português, de forma divertida e com humor sobre o universo Xeno Cat, meme coins, Solana e NFTs.
Seja conciso (máximo 3 parágrafos), engajante e use emojis de vez em quando.
Não invente funcionalidades que não existem no site.
O site tem galeria de criaturas, sistema de likes, visualizador 3D e NFT Genesis 1/1.`,
      messages,
      maxTokens: 400,
    });

    // Faz streaming para o cliente usando o protocolo de dados do AI SDK
    result.pipeDataStreamToResponse(res);
  } catch (err) {
    console.error("[Xeno Chat] Erro:", err?.message ?? err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Erro interno. Tente novamente." });
    }
  }
});

// --- Inicia servidor ---
const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`🐱👾 Xeno Cat IA rodando em http://localhost:${PORT}`);
  if (!process.env.XAI_API_KEY) {
    console.warn(
      "⚠️  XAI_API_KEY não encontrada no .env — o chat não funcionará.",
    );
  }
});
