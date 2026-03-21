# Explicitly specify a Directus version to use on Railway
FROM directus/directus:11.16

USER root
RUN corepack enable

USER node

RUN pnpm install \
directus-extension-sync \
directus-extension-display-link \
directus-extension-editorjs \
@directus-labs/tree-view-table-layout \
@directus-labs/calculated-fields-bundle \
@directus-labs/spreadsheet-layout \
@directus-labs/pdf-viewer-interface \
directus-extension-custom-search-okam          
