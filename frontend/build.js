const esbuild = require('esbuild');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
esbuild.build({
  entryPoints: [path.join(__dirname, 'src/index.js')],
  bundle: true,
  outfile: path.join(__dirname, 'dist/bundle.js'),
  loader: { '.js': 'jsx' },
  define: {
    'process.env.NODE_ENV': '"production"',
    'process.env.API_URL': JSON.stringify(process.env.API_URL || 'http://localhost:3000')
  }
}).catch(() => process.exit(1));
