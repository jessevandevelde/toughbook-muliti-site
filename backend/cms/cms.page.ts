export const cmsPage = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Toughbook CMS</title>
    <style>
      :root {
        --bg: #f6f8f7;
        --surface: #ffffff;
        --surface-soft: #f1f5f3;
        --text: #17312a;
        --muted: #60756d;
        --line: #d8e2dd;
        --accent: #2f6b57;
        --accent-strong: #214a3d;
        --accent-soft: #e4f0eb;
        --warning: #a54734;
        --shadow: 0 18px 40px rgba(25, 48, 40, 0.08);
      }

      * {
        box-sizing: border-box;
      }

      html {
        scroll-behavior: smooth;
      }

      body {
        margin: 0;
        color: var(--text);
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        background:
          radial-gradient(circle at top left, #ffffff 0, transparent 22rem),
          linear-gradient(180deg, #f8fbfa 0%, var(--bg) 100%);
      }

      main {
        width: min(1220px, calc(100% - 2rem));
        margin: 1.5rem auto 3rem;
      }

      .shell,
      .website-card,
      .block-card,
      .item-card,
      .field-card,
      .toolbar {
        background: var(--surface);
        border: 1px solid var(--line);
        border-radius: 20px;
        box-shadow: var(--shadow);
      }

      .shell {
        padding: 1.5rem;
        margin-bottom: 1rem;
        position: relative;
        overflow: hidden;
      }

      .shell::after {
        content: "";
        position: absolute;
        inset: auto -4rem -4rem auto;
        width: 14rem;
        height: 14rem;
        background: radial-gradient(circle, rgba(47, 107, 87, 0.14), transparent 65%);
        pointer-events: none;
      }

      h1,
      h2,
      h3,
      h4 {
        margin: 0;
      }

      h1 {
        font-size: clamp(2rem, 4vw, 3.3rem);
        line-height: 1;
        letter-spacing: -0.03em;
        margin-bottom: 0.5rem;
      }

      h2 {
        font-size: 1.4rem;
      }

      h3 {
        font-size: 1.05rem;
      }

      h4 {
        font-size: 0.98rem;
      }

      p {
        margin: 0;
        color: var(--muted);
        line-height: 1.6;
      }

      .hero-copy {
        max-width: 48rem;
      }

      .toolbar {
        position: sticky;
        top: 1rem;
        z-index: 10;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 0.8rem;
        padding: 0.9rem 1rem;
        margin-bottom: 1rem;
      }

      .toolbar-left {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        align-items: center;
      }

      .toolbar-right {
        color: var(--muted);
        font-size: 0.92rem;
      }

      .chip {
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        min-height: 2.25rem;
        padding: 0 0.9rem;
        border-radius: 999px;
        background: var(--accent-soft);
        color: var(--accent-strong);
        font-size: 0.88rem;
        font-weight: 600;
      }

      button {
        min-height: 2.7rem;
        border: 0;
        border-radius: 999px;
        background: var(--accent);
        color: white;
        padding: 0 1rem;
        cursor: pointer;
        font: inherit;
        font-weight: 600;
        transition: transform 120ms ease, background 120ms ease;
      }

      button:hover {
        background: var(--accent-strong);
        transform: translateY(-1px);
      }

      button:active {
        transform: translateY(0);
      }

      .status {
        min-height: 1.5rem;
        margin: 0.5rem 0 1rem;
        color: var(--muted);
        font-size: 0.95rem;
      }

      .status.error {
        color: var(--warning);
      }

      .layout {
        display: grid;
        gap: 1rem;
      }

      .website-card {
        padding: 1rem;
      }

      .website-top {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 1rem;
        align-items: start;
        margin-bottom: 1rem;
      }

      .website-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 0.75rem;
      }

      .muted-label {
        color: var(--muted);
        font-size: 0.92rem;
      }

      .block-list,
      .item-list,
      .field-list {
        display: grid;
        gap: 0.85rem;
      }

      .block-card {
        padding: 1rem;
        background: linear-gradient(180deg, #ffffff 0%, #fbfdfc 100%);
      }

      .block-head,
      .item-head {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 0.75rem;
        align-items: center;
        margin-bottom: 0.85rem;
      }

      .tag {
        display: inline-flex;
        align-items: center;
        min-height: 2rem;
        padding: 0 0.8rem;
        border-radius: 999px;
        background: var(--surface-soft);
        color: var(--accent-strong);
        font-size: 0.82rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .item-card {
        padding: 0.85rem;
        background: #fcfefd;
      }

      .field-card {
        padding: 0.85rem;
        background: #ffffff;
      }

      .field-top {
        display: flex;
        justify-content: space-between;
        gap: 0.75rem;
        align-items: center;
        margin-bottom: 0.55rem;
      }

      .field-name {
        font-size: 0.9rem;
        font-weight: 700;
        color: var(--accent-strong);
      }

      .field-kind {
        font-size: 0.78rem;
        color: var(--muted);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      textarea,
      input {
        width: 100%;
        font: inherit;
        color: var(--text);
        background: var(--surface-soft);
        border: 1px solid var(--line);
        border-radius: 14px;
        padding: 0.8rem 0.9rem;
        transition: border-color 120ms ease, box-shadow 120ms ease, background 120ms ease;
      }

      input:focus,
      textarea:focus {
        outline: none;
        background: #ffffff;
        border-color: rgba(47, 107, 87, 0.6);
        box-shadow: 0 0 0 4px rgba(47, 107, 87, 0.12);
      }

      textarea {
        min-height: 6rem;
        resize: vertical;
      }

      .field-actions {
        display: flex;
        justify-content: flex-end;
        margin-top: 0.7rem;
      }

      .field-actions button {
        min-height: 2.35rem;
        padding: 0 0.9rem;
        font-size: 0.92rem;
      }

      .empty {
        padding: 1rem;
        border-radius: 16px;
        background: var(--surface-soft);
        color: var(--muted);
        font-size: 0.95rem;
      }

      details summary {
        list-style: none;
        cursor: pointer;
      }

      details summary::-webkit-details-marker {
        display: none;
      }

      .collapsible {
        display: grid;
        gap: 0.85rem;
      }

      .summary-row {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        align-items: center;
      }

      .summary-hint {
        color: var(--muted);
        font-size: 0.9rem;
      }

      @media (max-width: 760px) {
        main {
          width: min(100%, calc(100% - 1rem));
          margin-top: 0.75rem;
        }

        .shell,
        .website-card,
        .block-card,
        .item-card,
        .field-card,
        .toolbar {
          border-radius: 16px;
        }

        .toolbar {
          top: 0.5rem;
        }
      }
    </style>
  </head>
  <body>
    <main>
      <section class="shell">
        <div class="hero-copy">
          <h1>Toughbook CMS</h1>
          <p>Edit your websites in a clearer way: first the website, then the blocks used on that website, and inside each block the exact fields and repeating items that power the page.</p>
        </div>
      </section>

      <section class="toolbar">
        <div class="toolbar-left">
          <button id="reloadButton" type="button">Reload content</button>
          <span class="chip" id="websiteCount">0 websites</span>
          <span class="chip" id="blockCount">0 blocks</span>
        </div>
        <div class="toolbar-right">Tip: open one website at a time and save per field.</div>
      </section>

      <div id="status" class="status"></div>
      <section id="app" class="layout"></section>
    </main>

    <script>
      const app = document.getElementById('app');
      const reloadButton = document.getElementById('reloadButton');
      const status = document.getElementById('status');
      const websiteCount = document.getElementById('websiteCount');
      const blockCount = document.getElementById('blockCount');

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

      const updateCounts = (websites) => {
        const totalBlocks = websites.reduce((sum, website) => sum + website.blocks.length, 0);
        websiteCount.textContent = websites.length + (websites.length === 1 ? ' website' : ' websites');
        blockCount.textContent = totalBlocks + (totalBlocks === 1 ? ' block' : ' blocks');
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
        const multiline = String(value).length > 72 || String(value).includes('\\n');
        const input = multiline
          ? '<textarea data-kind="' + kind + '" data-id="' + field.id + '">' + escapeHtml(value) + '</textarea>'
          : '<input type="text" data-kind="' + kind + '" data-id="' + field.id + '" value="' + escapeHtml(value) + '" />';

        return '<div class="field-card"><div class="field-top"><div class="field-name">' + escapeHtml(field.fieldName) + '</div><div class="field-kind">' + kind + '</div></div>' + input + '<div class="field-actions"><button type="button" data-save-kind="' + kind + '" data-save-id="' + field.id + '">Save field</button></div></div>';
      };

      const renderItem = (item) => {
        const itemFields = item.fields.length
          ? item.fields.map(field => renderFieldEditor(field, 'item-field')).join('')
          : '<div class="empty">This item has no editable fields yet.</div>';

        return '<article class="item-card"><div class="item-head"><div><h4>Item #' + item.id + '</h4><div class="summary-hint">Reusable content inside this block</div></div><span class="tag">' + escapeHtml(item.itemType) + ' · ' + item.sortOrder + '</span></div><div class="field-list">' + itemFields + '</div></article>';
      };

      const renderBlock = (block) => {
        const blockFields = block.fields.length
          ? block.fields.map(field => renderFieldEditor(field, 'field')).join('')
          : '<div class="empty">This block has no direct fields.</div>';

        const items = block.items.length
          ? block.items.map(item => renderItem(item)).join('')
          : '<div class="empty">No items are linked to this block.</div>';

        return '<article class="block-card"><details open><summary class="summary-row"><div><h3>' + escapeHtml(block.blockTypeName) + '</h3><div class="summary-hint">Block #' + block.id + ' on position ' + block.sortOrder + '</div></div><span class="tag">' + block.items.length + ' items</span></summary><div class="collapsible"><div class="field-list">' + blockFields + '</div><div class="item-list">' + items + '</div></div></details></article>';
      };

      const renderWebsite = (website) => {
        const blocks = website.blocks.length
          ? website.blocks.map(block => renderBlock(block)).join('')
          : '<div class="empty">No blocks are linked to this website.</div>';

        return '<section class="website-card"><div class="website-top"><div><h2>' + escapeHtml(website.name) + '</h2><p>' + escapeHtml(website.domain || 'No domain set') + '</p><div class="website-meta"><span class="chip">Website #' + website.id + '</span><span class="chip">' + website.blocks.length + ' blocks</span></div></div></div><div class="block-list">' + blocks + '</div></section>';
      };

      const renderTree = (websites) => {
        updateCounts(websites);

        if (!websites.length) {
          app.innerHTML = '<div class="empty">No websites found.</div>';
          return;
        }

        app.innerHTML = websites.map(website => renderWebsite(website)).join('');
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

        setStatus('Saving field...');
        await fetchJson('/api/cms/' + kind + '/' + id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fieldValue: field.value,
          }),
        });

        setStatus('Field saved.');
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
