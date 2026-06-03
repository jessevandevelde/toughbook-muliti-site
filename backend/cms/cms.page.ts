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
        --ink: #1f2624;
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
        display: grid;
        gap: 0.8rem;
        padding: 0.9rem 1rem;
        margin-bottom: 1rem;
      }

      .toolbar-main {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 0.8rem;
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

      .website-nav {
        display: flex;
        gap: 0.45rem;
        overflow-x: auto;
        padding: 0.35rem;
        border-radius: 16px;
        background: var(--surface-soft);
        scrollbar-width: thin;
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

      .nav-button {
        flex: 0 0 auto;
        min-height: 2.35rem;
        border: 1px solid transparent;
        border-radius: 12px;
        background: transparent;
        color: var(--accent-strong);
        padding: 0 0.75rem;
        font-size: 0.9rem;
        box-shadow: none;
      }

      .nav-button:hover,
      .nav-button.active {
        background: #ffffff;
        border-color: var(--line);
        color: var(--ink);
        transform: none;
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
        scroll-margin-top: 9rem;
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

      .website-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        justify-content: flex-end;
      }

      .ghost-button {
        min-height: 2.35rem;
        border: 1px solid var(--line);
        background: var(--surface);
        color: var(--accent-strong);
        padding: 0 0.85rem;
        font-size: 0.9rem;
      }

      .ghost-button:hover {
        background: var(--accent-soft);
        color: var(--accent-strong);
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

      .block-card.dragging {
        opacity: 0.62;
      }

      .drag-handle {
        display: inline-flex;
        align-items: center;
        min-height: 2rem;
        padding: 0 0.75rem;
        border: 1px dashed var(--line);
        border-radius: 999px;
        background: #ffffff;
        color: var(--muted);
        cursor: grab;
        font-size: 0.82rem;
        font-weight: 700;
      }

      .drag-handle:active {
        cursor: grabbing;
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

      .summary-row .block-head {
        margin-bottom: 0;
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

      .collapsible {
        display: grid;
        gap: 0.85rem;
      }

      .collapsible[hidden] {
        display: none;
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

      .toggle-button {
        min-height: 2rem;
        padding: 0 0.85rem;
        font-size: 0.86rem;
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
        <div class="toolbar-main">
          <div class="toolbar-left">
            <button id="reloadButton" type="button">Reload content</button>
            <span class="chip" id="websiteCount">0 websites</span>
            <span class="chip" id="blockCount">0 blocks</span>
          </div>
          <div class="toolbar-right">Tip: choose a website first, then edit the blocks below.</div>
        </div>
        <nav id="websiteNav" class="website-nav" aria-label="Website navigation"></nav>
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
      const websiteNav = document.getElementById('websiteNav');
      let draggedBlock = null;
      let dragSourceList = null;

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

      const slugify = (value) => {
        return 'website-' + String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      };

      const updateCounts = (websites) => {
        const totalBlocks = websites.reduce((sum, website) => sum + website.blocks.length, 0);
        websiteCount.textContent = websites.length + (websites.length === 1 ? ' website' : ' websites');
        blockCount.textContent = totalBlocks + (totalBlocks === 1 ? ' block' : ' blocks');
      };

      const renderWebsiteNav = (websites) => {
        websiteNav.innerHTML = websites.map((website, index) => {
          const activeClass = index === 0 ? ' active' : '';
          const label = escapeHtml(website.name || ('Website #' + website.id));

          return '<button class="nav-button' + activeClass + '" type="button" data-website-target="' + slugify(website.id) + '">' + label + '</button>';
        }).join('');
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

        return '<article class="block-card" data-block-id="' + block.id + '"><div class="summary-row"><div><h3>' + escapeHtml(block.blockTypeName) + '</h3><div class="summary-hint">Block #' + block.id + ' on position ' + block.sortOrder + '</div></div><div class="block-head"><span class="drag-handle" draggable="true" data-drag-handle="true">Drag</span><button class="toggle-button" type="button" data-toggle-block="' + block.id + '" aria-expanded="false">Open</button><span class="tag">' + block.items.length + ' items</span></div></div><div class="collapsible" data-block-content="' + block.id + '" hidden><div class="field-list">' + blockFields + '</div><div class="item-list">' + items + '</div></div></article>';
      };

      const renderWebsite = (website) => {
        const blocks = website.blocks.length
          ? website.blocks.map(block => renderBlock(block)).join('')
          : '<div class="empty">No blocks are linked to this website.</div>';

        return '<section class="website-card" id="' + slugify(website.id) + '"><div class="website-top"><div><h2>' + escapeHtml(website.name) + '</h2><p>' + escapeHtml(website.domain || 'No domain set') + '</p><div class="website-meta"><span class="chip">Website #' + website.id + '</span><span class="chip">' + website.blocks.length + ' blocks</span></div></div><div class="website-actions"><button class="ghost-button" type="button" data-website-target="' + slugify(website.id) + '">Focus website</button></div></div><div class="block-list">' + blocks + '</div></section>';
      };

      const renderTree = (websites) => {
        updateCounts(websites);
        renderWebsiteNav(websites);

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

      const saveBlockOrder = async (blockList) => {
        const blockIds = Array.from(blockList.querySelectorAll('[data-block-id]'))
          .map(block => Number(block.dataset.blockId))
          .filter(blockId => Number.isInteger(blockId) && blockId > 0);

        if (!blockIds.length) {
          return;
        }

        setStatus('Saving block order...');
        await fetchJson('/api/cms/blocks/order', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            blockIds,
          }),
        });

        setStatus('Block order saved.');
        await loadTree();
      };

      const getDragAfterElement = (container, y) => {
        const draggableElements = Array.from(container.querySelectorAll('.block-card:not(.dragging)'));

        return draggableElements.reduce((closest, child) => {
          const box = child.getBoundingClientRect();
          const offset = y - box.top - (box.height / 2);

          if (offset < 0 && offset > closest.offset) {
            return {
              offset,
              element: child,
            };
          }

          return closest;
        }, {
          offset: Number.NEGATIVE_INFINITY,
          element: null,
        }).element;
      };

      reloadButton.addEventListener('click', () => {
        void loadTree();
      });

      app.addEventListener('click', event => {
        const target = event.target;

        if (!(target instanceof HTMLButtonElement)) {
          return;
        }

        const blockId = target.dataset.toggleBlock;

        if (blockId) {
          const content = document.querySelector('[data-block-content="' + blockId + '"]');
          const isOpen = target.getAttribute('aria-expanded') === 'true';

          if (content) {
            content.hidden = isOpen;
          }

          target.setAttribute('aria-expanded', String(!isOpen));
          target.textContent = isOpen ? 'Open' : 'Close';
          return;
        }

        const kind = target.dataset.saveKind;
        const id = target.dataset.saveId;

        if (!kind || !id) {
          return;
        }

        void saveField(kind, id);
      });

      app.addEventListener('click', event => {
        const target = event.target;

        if (target instanceof HTMLElement && target.dataset.dragHandle) {
          event.preventDefault();
          event.stopPropagation();
        }
      });

      app.addEventListener('mousedown', event => {
        const target = event.target;

        if (target instanceof HTMLElement && target.dataset.dragHandle) {
          event.stopPropagation();
        }
      });

      app.addEventListener('dragstart', event => {
        const target = event.target;

        if (!(target instanceof HTMLElement) || !target.dataset.dragHandle || !event.dataTransfer) {
          event.preventDefault();
          return;
        }

        draggedBlock = target.closest('[data-block-id]');
        dragSourceList = draggedBlock?.closest('.block-list') ?? null;

        if (!draggedBlock || !dragSourceList) {
          event.preventDefault();
          return;
        }

        draggedBlock.classList.add('dragging');
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', draggedBlock.dataset.blockId);
      });

      app.addEventListener('dragover', event => {
        if (!draggedBlock) {
          return;
        }

        const blockList = event.target instanceof HTMLElement
          ? event.target.closest('.block-list')
          : null;

        if (!blockList || blockList !== dragSourceList) {
          return;
        }

        event.preventDefault();
        const afterElement = getDragAfterElement(blockList, event.clientY);

        if (afterElement) {
          blockList.insertBefore(draggedBlock, afterElement);
        }
        else {
          blockList.appendChild(draggedBlock);
        }
      });

      app.addEventListener('drop', event => {
        if (!draggedBlock || !dragSourceList) {
          return;
        }

        event.preventDefault();
        void saveBlockOrder(dragSourceList);
      });

      app.addEventListener('dragend', () => {
        draggedBlock?.classList.remove('dragging');
        draggedBlock = null;
        dragSourceList = null;
      });

      document.addEventListener('click', event => {
        const target = event.target;

        if (!(target instanceof HTMLButtonElement) || !target.dataset.websiteTarget) {
          return;
        }

        document.querySelectorAll('.nav-button').forEach(button => {
          button.classList.toggle('active', button.dataset.websiteTarget === target.dataset.websiteTarget);
        });

        document.getElementById(target.dataset.websiteTarget)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
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
