# Xenomorph | Xano Alien — Agent Instructions

## Visão Geral

Site temático biomecânico/sci-fi com estética Web3 e Alien, voltado para coleção NFT e e-commerce. Todo o conteúdo textual e comentários de código são em **pt-BR**.

## Estrutura do Projeto

```
index.html              — Homepage principal (galeria, like system, produto)
animação 3d/
  index.html            — Visualizador 3D interativo de criaturas
  *.glb                 — Modelos 3D (format GLTF Binary)
  nft/
    XenomorphGenesis.sol — Contrato ERC721 (1/1 Genesis NFT)
    metadata.json        — Metadados do NFT (padrão OpenSea/Metaplex)
images/                 — Recursos e páginas salvas
.vscode/settings.json   — Live Server na porta 5501
```

## Stack e Dependências

- **HTML/CSS/JS puro** — Sem framework frontend (React, Vue etc.)
- **`<model-viewer>`** — Componente Google para exibir modelos `.glb` ([docs](https://modelviewer.dev/))
  - Importado via CDN: `https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js`
- **Firebase Firestore** — Contador de likes em tempo real (`onSnapshot`)
  - SDK via CDN (Firebase v10.x, modular)
- **Solidity `^0.8.20`** — Contrato NFT usando OpenZeppelin ERC721URIStorage + Ownable
- **Google Fonts** — Família `Merriweather` (serif)
- **Live Server** — Porta `5501` (configurada em `.vscode/settings.json`)

## Convenções de Estilo CSS

Variáveis CSS definidas em `:root` — **sempre usar as variáveis, nunca hardcodar cores**:

| Variável        | Valor                  | Uso                       |
| --------------- | ---------------------- | ------------------------- |
| `--bg`          | `#03060f`              | Fundo principal           |
| `--bg-card`     | `rgba(4,10,28,0.75)`   | Cards com glassmorphism   |
| `--accent`      | `#00b4ff`              | Azul elétrico principal   |
| `--accent-dim`  | `#0077b6`              | Azul escuro               |
| `--accent-glow` | `rgba(0,180,255,0.45)` | Glow/sombra azul          |
| `--accent-red`  | `#ff2a2a`              | Vermelho de alerta/perigo |
| `--text`        | `#e8e8e8`              | Texto principal           |
| `--text-muted`  | `#9a9a9a`              | Texto secundário          |

Efeito visual característico: **aurora estilo Windows 7** via `@keyframes win7aurora` + `radial-gradient` em camadas no `body` e `body::before`.

## Firebase — Like System

- Cada criatura/card tem `data-criatura` attribute
- ID no Firestore: `criatura.toLowerCase().replace(/\s+/g, "-")`
- Coleção Firestore: `"likes"`, campo: `{ count: number }`
- Proteção anti-duplo-like: `localStorage` com chave `"xeno_liked"`
- **Não colocar chaves Firebase em variáveis de ambiente** — projeto usa CDN com config inline

## NFT / Smart Contract

- Contrato: [`animação 3d/nft/XenomorphGenesis.sol`](animação%203d/nft/XenomorphGenesis.sol)
- Padrão: ERC721URIStorage + Ownable (OpenZeppelin)
- Supply máximo: **1 NFT** (1/1 Genesis)
- Metadados: [`animação 3d/nft/metadata.json`](animação%203d/nft/metadata.json) — padrão OpenSea
- URL externa do projeto: `https://xenocat.xyz`

## Modelos 3D

- Formato: `.glb` (GLTF Binary)
- Localização: `animação 3d/*.glb`
- Exibição via `<model-viewer auto-rotate camera-controls>`
- Animações suportadas pelo `model-viewer` com atributo `animation-name`

## Como Rodar Localmente

1. Abrir no VS Code
2. Usar extensão **Live Server** → botão "Go Live" (porta 5501)
3. Não há build step — arquivos HTML são servidos diretamente

## Pitfalls Comuns

- O diretório `animação 3d/` contém espaço e caractere especial (ã) — usar codificação URL (`anima%C3%A7%C3%A3o%203d/`) em links externos, mas caminhos relativos HTML funcionam normalmente
- O `index.html` principal usa `lang="pt-BR"` — manter textos e metadados em português
- Encoding: arquivos devem ser salvos em **UTF-8** (evitar problemas com caracteres acentuados)
- Firebase config está inline no HTML — não extrair para arquivo separado sem configurar variáveis de ambiente adequadamente
