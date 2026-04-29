/* =================================================================
   touch-support.js — Suporte completo a touch para o COBOL Dev Studio

   Funcionalidades:
   1. Tap  curto  num item da palette  → adiciona nó ao centro do canvas
   2. Drag touch da palette → canvas   → cria nó onde o dedo for solto
   3. Drag touch de nó no canvas       → reposiciona o nó (igual ao mouse)

   Integração:
   - Não modifica o HTML5 Drag & Drop existente (coexiste com ele)
   - MutationObserver garante que nós criados dinamicamente também
     recebam suporte touch automaticamente
   ================================================================= */

(function () {
  'use strict';

  /* ── Constantes ─────────────────────────────────────────────────── */
  const TAP_MAX_MS  = 250;  // toque < 250 ms e < TAP_MAX_PX é considerado tap
  const TAP_MAX_PX  = 10;   // px máximo de movimento para continuar sendo tap
  const DRAG_THRESHOLD = 8; // px mínimo para considerar início de arraste de nó

  /* ── Ghost de pré-visualização (drag palette→canvas) ────────────── */
  let _ghost = null;

  function _getGhost() {
    if (_ghost) return _ghost;
    _ghost = document.createElement('div');
    _ghost.id = 'touch-drop-ghost';
    document.body.appendChild(_ghost);
    return _ghost;
  }

  function _removeGhost() {
    if (_ghost) { _ghost.remove(); _ghost = null; }
  }

  /* ── Utilitários ─────────────────────────────────────────────────── */

  /** Converte coordenadas client (clientX/Y) para posição dentro do canvas */
  function _toCanvasPos(clientX, clientY) {
    const scrollEl = document.getElementById('canvas-scroll');
    if (!scrollEl) return null;
    const rect = scrollEl.getBoundingClientRect();
    return {
      x: clientX - rect.left + scrollEl.scrollLeft,
      y: clientY - rect.top  + scrollEl.scrollTop
    };
  }

  /** Retorna true se as coordenadas estão sobre a área rolável do canvas */
  function _overCanvas(clientX, clientY) {
    const scrollEl = document.getElementById('canvas-scroll');
    if (!scrollEl) return false;
    const r = scrollEl.getBoundingClientRect();
    return clientX >= r.left && clientX <= r.right &&
           clientY >= r.top  && clientY <= r.bottom;
  }

  /** Cria o nó, tratando os tipos especiais (IPT_SET, PERFORM*) */
  function _doCreate(type, x, y) {
    if (type === 'IPT_SET' && window._createIPTSet) {
      window._createIPTSet(x, y);
    } else if (
      ['PERFORM', 'PERFORM_UNTIL', 'PERFORM_VARYING'].includes(type) &&
      window._createPerformWithPara
    ) {
      window._createPerformWithPara(type, x, y);
    } else if (window.createNodeAt) {
      window.createNodeAt(type, x, y);
    }

    // Em mobile: fecha o drawer esquerdo depois de adicionar o bloco
    if (window.innerWidth <= 768 && window.closeAllPanels) {
      window.closeAllPanels();
    }
  }

  /* ── 1 & 2: Touch drag Palette → Canvas ─────────────────────────── */

  function _bindActivityItem(item) {
    let type, t0x, t0y, t0ms, moved;

    item.addEventListener('touchstart', (e) => {
      type  = item.dataset.type;
      t0x   = e.touches[0].clientX;
      t0y   = e.touches[0].clientY;
      t0ms  = Date.now();
      moved = false;
    }, { passive: true });

    item.addEventListener('touchmove', (e) => {
      const t  = e.touches[0];
      const dx = t.clientX - t0x;
      const dy = t.clientY - t0y;

      if (!moved && (Math.abs(dx) > TAP_MAX_PX || Math.abs(dy) > TAP_MAX_PX)) {
        moved = true;
      }
      if (!moved) return;

      // Bloqueia scroll da página enquanto o usuário está arrastando
      e.preventDefault();

      // Atualiza ghost
      const meta  = window.activityMeta?.[type] ?? {};
      const ghost = _getGhost();
      ghost.style.display = 'flex';
      // Centraliza o ghost sob o dedo
      ghost.style.left = (t.clientX - 80) + 'px';
      ghost.style.top  = (t.clientY - 50) + 'px';
      ghost.innerHTML  = `<span>${meta.icon ?? '📦'}</span><span>${meta.label ?? type}</span>`;

      // Destaque no canvas
      const canvas = document.getElementById('canvas');
      if (canvas) canvas.classList.toggle('drag-over', _overCanvas(t.clientX, t.clientY));
    }, { passive: false });

    item.addEventListener('touchend', (e) => {
      _removeGhost();
      const canvas = document.getElementById('canvas');
      if (canvas) canvas.classList.remove('drag-over');

      const t       = e.changedTouches[0];
      const elapsed = Date.now() - t0ms;

      if (!moved || elapsed < TAP_MAX_MS) {
        // TAP: adiciona ao centro visível do canvas
        const scrollEl = document.getElementById('canvas-scroll');
        const cx = scrollEl ? scrollEl.scrollLeft + scrollEl.clientWidth  / 2 - 110 : 200;
        const cy = scrollEl ? scrollEl.scrollTop  + scrollEl.clientHeight / 2 -  40 : 150;
        _doCreate(type, Math.round(cx), Math.round(cy));
        return;
      }

      // DRAG DROP: cria onde o dedo foi solto (se for sobre o canvas)
      if (_overCanvas(t.clientX, t.clientY)) {
        const pos = _toCanvasPos(t.clientX, t.clientY);
        if (pos) _doCreate(type, Math.round(pos.x - 110), Math.round(pos.y - 40));
      }
    }, { passive: true });

    item.addEventListener('touchcancel', () => {
      _removeGhost();
      const canvas = document.getElementById('canvas');
      if (canvas) canvas.classList.remove('drag-over');
    }, { passive: true });
  }

  /* ── 3: Touch drag de nó no canvas ──────────────────────────────── */

  function _bindNodeCard(el) {
    let sx, sy, sl, st, dragging;
    let _nestTarget = null;

    const header = el.querySelector('.node-card-header');

    // Drag de nó: só inicia a partir do cabeçalho (igual ao mouse)
    const dragHandle = header || el;
    dragHandle.addEventListener('touchstart', (e) => {
      const tgt = e.target;
      // Ignora botões interativos dentro do cabeçalho (incluindo ▲▼)
      if (
        tgt.tagName === 'INPUT'    || tgt.tagName === 'BUTTON' ||
        tgt.tagName === 'SELECT'   || tgt.tagName === 'TEXTAREA' ||
        tgt.classList.contains('node-connect-btn')    ||
        tgt.classList.contains('node-card-remove-btn') ||
        tgt.classList.contains('node-move-btn')        // ▲▼ não devem iniciar drag
      ) return;

      sx       = e.touches[0].clientX;
      sy       = e.touches[0].clientY;
      sl       = parseInt(el.style.left) || 0;
      st       = parseInt(el.style.top)  || 0;
      dragging = false;
    }, { passive: true });

    dragHandle.addEventListener('touchmove', (e) => {
      if (sx === undefined) return;
      const t  = e.touches[0];
      const dx = t.clientX - sx;
      const dy = t.clientY - sy;

      if (!dragging) {
        if (Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) return;
        dragging         = true;
        el.style.zIndex  = '200';
        el.style.opacity = '0.9';
      }

      // Bloqueia o scroll do canvas-scroll enquanto move o nó
      e.preventDefault();

      el.style.left = Math.max(0, sl + dx) + 'px';
      el.style.top  = Math.max(0, st + dy) + 'px';

      // No touch (mobile): aceita drop em qualquer parte do nó alvo, não só no header
      el.style.pointerEvents = 'none';
      const under = document.elementFromPoint(t.clientX, t.clientY);
      el.style.pointerEvents = '';
      const candidate = under?.closest('.node-card');
      const nestTarget = (candidate && candidate !== el) ? candidate : null;
      if (nestTarget !== _nestTarget) {
        if (_nestTarget) _nestTarget.classList.remove('drop-target');
        _nestTarget = nestTarget;
        if (_nestTarget) _nestTarget.classList.add('drop-target');
      }

      if (window.drawArrows) window.drawArrows();
    }, { passive: false });

    const _onEnd = () => {
      if (dragging) {
        el.style.zIndex  = '';
        el.style.opacity = '';
        dragging = false;

        if (_nestTarget) {
          // Solto sobre outro nó → encaixa como sub-bloco
          _nestTarget.classList.remove('drop-target');
          if (window.nestCardInto) window.nestCardInto(el, _nestTarget);
          _nestTarget = null;
        } else {
          if (window.drawArrows) window.drawArrows();
        }
      } else if (_nestTarget) {
        _nestTarget.classList.remove('drop-target');
        _nestTarget = null;
      }
      sx = undefined;
    };

    dragHandle.addEventListener('touchend',    _onEnd, { passive: true });
    dragHandle.addEventListener('touchcancel', _onEnd, { passive: true });
  }

  /* ── 4: Pinch-to-zoom no canvas ─────────────────────────────────── */

  const ZOOM_MIN = 0.3;
  const ZOOM_MAX = 2.5;
  let _scale     = 1;
  let _pinchStartDist = null;
  let _pinchStartScale = 1;

  function _dist(t1, t2) {
    const dx = t1.clientX - t2.clientX;
    const dy = t1.clientY - t2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function _applyScale(newScale, originX, originY) {
    const canvas   = document.getElementById('canvas');
    const scrollEl = document.getElementById('canvas-scroll');
    if (!canvas || !scrollEl) return;

    newScale = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, newScale));
    const ratio = newScale / _scale;
    _scale = newScale;

    canvas.style.transform       = `scale(${_scale})`;
    canvas.style.transformOrigin = '0 0';

    // Ajusta o scroll para manter o ponto central visível
    scrollEl.scrollLeft = (scrollEl.scrollLeft + originX) * ratio - originX;
    scrollEl.scrollTop  = (scrollEl.scrollTop  + originY) * ratio - originY;

    _updateZoomBadge();
    if (window.drawArrows) window.drawArrows();
  }

  function _updateZoomBadge() {
    let badge = document.getElementById('canvas-zoom-badge');
    if (!badge) {
      badge = document.createElement('div');
      badge.id = 'canvas-zoom-badge';
      const toolbar = document.getElementById('canvas-toolbar');
      if (toolbar) toolbar.appendChild(badge);
    }
    badge.textContent = Math.round(_scale * 100) + '%';
    badge.style.cssText = 'font-size:11px;color:#888;margin-left:4px;min-width:34px;text-align:right;';
    // Botão reset de zoom (aparece ao lado do badge)
    let resetBtn = document.getElementById('canvas-zoom-reset');
    if (!resetBtn) {
      resetBtn = document.createElement('button');
      resetBtn.id        = 'canvas-zoom-reset';
      resetBtn.title     = 'Resetar zoom (100%)';
      resetBtn.className = 'canvas-btn';
      resetBtn.textContent = '1:1';
      resetBtn.style.cssText = 'font-size:10px;padding:2px 6px;';
      resetBtn.addEventListener('click', () => _applyScale(1, 0, 0));
      const toolbar = document.getElementById('canvas-toolbar');
      if (toolbar) toolbar.appendChild(resetBtn);
    }
  }

  function _bindPinchZoom() {
    const scrollEl = document.getElementById('canvas-scroll');
    if (!scrollEl) return;

    // Previne zoom do browser (double-tap / pinch nativo)
    scrollEl.addEventListener('touchstart', (e) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        _pinchStartDist  = _dist(e.touches[0], e.touches[1]);
        _pinchStartScale = _scale;
      }
    }, { passive: false });

    scrollEl.addEventListener('touchmove', (e) => {
      if (e.touches.length !== 2 || _pinchStartDist === null) return;
      e.preventDefault();

      const d     = _dist(e.touches[0], e.touches[1]);
      const scale = _pinchStartScale * (d / _pinchStartDist);

      // Ponto central entre os dois dedos (em coordenadas do scrollEl)
      const rect  = scrollEl.getBoundingClientRect();
      const cx    = ((e.touches[0].clientX + e.touches[1].clientX) / 2) - rect.left;
      const cy    = ((e.touches[0].clientY + e.touches[1].clientY) / 2) - rect.top;

      _applyScale(scale, cx, cy);
    }, { passive: false });

    scrollEl.addEventListener('touchend', (e) => {
      if (e.touches.length < 2) _pinchStartDist = null;
    }, { passive: true });

    // Zoom com Ctrl+scroll no desktop também
    scrollEl.addEventListener('wheel', (e) => {
      if (!e.ctrlKey) return;
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      const rect  = scrollEl.getBoundingClientRect();
      _applyScale(_scale * delta, e.clientX - rect.left, e.clientY - rect.top);
    }, { passive: false });
  }

  /* ── Inicialização ──────────────────────────────────────────────── */

  function _init() {
    // Palette
    document.querySelectorAll('.activity-item').forEach(_bindActivityItem);

    // Nós já existentes no canvas (inclui start/end que só têm cf-node)
    document.querySelectorAll('#canvas .cf-node').forEach(_bindNodeCard);

    // MutationObserver: ativa touch em nós criados dinamicamente
    const canvas = document.getElementById('canvas');
    if (canvas) {
      new MutationObserver((mutations) => {
        mutations.forEach(({ addedNodes }) => {
          addedNodes.forEach((n) => {
            if (n.nodeType === 1 && n.classList?.contains('cf-node')) {
              _bindNodeCard(n);
            }
          });
        });
      }).observe(canvas, { childList: true });
    }

    // Pinch zoom
    _bindPinchZoom();
    _updateZoomBadge();
  }

  // Aguarda o DOM e os scripts inline estarem prontos
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _init);
  } else {
    _init();
  }

})();
