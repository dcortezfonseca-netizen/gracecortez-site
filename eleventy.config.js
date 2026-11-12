import fs from "node:fs";
import path from "node:path";
import Image from "@11ty/eleventy-img";
import { minify } from "html-minifier-terser";
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

// Prefixo de caminho: vazio no domínio próprio; "/gracecortez-site" na prévia do github.io
const PREFIX = (process.env.PATH_PREFIX || "").replace(/\/$/, "");

const SRC_IMG = "src/img";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  // ---------- Arquivos copiados como estão ----------
  eleventyConfig.addPassthroughCopy({ "src/static": "/" });

  // Fontes hospedadas no próprio site (mais rápido e sem enviar IP do visitante ao Google)
  const fontFiles = [
    ["cormorant-garamond", "cormorant-garamond-latin-300-normal.woff2"],
    ["cormorant-garamond", "cormorant-garamond-latin-400-normal.woff2"],
    ["cormorant-garamond", "cormorant-garamond-latin-500-normal.woff2"],
    ["cormorant-garamond", "cormorant-garamond-latin-400-italic.woff2"],
    ["cormorant-garamond", "cormorant-garamond-latin-500-italic.woff2"],
    ["lato", "lato-latin-300-normal.woff2"],
    ["lato", "lato-latin-400-normal.woff2"],
    ["lato", "lato-latin-700-normal.woff2"],
  ];
  for (const [pkg, file] of fontFiles) {
    eleventyConfig.addPassthroughCopy({
      [`node_modules/@fontsource/${pkg}/files/${file}`]: `/fonts/${file}`,
    });
  }

  // ---------- Filtros ----------
  eleventyConfig.addFilter("dataPt", (d) =>
    new Intl.DateTimeFormat("pt-BR", { dateStyle: "long", timeZone: "UTC" }).format(new Date(d))
  );
  eleventyConfig.addFilter("iso", (d) => new Date(d).toISOString().slice(0, 10));
  eleventyConfig.addFilter("head", (arr, n) => (arr || []).slice(0, n));
  eleventyConfig.addFilter("json", (v) => JSON.stringify(v));
  eleventyConfig.addFilter("wa", (text, site) =>
    `https://wa.me/${site.whatsappIntl}?text=${encodeURIComponent(text)}`
  );
  eleventyConfig.addFilter("abs", (p, site) => new URL(p, site.url).toString());
  eleventyConfig.addFilter("cssmin", (css) =>
    css.replace(/url\(\/fonts\//g, `url(${PREFIX}/fonts/`).replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").replace(/\s*([{};:,>])\s*/g, "$1").replace(/;}/g, "}")
  );

  // ---------- Coleção do blog ----------
  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("src/blog/posts/*.md").sort((a, b) => b.date - a.date)
  );

  // ---------- Foto: gera AVIF/WebP/JPEG responsivos; se o arquivo ainda não existe, mostra um espaço reservado ----------
  eleventyConfig.addAsyncShortcode(
    "foto",
    async function (file, alt, ratio = "4/5", sizes = "(min-width: 900px) 33vw, 100vw", priority = false) {
      const input = path.join(SRC_IMG, file);
      if (!fs.existsSync(input)) {
        return `<div class="ph" style="aspect-ratio:${ratio}" role="img" aria-label="${alt}"><span>${file}</span></div>`;
      }
      const meta = await Image(input, {
        widths: [480, 800, 1200],
        formats: ["avif", "webp", "jpeg"],
        outputDir: "_site/img/",
        urlPath: "/img/",
        sharpOptions: { animated: false },
      });
      const largest = meta.jpeg[meta.jpeg.length - 1];
      const sources = Object.values(meta)
        .map((fmt) => `<source type="${fmt[0].sourceType}" srcset="${fmt.map((f) => f.srcset).join(", ")}" sizes="${sizes}">`)
        .join("");
      return `<picture>${sources}<img src="${largest.url}" alt="${alt}" width="${largest.width}" height="${largest.height}" style="aspect-ratio:${ratio};object-fit:cover" ${
        priority ? 'fetchpriority="high"' : 'loading="lazy"'
      } decoding="async"></picture>`;
    }
  );

  // ---------- Minificação do HTML ----------
  eleventyConfig.addTransform("minify", async function (content) {
    if ((this.page.outputPath || "").endsWith(".html")) {
      return minify(content, {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: false,
        minifyJS: false,
        conservativeCollapse: false,
      });
    }
    return content;
  });

  return {
    pathPrefix: PREFIX ? PREFIX + "/" : "/",
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
}
