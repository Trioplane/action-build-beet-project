# action-build-beet-project

Builds a beet project and provides exposed outputs to get the files

## Input

### `beet-dir` (Optional)

- The directory with the Beet configuration file.
- Default: `.`

## Outputs

### `data-packs`
- List of data packs built as a JSON array of paths
- Outputs: `(JSON Stringified) string[]`

### `resource-packs`
- List of resource packs built as a JSON array of paths
- Outputs: `(JSON Stringified) string[]`

### `unknown-files`
- List of unknown files built as a JSON array of paths
- Outputs: `(JSON Stringified) string[]`

### `beet-project-output`
- The output directory of the built files
- Outputs: `string`

### `beet-project-name`
- The name of the Beet project
- Outputs: `string`

### `beet-project-version`
- The version of the Beet project
- Outputs: `string`

## Example usage

### Using the action

```yaml
runs-on: ubuntu-latest
steps:
  - name: Checkout
    uses: actions/checkout@v6

  - name: Setup Python 3.14
    uses: actions/setup-python@v6
    with:
      python-version: '3.14' 

  - name: Build Beet project
    uses: Trioplane/action-build-beet-project@v1
```

### Releasing Beet files to GitHub releases

```yaml
name: Release Beet project

on:
  push:
    tags:
      - 'v*'

permissions:
  contents: write

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v6

    - name: Set up Python 3.14
      uses: actions/setup-python@v6
      with:
        python-version: "3.14"

    - name: Build Beet project
      id: beet
      uses: Trioplane/action-build-beet-project@v1

    - name: Zip build output
      run: |
        echo '${{ steps.beet.outputs.data-packs }}' | jq -r '.[]' | while read dir; do
          name=$(basename "$dir")
          (cd "$dir" && zip -r "${GITHUB_WORKSPACE}/${name}.zip" .)
        done
          
        echo '${{ steps.beet.outputs.resource-packs }}' | jq -r '.[]' | while read dir; do
          name=$(basename "$dir")
          (cd "$dir" && zip -r "${GITHUB_WORKSPACE}/${name}.zip" .)
        done
          
    - name: Create GitHub Release
      uses: softprops/action-gh-release@v2
      with:
        files: "*.zip"
```