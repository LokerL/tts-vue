import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'
import { spawn } from 'child_process'

const pkg = createRequire(import.meta.url)('../package.json')
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// write .debug.env
const envContent = Object.entries(pkg.env).map(([key, val]) => `${key}=${val}`)
fs.writeFileSync(path.join(__dirname, '.debug.env'), envContent.join('\n'))

// bootstrap
spawn(
  // TODO: terminate `npm run dev` when Debug exits.
  process.platform === 'win32' ? 'npm.cmd' : 'npm',
  ['run', 'dev'],
  {
    stdio: 'inherit',
    env: Object.assign(process.env, { VSCODE_DEBUG: 'true' }),
  },
)
