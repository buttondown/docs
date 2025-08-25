default:
    just --list

# You shouldn't need this as part of your day-to-day work, but if you see
# odd issues after building locally it's a good first thing to try.
clear_cache:
    rm -rf ./.next/

install:
    bun install

# Unfortunately, this must be two separate commands because Next
# does not support alternate linters and there's some stuff in the 'lint'
# command that we find useful. See for more context:
# https://github.com/vercel/next.js/discussions/59347
lint:
    bun knip
    bun check-for-typos --no-progress
    bun lint
    bun tsc

lint-css:
    bun lint-css

build-indexes:
    cd .. && uv run docs/scripts/compile_index.py
    bun compile-vectors

build: lint build-indexes
    bun build

dev:
    bun dev

test:
    bun test --help
