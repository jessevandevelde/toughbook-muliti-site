export const cmsPage = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Toughbook CMS</title>
    <style>
      :root {
        --bg: #f4f1e8;
        --paper: #fffdf7;
        --ink: #21302a;
        --muted: #6c786f;
        --line: #d8d2c4;
        --accent: #24533f;
        --accent-soft: #e4efe8;
        --warning: #8c3b2f;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        color: var(--ink);
        font-family: Georgia, "Times New Roman", serif;
        background:
          radial-gradient(circle at top left, #fff9ec 0, transparent 24rem),
          linear-gradient(180deg, #f7f3ea 0%, var(--bg) 100%);
      }

      main {
        width: min(1180px, calc(100% - 2rem));
        margin: 2rem auto 3rem;
      }

      .hero,
      .website,
      .block,
      .item,
      .editor {
        background: var(--paper);
        border: 1px solid var(--line);
        border-radius: 1.2rem;
        box-shadow: 0 1rem 2rem rgba(33, 48, 42, 0.06);
      }

      .hero {
        padding: 2rem;
        margin-bottom: 1rem;
      }

      h1,
      h2,
      h3,
      h4 {
        margin: 0;
      }

      h1 {
        font-size: clamp(2rem, 4vw, 3.5rem);
        letter-spacing: 0.04em;
        margin-bottom: 0.5rem;
      }

      p {
        margin: 0;
        max-width: 50rem;
        color: var(--muted);
        line-height: 1.5;
      }

      .status {
        min-height: 1.5rem;
        margin: 0.8rem 0 1rem;
        color: var(--muted);
      }

      .status.error {
        color: var(--warning);
      }

      .toolbar {
        display: flex;
        gap: 0.75rem;
        flex-wrap: wrap;
        margin-bottom: 1rem;
      }

      button {
        min-height: 2.7rem;
        border-radius: 999px;
        border: 1px solid var(--line);
        background: var(--accent);
        color: white;
        padding: 0 1rem;
        cursor: pointer;
        font: inherit;
      }

      button.secondary {
        background: white;
        color: var(--ink);
      }

      .layout {
        display: grid;
        gap: 1rem;
      }

      .website {
        padding: 1rem;
      }

      .website-header {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        align-items: start;
        margin-bottom: 1rem;
      }

      .website-tag,
      .block-tag,
      .item-tag {
        display: inline-flex;
        align-items: center;
        min-height: 2rem;
        padding: 0 0.8rem;
        border-radius: 999px;
        background: var(--accent-soft);
        color: var(--accent);
        font-size: 0.86rem;
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }

      .block-list,
      .item-list,
      .field-list {
        display: grid;
        gap: 0.9rem;
      }

      .block {
        padding: 1rem;
      }

      .block-header,
      .item-header {
        display: flex;
        justify-content: space-between;
        gap: 0.75rem;
        align-items: center;
        margin-bottom: 0.8rem;
      }

      .item {
        padding: 0.9rem;
      }

      .editor {
        padding: 0.75rem;
      }

      .editor label {
        display: block;
        font-size: 0.9rem;
        color: var(--muted);
        margin-bottom: 0.45rem;
      }

      .editor textarea,
      .editor input {
        width: 100%;
        font: inherit;
        border: 1px solid var(--line);
        border-radius: 0.8rem;
        padding: 0.75rem 0.8rem;
        color: var(--ink);
        background: white;
      }

      .editor textarea {
        min-height: 5.5rem;
        resize: vertical;
      }

      .editor-actions {
        display: flex;
        justify-content: flex-end;
        margin-top: 0.65rem;
      }

      .empty {
        padding: 1rem 0.2rem;
        color: var(--muted);
      }
    </style>
  </head>
  <body>
    <main>
      <section class="hero">
        <h1>Toughbook CMS</h1>
        <p>Bekijk eerst je websites, en daaronder pas de onderdelen die op die website worden gebruikt. Zo zie je meteen waar elke block en elk veld thuishoort.</p>
      </section>

      <div class="toolbar">
        <button id="reloadButton" type="button">Reload websites</button>
      </div>

      <div id="status" class="status"></div>
      <section id="app" class="layout"></section>
    </main>

    <script>
      const app = document.getElementById('app');
      const reloadButton = document.getElementById('reloadButton');
      const status = document.getElementById('status');

      const setStatus = (message, isError = false) => {
        status.textContent = message;
        status.className = isError ? 'status error' : 'status';
      };

      const escapeHtml = (value) => {
        return String(value)
          .replaceAll('&', '&amp;')
          .replaceAll('<', '&lt;')
          .replaceAll('>', '&gt;')
          .replaceAll('"', '&quot;');
      };

      const fetchJson = async (url, options) => {
        const response = await fetch(url, options);

        if (!response.ok) {
          const payload = await response.json().catch(() => ({ message: 'Unknown error' }));
          throw new Error(payload.message || 'Unknown error');
        }

        return response.json();
      };

      const renderFieldEditor = (field, kind) => {
        const value = field.fieldValue ?? '';
        const multiline = String(value).length > 70;
        const input = multiline
          ? '<textarea data-kind="' + kind + '" data-id="' + field.id + '">' + escapeHtml(value) + '</textarea>'
          : '<input type="text" data-kind="' + kind + '" data-id="' + field.id + '" value="' + escapeHtml(value) + '" />';

        return '<div class="editor"><label>' + field.fieldName + '</label>' + input + '<div class="editor-actions"><button type="button" data-save-kind="' + kind + '" data-save-id="' + field.id + '">Save</button></div></div>';
      };

      const renderWebsite = (website) => {
        const blocks = website.blocks.length
          ? website.blocks.map((block) => {
            const blockFields = block.fields.length
              ? block.fields.map(field => renderFieldEditor(field, 'field')).join('')
              : '<div class="empty">No direct block fields.</div>';

            const items = block.items.length
              ? block.items.map((item) => {
                const itemFields = item.fields.length
                  ? item.fields.map(field => renderFieldEditor(field, 'item-field')).join('')
                  : '<div class="empty">No item fields.</div>';

                return '<article class="item"><div class="item-header"><h4>Item #' + item.id + '</h4><span class="item-tag">' + item.itemType + ' • ' + item.sortOrder + '</span></div><div class="field-list">' + itemFields + '</div></article>';
              }).join('')
              : '<div class="empty">No items in this block.</div>';

            return '<article class="block"><div class="block-header"><div><h3>Block #' + block.id + '</h3></div><span class="block-tag">' + block.blockTypeName + ' • ' + block.sortOrder + '</span></div><div class="field-list">' + blockFields + '</div><div class="item-list" style="margin-top: 0.9rem;">' + items + '</div></article>';
          }).join('')
          : '<div class="empty">No blocks linked to this website.</div>';

        return '<section class="website"><div class="website-header"><div><h2>' + escapeHtml(website.name) + '</h2><p>' + escapeHtml(website.domain || 'No domain set') + '</p></div><span class="website-tag">Website #' + website.id + '</span></div><div class="block-list">' + blocks + '</div></section>';
      };

      const renderTree = (websites) => {
        if (!websites.length) {
          app.innerHTML = '<div class="empty">No websites found.</div>';
          return;
        }

        app.innerHTML = websites.map(renderWebsite).join('');
      };

      const loadTree = async () => {
        setStatus('Loading websites...');
        const payload = await fetchJson('/api/cms/tree');
        renderTree(payload.websites);
        setStatus('Websites loaded.');
      };

      const saveField = async (kind, id) => {
        const field = document.querySelector('[data-kind="' + kind + '"][data-id="' + id + '"]');

        if (!field) {
          return;
        }

        setStatus('Saving...');
        await fetchJson('/api/cms/' + kind + '/' + id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fieldValue: field.value,
          }),
        });

        setStatus('Saved.');
        await loadTree();
      };

      reloadButton.addEventListener('click', () => {
        void loadTree();
      });

      app.addEventListener('click', event => {
        const target = event.target;

        if (!(target instanceof HTMLButtonElement)) {
          return;
        }

        const kind = target.dataset.saveKind;
        const id = target.dataset.saveId;

        if (!kind || !id) {
          return;
        }

        void saveField(kind, id);
      });

      const bootstrap = async () => {
        try {
          await loadTree();
        } catch (error) {
          setStatus(error.message || 'Something went wrong.', true);
        }
      };

      void bootstrap();
    </script>
  </body>
</html>`;
