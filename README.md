# Site Grace Cortez Atelier

Gerado com Eleventy (HTML estático, sem JavaScript no navegador). Fontes Cormorant Garamond e Jost hospedadas no próprio site.

## Rodar localmente
    npm install
    npm start        # http://localhost:8080
    npm run build    # gera a pasta _site

## Publicar (GitHub Pages)
1. Criar o repositório e enviar este conteúdo para a branch `main`.
2. Settings → Pages → Source: "GitHub Actions". Cada push publica sozinho.
3. Domínio: depois de apontar o DNS, adicionar o arquivo `src/static/CNAME` com `www.gracecortez.com.br` e ativar "Enforce HTTPS".

## Editar
- Dados do negócio (endereço, telefones, horário, cidades): `src/_data/site.js`
- Novo artigo: criar `src/blog/posts/slug.md` com title, description, category e date.
