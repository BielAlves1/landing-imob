# Plataforma Imobiliária — Landing Page Comercial

Landing page B2B para apresentar e comercializar uma base de site/plataforma para imobiliárias.

## Stack

- HTML5 semântico
- Tailwind CSS via CDN
- CSS customizado
- JavaScript vanilla
- Google Fonts (Space Grotesk + DM Sans)
- Intersection Observer para animações de entrada/saída
- Sem React, Vite, Node ou build step

## Estrutura

```text
landing-imobiliarias/
├── index.html
├── assets/
│   ├── css/custom.css
│   ├── js/main.js
│   └── images/product/
│       ├── produto-home.png
│       └── produto-imoveis.png
├── favicon/favicon.svg
└── README.md
```

## Prints do produto

Os dois prints fornecidos foram incorporados em `assets/images/product/` e aparecem em diferentes áreas da landing page para funcionar como prova visual do produto real.

## WhatsApp

Altere a constante `WHATSAPP_NUMBER` no arquivo `assets/js/main.js` para usar o número comercial correto.

## Publicação

Pode ser hospedado diretamente em hospedagens tradicionais, incluindo Locaweb. Basta publicar a pasta inteira na raiz pública do domínio ou subdomínio. Não existe etapa de build.
