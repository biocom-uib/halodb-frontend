# ItemPicker

**ItemPicker** is a lightweight, dependency-free JavaScript component for selecting, adding, and managing items (tags, keywords, categories, etc.).  
It supports **single/multiple** selection, **readonly/collapsed** states, **custom icons**, **text localization**, and **id–label pairs**.

---

## 📦 Files

```
itempicker/
├─ itempicker.js
├─ itempicker.css
└─ README.md
```

---

## 🚀 Quick start

Include the stylesheet and script:

```html
<link rel="stylesheet" href="itempicker.css">
<script src="itempicker.js"></script>
```

Add a container and a hidden input (for form submission):

```html
<div id="tags-widget"></div>
<input type="hidden" id="tags" name="tags" value="">
```

Initialize:

```js
const picker = new ItemPicker(document.getElementById('tags-widget'), {
  hiddenInput: document.getElementById('tags'),
  options: ['genomics','microbiome','metabolomics'],
  initial: ['genomics'],
  multiple: true,
  collapsed: true
});
```

---

## ⚙️ Options

| Option | Type | Default | Description |
|---|---|---|---|
| **hiddenInput** | `HTMLElement` | – | Hidden `<input>` to sync values. |
| **hiddenLabelsInput** | `HTMLElement` | `null` | Optional second hidden input to store labels when `hiddenInputMode: 'ids'`. |
| **initial** | `string[] \| string \| {id,label}[] \| {id,label}` | `[]` | Initial selected value(s). |
| **options** | `string[] \| {id,label}[]` | `[]` | Predefined selectable options. |
| **caseInsensitive** | `boolean` | `true` | Case-insensitive comparisons. |
| **delimiter** | `string` | `','` | Separator for CSV outputs (multiple mode). |
| **readonly** | `boolean` | `false` | Hides editing controls. |
| **collapsed** | `boolean` | `false` | Start with editing controls hidden. |
| **multiple** | `boolean` | `true` | If `false`, single selection (radio). |
| **iconEdit** | `string` | ✎ SVG | Icon (Unicode or inline SVG) for “edit/open”. |
| **iconClose** | `string` | ✖ SVG | Icon (Unicode or inline SVG) for “close/hide”. |
| **texts** | `object` | (see below) | Localized texts. |
| **optionIdKey** | `string` | `'id'` | Key name for option id in objects. |
| **optionLabelKey** | `string` | `'label'` | Key name for option label in objects. |
| **userAddedId** | `number` | `-1` | Id applied to user-added items. |
| **hiddenInputMode** | `'ids' \| 'labels' \| 'json'` | `'ids'` | What to store in `hiddenInput`. |

---

## 🗣️ Texts / i18n

Default texts:

```js
{
  addPlaceholder: 'Add item…',
  chooseButton: 'Choose',
  toggleEditTitle: 'Edit items',
  toggleCloseTitle: 'Hide panel',
  emptyPlaceholder: 'No items',
  searchPlaceholder: 'Search…',
  noResults: 'No results',
  removeAria: (val) => `Remove ${val}`
}
```

Spanish example:
```js
const ES = {
  addPlaceholder: 'Añadir elemento…',
  chooseButton: 'Elegir',
  toggleEditTitle: 'Editar elementos',
  toggleCloseTitle: 'Ocultar panel',
  emptyPlaceholder: 'Sin elementos',
  searchPlaceholder: 'Buscar…',
  noResults: 'Sin resultados',
  removeAria: v => `Quitar ${v}`
};
new ItemPicker(el, { texts: ES });
```

Update at runtime:
```js
picker.setTexts({ chooseButton: 'Select' });
```

---

## 🧠 Public API

| Method | Returns / Description |
|---|---|
| `getValues()` | Current labels (`string[]` in multiple, `string` in single) — back-compat. |
| `getLabels()` | `string[]` of labels. |
| `getIds()` | `(number|string)[]` of ids. |
| `getSelected()` | `{id,label}[]` array of selected objects. |
| `setValues(values)` | Accepts strings, ids, or `{id,label}` objects (single value also supported in single mode). |
| `setOptions(options)` | Accepts strings or `{id,label}` objects. |
| `setReadonly(flag)` | Enable/disable readonly. |
| `setCollapsed(flag)` | Show/hide editing controls. |
| `setMultiple(flag)` | Switch single/multiple. |
| `setTexts(object)` | Update localized texts. |
| `setHiddenInputMode(mode)` | `'ids'|'labels'|'json'`. |

---

## 🧩 Events

The container dispatches a `change` event on updates:

```js
picker.root.addEventListener('change', (e) => {
  console.log('Values:', e.detail);
});
```

You can also control the component via a custom event:

```js
document.querySelector('#tags-widget')
  .dispatchEvent(new CustomEvent('itempicker:set', {
    detail: { values: [{id: 1, label: 'Alpha'}] }
  }));
```

---

## 🔗 Accessing instances

A static registry lets you fetch the instance from a DOM node:

```js
ItemPicker.from('#tags-widget').setValues([1,2,3]);
ItemPicker.from(document.getElementById('tags')).getIds();
```

Additionally, the instance is stored on `root.itemPicker` and (if provided) on `hiddenInput.itemPicker`.

---

## 💾 Hidden input formats

Choose how the hidden input is populated:

- `hiddenInputMode: 'ids'` (default) → CSV of ids. Optionally use `hiddenLabelsInput` for labels in parallel.
- `hiddenInputMode: 'labels'` → CSV of labels.
- `hiddenInputMode: 'json'` → JSON string of `{id,label}` or a single object in single mode.

CSV uses the configured `delimiter` (default `','`, written as `', '` for readability).

---

## 🧪 Example (`index.html`)

This repository includes an `index.html` showcasing three instances: store IDs, store labels, and store JSON.

---

## 🪶 CSS customization

The CSS uses the `ip-` prefix (e.g., `.ip-chip`, `.ip-icon-btn`). Feel free to override styles to match your theme.

---

## 🧾 License

MIT License  
© 2025, Pere Palmer + contributors
