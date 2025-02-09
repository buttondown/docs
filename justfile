default:
    just --list

# You shouldn't need this as part of your day-to-day work, but if you see
# odd issues after building locally it's a good first thing to try.
clear_cache:
  rm -rf ./.next/

install:
  pnpm install

# Unfortunately, this must be two separate commands because Next
# does not support alternate linters and there's some stuff in the 'lint'
# command that we find useful. See for more context:
# https://github.com/vercel/next.js/discussions/59347
lint-without-code-samples:
  pnpm check-for-typos --no-progress
  pnpm lint
  pnpm tsc

# We break this out separately so that we can run it in CI without
# having to install rubyfmt (and other things down the line.)
lint: lint-without-code-samples
  rubyfmt -i -- public/
  cd ../app && uv run ruff check ../docs-v2/public --fix

lint-css:
  pnpm lint-css

build-indexes:
  cd .. && python3 docs-v2/scripts/compile_index.py
  pnpm compile-vectors

build: lint build-indexes
  pnpm build

dev:
  pnpm dev

test:
  pnpm test
