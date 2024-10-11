const fs = require('fs');
const path = require('path');

const esbuild = require('esbuild');

const ensureDirectoryExistence = (filePath) => {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
};

const wrapIIFEInStringPlugin = {
  name: 'wrap-iife-in-string',
  setup(build) {
    // Ensure write is set to false so our plugin will always receive outputFiles
    build.initialOptions.write = false;

    build.onEnd((result) => {
      if (result.errors.length > 0) {
        console.error('Build failed with errors:', result.errors);
        return;
      }

      result.outputFiles.forEach((outputFile) => {
        let content = outputFile.text;

        const fileName = path.basename(outputFile.path);

        // Use JSON.stringify to safely encode the content
        const wrappedContent = `/**
 * ${fileName}
 * DO NOT EDIT THIS FILE. IT IS GENERATED ON BUILD. RUN \`yarn generate-lit-actions\` IN THE ROOT DIRECTORY TO UPDATE THIS FILE.
 * @type {string}
 */
const code = ${JSON.stringify(content)};
module.exports = {
  code,
};
`;

        // Ensure the output directory exists
        const outputPath = path.resolve(outputFile.path);
        ensureDirectoryExistence(outputPath);

        // Write the modified content back to the output file
        fs.writeFileSync(outputPath, wrappedContent);
      });
    });
  },
};

(async () => {
  await esbuild.build({
    entryPoints: [
      './src/lib/solana/signTransactionWithEncryptedSolanaKey.js',
      './src/lib/solana/signMessageWithEncryptedSolanaKey.js',
      './src/lib/solana/generateEncryptedSolanaPrivateKey.js',
      './src/lib/ethereum/signTransactionWithEncryptedEthereumKey.js',
      './src/lib/ethereum/signMessageWithEncryptedEthereumKey.js',
      './src/lib/ethereum/generateEncryptedEthereumPrivateKey.js',
      './src/lib/common/exportPrivateKey.js',
      './src/lib/common/batchGenerateEncryptedKeys.js',

      // bespoke
      './src/lib/common/bespoke/tria_batchGenerateEncryptedKeys.js',
    ],
    bundle: true,
    minify: true,
    sourcemap: false,
    treeShaking: true,
    outdir: './src/generated/',
    inject: ['./buffer.shim.js'],
    plugins: [wrapIIFEInStringPlugin],
    platform: 'browser',
  });
})();
