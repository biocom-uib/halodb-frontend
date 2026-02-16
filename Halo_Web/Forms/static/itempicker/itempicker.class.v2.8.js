/*! ItemPicker v2.8
 *  - Chips arriba, botón de edición abajo
 *  - Input "Add item…" dentro del panel (sólo visible al abrir)
 *  - Lista con búsqueda, iconos (clase o URL), selección múltiple/single
 *  - Crear elementos inline que se añaden también a la lista (id único __uN)
 *  - Panel posicionado bajo el botón (recalcula en scroll/resize)
 *  - Carga remota de opciones (optionsUrl/optionsPath/optionFields/optionsParser/fetchOptions)
 *  - setOptions preserva opciones creadas por el usuario (__uN)
 *  - Hidden inputs: ids | labels | json
 *  - Eventos: .on() y CustomEvent 'itempicker:<evt>' en el contenedor
 *  - Sin dependencias (Vanilla JS)
 */

(function () {
  const DEFAULT_TEXTS = {
    addPlaceholder: 'Add item…',
    searchPlaceholder: 'Search…',
    clear: 'Clear',
    open: 'Edit',
    close: 'Close',
    noResults: 'No results',
    selected: 'Selected',
    removeItem: 'Remove',
    emptyPlaceholder: 'No items selected',
    loading: 'Loading…',
    loadError: 'Failed to load options'
  };

  const HIDDEN_MODES = { IDS: 'ids', LABELS: 'labels', JSON: 'json' };

  /* ---------- utils ---------- */
  function isObject(v) { return v !== null && typeof v === 'object'; }
  function toId(v) { return String(v); }
  function normLabel(v) { return String(v == null ? '' : v); }
  function isUrlLike(s) {
    return typeof s === 'string' && (
      /^https?:\/\//i.test(s) ||
      /^data:/i.test(s) ||
      /\.(png|jpe?g|gif|svg)$/i.test(s)
    );
  }
  function uniqueById(arr) {
    const seen = new Set(), out = [];
    for (const x of arr) if (!seen.has(x.id)) { seen.add(x.id); out.push(x); }
    return out;
  }
  function debounce(fn, ms) { let t = null; return function (...a) { if (t) clearTimeout(t); t = setTimeout(() => fn.apply(this, a), ms); }; }
  function getAtPath(obj, path) {
    if (!path) return obj;
    const segs = Array.isArray(path) ? path : String(path).split('.').filter(Boolean);
    let cur = obj;
    for (const k of segs) { if (cur && typeof cur === 'object' && k in cur) { cur = cur[k]; } else { return undefined; } }
    return cur;
  }
  function normalizeOption(opt, ci) {
    if (isObject(opt)) {
      const id = toId(opt.id);
      const label = normLabel(opt.label ?? opt.text ?? opt.value ?? id);
      const icon = opt.icon || null;
      return { id, label, icon, _normId: id, _normLabel: ci ? label.toLowerCase() : label };
    }
    const id = toId(opt);
    const label = normLabel(opt);
    return { id, label, icon: null, _normId: id, _normLabel: ci ? label.toLowerCase() : label };
  }
  function normalizeValue(v) {
    if (isObject(v)) return { id: toId(v.id), label: normLabel(v.label ?? v.text ?? v.value ?? v.id), icon: v.icon || null };
    const s = String(v);
    return { id: s, label: s, icon: null };
  }

  /* ---------- tiny emitter ---------- */
  class Emitter {
    constructor() { this._events = new Map(); }
    on(evt, fn) { if (!this._events.has(evt)) this._events.set(evt, new Set()); this._events.get(evt).add(fn); return this; }
    off(evt, fn) {
      if (!evt) { this._events.clear(); return this; }
      if (!this._events.has(evt)) return this;
      if (!fn) { this._events.get(evt).clear(); return this; }
      this._events.get(evt).delete(fn); return this;
    }
    emit(evt, detail) { if (!this._events.has(evt)) return; for (const fn of this._events.get(evt)) { try { fn(detail); } catch (_) { } } }
  }

  /* =============== ItemPicker =============== */
  class ItemPicker extends Emitter {
    constructor(el, opts = {}) {
      super();
      if (!el) throw new Error('ItemPicker: container element is required');
      this.el = el;

      this.opts = Object.assign({
        // core
        options: [], values: [], multiple: true, readonly: false, collapsed: false,
        delimiter: ',', writeSpaces: true,
        hiddenInput: null, hiddenLabelsInput: null, hiddenInputMode: HIDDEN_MODES.IDS,
        texts: {}, caseInsensitive: false, maxSelected: null,
        dropdownMatchButtonWidth: true,

        // toggle visuals
        toggleIcons: null,          // { open, close } -> string (class or URL)
        toggleShowLabel: true,      // show text next to icon

        // create inline (AHORA dentro del panel)
        allowCreate: true, createOnBlur: true,

        // remoto
        optionsUrl: null, fetchOptions: null, optionsPath: null,
        optionFields: { id: 'id', label: 'label', icon: 'icon' },
        optionsParser: null
      }, opts);

      this.texts = Object.assign({}, DEFAULT_TEXTS, this.opts.texts || {});
      this._caseInsensitive = !!this.opts.caseInsensitive;

      // state
      this._options = (this.opts.options || []).map(o => normalizeOption(o, this._caseInsensitive));
      this._selected = [];
      this._open = false;
      this._loading = false;
      this._loadError = null;
      this._destroyed = false;
      this._userSeq = 1;

      // refs/listeners
      this._refs = { root: null, chips: null, toolbar: null, btnToggle: null, panel: null, searchInput: null, addInput: null, list: null };
      this._listeners = [];
      this._bound = {
        docClick: (e) => this._handleDocClick(e),
        keyDown: (e) => this._handleKeyDown(e),
        onSearch: debounce(() => this._renderList(), 120),
        onScrollOrResize: () => { if (this._open) this._repositionPanel(); }
      };

      // build
      this._build();
      this._applyInitialValues(this.opts.values);
      if (this.opts.collapsed) this.setCollapsed(true);
      if (this.opts.readonly) this.setReadonly(true);
      this._syncHidden();

      if (this.opts.optionsUrl) this.reloadOptions().catch(() => { });
    }

    /* ---------- lifecycle ---------- */
    destroy() {
      if (this._destroyed) return;
      for (const { target, type, handler, options } of this._listeners) target.removeEventListener(type, handler, options);
      this._listeners = [];
      document.removeEventListener('click', this._bound.docClick, true);
      document.removeEventListener('keydown', this._bound.keyDown, true);
      window.removeEventListener('scroll', this._bound.onScrollOrResize, true);
      window.removeEventListener('resize', this._bound.onScrollOrResize, true);
      if (this.el && this._refs.root) this.el.removeChild(this._refs.root);
      if (this._refs.panel && this._refs.panel.parentNode) this._refs.panel.parentNode.removeChild(this._refs.panel);
      this._refs = null; this._options = []; this._selected = []; this._destroyed = true; this.off();
    }
    _on(target, type, handler, options) { target.addEventListener(type, handler, options); this._listeners.push({ target, type, handler, options }); }
    _emit(evt, detail) {
      super.emit(evt, detail);
      try { this.el.dispatchEvent(new CustomEvent('itempicker:' + evt, { detail })); } catch (_) { }
      if (evt === 'change') { try { this.el.dispatchEvent(new Event('change', { bubbles: true })); } catch (_) { } }
    }

    /* ---------- build DOM (chips arriba, toolbar abajo) ---------- */
    _build() {
      const root = document.createElement('div');
      root.className = 'ip';
      root.setAttribute('role', 'group');
      this._refs.root = root;

      // CHIPS (arriba)
      const chips = document.createElement('div');
      chips.className = 'ip-chips';
      chips.setAttribute('aria-live', 'polite');
      this._refs.chips = chips;

      // TOOLBAR con sólo el botón (abajo)
      const toolbar = document.createElement('div');
      toolbar.className = 'ip-toolbar ip-row';
      this._refs.toolbar = toolbar;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'ip-btn';
      btn.setAttribute('aria-expanded', 'false');
      this._refs.btnToggle = btn;
      this._updateToggleUI();

      toolbar.appendChild(btn);

      // PANEL en <body> con: search + addInput + list
      const panel = document.createElement('div');
      panel.className = 'ip-panel';
      panel.style.position = 'absolute';
      panel.style.display = 'none';
      document.body.appendChild(panel);
      this._refs.panel = panel;

      const searchWrap = document.createElement('div');
      searchWrap.className = 'ip-search';
      const searchInput = document.createElement('input');
      searchInput.type = 'text';
      searchInput.placeholder = this.texts.searchPlaceholder;
      searchWrap.appendChild(searchInput);
      panel.appendChild(searchWrap);
      this._refs.searchInput = searchInput;

      // NEW: input de creación DENTRO del panel
      const addWrap = document.createElement('div');
      addWrap.className = 'ip-add-wrap';
      const addInput = document.createElement('input');
      addInput.type = 'text';
      addInput.className = 'ip-add';
      addInput.placeholder = this.texts.addPlaceholder;
      addInput.autocomplete = 'off';
      addWrap.appendChild(addInput);
      panel.appendChild(addWrap);
      this._refs.addInput = addInput;

      const list = document.createElement('ul');
      list.className = 'ip-list';
      panel.appendChild(list);
      this._refs.list = list;

      // attach (CHIPS -> TOOLBAR)
      this.el.innerHTML = '';
      root.appendChild(chips);
      root.appendChild(toolbar);
      this.el.appendChild(root);

      // listeners
      this._on(btn, 'click', () => this.toggle());
      this._on(searchInput, 'input', this._bound.onSearch);
      this._on(list, 'click', (e) => {
        const li = e.target.closest('li[data-id]');
        if (li) this.toggleValue(li.getAttribute('data-id'));
      });

      if (this.opts.allowCreate) {
        this._on(addInput, 'keydown', (e) => {
          if (e.key === 'Enter' || e.key === this.opts.delimiter) {
            e.preventDefault();
            this._ingestRaw(addInput.value);
          }
        });
        if (this.opts.createOnBlur) {
          this._on(addInput, 'blur', () => {
            if (addInput.value.trim()) this._ingestRaw(addInput.value);
          });
        }
      } else { addInput.disabled = true; }

      document.addEventListener('click', this._bound.docClick, true);
      document.addEventListener('keydown', this._bound.keyDown, true);
      window.addEventListener('scroll', this._bound.onScrollOrResize, true);
      window.addEventListener('resize', this._bound.onScrollOrResize, true);

      // initial render
      this._renderChips();
      this._renderList();
    }

    /* ---------- toggle visuals ---------- */
    _renderToggleIcon(holder, icon) {
      if (!icon) return null;
      if (isUrlLike(icon)) {
        const img = document.createElement('img');
        img.className = 'ip-icon ip-toggle-icon';
        img.alt = '';
        img.setAttribute('aria-hidden', 'true');
        img.src = icon; holder.appendChild(img);
        return img;
      } else {
        const i = document.createElement('i');
        i.className = 'ip-icon ip-toggle-icon ' + icon;
        i.setAttribute('aria-hidden', 'true');
        holder.appendChild(i);
        return i;
      }
    }
    _updateToggleUI() {
      const btn = this._refs.btnToggle;
      if (!btn) return;
      btn.textContent = '';

      const isOpen = this._open === true;
      const label = isOpen ? this.texts.close : this.texts.open;
      const icon = this.opts.toggleIcons ? (isOpen ? this.opts.toggleIcons.close : this.opts.toggleIcons.open) : null;

      if (icon) this._renderToggleIcon(btn, icon);
      if (this.opts.toggleShowLabel !== false) {
        const span = document.createElement('span');
        span.className = 'ip-toggle-label';
        span.textContent = label;
        btn.appendChild(span);
        btn.removeAttribute('aria-label');
      } else {
        btn.setAttribute('aria-label', label);
      }
    }

    /* ---------- events / keys ---------- */
    _handleDocClick(e) {
      if (!this._open) return;
      const inside = this._refs.root.contains(e.target) || this._refs.panel.contains(e.target);
      if (!inside) this.close();
    }
    _handleKeyDown(e) {
      if (!this._open) return;
      if (document.activeElement === this._refs.searchInput || document.activeElement === this._refs.addInput) {
        if (e.key === 'Escape') { e.preventDefault(); this.close(); this._refs.btnToggle.focus(); }
        return;
      }
      if (e.key === 'ArrowDown') { e.preventDefault(); this._refs.searchInput.focus(); }
      if (e.key === 'Escape') { e.preventDefault(); this.close(); this._refs.btnToggle.focus(); }
    }

    /* ---------- values init ---------- */
    _applyInitialValues(values) {
      if (!values || (Array.isArray(values) && values.length === 0)) return;
      const parsed = Array.isArray(values) ? values.map(normalizeValue)
        : String(values).split(this.opts.delimiter).map(s => normalizeValue(s.trim()));
      const resolved = parsed.map(v => {
        const byId = this._options.find(o => o.id === v.id);
        if (byId) return { id: byId.id, label: byId.label, icon: byId.icon || null };
        const labelToFind = this._caseInsensitive ? v.label.toLowerCase() : v.label;
        const byLabel = this._options.find(o => o._normLabel === labelToFind);
        if (byLabel) return { id: byLabel.id, label: byLabel.label, icon: byLabel.icon || null };
        return { id: v.id, label: v.label, icon: v.icon || null };
      });
      this._selected = uniqueById(resolved);
    }

    /* ---------- render ---------- */
    _renderIcon(holder, icon, extraClass = '') {
      if (!icon) return;
      if (isUrlLike(icon)) {
        const img = document.createElement('img');
        img.className = 'ip-icon ' + extraClass;
        img.alt = '';
        img.src = icon;
        holder.appendChild(img);
      } else {
        const i = document.createElement('i');
        i.className = 'ip-icon ' + extraClass + ' ' + icon;
        holder.appendChild(i);
      }
    }
    _renderChips() {
      const c = this._refs.chips; c.innerHTML = '';
      const sel = this._selected.slice();
      if (sel.length === 0) {
        const ph = document.createElement('span');
        ph.className = 'ip-empty-chips';
        ph.textContent = this.texts.emptyPlaceholder;
        c.appendChild(ph);
        return;
      }
      const toShow = this.opts.multiple ? sel : [sel[0]];
      for (const s of toShow) {
        const chip = document.createElement('span');
        chip.className = 'ip-chip';

        const opt = this._options.find(o => o.id === s.id);
        this._renderIcon(chip, (opt && opt.icon) || s.icon || null);

        const text = document.createElement('span');
        text.className = 'ip-chip-label';
        text.textContent = s.label;
        chip.appendChild(text);

        if (!this.opts.readonly) {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'ip-chip-remove';
          btn.setAttribute('aria-label', `${this.texts.removeItem}: ${s.label}`);
          btn.textContent = '×';
          this._on(btn, 'click', () => this.remove(s.id));
          chip.appendChild(btn);
        }
        c.appendChild(chip);
      }
    }
    _renderList() {
      const list = this._refs.list;
      list.innerHTML = '';

      if (this._loading) { list.innerHTML = `<div class="ip-empty">${this.texts.loading}</div>`; return; }
      if (this._loadError) { list.innerHTML = `<div class="ip-empty">${this.texts.loadError}</div>`; return; }

      const q = (this._refs.searchInput.value || '').trim();
      const qn = this._caseInsensitive ? q.toLowerCase() : q;

      const filtered = !q ? this._options
        : this._options.filter(o => o._normLabel.includes(qn) || o._normId.includes(qn));

      if (filtered.length === 0) { list.innerHTML = `<div class="ip-empty">${this.texts.noResults}</div>`; return; }

      for (const o of filtered) {
        const li = document.createElement('li');
        li.setAttribute('data-id', o.id);
        const selected = this._selected.some(s => s.id === o.id);
        if (selected) li.classList.add('is-selected');
        li.setAttribute('aria-selected', selected ? 'true' : 'false');

        this._renderIcon(li, o.icon, '');
        const span = document.createElement('span');
        span.className = 'ip-item-label';
        span.textContent = o.label;
        li.appendChild(span);

        list.appendChild(li);
      }
    }

    _syncHidden() {
      const { hiddenInput, hiddenLabelsInput, hiddenInputMode, delimiter, writeSpaces } = this.opts;
      if (!hiddenInput) return;
      const sep = writeSpaces ? (delimiter + ' ') : delimiter;
      if (hiddenInputMode === HIDDEN_MODES.JSON) {
        hiddenInput.value = JSON.stringify(this._selected.map(s => ({ id: s.id, label: s.label })));
      } else if (hiddenInputMode === HIDDEN_MODES.LABELS) {
        hiddenInput.value = this.getLabels().join(sep);
      } else {
        hiddenInput.value = this.getIds().join(sep);
        if (hiddenLabelsInput) hiddenLabelsInput.value = this.getLabels().join(sep);
      }
    }

    _repositionPanel() {
      const panel = this._refs.panel;
      const btn = this._refs.btnToggle;
      const rect = btn.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

      panel.style.display = 'block';
      panel.classList.add('open');
      panel.style.top = (rect.bottom + scrollTop) + 'px';
      panel.style.left = (rect.left + scrollLeft) + 'px';
      if (this.opts.dropdownMatchButtonWidth) panel.style.minWidth = rect.width + 'px';
      else panel.style.minWidth = '';
      panel.style.zIndex = 9999;
    }

    /* ---------- public API ---------- */
    static from(el, opts) { return new ItemPicker(el, opts); }
    get root() { return this._refs.root; }

    open() {
      if (this._open || this.opts.readonly) return;
      this._open = true;
      this._repositionPanel();
      this._refs.btnToggle.setAttribute('aria-expanded', 'true');
      this._updateToggleUI();
      this._emit('open', { selected: this.getSelected() });
      setTimeout(() => { this._refs.searchInput.focus(); }, 0);
    }
    close() {
      if (!this._open) return;
      const panel = this._refs.panel;
      panel.classList.remove('open');
      panel.style.display = 'none';
      panel.style.top = panel.style.left = panel.style.minWidth = panel.style.zIndex = '';
      this._refs.btnToggle.setAttribute('aria-expanded', 'false');
      this._open = false;
      this._updateToggleUI();
      this._emit('close', { selected: this.getSelected() });
    }
    toggle() { this._open ? this.close() : this.open(); }

    getIds() { return this._selected.map(s => s.id); }
    getLabels() { return this._selected.map(s => s.label); }
    getSelected() { return this._selected.map(s => ({ id: s.id, label: s.label })); }

    setValues(values) {
      this._selected = [];
      this._applyInitialValues(values);
      this._renderChips(); this._renderList(); this._syncHidden();
      this._emit('change', { selected: this.getSelected() });
    }

    setOptions(options) {
      const incoming = (options || []).map(o => normalizeOption(o, this._caseInsensitive));

      // Preservar opciones creadas por usuario (id __uN)
      const userOpts = this._options.filter(o => String(o.id).startsWith('__u'));
      const seen = new Set(incoming.map(o => o.id));
      for (const u of userOpts) { if (!seen.has(u.id)) { incoming.push(u); seen.add(u.id); } }

      this._options = incoming;

      // Reconciliar selección por id
      this._selected = this._selected.map(s => {
        const found = this._options.find(o => o.id === s.id);
        return found ? { id: found.id, label: found.label, icon: found.icon || null } : s;
      });

      this._renderChips(); this._renderList(); this._syncHidden();
    }

    setReadonly(b) {
      this.opts.readonly = !!b;
      if (this.opts.readonly) { this.close(); this._refs.root.classList.add('ip-readonly'); }
      else this._refs.root.classList.remove('ip-readonly');
    }
    setCollapsed(b) {
      const on = !!b; this.opts.collapsed = on;
      this._refs.root.classList.toggle('is-collapsed', on);
    }
    setMultiple(b) {
      this.opts.multiple = !!b;
      if (!this.opts.multiple && this._selected.length > 1) {
        this._selected = this._selected.slice(0, 1);
        this._renderChips(); this._renderList(); this._syncHidden();
        this._emit('change', { selected: this.getSelected() });
      }
    }
    setTexts(partial) {
      this.texts = Object.assign({}, this.texts, partial || {});
      if (this._refs.searchInput) this._refs.searchInput.placeholder = this.texts.searchPlaceholder;
      if (this._refs.addInput) this._refs.addInput.placeholder = this.texts.addPlaceholder;
      this._updateToggleUI();
    }
    setHiddenInputMode(mode) {
      if (!Object.values(HIDDEN_MODES).includes(mode)) return;
      this.opts.hiddenInputMode = mode; this._syncHidden();
    }
    setCaseInsensitive(b) {
      const ci = !!b; if (ci === this._caseInsensitive) return;
      this._caseInsensitive = ci;
      this._options = this._options.map(o => ({
        id: o.id, label: o.label, icon: o.icon || null,
        _normId: o.id, _normLabel: ci ? o.label.toLowerCase() : o.label
      }));
      this._renderList();
    }
    setDelimiter(delim, writeSpaces = this.opts.writeSpaces) {
      this.opts.delimiter = delim; this.opts.writeSpaces = !!writeSpaces; this._syncHidden();
    }

    /* ---------- add/remove/toggle ---------- */
    add(v) {
      const { maxSelected, multiple } = this.opts;

      const isObj = v && typeof v === 'object';
      const incoming = isObj ? v : { id: toId(v), label: String(v) };
      const wantLabel = incoming.label || incoming.id;

      let opt =
        (incoming.id && this._options.find(o => o.id === incoming.id)) ||
        (wantLabel ? this._findOptionByLabel(wantLabel) : null);

      if (!opt) {
        const labelToUse = wantLabel || incoming.id;
        opt = this._ensureOption(labelToUse);
      }

      const toAdd = { id: opt.id, label: opt.label, icon: opt.icon || null };

      if (!multiple && this._selected.length === 1) {
        if (this._selected[0].id === toAdd.id) return;
        this._selected = [toAdd];
      } else {
        if (this._selected.some(s => s.id === toAdd.id)) return;
        if (maxSelected != null && this._selected.length >= maxSelected) return;
        this._selected.push(toAdd);
      }

      this._renderChips(); this._renderList(); this._syncHidden();
      this._emit('add', { item: toAdd, selected: this.getSelected() });
      this._emit('change', { selected: this.getSelected() });

      if (!this.opts.multiple) { this.close(); this._refs.btnToggle.focus(); }
    }
    remove(id) {
      const sid = toId(id);
      const idx = this._selected.findIndex(s => s.id === sid);
      if (idx === -1) return;
      const [removed] = this._selected.splice(idx, 1);
      this._renderChips(); this._renderList(); this._syncHidden();
      this._emit('remove', { item: removed, selected: this.getSelected() });
      this._emit('change', { selected: this.getSelected() });
    }
    toggleValue(idOrObj) {
      const val = normalizeValue(idOrObj);
      const sid = toId(val.id);
      if (this._selected.some(s => s.id === sid)) this.remove(sid);
      else this.add(sid);
      this._emit('toggle', { id: sid, selected: this.getSelected() });
    }

    /* ---------- create inline (dentro del panel) ---------- */
    _mkUserId() { return `__u${this._userSeq++}`; }
    _findOptionByLabel(label) {
      const ln = this._caseInsensitive ? String(label).toLowerCase() : String(label);
      return this._options.find(o => o._normLabel === ln);
    }
    _ensureOption(label) {
      let opt = this._findOptionByLabel(label);
      if (!opt) {
        opt = normalizeOption({ id: this._mkUserId(), label }, this._caseInsensitive);
        this._options.push(opt);
        this._renderList();
      }
      return opt;
    }
    _ingestRaw(raw) {
      if (!this.opts.allowCreate) return;
      if (!raw || this.opts.readonly) return;

      const parts = String(raw).split(this.opts.delimiter).map(x => x.trim()).filter(Boolean);
      if (parts.length === 0) return;

      if (this.opts.multiple) {
        let changed = false;
        for (const p of parts) {
          const opt = this._ensureOption(p);
          if (!this._selected.some(s => s.id === opt.id)) {
            this._selected.push({ id: opt.id, label: opt.label, icon: opt.icon || null });
            changed = true;
          }
        }
        if (changed) {
          this._renderChips(); this._renderList(); this._syncHidden();
          this._emit('change', { selected: this.getSelected() });
        }
      } else {
        const opt = this._ensureOption(parts[0]);
        if (this._selected.length !== 1 || this._selected[0].id !== opt.id) {
          this._selected = [{ id: opt.id, label: opt.label, icon: opt.icon || null }];
          this._renderChips(); this._renderList(); this._syncHidden();
          this._emit('change', { selected: this.getSelected() });
        }
      }
      if (this._refs.addInput) this._refs.addInput.value = '';
    }

    /* ---------- remote ---------- */
    async reloadOptions() {
      if (!this.opts.optionsUrl) return;
      const url = this.opts.optionsUrl;
      this._loading = true; this._loadError = null;
      this._emit('options:loading', { url });
      if (this._open) this._renderList();
      try {
        const res = await fetch(url, this.opts.fetchOptions || undefined);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const json = await res.json();
        let arr;
        if (typeof this.opts.optionsParser === 'function') {
          arr = this.opts.optionsParser(json);
        } else {
          const node = this.opts.optionsPath ? getAtPath(json, this.opts.optionsPath) : json;
          arr = node;
        }
        if (!Array.isArray(arr)) throw new Error('Response did not resolve to an array');
        const f = this.opts.optionFields || { id: 'id', label: 'label', icon: 'icon' };
        const mapped = arr.map(row => isObject(row) ? ({ id: row[f.id], label: row[f.label], icon: row[f.icon] }) : row);
        this.setOptions(mapped);
        this._emit('options:loaded', { url, count: mapped.length });
      } catch (err) {
        this._loadError = String((err && err.message) || err);
        this._emit('options:error', { url, error: this._loadError });
      } finally {
        this._loading = false;
        if (this._open) this._renderList();
      }
    }
    async setOptionsUrl(url, fetchOptions) {
      this.opts.optionsUrl = url;
      if (fetchOptions) this.opts.fetchOptions = fetchOptions;
      await this.reloadOptions();
    }
  }

  // expose
  window.ItemPicker = ItemPicker;
})();
