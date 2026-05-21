from beet import load_config
import os

def set_output(name, value):
    with open(os.environ['GITHUB_OUTPUT'], 'a') as f:
        f.write(f'{name}={value}\n')

project_config = load_config(os.environ['BEET_CONFIG_PATH'])

set_output('name', project_config.name)
set_output('version', project_config.version)
set_output('output', project_config.output)