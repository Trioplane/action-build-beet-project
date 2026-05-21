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