FROM node:22-bookworm AS isolate

WORKDIR /app

USER root
RUN corepack enable

COPY . .

RUN pnpx turbo prune @directus-labs/tree-view-table-layout

FROM node:22-bookworm AS builder

WORKDIR /app

COPY --from=isolate /app/out .

USER root
RUN corepack enable

RUN pnpm install

RUN pnpm --filter "@directus-labs/tree-view-table-layout" build

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
    directus-extension-custom-search-okam \
    directus-extension-field-actions \
    dcb-tree-view

COPY --from=builder /app/apps/portal/extensions/tree-view-table-layout/dist /directus/extensions/tree-view-table-layout/dist
COPY --from=builder /app/apps/portal/extensions/tree-view-table-layout/package.json /directus/extensions/tree-view-table-layout/package.json

