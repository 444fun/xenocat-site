---
description: "Revisa e melhora trechos de CSS do projeto Xenomorph, garantindo uso das variáveis CSS do tema e consistência com o estilo biomecânico/sci-fi."
name: "Revisar CSS do Tema"
argument-hint: "Trecho de CSS ou nome da seção a revisar"
agent: "agent"
---

Revise e melhore o CSS a seguir respeitando rigorosamente as convenções do projeto Xenomorph:

## Regras obrigatórias

1. **Nunca hardcodar cores** — use sempre as variáveis CSS definidas em `:root`:
   - `--bg` (`#03060f`) → fundo principal
   - `--bg-card` (`rgba(4,10,28,0.75)`) → cards com glassmorphism
   - `--accent` (`#00b4ff`) → azul elétrico principal
   - `--accent-dim` (`#0077b6`) → azul escuro
   - `--accent-glow` (`rgba(0,180,255,0.45)`) → glow/sombra azul
   - `--accent-red` (`#ff2a2a`) → vermelho de alerta/perigo
   - `--text` (`#e8e8e8`) → texto principal
   - `--text-muted` (`#9a9a9a`) → texto secundário

2. **Efeito aurora Win7**: Qualquer animação de fundo deve usar `@keyframes win7aurora` com `radial-gradient` em camadas.

3. **Glassmorphism em cards**: Cards usam `background: var(--bg-card)` com `backdrop-filter: blur(...)` e `border` sutis em `var(--accent-dim)`.

4. **Fonte**: `Merriweather` (Google Fonts, serif) — não trocar a família.

## O que verificar

- Substituir qualquer cor literal por variável equivalente
- Garantir que `box-shadow` e `text-shadow` usem `var(--accent-glow)` ou `var(--accent-red)` onde aplicável
- Remover propriedades redundantes ou conflitantes
- Manter consistência visual biomecânica/sci-fi

## CSS para revisar

```css
$ARGUMENTS
```

Retorne o CSS corrigido com comentários breves explicando cada mudança significativa.
