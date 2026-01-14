class ItemPicker {
  constructor(container, {
    hiddenInput,
    hiddenLabelsInput = null,

    initial = [],
    options = [],
    caseInsensitive = true,
    delimiter = ',',
    readonly = false,
    collapsed = false,
    multiple = true,

    iconEdit = '<svg viewBox="0 0 24 24" width="16" height="16"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.004 1.004 0 0 0 0-1.42l-2.34-2.34a1.004 1.004 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z"/></svg>',
    iconClose = '<svg viewBox="0 0 24 24" width="16" height="16"><path d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7a1 1 0 0 0-1.41 1.42L10.59 12l-4.9 4.89a1 1 0 1 0 1.41 1.42L12 13.41l4.89 4.9a1 1 0 0 0 1.42-1.42L13.41 12l4.9-4.89a1 1 0 0 0-.01-1.4z"/></svg>',

    texts = {},

    optionIdKey = 'id',
    optionLabelKey = 'label',
    userAddedId = -1,
    hiddenInputMode = 'ids' // 'ids' | 'labels' | 'json'
  } = {}) {
    this.root = container;
    this.hiddenInput = hiddenInput;
    this.hiddenLabelsInput = hiddenLabelsInput;

    this.caseInsensitive = caseInsensitive;
    this.delimiter = delimiter;
    this._isReadonly = !!readonly;
    this._collapsed = !!collapsed;
    this._multiple = !!multiple;

    this._iconEdit = iconEdit;
    this._iconClose = iconClose;

    this._t = {
      addPlaceholder: 'Add item…',
      chooseButton: 'Choose',
      toggleEditTitle: 'Edit items',
      toggleCloseTitle: 'Hide panel',
      emptyPlaceholder: 'No items',
      searchPlaceholder: 'Search…',
      noResults: 'No results',
      removeAria: (val) => `Remove ${val}`,
      ...texts
    };

    this._idKey = optionIdKey;
    this._labelKey = optionLabelKey;
    this._userAddedId = userAddedId;
    this._hiddenInputMode = hiddenInputMode;

    this.options = []; // [{id,label}]
    this.values = [];  // [{id,label}]

    this._render();

    this.setOptions(options);
    this.setValues(initial);

    this.setReadonly(this._isReadonly);
    this.setCollapsed(this._collapsed);

    // Registry for external access
    if (!ItemPicker.#reg) ItemPicker.#reg = new WeakMap();
    ItemPicker.#reg.set(this.root, this);
    this.root.itemPicker = this;
    if (this.hiddenInput) { ItemPicker.#reg.set(this.hiddenInput, this); this.hiddenInput.itemPicker = this; }
    if (this.hiddenLabelsInput) { ItemPicker.#reg.set(this.hiddenLabelsInput, this); this.hiddenLabelsInput.itemPicker = this; }

    // External control via events
    this.root.addEventListener('itempicker:set', (e) => {
      const { values, options, readonly, collapsed, multiple, texts } = e.detail || {};
      if (values !== undefined)   this.setValues(values);
      if (options !== undefined)  this.setOptions(options);
      if (readonly !== undefined) this.setReadonly(!!readonly);
      if (collapsed !== undefined) this.setCollapsed(!!collapsed);
      if (multiple !== undefined) this.setMultiple(!!multiple);
      if (texts)                  this.setTexts(texts);
    });
  }

  static #reg = null;
  static from(elOrSelector) {
    const el = typeof elOrSelector === 'string' ? document.querySelector(elOrSelector) : elOrSelector;
    return ItemPicker.#reg?.get(el) || null;
  }

  _render() {
    this.root.classList.add('ip');

    this.chipsBox = document.createElement('div');
    this.chipsBox.className = 'ip-chips';

    this.toolbar = document.createElement('div');
    this.toolbar.className = 'ip-toolbar ip-row';

    this.toggleBtn = document.createElement('button');
    this.toggleBtn.type = 'button';
    this.toggleBtn.className = 'ip-icon-btn ip-toggle';
    this.toggleBtn.innerHTML = this._collapsed ? this._iconEdit : this._iconClose;
    this.toggleBtn.title = this._t.toggleEditTitle;
    this.toggleBtn.addEventListener('click', () => this.setCollapsed(!this._collapsed));

    this.controls = document.createElement('div');
    this.controls.className = 'ip-controls';

    this.dropdownWrap = document.createElement('div');
    this.dropdownWrap.className = 'ip-dropdown';

    this.chooseBtn = document.createElement('button');
    this.chooseBtn.type = 'button';
    this.chooseBtn.className = 'ip-btn';
    this.chooseBtn.textContent = this._t.chooseButton;
    this.chooseBtn.addEventListener('click', () => {
      this.panel.classList.toggle('open');
      if (this.panel.classList.contains('open')) {
        this.searchInput.focus();
        this._renderOptions();
      }
    });

    this.panel = document.createElement('div');
    this.panel.className = 'ip-panel';
    document.addEventListener('click', (e) => {
      if (!this.panel.contains(e.target) && !this.chooseBtn.contains(e.target)) {
        this.panel.classList.remove('open');
      }
    });

    const searchBox = document.createElement('div');
    searchBox.className = 'ip-search';
    this.searchInput = document.createElement('input');
    this.searchInput.placeholder = this._t.searchPlaceholder;
    this.searchInput.addEventListener('input', () => this._renderOptions());
    searchBox.appendChild(this.searchInput);

    this.listEl = document.createElement('ul');
    this.listEl.className = 'ip-list';
    this.panel.appendChild(searchBox);
    this.panel.appendChild(this.listEl);
    this.dropdownWrap.appendChild(this.chooseBtn);
    this.dropdownWrap.appendChild(this.panel);

    this.addInput = document.createElement('input');
    this.addInput.className = 'ip-add';
    this.addInput.placeholder = this._t.addPlaceholder;
    this.addInput.autocomplete = 'off';
    this.addInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === this.delimiter) {
        e.preventDefault();
        this._ingestRaw(this.addInput.value);
      }
    });
    this.addInput.addEventListener('blur', () => {
      if (this.addInput.value.trim()) this._ingestRaw(this.addInput.value);
    });

    this.controls.appendChild(this.dropdownWrap);
    this.controls.appendChild(this.addInput);
    this.toolbar.appendChild(this.toggleBtn);
    this.toolbar.appendChild(this.controls);

    const row = document.createElement('div');
    row.className = 'ip-row';
    row.appendChild(this.chipsBox);
    this.root.appendChild(row);
    this.root.appendChild(this.toolbar);
  }

  _norm(s) { return s.replace(/\s+/g, ' ').trim(); }
  _eqLabel(a, b) { return this.caseInsensitive ? a.toLowerCase() === b.toLowerCase() : a === b; }

  _toObj(x) {
    if (x == null) return null;
    if (typeof x === 'object') {
      const id = x[this._idKey] ?? x.id ?? null;
      const label = x[this._labelKey] ?? x.label ?? '';
      const lab = this._norm(String(label || ''));
      if (!lab) return null;
      return { id, label: lab };
    }
    const lab = this._norm(String(x));
    if (!lab) return null;
    return { id: null, label: lab };
  }

  _idOf(obj) { return obj?.id ?? null; }
  _labelOf(obj) { return obj?.label ?? ''; }

  _hasObj(arr, obj) {
    const id = this._idOf(obj);
    const lab = this._labelOf(obj);
    return arr.some(o => {
      if (id != null && o.id != null) return String(o.id) === String(id);
      return this._eqLabel(o.label, lab);
    });
  }

  _addOrReplace(obj, intoArr) {
    const id = this._idOf(obj);
    const lab = this._labelOf(obj);
    const idx = intoArr.findIndex(o => {
      if (id != null && o.id != null) return String(o.id) === String(id);
      return this._eqLabel(o.label, lab);
    });
    if (idx >= 0) intoArr[idx] = obj;
    else intoArr.push(obj);
  }

  _ingestRaw(raw) {
    if (!raw || this._isReadonly) return;
    const parts = raw.split(this.delimiter).map(x => this._norm(x)).filter(Boolean);
    if (parts.length === 0) return;

    if (this._multiple) {
      let changed = false;
      for (const p of parts) {
        const obj = { id: this._userAddedId, label: p };
        if (!this._hasObj(this.values, obj)) { this.values.push(obj); changed = true; }
      }
      if (changed) this._sync();
    } else {
      const obj = { id: this._userAddedId, label: parts[0] };
      if (!this._hasObj(this.values, obj) || this.values.length !== 1) {
        this.values = [obj];
        this._sync();
      }
    }
    this.addInput.value = '';
  }

  _renderChips() {
    this.chipsBox.innerHTML = '';
    if (this.values.length === 0) {
      const ph = document.createElement('span');
      ph.style.color = '#888';
      ph.textContent = this._t.emptyPlaceholder;
      this.chipsBox.appendChild(ph);
      return;
    }
    const toShow = this._multiple ? this.values : [this.values[0]];
    for (const obj of toShow) {
      const chip = document.createElement('span');
      chip.className = 'ip-chip';
      const text = document.createElement('span');
      text.textContent = this._labelOf(obj);
      chip.appendChild(text);

      if (!this._isReadonly) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.setAttribute('aria-label', this._t.removeAria(this._labelOf(obj)));
        btn.textContent = '×';
        btn.addEventListener('click', () => {
          if (this._multiple) {
            this.values = this.values.filter(v => !this._hasObj([obj], v));
          } else {
            this.values = [];
          }
          this._sync();
        });
        chip.appendChild(btn);
      }
      this.chipsBox.appendChild(chip);
    }
  }

  _renderOptions() {
    if (!this.panel.classList.contains('open')) return;
    const q = this._norm(this.searchInput.value || '').toLowerCase();
    const opts = this.options
      .filter(o => !q || this._labelOf(o).toLowerCase().includes(q))
      .sort((a,b) => this._labelOf(a).localeCompare(this._labelOf(b)));

    this.listEl.innerHTML = '';
    if (opts.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'ip-empty';
      empty.textContent = this._t.noResults;
      this.listEl.appendChild(empty);
      return;
    }

    for (const opt of opts) {
      const label = this._labelOf(opt);
      const id = `ip-opt-${label.replace(/\s+/g,'-').toLowerCase()}-${String(this._idOf(opt) ?? 'x')}`;
      const li = document.createElement('li');

      const input = document.createElement('input');
      input.type = this._multiple ? 'checkbox' : 'radio';
      input.name = 'ip-choice';
      input.id = id;
      input.disabled = this._isReadonly;
      input.checked = this._hasObj(this.values, opt);

      input.addEventListener('change', () => {
        if (this._isReadonly) return;
        if (this._multiple) {
          if (input.checked) {
            if (!this._hasObj(this.values, opt)) this.values.push(opt);
          } else {
            this.values = this.values.filter(v => !this._hasObj([opt], v));
          }
        } else {
          if (input.checked) this.values = [opt];
        }
        this._sync();
      });

      const l = document.createElement('label');
      l.setAttribute('for', id);
      l.textContent = label;

      li.appendChild(input);
      li.appendChild(l);
      this.listEl.appendChild(li);
    }
  }

  _sync() {
    this._renderChips();

    if (this.hiddenInput) {
      if (this._hiddenInputMode === 'ids') {
        const vals = this._multiple ? this.getIds() : (this.getIds()[0] ?? '');
        this.hiddenInput.value = Array.isArray(vals) ? vals.join(this.delimiter + ' ') : String(vals ?? '');
        if (this.hiddenLabelsInput) {
          const labs = this._multiple ? this.getLabels() : (this.getLabels()[0] ?? '');
          this.hiddenLabelsInput.value = Array.isArray(labs) ? labs.join(this.delimiter + ' ') : String(labs ?? '');
        }
      } else if (this._hiddenInputMode === 'labels') {
        const labs = this._multiple ? this.getLabels() : (this.getLabels()[0] ?? '');
        this.hiddenInput.value = Array.isArray(labs) ? labs.join(this.delimiter + ' ') : String(labs ?? '');
      } else {
        const sel = this.getSelected();
        this.hiddenInput.value = JSON.stringify(this._multiple ? sel : (sel[0] ?? null));
      }
    }

    this._renderOptions();
    this.root.dispatchEvent(new CustomEvent('change', { detail: this.getValues() }));
  }

  getValues() { return this._multiple ? this.getLabels() : (this.getLabels()[0] ?? ''); }
  getLabels() { return this.values.map(v => this._labelOf(v)); }
  getIds() { return this.values.map(v => this._idOf(v)); }
  getSelected() { return this.values.map(v => ({ id: this._idOf(v), label: this._labelOf(v) })); }

  setValues(input) {
    const list = Array.isArray(input) ? input : (input != null ? [input] : []);
    const normalized = [];
    for (const x of list) {
      const obj = this._toObj(x);
      if (!obj) continue;

      if (obj.id == null) {
        const found = this.options.find(o => this._eqLabel(this._labelOf(o), this._labelOf(obj)));
        if (found) obj.id = this._idOf(found);
      }
      if ((obj.id != null) && !obj.label) {
        const found = this.options.find(o => String(this._idOf(o)) === String(obj.id));
        if (found) obj.label = this._labelOf(found);
      }
      if (obj.id == null) obj.id = this._userAddedId;

      this._addOrReplace(obj, normalized);
      if (!this._multiple) break;
    }
    this.values = normalized;
    this._sync();
  }

  setOptions(arr) {
    const clean = [];
    for (const x of (arr || [])) {
      const obj = this._toObj(x);
      if (!obj) continue;
      clean.push({ id: obj.id, label: obj.label });
    }
    this.options = clean;
    this._renderOptions();
  }

  setReadonly(flag) {
    this._isReadonly = !!flag;
    this.root.classList.toggle('ip-readonly', this._isReadonly);
    this.toolbar.style.display = this._isReadonly ? 'none' : '';
    this.panel.classList.remove('open');
    this._sync();
  }

  setCollapsed(flag) {
    this._collapsed = !!flag;
    this.controls.classList.toggle('hidden', this._collapsed);
    this.toggleBtn.innerHTML = this._collapsed ? this._iconEdit : this._iconClose;
    this.toggleBtn.classList.toggle('active', !this._collapsed);
    this.toggleBtn.setAttribute('aria-expanded', String(!this._collapsed));
    if (this._collapsed) this.panel.classList.remove('open');
    this.toggleBtn.title = this._collapsed ? this._t.toggleEditTitle : this._t.toggleCloseTitle;
  }

  setMultiple(flag) {
    this._multiple = !!flag;
    if (!this._multiple && this.values.length > 1) this.values = [this.values[0]];
    this.panel.classList.remove('open');
    this._sync();
  }

  setTexts(texts = {}) {
    this._t = { ...this._t, ...texts };
    if (this.addInput) this.addInput.placeholder = this._t.addPlaceholder;
    if (this.chooseBtn) this.chooseBtn.textContent = this._t.chooseButton;
    if (this.searchInput) this.searchInput.placeholder = this._t.searchPlaceholder;
    if (this.toggleBtn) this.toggleBtn.title = this._collapsed ? this._t.toggleEditTitle : this._t.toggleCloseTitle;
    this._renderChips();
    this._renderOptions();
  }

  setHiddenInputMode(mode) {
    this._hiddenInputMode = mode; // 'ids'|'labels'|'json'
    this._sync();
  }
}