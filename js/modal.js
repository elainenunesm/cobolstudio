Segue uma versão **completa em um único arquivo HTML**, com **CSS e JavaScript internos**, tentando chegar o mais próximo possível da imagem original em layout, cores, espaçamentos, textos, cards, sidebars, rodapé e ilustrações.

Copie tudo para um arquivo `index.html` e abra no navegador:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CICS IDE – Prototipação de Telas</title>

  <style>
    :root {
      --bg: #ffffff;
      --bg-soft: #fbfcfe;
      --bg-blue-soft: #f5f8ff;
      --bg-green-soft: #f4fbf5;
      --bg-purple-soft: #fbfaff;

      --blue: #304bd3;
      --blue-dark: #263cb3;
      --green: #238448;
      --green-dark: #1c6d3b;

      --text: #111827;
      --text-soft: #4b5563;
      --muted: #7b8494;
      --muted-light: #9aa4b2;

      --border: #e7eaf0;
      --border-soft: #f0f2f5;
      --dash: #cfd6e2;

      --radius-sm: 4px;
      --radius-md: 8px;
      --radius-lg: 10px;

      --header-h: 64px;
      --footer-h: 36px;
      --left-w: 268px;
      --right-w: 326px;

      --shadow-card: 0 1px 2px rgba(16, 24, 40, 0.03);
      --font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
    }

    * {
      box-sizing: border-box;
    }

    html,
    body {
      width: 100%;
      height: 100%;
      margin: 0;
    }

    body {
      font-family: var(--font);
      font-size: 12px;
      color: var(--text);
      background: var(--bg);
      overflow: hidden;
      -webkit-font-smoothing: antialiased;
      text-rendering: geometricPrecision;
    }

    button {
      font: inherit;
    }

    .app {
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: column;
      background: #fff;
    }

    .svg-defs {
      position: absolute;
      width: 0;
      height: 0;
      overflow: hidden;
    }

    .icon {
      width: 15px;
      height: 15px;
      flex: 0 0 auto;
      display: inline-block;
    }

    .icon-sm {
      width: 13px;
      height: 13px;
    }

    .icon-lg {
      width: 22px;
      height: 22px;
    }

    /* HEADER */

    .topbar {
      height: var(--header-h);
      min-height: var(--header-h);
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 15px;
      background: #fff;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
    }

    .brand-logo {
      width: 40px;
      height: 40px;
      border-radius: 7px;
      background: linear-gradient(135deg, #3446a8, #354fd0);
      color: #fff;
      display: grid;
      place-items: center;
      font-size: 17px;
      font-weight: 800;
      letter-spacing: -1px;
      box-shadow: inset 0 0 0 1px rgba(255,255,255,0.12);
    }

    .brand-text {
      min-width: 0;
    }

    .brand-title {
      margin: 0;
      font-size: 17px;
      line-height: 1.1;
      font-weight: 650;
      letter-spacing: -0.01em;
      color: #171923;
      white-space: nowrap;
    }

    .brand-subtitle {
      margin: 5px 0 0;
      font-size: 10.5px;
      color: #6f7785;
      white-space: nowrap;
    }

    .top-actions {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
    }

    .top-btn {
      height: 36px;
      padding: 0 14px;
      border: 1px solid var(--border);
      border-radius: 4px;
      background: #fff;
      color: #273142;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      cursor: pointer;
      font-size: 11.5px;
      font-weight: 500;
      transition: background .15s, border-color .15s, color .15s;
    }

    .top-btn:hover {
      background: #fafbfc;
      border-color: #d9dee8;
    }

    .top-btn.run {
      min-width: 144px;
      background: #f7f6ff;
      border-color: #e2dffc;
      color: #2538a6;
    }

    .top-btn.run:hover {
      background: #f0efff;
    }

    .top-btn.icon-only {
      width: 34px;
      padding: 0;
    }

    .avatar {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: var(--blue);
      color: #fff;
      display: grid;
      place-items: center;
      font-size: 12px;
      font-weight: 700;
      margin-left: 2px;
    }

    /* MAIN GRID */

    .main-shell {
      flex: 1;
      min-height: 0;
      display: grid;
      grid-template-columns: var(--left-w) minmax(640px, 1fr) var(--right-w);
      background: #fff;
    }

    .left-panel,
    .right-panel {
      min-height: 0;
      overflow: auto;
      background: #fff;
    }

    .left-panel {
      border-right: 1px solid var(--border);
    }

    .right-panel {
      border-left: 1px solid var(--border);
    }

    .panel-inner {
      padding: 18px 18px 20px;
    }

    .panel-title {
      margin: 0 0 13px;
      font-size: 10px;
      line-height: 1;
      text-transform: uppercase;
      letter-spacing: .055em;
      font-weight: 750;
      color: #202938;
    }

    .panel-subtitle {
      margin: 0 0 12px;
      font-size: 10px;
      color: #576071;
      text-transform: uppercase;
    }

    .section-divider {
      height: 1px;
      background: var(--border);
      margin: 21px -18px;
    }

    /* LEFT SIDEBAR */

    .tree {
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    .tree-row {
      width: 100%;
      border: 0;
      background: transparent;
      padding: 4px 0;
      color: #263244;
      display: flex;
      align-items: center;
      gap: 5px;
      cursor: pointer;
      font-size: 11.5px;
      line-height: 18px;
      text-align: left;
    }

    .tree-row:hover {
      color: var(--blue);
    }

    .tree-row .caret {
      color: #8d96a6;
    }

    .tree-row .folder {
      color: #d6a638;
    }

    .tree-row.active {
      font-weight: 650;
      color: #192232;
    }

    .tree-child {
      padding-left: 19px;
      margin: 4px 0 5px;
    }

    .empty-file-box {
      border: 1px dashed var(--dash);
      background: #fcfdff;
      border-radius: 7px;
      min-height: 89px;
      padding: 21px 16px 18px;
      text-align: center;
      color: var(--muted);
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .empty-file-title {
      font-size: 10.5px;
      color: #6c7482;
      margin-bottom: 9px;
      font-weight: 500;
    }

    .empty-file-text {
      margin: 0;
      font-size: 10px;
      line-height: 1.5;
      color: #778191;
    }

    .quick-box {
      min-height: 116px;
      border: 1px dashed var(--dash);
      border-radius: 7px;
      background: #fff;
      padding: 16px;
      display: grid;
      place-items: center;
      text-align: center;
    }

    .quick-box svg {
      margin-bottom: 10px;
    }

    .quick-box p {
      margin: 0;
      font-size: 10px;
      line-height: 1.55;
      color: #737d8c;
      max-width: 190px;
    }

    .project-info {
      display: grid;
      gap: 9px;
      margin-top: 2px;
    }

    .info-row {
      display: flex;
      gap: 5px;
      font-size: 10.5px;
      line-height: 1.15;
    }

    .info-label {
      color: #687182;
      width: 91px;
      flex: 0 0 auto;
    }

    .info-value {
      color: #1d2736;
      min-width: 0;
    }

    .tip-box {
      margin-top: 23px;
      background: #f3f3ff;
      border: 1px solid #ecebff;
      border-radius: 7px;
      padding: 15px 15px 14px;
    }

    .tip-head {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #2d45c6;
      font-size: 11.5px;
      font-weight: 700;
      margin-bottom: 10px;
    }

    .tip-box p {
      margin: 0;
      color: #56617a;
      font-size: 10px;
      line-height: 1.6;
    }

    .tip-box a {
      color: #2d45c6;
      text-decoration: none;
      font-weight: 500;
    }

    .tip-box a:hover {
      text-decoration: underline;
    }

    /* CENTER */

    .workspace {
      min-width: 0;
      min-height: 0;
      background: #fff;
      padding: 10px;
      overflow: hidden;
    }

    .stage {
      width: 100%;
      height: 100%;
      border: 1px solid var(--border);
      border-radius: 5px;
      background: #fff;
      overflow: auto;
      padding: 43px 42px 45px;
    }

    .stage-inner {
      width: min(100%, 765px);
      margin: 0 auto;
    }

    .page-title {
      margin: 0 0 12px;
      font-size: 14px;
      font-weight: 750;
      line-height: 1.2;
      letter-spacing: -0.01em;
      color: #111827;
    }

    .page-subtitle {
      margin: 0 0 43px;
      font-size: 11px;
      line-height: 1.4;
      color: #5f6878;
    }

    .choice-grid {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 44px minmax(0, 1fr);
      gap: 30px;
      align-items: stretch;
      margin-bottom: 58px;
    }

    .choice-card {
      min-height: 315px;
      border: 1px solid var(--border);
      border-radius: 8px;
      box-shadow: var(--shadow-card);
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 28px 34px 27px;
    }

    .choice-card.blue {
      background: var(--bg-blue-soft);
      border-color: #dfe6fb;
    }

    .choice-card.green {
      background: var(--bg-green-soft);
      border-color: #dcefe0;
    }

    .choice-illustration {
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 14px;
    }

    .choice-title {
      margin: 0 0 13px;
      font-size: 14px;
      line-height: 1.2;
      font-weight: 750;
      color: #151b27;
    }

    .choice-desc {
      margin: 0 auto 25px;
      font-size: 10.8px;
      line-height: 1.6;
      color: #4f596b;
      max-width: 245px;
    }

    .choice-footer {
      margin-top: auto;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .primary-btn {
      width: 218px;
      height: 39px;
      border: 0;
      border-radius: 5px;
      color: #fff;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-size: 11.2px;
      font-weight: 650;
      box-shadow: 0 1px 2px rgba(16,24,40,.09);
    }

    .primary-btn.blue {
      background: var(--blue);
    }

    .primary-btn.blue:hover {
      background: var(--blue-dark);
    }

    .primary-btn.green {
      background: var(--green);
    }

    .primary-btn.green:hover {
      background: var(--green-dark);
    }

    .support-text {
      margin-top: 14px;
      font-size: 9.8px;
      color: #778191;
    }

    .or {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #3d4656;
      font-size: 12px;
      font-weight: 700;
    }

    .how-card {
      background: #fbfaff;
      border: 1px solid #ececf2;
      border-radius: 8px;
      min-height: 258px;
      padding: 29px 31px;
      display: grid;
      grid-template-columns: minmax(0, 1fr) 294px;
      gap: 35px;
      align-items: center;
    }

    .how-title {
      margin: 0 0 21px;
      font-size: 11.8px;
      font-weight: 750;
      color: #283142;
    }

    .how-list {
      display: grid;
      gap: 15px;
    }

    .how-item {
      display: grid;
      grid-template-columns: 22px 20px minmax(0, 1fr);
      gap: 10px;
      align-items: start;
    }

    .how-icon {
      color: #6c7585;
      margin-top: 1px;
    }

    .how-number {
      color: #737d8c;
      font-size: 11px;
      font-weight: 650;
      line-height: 18px;
      text-align: right;
    }

    .how-item strong {
      display: block;
      font-size: 10.8px;
      line-height: 1.35;
      color: #1e2633;
      margin-bottom: 3px;
      font-weight: 750;
    }

    .how-item span {
      display: block;
      font-size: 10.2px;
      line-height: 1.35;
      color: #667085;
    }

    .how-visual {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* RIGHT */

    .right-panel .panel-inner {
      padding: 20px 21px 20px;
    }

    .steps {
      position: relative;
      margin-top: 23px;
      padding-left: 31px;
    }

    .steps::before {
      content: "";
      position: absolute;
      left: 11px;
      top: 15px;
      bottom: 39px;
      width: 1px;
      background: #dfe4ec;
    }

    .next-step {
      position: relative;
      margin-bottom: 27px;
      cursor: pointer;
    }

    .step-bullet {
      position: absolute;
      left: -31px;
      top: 0;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #97a3b6;
      color: #fff;
      display: grid;
      place-items: center;
      font-size: 10px;
      font-weight: 750;
      z-index: 1;
    }

    .next-step.active .step-bullet {
      background: var(--blue);
    }

    .next-step-head {
      min-height: 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 9px;
      margin-bottom: 5px;
    }

    .next-step-title {
      font-size: 10.8px;
      color: #1f2937;
      font-weight: 750;
      line-height: 1.25;
    }

    .next-step-head .icon {
      color: #7d8796;
      width: 12px;
      height: 12px;
    }

    .next-step p {
      margin: 0;
      color: #647083;
      font-size: 10px;
      line-height: 1.55;
      max-width: 185px;
    }

    .report-empty {
      border: 1px dashed var(--dash);
      border-radius: 8px;
      min-height: 254px;
      margin-top: 26px;
      padding: 32px 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      background: #fff;
    }

    .report-empty-inner {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .report-empty p {
      margin: 18px 0 0;
      max-width: 203px;
      color: #626d7f;
      font-size: 10px;
      line-height: 1.55;
    }

    /* FOOTER */

    .statusbar {
      height: var(--footer-h);
      min-height: var(--footer-h);
      border-top: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #fff;
      padding: 0 14px;
      color: #5e6878;
      font-size: 10.5px;
      overflow: hidden;
    }

    .status-side {
      display: flex;
      align-items: center;
      min-width: 0;
    }

    .status-item {
      height: 19px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 0 14px;
      border-right: 1px solid var(--border);
      white-space: nowrap;
    }

    .status-item:first-child {
      padding-left: 0;
    }

    .status-item:last-child {
      border-right: 0;
      padding-right: 0;
    }

    .status-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #30b469;
    }

    .connected {
      color: #2b3b48;
    }

    /* TOAST */

    .toast {
      position: fixed;
      right: 22px;
      bottom: 52px;
      min-width: 230px;
      max-width: 340px;
      padding: 12px 14px;
      background: #111827;
      color: #fff;
      border-radius: 8px;
      box-shadow: 0 16px 40px rgba(15, 23, 42, .22);
      font-size: 12px;
      line-height: 1.45;
      opacity: 0;
      transform: translateY(10px);
      pointer-events: none;
      transition: opacity .2s, transform .2s;
      z-index: 20;
    }

    .toast.show {
      opacity: 1;
      transform: translateY(0);
    }

    input[type="file"] {
      display: none;
    }

    /* SCROLLBAR */

    *::-webkit-scrollbar {
      width: 9px;
      height: 9px;
    }

    *::-webkit-scrollbar-track {
      background: transparent;
    }

    *::-webkit-scrollbar-thumb {
      background: #d8dde7;
      border-radius: 10px;
      border: 2px solid #fff;
    }

    *::-webkit-scrollbar-thumb:hover {
      background: #c5ccd8;
    }

    @media (max-width: 1180px) {
      :root {
        --left-w: 248px;
        --right-w: 294px;
      }

      .stage {
        padding-left: 28px;
        padding-right: 28px;
      }

      .choice-grid {
        gap: 20px;
      }
    }

    @media (max-width: 980px) {
      .main-shell {
        grid-template-columns: var(--left-w) minmax(0, 1fr);
      }

      .right-panel {
        display: none;
      }

      .top-actions .top-btn:not(.run):not(.icon-only) {
        display: none;
      }
    }
  </style>
</head>

<body>
  <!-- ÍCONES SVG INTERNOS -->
  <svg class="svg-defs" aria-hidden="true">
    <symbol id="i-play" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7L8 5Z" fill="currentColor"></path>
    </symbol>

    <symbol id="i-trash" viewBox="0 0 24 24">
      <path d="M3 6h18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M8 6V4h8v2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6 6l1 15h10l1-15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <path d="M10 11v6M14 11v6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </symbol>

    <symbol id="i-export" viewBox="0 0 24 24">
      <path d="M14 3h5v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <path d="M10 13 19 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M19 13v6H5V5h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    </symbol>

    <symbol id="i-gear" viewBox="0 0 24 24">
      <path d="M12 15.2A3.2 3.2 0 1 0 12 8.8a3.2 3.2 0 0 0 0 6.4Z" stroke="currentColor" stroke-width="1.8" fill="none"/>
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.05.05a2 2 0 0 1-2.83 2.83l-.05-.05a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.04 1.57V21a2 2 0 0 1-4 0v-.07a1.7 1.7 0 0 0-1.04-1.57 1.7 1.7 0 0 0-1.87.34l-.05.05a2 2 0 1 1-2.83-2.83l.05-.05A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.57-1.04H3a2 2 0 0 1 0-4h.03A1.7 1.7 0 0 0 4.6 8.92a1.7 1.7 0 0 0-.34-1.87l-.05-.05a2 2 0 0 1 2.83-2.83l.05.05a1.7 1.7 0 0 0 1.87.34A1.7 1.7 0 0 0 10 3.03V3a2 2 0 0 1 4 0v.03a1.7 1.7 0 0 0 1.04 1.57 1.7 1.7 0 0 0 1.87-.34l.05-.05A2 2 0 0 1 19.79 7l-.05.05a1.7 1.7 0 0 0-.34 1.87 1.7 1.7 0 0 0 1.57 1.04H21a2 2 0 0 1 0 4h-.03A1.7 1.7 0 0 0 19.4 15Z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    </symbol>

    <symbol id="i-caret-down" viewBox="0 0 24 24">
      <path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    </symbol>

    <symbol id="i-caret-right" viewBox="0 0 24 24">
      <path d="m9 6 6 6-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    </symbol>

    <symbol id="i-folder" viewBox="0 0 24 24">
      <path d="M3.5 7.5h6l2 2h9v9a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" fill="none"/>
      <path d="M2 10h20" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
    </symbol>

    <symbol id="i-upload" viewBox="0 0 24 24">
      <path d="M12 16V4" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>
      <path d="m7.5 8.5 4.5-4.5 4.5 4.5" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <path d="M5 16v3h14v-3" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    </symbol>

    <symbol id="i-pencil" viewBox="0 0 24 24">
      <path d="M4 20h4l11-11-4-4L4 16v4Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" fill="none"/>
      <path d="m13.5 6.5 4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </symbol>

    <symbol id="i-lightbulb" viewBox="0 0 24 24">
      <path d="M9 18h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M10 21h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M8 14.5c-1.4-1.1-2.3-2.8-2.3-4.7A6.3 6.3 0 0 1 12 3.5a6.3 6.3 0 0 1 6.3 6.3c0 1.9-.9 3.6-2.3 4.7-.8.6-1 1.2-1 2H9c0-.8-.2-1.4-1-2Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    </symbol>

    <symbol id="i-route" viewBox="0 0 24 24">
      <circle cx="6" cy="18" r="2.5" stroke="currentColor" stroke-width="1.8" fill="none"/>
      <circle cx="18" cy="6" r="2.5" stroke="currentColor" stroke-width="1.8" fill="none"/>
      <path d="M8.5 18h3.2a3 3 0 0 0 3-3v-3a3 3 0 0 1 3-3H18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" fill="none"/>
    </symbol>

    <symbol id="i-file" viewBox="0 0 24 24">
      <path d="M7 3h7l4 4v14H7V3Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" fill="none"/>
      <path d="M14 3v5h5" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" fill="none"/>
      <path d="M9 12h6M9 15h6M9 18h4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
    </symbol>

    <symbol id="i-arrows" viewBox="0 0 24 24">
      <path d="M7 7h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <path d="m14 4 3 3-3 3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <path d="M17 17H7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <path d="m10 14-3 3 3 3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    </symbol>

    <symbol id="i-play-circle" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8" fill="none"/>
      <path d="M10 8.5v7l5.5-3.5L10 8.5Z" fill="currentColor"/>
    </symbol>

    <symbol id="i-clipboard" viewBox="0 0 24 24">
      <path d="M9 4h6l1 2h3v15H5V6h3l1-2Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" fill="none"/>
      <path d="M9 6h6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
      <path d="M8 11h8M8 15h8M8 19h5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
    </symbol>

    <symbol id="i-terminal" viewBox="0 0 24 24">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.7" fill="none"/>
      <path d="m7 10 3 2-3 2M12 15h5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
    </symbol>

    <symbol id="i-xcircle" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8" fill="none"/>
      <path d="m9 9 6 6M15 9l-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </symbol>

    <symbol id="i-warning" viewBox="0 0 24 24">
      <path d="M12 4 3 20h18L12 4Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" fill="none"/>
      <path d="M12 9v5M12 17h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </symbol>
  </svg>

  <div class="app">
    <!-- HEADER -->
    <header class="topbar">
      <div class="brand">
        <div class="brand-logo">&lt;/&gt;</div>
        <div class="brand-text">
          <h1 class="brand-title">CICS IDE – Prototipação de Telas</h1>
          <p class="brand-subtitle">Crie telas em texto, navegue entre elas e gere relatórios do que foi feito.</p>
        </div>
      </div>

      <div class="top-actions">
        <button class="top-btn run" id="runBtn" type="button">
          <svg class="icon icon-sm"><use href="#i-play"></use></svg>
          Executar (F5)
        </button>

        <button class="top-btn" id="clearBtn" type="button">
          <svg class="icon icon-sm"><use href="#i-trash"></use></svg>
          Limpar execução
        </button>

        <button class="top-btn" id="exportBtn" type="button">
          <svg class="icon icon-sm"><use href="#i-export"></use></svg>
          Exportar relatório
          <svg class="icon icon-sm"><use href="#i-caret-down"></use></svg>
        </button>

        <button class="top-btn icon-only" type="button" title="Configurações">
          <svg class="icon"><use href="#i-gear"></use></svg>
        </button>

        <div class="avatar">JS</div>
      </div>
    </header>

    <!-- MAIN -->
    <main class="main-shell">
      <!-- LEFT SIDEBAR -->
      <aside class="left-panel">
        <div class="panel-inner">
          <p class="panel-title">Explorador</p>
          <p class="panel-subtitle">Projeto: NOVO_PROJETO</p>

          <div class="tree">
            <button class="tree-row active" type="button" data-folder-toggle="screens">
              <svg class="icon icon-sm caret folder-caret"><use href="#i-caret-down"></use></svg>
              <svg class="icon folder"><use href="#i-folder"></use></svg>
              <span>telas</span>
            </button>

            <div class="tree-child" id="folder-screens">
              <div class="empty-file-box" id="screenList">
                <div class="empty-file-title">Nenhuma tela disponível.</div>
                <p class="empty-file-text">Importe um arquivo .txt ou crie uma tela manualmente.</p>
              </div>
            </div>

            <button class="tree-row" type="button">
              <svg class="icon icon-sm caret"><use href="#i-caret-right"></use></svg>
              <svg class="icon folder"><use href="#i-folder"></use></svg>
              <span>includes</span>
            </button>

            <button class="tree-row" type="button">
              <svg class="icon icon-sm caret"><use href="#i-caret-right"></use></svg>
              <svg class="icon folder"><use href="#i-folder"></use></svg>
              <span>dados</span>
            </button>

            <button class="tree-row" type="button">
              <svg class="icon icon-sm caret"><use href="#i-caret-right"></use></svg>
              <svg class="icon folder"><use href="#i-folder"></use></svg>
              <span>fluxos</span>
            </button>
          </div>

          <div class="section-divider"></div>

          <p class="panel-title">Navegação Rápida</p>
          <div class="quick-box">
            <div>
              <svg width="70" height="58" viewBox="0 0 70 58" fill="none">
                <path d="M17 43 C17 31 34 38 34 26 C34 14 54 21 54 10" stroke="#9AA4B2" stroke-width="2" stroke-dasharray="5 5" stroke-linecap="round"/>
                <circle cx="17" cy="43" r="6" fill="white" stroke="#9AA4B2" stroke-width="2"/>
                <circle cx="54" cy="10" r="6" fill="white" stroke="#9AA4B2" stroke-width="2"/>
                <path d="M17 39v4l3-2" stroke="#9AA4B2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M54 6v4l3-2" stroke="#9AA4B2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <p>O fluxo de navegação será exibido aqui após adicionar as telas.</p>
            </div>
          </div>

          <div class="section-divider"></div>

          <p class="panel-title">Projeto</p>

          <div class="project-info">
            <div class="info-row">
              <span class="info-label">Nome:</span>
              <span class="info-value">NOVO_PROJETO</span>
            </div>
            <div class="info-row">
              <span class="info-label">Descrição:</span>
              <span class="info-value">-</span>
            </div>
            <div class="info-row">
              <span class="info-label">Criado em:</span>
              <span class="info-value">-</span>
            </div>
            <div class="info-row">
              <span class="info-label">Última alteração:</span>
              <span class="info-value">-</span>
            </div>
          </div>

          <div class="tip-box">
            <div class="tip-head">
              <svg class="icon"><use href="#i-lightbulb"></use></svg>
              Dica
            </div>
            <p>
              Você pode <a href="#" id="tipImport">importar arquivos .txt</a>
              ou <a href="#" id="tipManual">inserir o conteúdo manualmente</a>
              para começar.
            </p>
          </div>
        </div>
      </aside>

      <!-- CENTER -->
      <section class="workspace">
        <div class="stage">
          <div class="stage-inner">
            <h2 class="page-title">1. Como você quer começar?</h2>
            <p class="page-subtitle">Escolha uma das opções abaixo para adicionar suas telas CICS.</p>

            <div class="choice-grid">
              <!-- IMPORT CARD -->
              <article class="choice-card blue">
                <div class="choice-illustration">
                  <svg width="132" height="116" viewBox="0 0 132 116" fill="none">
                    <path d="M48 11h34l22 22v55a7 7 0 0 1-7 7H48a7 7 0 0 1-7-7V18a7 7 0 0 1 7-7Z" fill="#FFFFFF" stroke="#B6C3E8" stroke-width="3"/>
                    <path d="M82 12v24h24" fill="#EEF3FF" stroke="#B6C3E8" stroke-width="3" stroke-linejoin="round"/>
                    <rect x="27" y="51" width="43" height="28" rx="5" fill="#304BD3"/>
                    <text x="48.5" y="69" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="12" font-weight="700">.TXT</text>
                    <circle cx="94" cy="77" r="17" fill="white" stroke="#304BD3" stroke-width="3"/>
                    <path d="M94 86V69" stroke="#304BD3" stroke-width="3" stroke-linecap="round"/>
                    <path d="M88 75l6-6 6 6" stroke="#304BD3" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>

                <h3 class="choice-title">Importar arquivo .txt</h3>
                <p class="choice-desc">Importe um ou mais arquivos de telas CICS no formato texto.</p>

                <div class="choice-footer">
                  <button class="primary-btn blue" id="importBtn" type="button">
                    <svg class="icon icon-sm"><use href="#i-upload"></use></svg>
                    Importar arquivos
                  </button>
                  <span class="support-text">Suporte: IBM-1047 ou ASCII</span>
                </div>
              </article>

              <div class="or">OU</div>

              <!-- MANUAL CARD -->
              <article class="choice-card green">
                <div class="choice-illustration">
                  <svg width="132" height="116" viewBox="0 0 132 116" fill="none">
                    <rect x="31" y="18" width="76" height="72" rx="5" fill="#FFFFFF" stroke="#93C6A0" stroke-width="3"/>
                    <path d="M31 33h76" stroke="#93C6A0" stroke-width="3"/>
                    <circle cx="40" cy="26" r="2" fill="#568C66"/>
                    <circle cx="48" cy="26" r="2" fill="#568C66"/>
                    <circle cx="56" cy="26" r="2" fill="#568C66"/>
                    <path d="M47 49h33" stroke="#2E8B4E" stroke-width="3" stroke-linecap="round"/>
                    <path d="M47 62h48" stroke="#93C6A0" stroke-width="3" stroke-linecap="round"/>
                    <path d="M47 75h28" stroke="#93C6A0" stroke-width="3" stroke-linecap="round"/>
                    <circle cx="103" cy="82" r="17" fill="white" stroke="#2E8B4E" stroke-width="3"/>
                    <path d="M103 74v16" stroke="#2E8B4E" stroke-width="3" stroke-linecap="round"/>
                    <path d="M95 82h16" stroke="#2E8B4E" stroke-width="3" stroke-linecap="round"/>
                  </svg>
                </div>

                <h3 class="choice-title">Inserir manualmente</h3>
                <p class="choice-desc">Crie uma nova tela do zero inserindo o conteúdo manualmente.</p>

                <div class="choice-footer">
                  <button class="primary-btn green" id="manualBtn" type="button">
                    <svg class="icon icon-sm"><use href="#i-pencil"></use></svg>
                    Inserir nova tela
                  </button>
                  <span class="support-text">Você poderá editar e salvar depois</span>
                </div>
              </article>
            </div>

            <!-- HOW IT WORKS -->
            <section class="how-card">
              <div>
                <h3 class="how-title">Como funciona?</h3>

                <div class="how-list">
                  <div class="how-item">
                    <svg class="icon how-icon"><use href="#i-file"></use></svg>
                    <div class="how-number">1.</div>
                    <div>
                      <strong>Importe ou insira suas telas</strong>
                      <span>Adicione as telas CICS no editor.</span>
                    </div>
                  </div>

                  <div class="how-item">
                    <svg class="icon how-icon"><use href="#i-arrows"></use></svg>
                    <div class="how-number">2.</div>
                    <div>
                      <strong>Navegue entre as telas</strong>
                      <span>Use ações, PFs ou comandos para navegar.</span>
                    </div>
                  </div>

                  <div class="how-item">
                    <svg class="icon how-icon"><use href="#i-play-circle"></use></svg>
                    <div class="how-number">3.</div>
                    <div>
                      <strong>Execute e teste</strong>
                      <span>Simule a execução das telas e valide os dados.</span>
                    </div>
                  </div>

                  <div class="how-item">
                    <svg class="icon how-icon"><use href="#i-clipboard"></use></svg>
                    <div class="how-number">4.</div>
                    <div>
                      <strong>Gere o relatório</strong>
                      <span>Acompanhe tudo o que foi feito.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="how-visual">
                <svg width="270" height="170" viewBox="0 0 270 170" fill="none">
                  <rect x="26" y="28" width="143" height="98" rx="8" fill="#F2F4F8" stroke="#939BAB" stroke-width="2.5"/>
                  <rect x="38" y="40" width="119" height="76" rx="4" fill="white" stroke="#CDD3DD" stroke-width="2"/>
                  <path d="M59 57h42" stroke="#304BD3" stroke-width="3" stroke-linecap="round"/>
                  <path d="M59 72h76" stroke="#9DA8BA" stroke-width="3" stroke-linecap="round"/>
                  <path d="M59 87h49" stroke="#9DA8BA" stroke-width="3" stroke-linecap="round"/>
                  <path d="M59 102h71" stroke="#9DA8BA" stroke-width="3" stroke-linecap="round"/>
                  <path d="M82 126h60l13 18H69l13-18Z" fill="#D6DCE6" stroke="#A3ABBA" stroke-width="2"/>
                  <rect x="145" y="66" width="85" height="92" rx="6" fill="white" stroke="#A6ADBA" stroke-width="2.5"/>
                  <path d="M145 66h62l23 23" fill="#F8FAFC"/>
                  <path d="M207 66v23h23" stroke="#A6ADBA" stroke-width="2.5" stroke-linejoin="round"/>
                  <path d="M161 88l5 5 10-11" stroke="#2E8B4E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M187 90h25" stroke="#CBD2DD" stroke-width="3" stroke-linecap="round"/>
                  <path d="M161 111l5 5 10-11" stroke="#2E8B4E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M187 113h25" stroke="#CBD2DD" stroke-width="3" stroke-linecap="round"/>
                  <path d="M161 134l5 5 10-11" stroke="#AEB7C7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M187 136h25" stroke="#CBD2DD" stroke-width="3" stroke-linecap="round"/>
                </svg>
              </div>
            </section>
          </div>
        </div>
      </section>

      <!-- RIGHT SIDEBAR -->
      <aside class="right-panel">
        <div class="panel-inner">
          <p class="panel-title">Próximos Passos</p>

          <div class="steps">
            <div class="next-step active" data-step="1">
              <div class="step-bullet">1</div>
              <div class="next-step-head">
                <div class="next-step-title">Adicione suas telas</div>
                <svg class="icon"><use href="#i-caret-right"></use></svg>
              </div>
              <p>Importe um arquivo .txt ou insira manualmente.</p>
            </div>

            <div class="next-step" data-step="2">
              <div class="step-bullet">2</div>
              <div class="next-step-head">
                <div class="next-step-title">Defina a navegação</div>
                <svg class="icon"><use href="#i-caret-right"></use></svg>
              </div>
              <p>Conecte as telas entre si usando ações.</p>
            </div>

            <div class="next-step" data-step="3">
              <div class="step-bullet">3</div>
              <div class="next-step-head">
                <div class="next-step-title">Execute e teste</div>
                <svg class="icon"><use href="#i-caret-right"></use></svg>
              </div>
              <p>Simule a execução das telas e valide os dados.</p>
            </div>

            <div class="next-step" data-step="4">
              <div class="step-bullet">4</div>
              <div class="next-step-head">
                <div class="next-step-title">Gere o relatório</div>
                <svg class="icon"><use href="#i-caret-right"></use></svg>
              </div>
              <p>Veja o resumo de tudo que foi feito.</p>
            </div>
          </div>

          <div class="section-divider"></div>

          <p class="panel-title">Nenhum Relatório Ainda</p>

          <div class="report-empty">
            <div class="report-empty-inner">
              <svg width="72" height="78" viewBox="0 0 72 78" fill="none">
                <path d="M26 12h20l4 7h10v50H12V19h10l4-7Z" fill="white" stroke="#9DA6B5" stroke-width="3" stroke-linejoin="round"/>
                <path d="M25 20h22" stroke="#9DA6B5" stroke-width="3" stroke-linecap="round"/>
                <path d="M24 35h25" stroke="#9DA6B5" stroke-width="3" stroke-linecap="round"/>
                <path d="M24 48h25" stroke="#9DA6B5" stroke-width="3" stroke-linecap="round"/>
                <path d="M24 61h17" stroke="#9DA6B5" stroke-width="3" stroke-linecap="round"/>
              </svg>
              <p>O relatório de execução será exibido aqui após você importar, navegar e executar as telas.</p>
            </div>
          </div>
        </div>
      </aside>
    </main>

    <!-- FOOTER -->
    <footer class="statusbar">
      <div class="status-side">
        <div class="status-item">
          <svg class="icon icon-sm"><use href="#i-terminal"></use></svg>
          CICS IDE
        </div>
        <div class="status-item">v1.0.0</div>
        <div class="status-item">
          <svg class="icon icon-sm" style="color:#647083"><use href="#i-xcircle"></use></svg>
          0
        </div>
        <div class="status-item">
          <svg class="icon icon-sm" style="color:#647083"><use href="#i-warning"></use></svg>
          0
        </div>
      </div>

      <div class="status-side">
        <div class="status-item">Projeto: <span id="statusProject">NOVO_PROJETO</span></div>
        <div class="status-item">Modo: <span id="statusMode">-</span></div>
        <div class="status-item">Codificação: <span id="statusEncoding">-</span></div>
        <div class="status-item">Linhas: <span id="statusLines">0</span></div>
        <div class="status-item">Colunas: <span id="statusColumns">0</span></div>
        <div class="status-item connected">
          <span class="status-dot"></span>
          Conectado (Local)
        </div>
      </div>
    </footer>
  </div>

  <input id="fileInput" type="file" accept=".txt,text/plain" multiple />
  <div class="toast" id="toast"></div>

  <script>
    const toast = document.getElementById("toast");
    const fileInput = document.getElementById("fileInput");
    const importBtn = document.getElementById("importBtn");
    const manualBtn = document.getElementById("manualBtn");
    const tipImport = document.getElementById("tipImport");
    const tipManual = document.getElementById("tipManual");
    const screenList = document.getElementById("screenList");

    const statusMode = document.getElementById("statusMode");
    const statusEncoding = document.getElementById("statusEncoding");
    const statusLines = document.getElementById("statusLines");
    const statusColumns = document.getElementById("statusColumns");

    let toastTimer = null;

    function showToast(message) {
      clearTimeout(toastTimer);
      toast.textContent = message;
      toast.classList.add("show");

      toastTimer = setTimeout(() => {
        toast.classList.remove("show");
      }, 2600);
    }

    function openImportDialog() {
      fileInput.click();
    }

    function createScreenList(files) {
      if (!files.length) return;

      const names = Array.from(files).map(file => file.name);

      screenList.innerHTML = `
        <div style="text-align:left;">
          <div style="font-size:10px;color:#6b7280;margin-bottom:8px;">${files.length} tela(s) importada(s)</div>
          ${names.map(name => `
            <div style="
              display:flex;
              align-items:center;
              gap:6px;
              padding:5px 0;
              color:#243044;
              font-size:10.5px;
              border-top:1px solid #eef0f4;
            ">
              <span style="
                width:7px;
                height:7px;
                border-radius:50%;
                background:#304bd3;
                display:inline-block;
              "></span>
              <span style="
                overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap;
              ">${name}</span>
            </div>
          `).join("")}
        </div>
      `;

      statusMode.textContent = "Edição";
      statusEncoding.textContent = "ASCII";
      statusLines.textContent = "0";
      statusColumns.textContent = "0";
    }

    importBtn.addEventListener("click", openImportDialog);

    manualBtn.addEventListener("click", () => {
      statusMode.textContent = "Manual";
      statusEncoding.textContent = "ASCII";
      showToast("Nova tela manual criada. O editor pode ser aberto a partir daqui.");
    });

    tipImport.addEventListener("click", event => {
      event.preventDefault();
      openImportDialog();
    });

    tipManual.addEventListener("click", event => {
      event.preventDefault();
      manualBtn.click();
    });

    fileInput.addEventListener("change", event => {
      const files = event.target.files;

      if (!files || !files.length) return;

      createScreenList(files);
      showToast(`${files.length} arquivo(s) importado(s) com sucesso.`);
    });

    document.getElementById("runBtn").addEventListener("click", () => {
      showToast("Execução iniciada. Nenhuma tela disponível para simular no momento.");
    });

    document.getElementById("clearBtn").addEventListener("click", () => {
      showToast("Execução limpa.");
    });

    document.getElementById("exportBtn").addEventListener("click", () => {
      showToast("Nenhum relatório disponível para exportar.");
    });

    document.querySelectorAll("[data-folder-toggle]").forEach(button => {
      button.addEventListener("click", () => {
        const folderId = button.getAttribute("data-folder-toggle");
        const folder = document.getElementById(`folder-${folderId}`);
        const use = button.querySelector(".folder-caret use");

        if (!folder || !use) return;

        const isHidden = folder.style.display === "none";

        folder.style.display = isHidden ? "" : "none";
        use.setAttribute("href", isHidden ? "#i-caret-down" : "#i-caret-right");
      });
    });

    document.querySelectorAll(".next-step").forEach(step => {
      step.addEventListener("click", () => {
        document.querySelectorAll(".next-step").forEach(item => item.classList.remove("active"));
        step.classList.add("active");
      });
    });

    window.addEventListener("keydown", event => {
      if (event.key === "F5") {
        event.preventDefault();
        document.getElementById("runBtn").click();
      }
    });
  </script>
</body>
</html>
```