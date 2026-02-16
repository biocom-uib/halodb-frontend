
/*! itempicker.auto.v1.js
 * Helper de auto-inicialización e inyección para ItemPicker v2.7
 * Requiere que window.ItemPicker ya esté cargado.
 *
 * Uso:
 *   <script src="itempicker.class.v2.7.js"></script>
 *   <script>
 *     // Opcional: configurar auto-init antes de cargar este archivo
 *     // window.ItemPickerAutoInit = { selector: '[data-itempicker]', observe: true };
 *   </script>
 *   <script src="itempicker.auto.v1.js"></script>
 *
 * Marcado:
 *   <div class="ip-mount" data-itempicker='{"multiple":true,"optionsUrl":"/api/tags"}'>
 *     <input type="hidden" name="tags">
 *     <script type="application/json" class="options">
 *       [{"id":"js","label":"JavaScript"},{"id":"py","label":"Python"}]
 *     </script>
 *   </div>
 */
(function (root) {
  'use strict';
  if (!root || !root.document) return;
  var W = root;
  var D = W.document;

  if (!W.ItemPicker) {
    console.error('[itempicker.auto] window.ItemPicker no está disponible. Carga primero itempicker.class.v2.7.js');
    return;
  }
  var IP = W.ItemPicker;

  // --- config global opcional ---
  var GLOBAL_CFG = (typeof W.ItemPickerAutoInit === 'object') ? W.ItemPickerAutoInit : {};
  var DEFAULTS = {
    selector: '[data-itempicker]',
    observe: true,
    observeRoot: D.documentElement
  };
  var RUNTIME = {
    selector: GLOBAL_CFG.selector || DEFAULTS.selector,
    observe: typeof GLOBAL_CFG.observe === 'boolean' ? GLOBAL_CFG.observe : DEFAULTS.observe,
    observeRoot: GLOBAL_CFG.observeRoot || DEFAULTS.observeRoot
  };

  function safeJSON(text, fallback) {
    if (!text) return (fallback === undefined ? null : fallback);
    try { return JSON.parse(text); } catch (e) { console.warn('[itempicker.auto] JSON inválido:', e); return (fallback === undefined ? null : fallback); }
  }

  function readDatasetConfig(el) {
    // Config principal desde data-itempicker (JSON)
    var cfg = safeJSON(el.getAttribute('data-itempicker'), {}) || {};
    // Opciones embebidas en <script type="application/json" class="options">
    var optScript = el.querySelector('script.options[type="application/json"]');
    if (optScript) {
      var parsed = safeJSON(optScript.textContent, []);
      if (Array.isArray(parsed)) cfg.options = parsed;
      else if (parsed && Array.isArray(parsed.items)) cfg.options = parsed.items; // fallback común
    }
    // Hidden inputs (ids y labels) si existen dentro del contenedor
    var hidden = el.querySelector('input[type="hidden"]:not([data-role])');
    var hiddenLabels = el.querySelector('input[type="hidden"][data-role="labels"]');
    if (hidden) cfg.hiddenInput = hidden;
    if (hiddenLabels) cfg.hiddenLabelsInput = hiddenLabels;

    // Si se definió un "optionsParserName" en data, mapeamos a función registrada.
    if (cfg.optionsParserName && IP._parsers && typeof IP._parsers[cfg.optionsParserName] === 'function') {
      cfg.optionsParser = IP._parsers[cfg.optionsParserName];
    }
    return cfg;
  }

  // Permite registrar funciones de parser por nombre y referenciarlas desde data-itempicker
  if (!IP._parsers) IP._parsers = {};
  IP.registerParser = function (name, fn) {
    if (!name || typeof fn !== 'function') return;
    IP._parsers[name] = fn;
  };

  // Inicializa UNA instancia en un contenedor. 'extra' permite sobrescribir/añadir opciones.
  IP.mount = function (container, extra) {
    if (!container || container.nodeType !== 1) return null;
    if (container._itempicker) return container._itempicker;
    var cfg = readDatasetConfig(container);
    if (extra && typeof extra === 'object') {
      for (var k in extra) if (Object.prototype.hasOwnProperty.call(extra, k)) cfg[k] = extra[k];
    }
    var ip = IP.from(container, cfg);
    container._itempicker = ip;
    return ip;
  };

  // Inicializa TODAS las instancias bajo un root (o en document) para los nodos con selector
  IP.initAll = function (rootEl, selector) {
    var scope = (rootEl && rootEl.querySelectorAll) ? rootEl : D;
    var sel = selector || RUNTIME.selector;
    var nodes = scope.querySelectorAll(sel);
    for (var i = 0; i < nodes.length; i++) {
      if (!nodes[i]._itempicker) IP.mount(nodes[i], null);
    }
  };

  // Destruye todas las instancias bajo un root (o en document)
  IP.destroyAll = function (rootEl, selector) {
    var scope = (rootEl && rootEl.querySelectorAll) ? rootEl : D;
    var sel = selector || RUNTIME.selector;
    var nodes = scope.querySelectorAll(sel);
    for (var i = 0; i < nodes.length; i++) {
      var inst = nodes[i]._itempicker;
      if (inst && typeof inst.destroy === 'function') {
        try { inst.destroy(); } catch (e) {}
        nodes[i]._itempicker = null;
      }
    }
  };

  // Observa DOM para auto-init en nodos añadidos y auto-destroy en nodos eliminados
  IP.observe = function (opts) {
    var o = Object.assign({ root: RUNTIME.observeRoot, selector: RUNTIME.selector }, (opts || {}));
    if (!('MutationObserver' in W)) {
      console.warn('[itempicker.auto] Este entorno no soporta MutationObserver; usa ItemPicker.initAll() manualmente.');
      return function noop() {};
    }
    var mo = new MutationObserver(function (muts) {
      muts.forEach(function (m) {
        // añadidos
        for (var i = 0; i < m.addedNodes.length; i++) {
          var node = m.addedNodes[i];
          if (node.nodeType !== 1) continue;
          if (node.matches && node.matches(o.selector)) {
            IP.initAll(node.parentNode || node, o.selector);
          } else if (node.querySelectorAll) {
            IP.initAll(node, o.selector);
          }
        }
        // eliminados
        for (var j = 0; j < m.removedNodes.length; j++) {
          var r = m.removedNodes[j];
          if (r.nodeType !== 1) continue;
          if (r._itempicker && typeof r._itempicker.destroy === 'function') {
            try { r._itempicker.destroy(); } catch (e) {}
            r._itempicker = null;
          }
          if (r.querySelectorAll) {
            var els = r.querySelectorAll(o.selector);
            for (var k = 0; k < els.length; k++) {
              var inst = els[k]._itempicker;
              if (inst && typeof inst.destroy === 'function') {
                try { inst.destroy(); } catch (e) {}
                els[k]._itempicker = null;
              }
            }
          }
        }
      });
    });
    mo.observe(o.root, { childList: true, subtree: true });
    return function disconnect() { try { mo.disconnect(); } catch (e) {} };
  };

  // Auto-init al cargar
  D.addEventListener('DOMContentLoaded', function () {
    IP.initAll(D, RUNTIME.selector);
    if (RUNTIME.observe !== false) {
      IP._unobserve = IP.observe({ root: RUNTIME.observeRoot, selector: RUNTIME.selector });
    }
  });

})(typeof window !== 'undefined' ? window : this);

