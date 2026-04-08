# 🚀 Cognato Estoque PWA — Guia de Deploy

## Estrutura do projeto

```
cognato-pwa/
├── index.html      ← App principal
├── manifest.json   ← Configuração do PWA
├── sw.js           ← Service Worker (offline)
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
└── README.md
```

---

## ⚡ Opção 1: Netlify Drop (mais fácil — 30 segundos)

1. Acesse **https://app.netlify.com/drop**
2. Arraste a pasta **`cognato-pwa`** inteira para a área indicada
3. Aguarde o upload (alguns segundos)
4. Pronto! Você receberá uma URL como `https://cognato-abc123.netlify.app`

> ✅ Gratuito, sem cadastro obrigatório, funciona imediatamente.

---

## ⚡ Opção 2: Vercel (recomendado para atualizações frequentes)

### Via interface web:
1. Acesse **https://vercel.com** e crie uma conta gratuita
2. Clique em **"Add New → Project"**
3. Importe do GitHub (veja opção 3) ou use o CLI abaixo

### Via CLI:
```bash
npm i -g vercel
cd cognato-pwa
vercel --prod
```

---

## ⚡ Opção 3: GitHub Pages

1. Crie um repositório no **https://github.com** (ex: `cognato-estoque`)
2. Faça upload dos arquivos da pasta `cognato-pwa`
3. Vá em **Settings → Pages**
4. Em "Source", selecione **"Deploy from a branch"**
5. Escolha **"main"** e pasta **"/ (root)"**
6. Aguarde ~1 minuto e acesse: `https://seu-usuario.github.io/cognato-estoque`

---

## 📱 Como instalar no celular (PWA)

### Android (Chrome):
- Acesse a URL do app
- Toque no banner "Instalar Cognato" que aparece automaticamente
- Ou: menu ⋮ → "Adicionar à tela inicial"

### iPhone (Safari):
- Acesse a URL no Safari
- Toque no botão de compartilhar ⬆
- Selecione **"Adicionar à Tela de Início"**
- Toque em **"Adicionar"**

O app ficará na tela inicial como um app nativo, funciona offline e salva os dados localmente + sincroniza na nuvem.

---

## 🔄 Funcionalidades

- ✅ **100% responsivo** — mobile, tablet e desktop
- ✅ **PWA instalável** — funciona como app nativo
- ✅ **Offline** — Service Worker mantém o app funcionando sem internet
- ✅ **Sync na nuvem** — dados sincronizados via JSONBin
- ✅ **IndexedDB** — persistência local robusta
- ✅ **Botões touch-friendly** — tamanho adequado para dedos
- ✅ **Safe area** — suporte a iPhone com notch/Dynamic Island
- ✅ **Câmera direta** — upload de foto direto pela câmera do celular
