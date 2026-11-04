import { build as esbuild } from "esbuild";

const isProduction = process.env.ELEVENTY_RUN_MODE === "build";

export default function (eleventyConfig) {
  // Static files copied as-is: src/js -> dist/js, src/assets -> dist/assets
  eleventyConfig.addPassthroughCopy({ "src/js": "js" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // Bundle src/css/main.css (which @imports the partial CSS files) into
  // dist/css/styles.css. Minified for `npm run build`, readable in `npm run dev`.
  eleventyConfig.on("eleventy.before", async () => {
    await esbuild({
      entryPoints: ["src/css/main.css"],
      bundle: true,
      minify: isProduction,
      outfile: "dist/css/styles.css",
      external: ["../assets/*"],
      logLevel: "warning",
    });
  });

  // Rebuild + reload when CSS or JS changes in dev
  eleventyConfig.addWatchTarget("src/css/");
  eleventyConfig.addWatchTarget("src/js/");

  return {
    dir: { input: "src", output: "dist", includes: "_includes", data: "_data" },
    templateFormats: ["njk"],
    htmlTemplateEngine: "njk",
  };
}
