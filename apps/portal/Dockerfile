FROM node:22-bookworm AS isolate

WORKDIR /app

USER root
RUN corepack enable

COPY . .

RUN pnpx turbo prune @pbs/directus-editorjs

FROM node:22-bookworm AS builder

WORKDIR /app

COPY --from=isolate /app/out .

USER root
RUN corepack enable

RUN pnpm install

RUN pnpm --filter "@pbs/directus-editorjs" build

FROM directus/directus:11.16

USER root
RUN corepack enable

USER node

WORKDIR /directus

RUN pnpm install \
    directus-extension-sync \
    directus-extension-display-link \
    @directus-labs/calculated-fields-bundle \
    @directus-labs/spreadsheet-layout \
    @directus-labs/pdf-viewer-interface \
    directus-extension-custom-search-okam

COPY --from=builder /app/apps/portal/extensions/editorjs/dist /directus/extensions/editorjs/dist
COPY --from=builder /app/apps/portal/extensions/editorjs/package.json /directus/extensions/editorjs/package.json

