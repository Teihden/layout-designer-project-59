# Project "Hexlet Chat"
[![Actions Status](https://github.com/Teihden/layout-designer-project-59/workflows/hexlet-check/badge.svg)](https://github.com/Teihden/layout-designer-project-59/actions)
[![CI](https://github.com/Teihden/layout-designer-project-59/actions/workflows/CI.yml/badge.svg)](https://github.com/Teihden/layout-designer-project-59/actions/workflows/CI.yml)
[![Github Pages](https://github.com/Teihden/layout-designer-project-59/actions/workflows/github-pages.yml/badge.svg)](https://github.com/Teihden/layout-designer-project-59/actions/workflows/github-pages.yml)
[![Surge](https://github.com/Teihden/layout-designer-project-59/actions/workflows/surge.yml/badge.svg)](https://github.com/Teihden/layout-designer-project-59/actions/workflows/surge.yml)

## Deployment to Surge
https://hex-chat.surge.sh

## Setup

```shell
# Install dependencies (with flag "--force")
make install --force
```

## CLI

```shell
# Runs Stylelint, pug-lint against source code for quality
make lint
```

## Gulp tasks

```shell
# Starts Browsersync server and watch Sass, Pug and Bootstrap files (icons, JS) for changes
server

# Runs pug-lint, Pug, Stylelint, Sass, PurgeCSS, Autoprefixer in sequential order
build

# Copy Bootstrap icons slylesheet and Bootsrap JS from "node_modules/"
copy

# Deploys directory `build/` to Surge
deploy

# Runs pug-lint, Pug, Stylelint, Sass, copy Bootstrap files (icons, JS),
# starts Browsersync server in sequential order and wathes for changes
default
```
