export const forgeConfig = `[profile.default]
script = 'script'
test = 'test'
ffi = true
build_info = true
extra_output = ['storageLayout']
fs_permissions = [{ access = "read-write", path = "./"}]
allow_paths = ["../.."]
remappings=[
  'forge-std/=node_modules/forge-std/src',
  'ds-test/=node_modules/ds-test/src/',
  '@sphinx-labs/plugins/=node_modules/@sphinx-labs/plugins/contracts/foundry/',
  '@sphinx-labs/contracts/=node_modules/@sphinx-labs/contracts/',
  'sphinx-forge-std/=node_modules/sphinx-forge-std/src/',
  'sphinx-solmate/=node_modules/sphinx-solmate/src/'
]

[rpc_endpoints]
anvil = "http://127.0.0.1:8545"
`

export const sampleDotEnvFile = `PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
`

export const sampleGitIgnoreFile = `# Compiler files
cache/
out/

# Ignores development broadcast logs
!/broadcast
/broadcast/*/31337/
/broadcast/**/dry-run/

# Dotenv file
.env

# Node
node_modules/
`