(function () {
    function toJpeg(file){return new Promise(function(res){try{var img=new Image();var u=URL.createObjectURL(file);img.onload=function(){URL.revokeObjectURL(u);var w=img.naturalWidth||img.width,h=img.naturalHeight||img.height;if(!w||!h){res(file);return;}var sc=Math.min(1,1280/Math.max(w,h));var cw=Math.round(w*sc),ch=Math.round(h*sc);var c=document.createElement('canvas');c.width=cw;c.height=ch;c.getContext('2d').drawImage(img,0,0,cw,ch);c.toBlob(function(b){res(b||file);},'image/jpeg',0.92);};img.onerror=function(){URL.revokeObjectURL(u);res(file);};img.src=u;}catch(e){res(file);}});}

    function isValidBRPhone(nums) {
        function setErr(msg) {
            var el = document.getElementById('q-phone-error');
            if (el) el.textContent = msg;
        }
        if (nums.length < 10) { setErr('N\u00famero incompleto — informe DDD + n\u00famero'); return false; }
        if (nums.length > 11) { setErr('N\u00famero longo demais'); return false; }
        if (!/^[1-9][1-9]/.test(nums)) { setErr('DDD inv\u00e1lido'); return false; }
        if (nums.length === 11 && nums[2] !== '9') { setErr('Celular deve come\u00e7ar com 9 ap\u00f3s o DDD'); return false; }
        var local = nums.length === 11 ? nums.slice(3) : nums.slice(2);
        if (/^(\d)\1+$/.test(local)) { setErr('N\u00famero n\u00e3o parece real — confira'); return false; }
        if (/(\d)\1{5,}/.test(local)) { setErr('N\u00famero n\u00e3o parece real — confira'); return false; }
        // so 1-2 digitos distintos = fake (99996666, 54545454, 56565656)
        if (new Set(local).size <= 2) { setErr('N\u00famero n\u00e3o parece real — confira'); return false; }
        if (/^(?:01234567|12345678|23456789|34567890|98765432|87654321|76543210|0123456789|1234567890)/.test(local)) { setErr('N\u00famero n\u00e3o parece real — confira'); return false; }
        return true;
    }


    // ─── SEO BACKLINK BADGE (mini logo discreto pro crawler do Google) ───
    (function() {
        function injectPLBadge() {
            try {
                if (document.querySelector('.pl-seo-badge')) return;
                var path = window.location.pathname;
                var isProduct = path.includes('/produto/') || path.includes('/produtos/') || path.includes('/products/') || path.includes('/p/') || document.querySelector('meta[property="og:type"][content="product"]');
                if (!isProduct) return;
                var b = document.createElement('div');
                b.className = 'pl-seo-badge';
                b.style.cssText = 'text-align:center;padding:4px 0;margin:0;opacity:0.5;line-height:1;';
                var a = document.createElement('a');
                a.href = 'https://provoulevou.com.br?utm_source=widget&utm_medium=lojista&utm_campaign=maxilook';
                a.target = '_blank';
                a.rel = 'noopener';
                a.title = 'Provador Virtual com IA por Provou Levou';
                a.style.cssText = 'display:inline-block;text-decoration:none;border:0;outline:0;';
                var img = document.createElement('img');
                img.src = 'https://i.ibb.co/MD3B4FQf/Logo-provou-preto-1.png';
                img.alt = 'Provador Virtual com IA por Provou Levou';
                img.style.cssText = 'height:12px;width:auto;border:0;display:block;';
                a.appendChild(img);
                b.appendChild(a);
                document.body.appendChild(b);
            } catch(e) {}
        }
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', injectPLBadge);
        else injectPLBadge();
        setTimeout(injectPLBadge, 2500);
    })();


    // ===============================================
    // 0. CHUMBAR A API KEY AQUI DIRETO NO CÓDIGO
    // ===============================================
    const apiKey = "pl_live_307d348140544b3e15dff9322c3aa08f89a69a0e635ff4dfa640bf690f4c013d";
    window.PROVOU_LEVOU_API_KEY = apiKey;

    const WEBHOOK_PROVA = 'https://n8n.segredosdodrop.com/webhook/gerador-oculos';
    const WEBHOOK_PIX = 'https://n8n.segredosdodrop.com/webhook/cacife-pix';
    const WEBHOOK_PIX_STATUS = 'https://n8n.segredosdodrop.com/webhook/cacife-pix-status';
    const WEBHOOK_CHECK_LIMIT = 'https://n8n.segredosdodrop.com/webhook/maxilook-check-limit';
    const SIZES_TOP = ['XXP', 'XP', 'P', 'M', 'G', 'XG', 'XXG', '3XG', '4XG', '5XG'];
    const SIZES_BOTTOM = ['36/XXP', '38/XP', '40/P', '42/M', '44/G', '46/XG', '48/XXG', '50/3XG', '52/4XG', '54/5XG'];
    const SIZES_BOTTOM_SW = ['XXP', 'XP', 'P', 'M', 'G', 'XG', 'XXG', '3XG', '4XG', '5XG'];


    const GRADE = {
        regular: [49, 51, 54, 57, 61, 62, 64, 66, 70, 73],
        oversized: [58, 60, 62, 64, 66, 70, 73, 76, 79, 83],
        oversizedSS: [58, 61, 63, 67, 70, 74, 78, 82, 87, 92],
        hoodie: [50, 53, 55, 58, 62, 65, 69, 74, 79, 83],
        boxyHoodie: [61, 77, 78, 79, 80, 81, 82, 83, 84, 85],
        puffer: [53, 56, 59, 61, 70, 74, 78, 82, 86, 90],
        vest: [52, 55, 57, 59, 63, 66, 70, 72, 76, 82],
        boxyHenley: [54, 56, 58, 64, 66, 68, 70, 76, 78, 84],
        bottomTailoring: [36, 38, 40, 42, 44, 46, 48, 50, 52, 54],
        bottomSweat: [36, 38, 40, 42, 44, 46, 48, 50, 52, 54],
        underwear: [36, 38, 40, 42, 44, 46, 48, 50, 52, 54],
        quadrilTailoring: [48, 50, 52, 56, 58, 60, 62, 64, 66, 68],
        quadrilSweat: [48, 50, 52, 54, 56, 58, 60, 62, 64, 66],
        quadrilUnderwear: [50, 52, 54, 56, 58, 60, 62, 64, 66, 68],
    };


    function detectProduct(name) {
        const n = name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if (/tailoring/.test(n) || /\d\/\d\s*short/.test(n) || /\b(1\/5|2\/5|3\/5|4\/5)\b/.test(n)) return { category: 'bottom', fit: 'tailoring' };
        if (/underwear|cueca/.test(n)) return { category: 'bottom', fit: 'underwear' };
        if (/sweatpant|sweatshort|sweat pant|sweat short|calca|bermuda/.test(n)) return { category: 'bottom', fit: 'sweat' };
        if (/henley/.test(n)) return { category: 'top', fit: 'boxyHenley' };
        if (/boxy.*(hoodie|crewneck|crew)/.test(n) || /(hoodie|crewneck|crew).*boxy/.test(n)) return { category: 'top', fit: 'boxyHoodie' };
        if (/puffer|jacket/.test(n)) return { category: 'top', fit: 'puffer' };
        if (/vest/.test(n)) return { category: 'top', fit: 'vest' };
        if (/(hoodie|hoodie zip|half zip|crewneck|crew neck)/.test(n) && !/oversized|boxy|short sleeve/.test(n)) return { category: 'top', fit: 'hoodie' };
        if (/oversized.*(hoodie|crewneck|crew|short sleeve)/.test(n) || /short sleeve.*(hoodie|crewneck)/.test(n)) return { category: 'top', fit: 'oversizedSS' };
        if (/oversized|boxy tee|2\/4/.test(n)) return { category: 'top', fit: 'oversized' };
        return { category: 'top', fit: 'regular' };
    }


    function estimarTorax(altura, peso) {
        if (altura < 3) altura *= 100;
        let circ = 0.65 * peso + 56;
        const imc = peso / Math.pow(altura / 100, 2);
        if (imc > 30) circ += 4; else if (imc > 25) circ += 2;
        return circ;
    }


    function findClosest(arr, val) {
        let idx = 0, minDiff = Infinity;
        arr.forEach((v, i) => { const d = Math.abs(v - val); if (d < minDiff) { minDiff = d; idx = i; } });
        return idx;
    }


    let recommendedSize = 'M';
    let currentProduct = { category: 'top', fit: 'regular' };

    function calculateFinalSize() {
        // Feature desativada: não faz mais cálculos de tamanho
        return;
    }


    // ─── LOCK / UNLOCK SCROLL DA PÁGINA ──────────────────────────────────────────


    let scrollY = 0;


    function lockBodyScroll() {
        scrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.overflowY = 'scroll';
    }


    function unlockBodyScroll() {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.overflowY = '';
        window.scrollTo(0, scrollY);
    }


    // ─── ESTILOS ──────────────────────────────────────────────────────────────────


    const styles = `
        /* ── Fontes ── */

        :root {
            --c-bg: #ffffff;
            --c-surface: #fff0f6;
            --c-ink: #1a1a1a;
            --c-muted: #999;
            --c-line: #f5c6e0;
            --c-accent: #111111;
            --c-danger: #cc3333;
            --font-display: inherit;
            --font-body: inherit;
        }

        /* ── Trigger (selo sobre foto) ── */
        @keyframes q-shake { 0%,50%,100%{transform:rotate(0deg)} 10%,30%{transform:rotate(-10deg)} 20%,40%{transform:rotate(10deg)} }
        .q-btn-trigger-ia {
            position: absolute; top: 14px; right: 14px; z-index: 100;
            background: none; border: none; padding: 0; cursor: pointer;
            width: 70px; height: 70px;
            display: flex; align-items: center; justify-content: center;
            filter: drop-shadow(0 3px 10px rgba(0,0,0,0.22));
            animation: q-shake 3s infinite;
            transition: filter 0.2s;
        }
        .q-btn-trigger-ia:hover { filter: drop-shadow(0 6px 18px rgba(0,0,0,0.32)); }
        .q-btn-trigger-ia img { width: 100%; height: 100%; object-fit: contain; }
        @media (min-width: 768px) { .q-btn-trigger-ia { width: 70px; height: 70px; } }

        /* ── Inline button ── */
        .q-btn-inline-provador {
            display: flex; align-items: center; justify-content: center; gap: 7px;
            width: 100%; padding: 13px 16px;
            background: transparent; color: var(--c-ink);
            border: 1.5px solid #e0186c; border-radius: 0;
            font-family: 'Work Sans', var(--font-body), sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase;
            cursor: pointer; transition: background 0.25s, color 0.25s;
            margin-bottom: 10px; box-sizing: border-box;
        }
        .q-btn-inline-provador:hover { background: #e0186c; color: #fff; }
        .q-btn-inline-provador svg { width: 14px; height: 14px; flex-shrink: 0; }

        /* ── Modal overlay ── */
        @keyframes q-modal-in { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        #q-modal-ia {
            display: none; position: fixed; inset: 0; z-index: 999999;
            background: rgba(255,240,248,0.97);
            font-family: var(--font-body);
            overflow-y: auto; box-sizing: border-box;
        }
        #q-modal-ia * { box-sizing: border-box; }

        /* ── Card ── */
        .q-card-ia {
            width: 100%; min-height: 100vh;
            background: var(--c-bg); color: var(--c-ink);
            display: flex; flex-direction: column; position: relative;
            animation: q-modal-in 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        @media (min-width: 768px) {
            #q-modal-ia { display: none; align-items: center; justify-content: center; }
            .q-card-ia {
                width: 440px; max-width: 92vw; min-height: auto;
                max-height: 96vh; border: none;
                box-shadow: 0 32px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06);
                overflow: hidden;
            }
        }

        /* ── Close ── */
        .q-close-ia {
            position: absolute; top: 18px; right: 18px;
            background: none; border: none;
            font-size: 20px; font-weight: 300; color: var(--c-muted);
            cursor: pointer; z-index: 10; line-height: 1; padding: 4px 6px;
            transition: color 0.2s;
        }
        .q-close-ia:hover { color: var(--c-ink); }

        /* ── Content scroll ── */
        .q-content-scroll {
            flex: 1; padding: 0; overflow-y: auto;
            text-align: left; display: flex; flex-direction: column;
        }
        .q-content-scroll::-webkit-scrollbar { width: 3px; }
        .q-content-scroll::-webkit-scrollbar-thumb { background: var(--c-line); }

        @media (max-width: 767px) {
            #q-modal-ia { display:none; overflow-y:auto; align-items:flex-start; justify-content:center; }
            #q-modal-ia[style*="flex"] { display:flex !important; }
            .q-card-ia { width:100%; border:none; margin:0; min-height:100svh; }
            .q-content-scroll { flex: 1; }
        }

        /* ── Header strip ── */
        #q-header-provador {
            padding: 28px 28px 0;
            display: flex; flex-direction: column; align-items: center;
            text-align: center; gap: 10px;
            border-bottom: 1px solid #f5c6e0;
            padding-bottom: 22px; margin-bottom: 0;
        }
        #q-header-provador h1 {
            margin: 0;
            font-family: var(--font-display);
            font-size: 22px; letter-spacing: 4px;
            color: var(--c-ink); text-transform: uppercase;
            font-weight: 400; line-height: 1;
        }

        /* ── Main step ── */
        #q-step-photo {
            display: flex; flex-direction: column; padding: 28px 28px 32px;
            gap: 0; align-items: stretch;
        }

        /* ── Labels & inputs ── */
        .q-field-label {
            display: block; font-size: 10px; font-weight: 600;
            letter-spacing: 2px; text-transform: uppercase;
            color: var(--c-muted); margin-bottom: 8px;
        }
        .q-phone-wrap { margin-bottom: 28px; }
        .q-input {
            display: block; width: 100%; height: 52px;
            padding: 0 16px; margin: 0;
            background: var(--c-surface); border: 1.5px solid transparent;
            border: 1.5px solid var(--c-line); border-radius: 14px;
            font-size: 16px; font-family: var(--font-body); font-weight: 400;
            color: var(--c-ink); outline: none;
            -webkit-appearance: none; appearance: none; transition: border-color 0.2s;
        }
        .q-input:focus { border-color: #e0186c; background: #fff; }
        .q-input::placeholder { color: #bbb; }

        .q-provas-msg:empty { display: none; }
        .q-provas-msg {
            font-size: 13px; margin-top: 10px; letter-spacing: 0.3px;
            color: var(--c-ink); font-weight: 500;
            background: var(--c-surface);
            border: 1px solid var(--c-line);
            border-radius: 6px;
            padding: 10px 14px;
            text-align: center;
            transition: background 0.2s, color 0.2s, border-color 0.2s;
        }
        .q-provas-msg.is-warn {
            color: var(--c-danger);
            background: rgba(204,51,51,0.08);
            border-color: rgba(204,51,51,0.3);
            font-weight: 600;
        }

        .q-status-msg {
            display: none; font-size: 11px; color: var(--c-danger);
            font-weight: 500; margin-top: 6px; letter-spacing: 0.3px;
        }

        /* ── Section label ── */
        .q-section-label {
            font-family: var(--font-display);
            font-size: 16px; letter-spacing: 3px; text-transform: uppercase;
            color: var(--c-ink); margin: 0 0 14px; font-weight: 400;
            text-align: center;
        }

        /* ── Tip ── */
        .q-tip-box {
            display: flex; align-items: center; gap: 9px;
            background: var(--c-surface);
            padding: 11px 14px; margin-bottom: 20px;
            font-size: 11.5px; color: var(--c-muted); line-height: 1.45;
            border-radius: 6px;
        }
        .q-tip-box i { color: var(--c-ink); font-size: 15px; flex-shrink: 0; }
        /* ── Required field marker + shake feedback ── */
        .q-required-mark { color: var(--c-danger); font-weight: 700; margin-left: 4px; }
        @keyframes q-shake-x {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-6px); }
            20%, 40%, 60%, 80% { transform: translateX(6px); }
        }
        .q-shake { animation: q-shake-x 0.5s cubic-bezier(.36,.07,.19,.97); }
        .q-input.is-error {
            border-color: var(--c-danger) !important;
            background: rgba(204,51,51,0.06) !important;
            box-shadow: 0 0 0 3px rgba(204,51,51,0.15);
        }
        .q-face-frame.is-error {
            outline: 3px solid var(--c-danger);
            outline-offset: 2px;
            background: rgba(204,51,51,0.06);
        }
        .q-validation-hint {
            display: none;
            background: var(--c-danger);
            color: #fff;
            font-size: 13px; font-weight: 600;
            letter-spacing: 0.3px;
            padding: 12px 16px;
            border-radius: 8px;
            margin-bottom: 12px;
            text-align: center;
            box-shadow: 0 3px 10px rgba(204,51,51,0.25);
            animation: q-pop-in 0.25s ease;
        }
        .q-validation-hint.is-visible { display: block; }
        @keyframes q-pop-in {
            0% { opacity: 0; transform: translateY(-6px); }
            100% { opacity: 1; transform: translateY(0); }
        }


        /* ── Face frame ── */
        @keyframes q-frame-pulse { 0%,100%{opacity:0.3} 50%{opacity:0.7} }
        .q-face-frame {
            position: relative; width: 200px; height: 260px;
            margin: 0 auto 24px; cursor: pointer;
            display: flex; align-items: center; justify-content: center;
            overflow: hidden; background: var(--c-surface);
            border-radius: 4px;
            transition: transform 0.2s;
        }
        .q-face-frame:hover { transform: scale(1.015); }
        .q-face-frame img { width: 100%; height: 100%; object-fit: cover; display: none; }
        .q-face-placeholder { display: flex; flex-direction: column; align-items: center; gap: 8px; }
        .q-face-placeholder i { font-size: 72px; color: #d0d0d0; }
        /* Corner marks — clean editorial style */
        .q-face-corner {
            position: absolute; width: 20px; height: 20px;
            border-color: #e0186c; border-style: solid;
            transition: border-color 0.2s;
        }
        .q-face-corner-tl { top: 0; left: 0; border-width: 2px 0 0 2px; }
        .q-face-corner-tr { top: 0; right: 0; border-width: 2px 2px 0 0; }
        .q-face-corner-bl { bottom: 0; left: 0; border-width: 0 0 2px 2px; }
        .q-face-corner-br { bottom: 0; right: 0; border-width: 0 2px 2px 0; }

        /* ── Upload buttons ── */
        .q-upload-btns {
            display: grid; grid-template-columns: 1fr 1fr;
            gap: 8px; width: 100%; margin-bottom: 24px;
        }
        .q-upload-btn {
            display: flex; align-items: center; justify-content: center; gap: 7px;
            padding: 12px 8px;
            border: 1.5px solid var(--c-line);
            background: transparent; color: var(--c-ink);
            font-family: var(--font-body); font-size: 12px; font-weight: 500;
            cursor: pointer; transition: border-color 0.2s, background 0.2s; border-radius: 14px;
        }
        .q-upload-btn:hover { border-color: #e0186c; color: #e0186c; background: #fff0f6; }
        .q-upload-btn i { font-size: 16px; }

        /* ── Terms ── */
        .q-terms-row {
            display: flex; align-items: flex-start; gap: 10px;
            font-size: 11.5px; color: var(--c-muted); cursor: pointer;
            line-height: 1.5; margin-bottom: 20px;
            justify-content: center; text-align: center;
        }
        .q-terms-row input { margin-top: 3px; cursor: pointer; accent-color: var(--c-ink); flex-shrink: 0; }
        .q-terms-row a { color: #e0186c; text-decoration: underline; text-underline-offset: 2px; }

        /* ── CTA buttons ── */
        .q-btn-black {
            width: 100%; height: 52px;
            background: #e0186c; color: #fff;
            border: none; border-radius: 14px;
            font-family: var(--font-display); font-size: 14px;
            letter-spacing: 3px; text-transform: uppercase;
            cursor: pointer; transition: opacity 0.2s; box-sizing: border-box;
        }
        .q-btn-black:hover:not(:disabled) { background: #b8005a; }
        .q-btn-black:disabled { background: #f0c0d8; cursor: not-allowed; }
        .q-btn-outline {
            width: 100%; height: 52px;
            background: transparent; color: var(--c-ink);
            border: 1.5px solid var(--c-line); border-radius: 14px;
            font-family: var(--font-display); font-size: 14px;
            letter-spacing: 3px; text-transform: uppercase;
            cursor: pointer; transition: border-color 0.2s, background 0.2s; box-sizing: border-box;
        }
        .q-btn-outline:hover { border-color: #e0186c; color: #e0186c; background: #fff0f6; }

        /* ── PIX screen ── */
        #q-step-pix {
            display: none; text-align: center;
            padding: 36px 28px; flex-direction: column; gap: 16px; align-items: center;
        }
        #q-step-pix h2 {
            font-family: var(--font-display); font-size: 19px;
            letter-spacing: 3px; text-transform: uppercase; margin: 0; font-weight: 400;
        }
        .q-pix-subtitle { font-size: 13px; color: var(--c-muted); margin: 0; line-height: 1.6; }
        .q-pix-qr { width: 180px; height: 180px; border: 1px solid var(--c-line); padding: 6px; margin: 0 auto; }
        .q-pix-qr img { width: 100%; height: 100%; }
        .q-pix-copiacola { display: flex; gap: 8px; width: 100%; max-width: 320px; margin: 0 auto; }
        .q-pix-copiacola input {
            flex: 1; height: 40px; padding: 0 12px; border: 1px solid var(--c-line);
            background: var(--c-surface); font-size: 11px; font-family: var(--font-body);
            outline: none; min-width: 0;
        }
        .q-pix-copiacola button {
            height: 40px; padding: 0 14px; background: #e0186c; color: #fff;
            border: none; font-size: 10px; font-weight: 600; letter-spacing: 1px;
            text-transform: uppercase; cursor: pointer;
        }
        .q-pix-status { font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: var(--c-muted); }
        @keyframes q-pix-pulse { 0%,100%{opacity:.4} 50%{opacity:1} }
        .q-pix-waiting { animation: q-pix-pulse 1.5s infinite ease-in-out; color: #d97706; }
        .q-pix-approved { color: #e0186c; }
        .q-pix-cancel { font-size: 11px; color: var(--c-muted); text-decoration: underline; cursor: pointer; margin-top: 4px; }

        /* ── Loading ── */
        @keyframes q-slide { from{transform:translateX(-100%)} to{transform:translateX(100%)} }
        @keyframes q-alt-show { 0%,5%{opacity:0;transform:translateY(6px)} 15%,45%{opacity:1;transform:translateY(0)} 55%,100%{opacity:0;transform:translateY(-6px)} }
        @keyframes q-alt-hide { 0%,55%{opacity:0;transform:translateY(6px)} 65%,95%{opacity:1;transform:translateY(0)} 100%{opacity:0;transform:translateY(-6px)} }
        #q-loading-box {
            display: none; padding: 28px;
            text-align: center; flex: 1; flex-direction: column;
            align-items: center; justify-content: center; min-height: 60vh;
        }
        .q-loading-texts {
            position: relative; height: 36px; width: 100%;
            display: flex; align-items: center; justify-content: center;
            margin-bottom: 24px;
        }
        .q-loading-t1, .q-loading-t2 {
            position: absolute; width: 100%;
            display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .q-loading-t1 {
            font-family: var(--font-display); font-size: 15px; letter-spacing: 4px;
            text-transform: uppercase; color: var(--c-ink);
            animation: q-alt-show 3.6s ease-in-out infinite;
        }
        .q-loading-t2 {
            animation: q-alt-hide 3.6s ease-in-out infinite;
            text-decoration: none; opacity: 0;
        }
        .q-loading-t2 span {
            font-size: 12px; letter-spacing: 2px; text-transform: uppercase;
            color: var(--c-muted); font-family: var(--font-body);
        }
        .q-loading-t2 img { height: 16px; width: auto; opacity: 0.7; }
        .q-loading-bar { height: 3px; background: var(--c-line); width: 100%; position: relative; overflow: hidden; border-radius: 2px; }
        .q-loading-bar > div {
            position: absolute; top: 0; left: 0; height: 100%; width: 100%;
            background: #e0186c; border-radius: 2px;
            transform: scaleX(0); transform-origin: left;
            transition: transform 0.3s ease-out;
        }

        /* ── Result ── */
        #q-step-result { display: none; flex-direction: column; gap: 0; align-items: stretch; }

        .q-res-title {
            display: block;
            font-family: var(--font-display); font-size: 15px;
            letter-spacing: 3px; text-transform: uppercase;
            color: var(--c-ink); padding: 20px 28px 16px; margin: 0;
            border-bottom: 1px solid var(--c-line);
            text-align: center;
        }
        .q-res-subtitle, .q-res-note { display: none; }

        #q-result-img-col {
            width: 100%; max-height: 56vh; background: var(--c-surface);
            overflow: hidden; display: flex; align-items: center; justify-content: center;
        }
        #q-result-img-col img { width: 100%; height: 100%; object-fit: cover; object-position: top center; display: block; }

        #q-result-actions-col {
            display: flex; flex-direction: column; gap: 8px;
            padding: 20px 28px 26px;
        }
        .q-res-mobile-only { margin: 0; }

        /* CTA de compra na tela de resultado */
        .q-result-prodinfo { text-align: left; margin-bottom: 6px; }
        .q-result-prodname {
            font-family: var(--font-body); font-size: 14px; font-weight: 700;
            color: var(--c-ink); line-height: 1.25; margin-bottom: 6px;
        }
        .q-result-prodprice {
            font-family: var(--font-display); font-size: 18px; letter-spacing: .5px; font-weight: 700;
            color: var(--c-ink); line-height: 1;
        }
        .q-result-installment {
            font-family: var(--font-body); font-size: 12px; color: var(--c-muted);
            margin-top: 4px; letter-spacing: .2px;
        }
        .q-scarcity {
            margin-top: 12px; font-family: var(--font-body); font-size: 13px; font-weight: 700;
            color: var(--c-danger); letter-spacing: 1.5px; text-transform: uppercase;
            display: flex; align-items: center; justify-content: flex-start; gap: 6px;
        }
        .q-scarcity i { font-size: 15px; }
        /* Selos de segurança */
        .q-seals {
            display: flex; justify-content: flex-start; gap: 30px;
            margin: 8px 0; padding: 12px 0;
            border-top: 1px solid var(--c-line); border-bottom: 1px solid var(--c-line);
        }
        .q-seal { display: flex; align-items: center; gap: 9px; }
        .q-seal > i { font-size: 24px; color: var(--c-ink); flex-shrink: 0; }
        .q-seal span {
            font-family: var(--font-body); font-size: 12px; font-weight: 700;
            text-transform: uppercase; letter-spacing: .6px; line-height: 1.25;
            color: var(--c-ink); text-align: left;
        }
        .q-fakebuy {
            position: fixed; left: 18px; bottom: 18px; z-index: 2147483000;
            background: var(--c-bg, #fff); color: var(--c-ink); border: 1px solid var(--c-line); border-radius: 10px;
            box-shadow: 0 8px 28px -6px rgba(0,0,0,.28); padding: 11px 14px;
            display: flex; align-items: center; gap: 10px; max-width: 290px;
            font-family: var(--font-body); opacity: 0; transform: translateY(14px);
            pointer-events: none; transition: opacity .35s ease, transform .35s ease;
        }
        .q-fakebuy.show { opacity: 1; transform: translateY(0); }
        .q-fakebuy > i { font-size: 22px; color: var(--c-ink); flex-shrink: 0; }
        .q-fakebuy strong { font-size: 12.5px; font-weight: 700; }
        .q-fakebuy > div { display: flex; flex-direction: column; line-height: 1.35; }
        .q-fakebuy span { font-size: 10.5px; color: var(--c-muted); }
        @media (max-width:560px){ .q-fakebuy{ left:12px; right:12px; bottom:12px; max-width:none; } }
        .q-btn-buy-now {
            background: var(--c-ink); color: #fff; border: 1px solid var(--c-ink);
            width: 100%; padding: 17px 18px; font-family: var(--font-body);
            font-weight: 700; font-size: 15px; letter-spacing: .2px; cursor: pointer;
            display: flex; align-items: center; justify-content: center; gap: 8px;
            border-radius: 14px; transition: .2s; line-height: 1.2;
        }
        .q-btn-buy-now:hover { opacity: .88; }
        .q-btn-buy-now .q-buy-price { font-weight: 800; white-space: nowrap; }
        .q-buy-trust {
            text-align: center; font-size: 11px; color: var(--c-muted);
            margin-top: 2px; letter-spacing: .2px;
        }

        /* ── Related products ── */
        #q-related-products { padding: 0 28px 28px; }
        #q-related-products h4 {
            font-family: var(--font-display); font-size: 13px;
            letter-spacing: 3px; text-transform: uppercase;
            color: #e0186c; margin: 20px 0 12px; font-weight: 400;
        }
        .q-related-grid {
            display: flex; gap: 10px; overflow-x: auto; padding-bottom: 4px;
            -webkit-overflow-scrolling: touch;
        }
        .q-related-grid::-webkit-scrollbar { display: none; }
        .q-related-card {
            flex: 0 0 calc(33.333% - 7px); min-width: 88px;
            text-decoration: none; color: var(--c-ink);
            display: flex; flex-direction: column; gap: 6px;
        }
        .q-related-card img {
            width: 100%; aspect-ratio: 1/1; object-fit: cover;
            border: 1px solid var(--c-line); display: block; border-radius: 3px;
        }
        .q-related-card-name {
            font-size: 10px; font-weight: 500; line-height: 1.4; color: var(--c-ink);
            overflow: hidden; display: -webkit-box;
            -webkit-line-clamp: 2; -webkit-box-orient: vertical;
        }

        /* Desktop result split */
        @media (min-width: 768px) {
            .q-card-ia.is-result { width: 780px !important; max-width: 90vw !important; max-height: 92vh !important; }
                /* .q-powered-footer always visible */
            .q-card-ia.is-result .q-content-scroll {
                padding: 0 !important; overflow-y: auto !important;
                display: flex !important; flex-direction: column !important;
            }
            .q-card-ia.is-result #q-step-result {
                display: flex !important; flex-direction: row !important;
                flex-wrap: wrap !important; width: 100%; align-items: stretch; gap: 0;
            }
            .q-card-ia.is-result .q-res-title {
                flex-basis: 100%; order: -1;
                font-size: 16px; letter-spacing: 3px;
                padding: 16px 24px; border-bottom: 1px solid #f5c6e0;
            }
            .q-card-ia.is-result #q-result-img-col {
                width: 44% !important; min-height: 360px !important;
                border-right: 1px solid var(--c-line); flex-shrink: 0;
            }
            .q-card-ia.is-result #q-result-img-col img {
                width: 100% !important; height: 100% !important;
                object-fit: cover !important; object-position: top center !important;
            }
            .q-card-ia.is-result #q-result-actions-col {
                width: 56% !important; padding: 28px 24px !important;
                display: flex !important; flex-direction: column !important;
                justify-content: flex-start; gap: 10px;
                overflow-y: auto;
            }
            .q-card-ia.is-result #q-related-products { padding: 0; margin-top: 4px; }
            .q-card-ia.is-result .q-res-mobile-only { display: flex !important; }
        }

        /* ── Error screen ── */
        #q-step-error {
            display: none; flex-direction: column; gap: 20px;
            align-items: center; text-align: center;
            padding: 52px 28px;
        }
        #q-step-error h2 {
            font-family: var(--font-display); font-size: 18px;
            letter-spacing: 3px; text-transform: uppercase; margin: 0; font-weight: 400;
        }
        #q-step-error p { font-size: 13px; color: var(--c-muted); margin: 0; line-height: 1.6; }

        /* ── Footer ── */
        .q-powered-footer {
            background: var(--c-surface); padding: 14px 20px;
            display: flex; align-items: center; justify-content: center; gap: 9px;
            flex-shrink: 0; border-top: 1px solid var(--c-line); text-decoration: none;
        }
        .q-powered-footer span { font-size: 9.5px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--c-muted); }
        .q-quantic-logo { height: 20px; opacity: 0.7; }
    
/* ====== ESCOLHER LENTES ====== */

        .q-btn-lentes {
            width: 100%; margin-top: 9px; padding: 12px 16px;
            display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px;
            background: #e0186c; color: #fff; border: 1px solid #e0186c; border-radius: 14px;
            font-family: var(--font-body); cursor: pointer; box-sizing: border-box; transition: background .2s;
        }
        .q-btn-lentes:hover { background: #c31460; border-color: #c31460; }
        .q-btn-lentes .q-lentes-t { font-size: 14px; font-weight: 700; letter-spacing: .4px; line-height: 1.2; }
        .q-btn-lentes .q-lentes-s { font-size: 10.5px; font-weight: 500; opacity: .92; line-height: 1.2; }
        /* botao secundario "COMPRAR SOMENTE A ARMACAO": rotulo longo nao cabe com o
           letter-spacing 3px + altura fixa do .q-btn-outline — afrouxa e deixa fluido */
        #q-so-armacao {
            height: auto; min-height: 48px; padding: 12px 16px;
            font-size: 12px; letter-spacing: 1px; line-height: 1.25; white-space: normal;
        }


/* ===== fluxo ESCOLHER LENTES (mesma linguagem visual do provador) ===== */
#q-step-lentes, #q-step-receita, #q-step-upload, #q-step-lente-final {
    display: none; flex-direction: column; padding: 26px 28px 30px; gap: 0;
}
.q-passos { display:flex; gap:5px; margin-bottom:20px; }
.q-passos i { height:3px; flex:1; background:var(--c-line); border-radius:2px; }
.q-passos i.on   { background:var(--c-ink); }
.q-passos i.done { background:var(--c-accent); opacity:.45; }

.q-opt {
    width:100%; text-align:left; background:var(--c-bg);
    border:1.5px solid var(--c-line); border-radius:14px;
    padding:15px 16px; margin-bottom:10px; cursor:pointer; font-family:var(--font-body);
    display:flex; flex-direction:column; gap:3px; transition:border-color .18s, background .18s;
}
.q-opt:hover { border-color:var(--c-ink); background:var(--c-surface); }
.q-opt-t { font-size:14px; font-weight:600; color:var(--c-ink-text, var(--c-ink)); }
.q-opt-s { font-size:11.5px; color:var(--c-muted); line-height:1.45; }
.q-opt-destaque { border-color:var(--c-ink); background:var(--c-surface); }

.q-lente-drop {
    border:2px dashed var(--c-line); border-radius:14px; padding:32px 20px;
    text-align:center; cursor:pointer; transition:border-color .18s, background .18s;
}
.q-lente-drop:hover { border-color:var(--c-ink); background:var(--c-surface); }
.q-lente-drop-i { font-size:30px; margin-bottom:8px; }
.q-lente-drop-t { font-size:13.5px; font-weight:600; color:var(--c-ink-text, var(--c-ink)); }
.q-lente-drop-s { font-size:11px; color:var(--c-muted); margin-top:3px; }

.q-lendo { display:flex; flex-direction:column; align-items:center; gap:12px; padding:22px 10px;
           font-size:12.5px; color:var(--c-muted); }
.q-lendo img { max-width:140px; max-height:180px; border-radius:10px;
               border:1px solid var(--c-line); box-shadow:0 4px 14px rgba(0,0,0,.10); }
.q-lendo-arq { font-size:11px; font-weight:600; color:var(--c-ink-text, var(--c-ink));
               word-break:break-all; text-align:center; max-width:220px; }
.q-spin { width:26px; height:26px; border:2.5px solid var(--c-line);
          border-top-color:var(--c-ink); border-radius:50%; animation:q-spin .8s linear infinite; }
@keyframes q-spin { to { transform: rotate(360deg); } }

.q-banner-ia { background:var(--c-surface); border:1px solid var(--c-line); border-radius:11px;
               padding:11px 13px; font-size:11.5px; line-height:1.5; color:var(--c-ink-text, var(--c-ink));
               margin-bottom:14px; }
.q-erro-leitura { background:#fff5f5; border:1px solid #fbc4c4; border-radius:11px;
                  padding:11px 13px; font-size:11.5px; line-height:1.55; color:#9b2c2c; margin-top:10px; }
.q-erro-leitura a { color:#9b2c2c; font-weight:700; text-decoration:underline; cursor:pointer; }

.q-olho { border:1.5px solid var(--c-line); border-radius:13px; padding:12px 13px; margin-bottom:11px; }
.q-olho-tag { font-size:10px; text-transform:uppercase; letter-spacing:.1em; color:var(--c-muted);
              font-weight:600; display:block; margin-bottom:9px; }
.q-olho-campos { display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; }
.q-olho-campos label { font-size:9.5px; text-transform:uppercase; letter-spacing:.06em;
                       color:var(--c-muted); display:flex; flex-direction:column; gap:4px; }
.q-olho-campos select { border:1.5px solid var(--c-line); border-radius:9px; padding:8px 6px;
                        font-size:12.5px; font-family:var(--font-body); background:var(--c-bg);
                        color:var(--c-ink-text, var(--c-ink)); }

.q-card-lente { border:2px solid var(--c-ink); border-radius:14px; padding:17px; margin-bottom:12px; }
/* foto do produto vinda da loja (1024px: deixamos o browser reduzir) */
.q-lente-foto { width:100%; max-width:190px; height:auto; display:block; margin:0 auto 13px;
                border-radius:10px; background:var(--c-surface); }
.q-opt-lente { flex-direction:row; align-items:center; gap:12px; }
.q-opt-foto  { width:52px; height:52px; object-fit:cover; border-radius:9px; flex-shrink:0;
               background:var(--c-surface); }
.q-opt-txt   { display:flex; flex-direction:column; gap:3px; min-width:0; }
.q-card-lente-nome { font-size:14px; font-weight:600; line-height:1.35; }
.q-card-lente-mat  { font-size:11px; color:var(--c-muted); margin:3px 0 11px; }
.q-card-lente-preco{ font-size:27px; font-weight:700; }
.q-card-lente-parc { font-size:11.5px; color:var(--c-muted); margin-top:1px; }
.q-card-lente-pq   { background:var(--c-surface); border-radius:10px; padding:11px 12px;
                     margin-top:13px; font-size:12px; line-height:1.5; }
.q-card-lente-pq b { display:block; font-size:9.5px; text-transform:uppercase; letter-spacing:.1em;
                     color:var(--c-muted); margin-bottom:4px; }
.q-grau-anotado { background:var(--c-bg); border:1px solid var(--c-line); border-radius:10px;
                  padding:11px 12px; margin-top:11px; display:flex; flex-direction:column; gap:3px;
                  font-size:12.5px; font-variant-numeric:tabular-nums; }
.q-grau-anotado b { font-size:9.5px; text-transform:uppercase; letter-spacing:.1em;
                    color:var(--c-muted); margin-bottom:3px; }
.q-disclaimer { font-size:10.5px; color:var(--c-muted); line-height:1.5; margin-top:11px;
                padding-top:11px; border-top:1px solid var(--c-line); }
.q-resumo { font-size:11.5px; color:var(--c-muted); line-height:1.6; margin-bottom:8px; }

.q-sair, .q-voltar { display:block; text-align:center; font-size:11.5px; color:var(--c-muted);
                     text-decoration:underline; cursor:pointer; margin-top:12px; }
.q-sair:hover, .q-voltar:hover { color:var(--c-ink); }
.q-btn-sub { display:block; font-size:10px; font-weight:500; opacity:.8; margin-top:2px;
             letter-spacing:.02em; text-transform:none; }
.q-btn-outline .q-btn-sub { color:var(--c-muted); opacity:1; }

`;


    // ─── IMAGEM DO BOTÃO (trigger) ─────────────────────────────────────────────
    const stampImageHTML = `<img src="https://cdn.shopify.com/s/files/1/0636/6334/1746/files/logo_provador.png?v=1772494793" alt="Provador Virtual" style="width:100%;height:100%;object-fit:contain;">`;



    // ─── HTML ─────────────────────────────────────────────────────────────────────


    const html = `
        <div id="q-modal-ia">
            <div class="q-card-ia">
                <button type="button" class="q-close-ia" id="q-close-btn">&times;</button>
                <div class="q-content-scroll">

                    <!-- Persistent header (all steps) -->
                    <div id="q-header-provador">
                        <h1>Provador Virtual</h1>
                        <img src="https://i.ibb.co/nXsrsNP/maxilook-logo.webp" alt="MAXILOOK" style="height:34px;width:auto;"/>
                    </div>

                    <!-- Main step -->
                    <div id="q-step-photo">
                        <!-- WhatsApp -->
                        <div class="q-phone-wrap">
                            <span class="q-field-label">Seu WhatsApp<span class="q-required-mark">*</span></span>
                            <input type="tel" id="q-phone" class="q-input" placeholder="(11) 99999-9999" maxlength="15">
                            <div id="q-phone-error" class="q-status-msg">N&#250;mero inv&#225;lido</div>
                            <div id="q-provas-restantes" class="q-provas-msg"></div>
                        </div>

                        <!-- Photo section -->
                        <p class="q-section-label">Envie sua foto</p>
                        <div class="q-tip-box">
                            <i class="ph ph-lightbulb"></i>
                            <span>Use uma foto n&#237;tida, de frente, com boa ilumina&#231;&#227;o.</span>
                        </div>

                        <!-- Face frame -->
                        <div class="q-face-frame" id="q-face-frame">
                            <div class="q-face-corner q-face-corner-tl"></div>
                            <div class="q-face-corner q-face-corner-tr"></div>
                            <div class="q-face-corner q-face-corner-bl"></div>
                            <div class="q-face-corner q-face-corner-br"></div>
                            <img id="q-pre-img" alt="Sua foto">
                            <div class="q-face-placeholder" id="q-face-placeholder">
                                <i class="ph ph-user-circle" style="font-size:80px;color:#d4d4d4;"></i>
                            </div>
                        </div>

                        <!-- Upload buttons -->
                        <div class="q-upload-btns">
                            <button class="q-upload-btn" id="q-btn-camera">
                                <i class="ph ph-camera"></i> Tirar foto
                            </button>
                            <button class="q-upload-btn" id="q-btn-gallery">
                                <i class="ph ph-image"></i> Da galeria
                            </button>
                            <input type="file" id="q-camera-input" accept="image/*" capture="user" style="display:none">
                            <input type="file" id="q-gallery-input" accept="image/*" style="display:none">
                        </div>

                        <!-- Terms -->
                        <label class="q-terms-row">
                            <input type="checkbox" id="q-accept-terms">
                            <span>Concordo com os <a href="http://provoulevou.com.br/termos.html" target="_blank">Termos e Condi&#231;&#245;es</a></span>
                        </label>

                        <div id="q-validation-hint" class="q-validation-hint"></div>
                        <button class="q-btn-black" id="q-btn-generate">Provar &#243;culos</button>
                    </div>

                    <!-- PIX -->
                    <div id="q-step-pix">
                        <h2>Prova Extra</h2>
                        <p class="q-pix-subtitle">Limite de 3 provas atingido.<br>Pague R$1 via PIX para mais uma:</p>
                        <p style="font-size: 11px; color: var(--c-muted); margin: 8px 0 0; line-height: 1.5; text-align: center;">&#8505;&#65039; Cobran&#231;a feita pela Provou Levou, n&#227;o pela loja</p>
                        <div class="q-pix-qr"><img id="q-pix-qr-img" alt="QR Code PIX"></div>
                        <div class="q-pix-copiacola">
                            <input type="text" id="q-pix-code" readonly placeholder="C&#243;digo PIX...">
                            <button id="q-pix-copy-btn">Copiar</button>
                        </div>
                        <div id="q-pix-status-msg" class="q-pix-status q-pix-waiting">Aguardando pagamento...</div>
                        <p class="q-pix-cancel" id="q-pix-cancel">Cancelar</p>
                    </div>

                    <!-- Loading -->
                    <div id="q-loading-box">
                        <div class="q-loading-texts">
                            <div class="q-loading-t1">Gerando sua prova...</div>
                            <a href="https://provoulevou.com.br?utm_source=widget&utm_medium=lojista&utm_campaign=maxilook" target="_blank" class="q-loading-t2">
                                <span>Powered by</span>
                                <img src="https://i.ibb.co/MD3B4FQf/Logo-provou-preto-1.png" alt="Provou Levou">
                            </a>
                        </div>
                        <div class="q-loading-bar"><div></div></div>
                    </div>

                    <!-- Resultado -->
                    <div id="q-step-result">
                        <span class="q-res-title">Veja como ficou em voc&ecirc;</span>
                        <div id="q-result-img-col">
                            <img id="q-final-view-img">
                        </div>
                        <div id="q-result-actions-col">
                            <div class="q-fakebuy" id="q-fakebuy"></div>
                            <div class="q-result-prodinfo" id="q-result-prodinfo" style="display:none;">
                                <div class="q-result-prodname" id="q-result-prodname"></div>
                                <div class="q-result-prodprice" id="q-result-prodprice"></div>
                                <div class="q-result-installment" id="q-result-installment"></div>
                                <div class="q-scarcity" id="q-scarcity" style="display:none;"><i class="ph-bold ph-fire"></i> APENAS <strong id="q-scarcity-n"></strong>&nbsp;UNIDADES RESTANTES</div>
                            </div>
                            <div class="q-seals" id="q-seals" style="display:none;">
                                <div class="q-seal"><i class="ph-fill ph-shield-check"></i><span>Compra<br>Segura</span></div>
                                <div class="q-seal"><i class="ph-fill ph-lock-key"></i><span>Pagamento<br>Seguro</span></div>
                            </div>
                            <button class="q-btn-buy-now" id="q-btn-buy-now" style="display:none;">Comprar Armação</button>
                            <button class="q-btn-lentes" id="q-btn-escolher-lentes" style="display:none;"><span class="q-lentes-t">ESCOLHER LENTES</span><span class="q-lentes-s">a partir de R$ 129 &middot; monte seu &oacute;culos completo</span></button>
                            <div id="q-related-products" style="display:none;">
                                <h4>Veja tamb&eacute;m</h4>
                                <div class="q-related-grid" id="q-related-grid"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Erro -->
                    <div id="q-step-error">
                        <h2>ALTA DEMANDA</h2>
                        <p>Aguarde alguns segundos para tentar novamente.</p>
                        <button class="q-btn-outline" id="q-error-back">Voltar ao Produto</button>
                        <div style="margin-top:14px;padding-top:12px;border-top:1px solid rgba(0,0,0,.08);"><p style="font-size:12px;color:var(--c-muted);margin:0 0 8px;">Continua com problema? Fale direto com a Provou Levou:</p><a href="https://wa.me/5511938034714?text=Ol%C3%A1!%20Tive%20um%20problema%20ao%20usar%20o%20provador." target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:7px;background:#25D366;color:#fff;border-radius:10px;padding:10px 18px;font-family:inherit;font-weight:700;font-size:13px;text-decoration:none;"><svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.9c0 2.1.55 4.06 1.6 5.8L2 22l4.44-1.65a9.9 9.9 0 0 0 5.6 1.72h.01c5.46 0 9.9-4.45 9.9-9.9C21.95 6.45 17.5 2 12.04 2zm5.8 14.15c-.24.68-1.4 1.3-1.94 1.34-.5.05-1.13.07-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.8-4.17-4.94-4.36-.15-.19-1.18-1.57-1.18-2.99 0-1.42.75-2.12 1.01-2.41.27-.29.58-.36.77-.36l.55.01c.18.01.42-.07.66.5.24.59.83 2.04.9 2.18.07.15.12.32.02.51-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.34 1.44.29.15.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.39-.24.66-.14.27.1 1.7.8 1.99.95.29.15.48.22.55.34.07.12.07.71-.17 1.39z"/></svg> Falar com a Provou Levou</a></div>
                    </div>

                
<!-- ============ ESCOLHER LENTES ============ -->
<div id="q-step-lentes">
    <div class="q-passos"><i class="on"></i><i></i><i></i><i></i></div>
    <span class="q-section-label">Que tipo de lente voc&ecirc; usa?</span>
    <button class="q-opt" data-visao="simples">
        <span class="q-opt-t">Vis&atilde;o simples</span>
        <span class="q-opt-s">Para perto <b>ou</b> para longe</span></button>
    <button class="q-opt" data-visao="multifocal">
        <span class="q-opt-t">Multifocal</span>
        <span class="q-opt-s">Para perto <b>e</b> para longe</span></button>
    <button class="q-opt" data-visao="descanso">
        <span class="q-opt-t">Sem grau</span>
        <span class="q-opt-s">S&oacute; quero o tratamento (descanso)</span></button>
    <a class="q-sair" data-carrinho="sem">prefiro s&oacute; a arma&ccedil;&atilde;o</a>
</div>

<div id="q-step-receita">
    <div class="q-passos"><i class="done"></i><i class="on"></i><i></i><i></i></div>
    <span class="q-section-label">Qual tratamento voc&ecirc; quer?</span>
    <button class="q-opt" data-trat="antirreflexo">
        <span class="q-opt-t">Antirreflexo</span>
        <span class="q-opt-s">O essencial, para o dia a dia</span></button>
    <button class="q-opt" data-trat="blue">
        <span class="q-opt-t">Antirreflexo + Filtro de luz azul</span>
        <span class="q-opt-s">Para quem passa o dia em telas</span></button>
    <button class="q-opt" data-trat="fotocromatica">
        <span class="q-opt-t">Fotocrom&aacute;tica</span>
        <span class="q-opt-s">Escurece no sol, clareia dentro de casa</span></button>
    <button class="q-opt" data-trat="fotocromatica_blue">
        <span class="q-opt-t">Fotocrom&aacute;tica + Filtro de luz azul</span>
        <span class="q-opt-s">Escurece no sol <b>e</b> protege das telas</span></button>
    <button class="q-opt" data-trat="nenhum">
        <span class="q-opt-t">Sem tratamento</span>
        <span class="q-opt-s">A lente simples, op&ccedil;&atilde;o mais em conta</span></button>
    <a class="q-voltar" data-ir="q-step-lentes">voltar</a>
    <a class="q-sair" data-carrinho="sem">prefiro s&oacute; a arma&ccedil;&atilde;o</a>
</div>

<div id="q-step-upload">
    <div class="q-passos"><i class="done"></i><i class="done"></i><i class="on"></i><i></i></div>
    <span class="q-section-label">Agora, sua receita</span>
    <div class="q-tip-box" style="margin-bottom:16px;">
        <i class="ph ph-lightbulb"></i>
        <span>Precisamos do seu grau para indicar a lente certa.</span>
    </div>
    <input type="file" id="q-arquivo" accept="image/*,application/pdf" hidden>
    <button class="q-opt q-opt-destaque" id="q-abrir-arquivo">
        <span class="q-opt-t">&#128196; Enviar minha receita</span>
        <span class="q-opt-s">Tire uma foto ou anexe o arquivo &mdash; a gente l&ecirc; pra voc&ecirc;</span></button>
    <button class="q-opt" data-receita="digitar">
        <span class="q-opt-t">&#9000; Digitar os dados</span>
        <span class="q-opt-s">Prefiro preencher os campos eu mesma</span></button>

    <div id="q-lendo" class="q-lendo" hidden>
        <img id="q-thumb" alt="" hidden>
        <div class="q-lendo-arq" id="q-arq-nome"></div>
        <div class="q-spin"></div>
        <div>Lendo sua receita&hellip;</div>
    </div>
    <div id="q-erro-leitura" class="q-erro-leitura" hidden></div>

    <a class="q-voltar" data-ir="q-step-receita">voltar</a>
    <a class="q-sair" data-carrinho="sem">prefiro s&oacute; a arma&ccedil;&atilde;o</a>
</div>

<div id="q-step-lente-final">
    <div class="q-passos"><i class="done"></i><i class="done"></i><i class="done"></i><i class="on"></i></div>
    <span class="q-section-label" id="q-lente-titulo">Sua receita</span>

    <div id="q-banner-ia" class="q-banner-ia" hidden></div>

    <div id="q-form-receita">
        <div class="q-olho"><span class="q-olho-tag">Olho direito (OD)</span>
            <div class="q-olho-campos">
                <label>Esf&eacute;rico<select data-r="odEsf"></select></label>
                <label>Cil&iacute;ndrico<select data-r="odCil"></select></label>
                <label>Eixo<select data-r="odEixo"></select></label>
            </div></div>
        <div class="q-olho"><span class="q-olho-tag">Olho esquerdo (OE)</span>
            <div class="q-olho-campos">
                <label>Esf&eacute;rico<select data-r="oeEsf"></select></label>
                <label>Cil&iacute;ndrico<select data-r="oeCil"></select></label>
                <label>Eixo<select data-r="oeEixo"></select></label>
            </div></div>
        <!-- adi&ccedil;&atilde;o: s&oacute; existe em multifocal (o "grau de perto") -->
        <div class="q-olho" id="q-bloco-adicao" hidden>
            <span class="q-olho-tag">Adi&ccedil;&atilde;o &mdash; o grau de perto</span>
            <div class="q-olho-campos" style="grid-template-columns:1fr;">
                <label>Adi&ccedil;&atilde;o<select data-r="adicao"></select></label>
            </div>
        </div>
        <div id="q-aviso-campo" class="q-erro-leitura" hidden></div>
        <button class="q-btn-black" id="q-ver-lente" style="margin-top:6px;">VER MINHA LENTE</button>
    </div>

    <div id="q-resultado-lente" hidden>
        <div id="q-card-lente" class="q-card-lente"></div>
        <div id="q-alternativas"></div>
        <div id="q-resumo-lente" class="q-resumo"></div>
        <button class="q-btn-black" id="q-add-lente">COMPRAR ARMA&Ccedil;&Atilde;O + LENTE</button>
        <button class="q-btn-outline" id="q-so-armacao" data-carrinho="sem" style="margin-top:9px;">COMPRAR SOMENTE A ARMA&Ccedil;&Atilde;O</button>
    </div>

    <a class="q-voltar" data-ir="q-step-upload">voltar</a>
</div>

<!-- carrinho simulado -->
<div id="q-step-cart" style="display:none;flex-direction:column;padding:30px 28px;text-align:center;">
    <div style="font-size:38px;color:#10b981;margin-bottom:6px;">&#10003;</div>
    <span class="q-section-label">Adicionado ao carrinho</span>
    <div id="q-cart-itens" style="text-align:left;margin:14px 0 0;"></div>
    <div style="display:flex;justify-content:space-between;padding:13px 0;font-size:15px;
                border-top:1px solid var(--c-line);margin-top:10px;">
        <span>Total</span><strong id="q-cart-total"></strong></div>
    <div class="q-tip-box" style="margin-top:12px;">
        <i class="ph ph-lightbulb"></i><span>Preview &mdash; nada foi enviado &agrave; loja.</span></div>
    <a class="q-voltar" data-ir="q-step-result">voltar ao in&iacute;cio</a>
</div>

</div>
                <a href="https://provoulevou.com.br?utm_source=widget&utm_medium=lojista&utm_campaign=maxilook" target="_blank" class="q-powered-footer">
                    <span>Powered by</span>
                    <img src="https://i.ibb.co/MD3B4FQf/Logo-provou-preto-1.png" class="q-quantic-logo" alt="Provou Levou">
                </a>
            </div>
        </div>
    `;


    // ─── INIT ─────────────────────────────────────────────────────────────────────


    // ─── CTA DE COMPRA NO RESULTADO ───────────────────────────────────────────────

    // Caminho do checkout da Nuvemshop. Se na loja o checkout direto não abrir,
    // troque para '/comprar/' por '/carrinho' (1 linha) — é o único ponto a validar ao vivo.
    var Q_CHECKOUT_URL = '/comprar/';

    function getMainPrice() {
        // 1) preço exibido na página (vários temas Nuvemshop)
        var sel = '.js-price-display, [data-product-price], .product__price .price, .js-product-price, .price-display';
        var el = document.querySelector(sel);
        if (el) {
            var t = (el.getAttribute('data-product-price') || el.textContent || '').trim();
            if (t && /\d/.test(t)) {
                // normaliza "R$ 289,00" / "28900" -> "R$ 289,00"
                if (/^\d+$/.test(t)) { var n = (parseInt(t,10)/100).toFixed(2).replace('.',','); return 'R$ ' + n; }
                return t.replace(/\s+/g,' ');
            }
        }
        // 2) fallback: data-variants do produto principal (mesmo formato dos "Veja também")
        var dv = document.querySelector('[data-variants]');
        if (dv) {
            try { var v = JSON.parse(dv.getAttribute('data-variants'))[0]; if (v && v.price_short) return v.price_short; } catch (e) {}
        }
        return '';
    }

    function findStoreBuyBtn() {
        return document.querySelector('.js-addtocart, .btn-add-to-cart, [data-component="product.add-to-cart"], button[type="submit"].js-addtocart');
    }

    // Acha o form de produto real (o que tem o input add_to_cart = product_id)
    function getProductForm() {
        var f = document.getElementById('product_form');
        if (f && f.querySelector('input[name="add_to_cart"]')) return f;
        var inp = document.querySelector('input[name="add_to_cart"]');
        if (inp && inp.closest('form')) return inp.closest('form');
        return document.querySelector('form.js-product-form');
    }

    // Compra de verdade: submete uma CÓPIA do form do produto (POST real).
    // A Nuvemshop só adiciona ao carrinho via POST — o GET antigo abria o
    // carrinho vazio. O clone não tem o AJAX do tema, então faz POST nativo:
    // servidor adiciona o item e redireciona pro carrinho JÁ com o produto.
    function buyNow() {
        // Tracking: registra o clique em "Comprar Agora" (marca carrinho_adicionado na prova)
        try {
            var _tp = (document.getElementById('q-phone') || {}).value || '';
            var _td = (document.querySelector('h1.product__title,.product-single__title,h1') || {}).innerText || document.title || '';
            fetch('https://n8n.segredosdodrop.com/webhook/pl-provador-buy-click', { method: 'POST', keepalive: true, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ phone: _tp, origin: location.origin, produto: _td }) }).catch(function () {});
        } catch (e) {}
        var src = getProductForm();
        if (src) {
            var clone = document.createElement('form');
            clone.method = 'post';
            clone.action = src.getAttribute('action') || '/comprar/';
            clone.style.display = 'none';
            src.querySelectorAll('input, select, textarea').forEach(function (el) {
                if (!el.name) return;
                if ((el.type === 'checkbox' || el.type === 'radio') && !el.checked) return;
                var h = document.createElement('input');
                h.type = 'hidden'; h.name = el.name; h.value = el.value;
                clone.appendChild(h);
            });
            if (!clone.querySelector('[name="quantity"]')) {
                var q = document.createElement('input');
                q.type = 'hidden'; q.name = 'quantity'; q.value = '1';
                clone.appendChild(q);
            }
            document.body.appendChild(clone);
            clone.submit();
            return;
        }
        // Fallback: botão nativo da loja
        var sb = findStoreBuyBtn();
        if (sb) { try { sb.click(); } catch (e) {} }
    }

    // Escassez — número estável por produto (não muda a cada refresh)
    function scarcityCount(name) {
        var h = 5381, s = String(name || '');
        for (var i = 0; i < s.length; i++) h = (h * 33 + s.charCodeAt(i)) >>> 0;
        var FLOOR = 8, _st = 10 + (h % 4);   // estoque inicial por produto (10..13)
            var _dn = new Date(), _df = (_dn.getHours() * 60 + _dn.getMinutes()) / 1440;
            var _q = _st - Math.floor(_df * 5);   // cai ao longo do dia
            return _q < FLOOR ? FLOOR : _q;        // piso 8
    }
    // Notificações de compra (prova social)
    var Q_FAKE_NAMES = ['Ana C.','Carlos M.','Mariana S.','João P.','Beatriz R.','Pedro A.','Juliana F.','Lucas T.','Fernanda L.','Rafael O.','Camila N.','Bruno G.','Larissa D.','Gabriel V.','Patrícia H.','Thiago B.','Aline M.','Rodrigo S.','Vanessa P.','Felipe C.','Letícia M.','Marcos A.'];
    var Q_FAKE_WHEN = ['agora mesmo','há 1 minuto','há 2 minutos','há 4 minutos','há 6 minutos','há 9 minutos','há 12 minutos'];
    var _fakeBuyTimer = null;
    function _showFakeBuy() {
        var step = document.getElementById('q-step-result');
        var el = document.getElementById('q-fakebuy');
        if (!el || !step || step.style.display === 'none') return;
        var nm = Q_FAKE_NAMES[Math.floor(Math.random() * Q_FAKE_NAMES.length)];
        var wh = Q_FAKE_WHEN[Math.floor(Math.random() * Q_FAKE_WHEN.length)];
        el.innerHTML = '<i class="ph-fill ph-shopping-bag"></i><div><span style="font-size:12.5px;color:var(--c-ink);"><strong>' + nm + '</strong> comprou este produto</span><span>' + wh + ' &middot; compra verificada</span></div>';
        el.classList.add('show');
        clearTimeout(el._hideT);
        el._hideT = setTimeout(function () { el.classList.remove('show'); }, 4500);
    }
    function startFakeBuy() {
        stopFakeBuy();
        setTimeout(_showFakeBuy, 3000);
        _fakeBuyTimer = setInterval(_showFakeBuy, 12000);
    }
    function stopFakeBuy() {
        if (_fakeBuyTimer) { clearInterval(_fakeBuyTimer); _fakeBuyTimer = null; }
        var el = document.getElementById('q-fakebuy'); if (el) el.classList.remove('show');
    }

    // Parcelamento — o MESMO da pagina: pega a MAIOR parcela do produto ("em ate Nx de R$ X").
    // Le do data-variants (mesma fonte do preco). installments_data vem como STRING JSON aninhada.
    function getInstallment() {
        var dv = document.querySelector('[data-variants]');
        if (!dv) return '';
        try {
            var v = JSON.parse(dv.getAttribute('data-variants'))[0];
            var idata = v.installments_data;
            if (!idata) return '';
            if (typeof idata === 'string') idata = JSON.parse(idata);
            var plans = idata[Object.keys(idata)[0]];
            if (!plans) return '';
            var best = null;
            Object.keys(plans).forEach(function (k) {
                var n = parseInt(k, 10);
                var p = plans[k];
                if (n >= 2 && p.installment_value > 0) {
                    var free = p.without_interests === true;
                    if (!best || (free && !best.free) || (free === best.free && n > best.n)) best = { n: n, val: p.installment_value, free: free };
                }
            });
            if (best) return best.n + 'x de R$ ' + Number(best.val).toFixed(2).replace('.', ',');
        } catch (e) {}
        return '';
    }

    function populateBuyCta() {
        var btn = document.getElementById('q-btn-buy-now');
        var trust = document.getElementById('q-seals');
        if (!btn) return;
        // Nome + valor do produto acima do botão
        var price = getMainPrice();
        var prodName = (document.querySelector('h1.product__title,.product-single__title,h1') || {}).innerText || document.title || '';
        var info = document.getElementById('q-result-prodinfo');
        var nameEl = document.getElementById('q-result-prodname');
        var priceEl = document.getElementById('q-result-prodprice');
        if (nameEl) nameEl.textContent = (prodName || '').trim();
        if (priceEl) priceEl.textContent = price || '';
        var instEl = document.getElementById('q-result-installment');
        if (instEl) { var _inst = getInstallment(); instEl.textContent = _inst; instEl.style.display = _inst ? 'block' : 'none'; }
        if (info && ((prodName || '').trim() || price)) info.style.display = 'block';
        // Escassez
        var sc = document.getElementById('q-scarcity');
        var scn = document.getElementById('q-scarcity-n');
        if (sc && scn && (prodName || '').trim()) { scn.textContent = scarcityCount(prodName); sc.style.display = 'flex'; }
        // Notificações de compra: desativadas em todos os provadores
        btn.style.display = 'flex';
        if (trust) trust.style.display = 'flex';
        btn.onclick = buyNow;
    }


    // ─── INIT ─────────────────────────────────────────────────────────────────────


    function init() {
        // --- FILTRO DE CATEGORIA (HAT) ---
        const productNameNormalized = (document.querySelector('h1.product__title,.product-single__title,h1')?.innerText || document.title).toUpperCase();
        if (productNameNormalized.includes('HAT')) {
            return;
        }

        // Fontes (async, não bloqueia render)

        // Phosphor Icons — carregado lazily na primeira abertura do modal
        // (não carrega na init para não impactar o tempo de carregamento da página)

        const styleTag = document.createElement('style');
        styleTag.textContent = styles;
        document.head.appendChild(styleTag);

        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = html;
        document.body.appendChild(modalContainer);

        // Usa a MESMA FONTE da loja no provador (em vez de Bebas Neue / DM Sans)
        try {
            var _bodyF = getComputedStyle(document.body).fontFamily;
            var _h = document.querySelector('h1.product__title,.product-single__title,h1,h2');
            var _headF = _h ? getComputedStyle(_h).fontFamily : _bodyF;
            var _root = document.documentElement;
            if (_bodyF) _root.style.setProperty('--font-body', _bodyF);
            if (_headF) _root.style.setProperty('--font-display', _headF);
        } catch (e) {}


        // ── Botão imagem PNG ──
        const openBtn = document.createElement('button');
        openBtn.className = 'q-btn-trigger-ia';
        openBtn.id = 'q-open-ia';
        openBtn.setAttribute('aria-label', 'Abrir Provador Virtual');
        openBtn.innerHTML = stampImageHTML;


        const imgContainers = ['.js-product-slide', '.product-image-column', '.js-swiper-product', '[data-store^="product-image-"]', '.product__media-wrapper', '.product-gallery__media', '.product__media', '.product-image-main', '.product-media-container', '[data-media-id]', '.product__media-item', '.product-gallery', '.product-single__media', '.media-gallery'];

        function tryPlaceTriggerBtn() {
            // 1ª prioridade: container que tenha <img> dentro (evita cair em slide de vídeo)
            for (const sel of imgContainers) {
                const els = document.querySelectorAll(sel);
                for (const el of els) {
                    if (el.querySelector('img')) {
                        if (window.getComputedStyle(el).position === 'static') el.style.position = 'relative';
                        el.appendChild(openBtn);
                        return true;
                    }
                }
            }
            // 2ª prioridade: qualquer container correspondente
            for (const sel of imgContainers) {
                const el = document.querySelector(sel);
                if (el) {
                    if (window.getComputedStyle(el).position === 'static') el.style.position = 'relative';
                    el.appendChild(openBtn);
                    return true;
                }
            }
            return false;
        }

        if (!tryPlaceTriggerBtn()) {
            // Container não pronto ainda (ex: após F5 no mobile).
            // Observa DOM até 5s aguardando o container aparecer.
            const observer = new MutationObserver(() => {
                if (tryPlaceTriggerBtn()) observer.disconnect();
            });
            observer.observe(document.body, { childList: true, subtree: true });

            setTimeout(() => {
                observer.disconnect();
                if (!openBtn.isConnected) {
                    openBtn.style.cssText = 'position:fixed;bottom:30px;right:20px;top:auto;z-index:100;';
                    document.body.appendChild(openBtn);
                }
            }, 5000);
        }


        const modal = document.getElementById('q-modal-ia');

        // ── Botão inline acima do botão de compra ──
        const inlineBtn = document.createElement('button');
        inlineBtn.className = 'q-btn-inline-provador';
        inlineBtn.type = 'button';

        const inlineSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        inlineSvg.setAttribute('viewBox', '0 0 24 24');
        inlineSvg.setAttribute('fill', 'none');
        inlineSvg.setAttribute('stroke', 'currentColor');
        inlineSvg.setAttribute('stroke-width', '1.5');
        inlineSvg.setAttribute('stroke-linecap', 'round');
        inlineSvg.setAttribute('stroke-linejoin', 'round');
        const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path1.setAttribute('d', 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2');
        const circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle1.setAttribute('cx', '12');
        circle1.setAttribute('cy', '7');
        circle1.setAttribute('r', '4');
        inlineSvg.appendChild(path1);
        inlineSvg.appendChild(circle1);
        inlineBtn.appendChild(inlineSvg);

        const inlineBtnText = document.createTextNode('Provador Virtual');
        inlineBtn.appendChild(inlineBtnText);

        inlineBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const prodName = document.querySelector('h1.product__title,.product-single__title,h1')?.innerText || document.title;
            applyProduct(detectProduct(prodName));
            populateImageSelector();
            openModal();
        });

        // Posiciona acima do botão de compra
        const buyBtn = document.querySelector('.js-addtocart, .btn-add-to-cart, [data-component="product.add-to-cart"]');
        if (buyBtn) {
            buyBtn.parentNode.insertBefore(inlineBtn, buyBtn);
        } else {
            const variantsContainer = document.querySelector('.js-product-variants');
            if (variantsContainer) {
                variantsContainer.parentNode.insertBefore(inlineBtn, variantsContainer.nextSibling);
            }
        }
        const genBtn      = document.getElementById('q-btn-generate');
        const nextBtn     = null; // single-step flow — no next button
        const phoneStep   = null;
        const photoStep   = document.getElementById('q-step-photo');
        const uploadStep  = photoStep; // alias for PIX/error refs

        const closeBtn    = document.getElementById('q-close-btn');
        const backBtn     = document.getElementById('q-btn-back');
        const retryBtn    = document.getElementById('q-retry-btn');
        const cameraInput = document.getElementById('q-camera-input');
        const galleryInput= document.getElementById('q-gallery-input');
        const phoneInput  = document.getElementById('q-phone');
        // ── Pré-preenche último número usado (localStorage) ──
        const _PL_LAST_PHONE = 'pl_last_phone';
        try {
            const saved = localStorage.getItem(_PL_LAST_PHONE);
            if (saved && /^\d{10,11}$/.test(saved)) {
                const m = saved.match(/(\d{2})(\d{4,5})(\d{4})/);
                if (m) phoneInput.value = '(' + m[1] + ') ' + m[2] + '-' + m[3];
            }
        } catch (_) {}
        function _savePhoneIfValid() {
            const nums = phoneInput.value.replace(/\D/g, '');
            if (/^\d{10,11}$/.test(nums)) {
                try { localStorage.setItem(_PL_LAST_PHONE, nums); } catch (_) {}
            }
        }
        phoneInput.addEventListener('blur', _savePhoneIfValid);
        const preImg      = document.getElementById('q-pre-img');
        const facePlaceholder = document.getElementById('q-face-placeholder');

        // keep realInput alias so PIX code still works
        const realInput   = galleryInput;

        let userPhoto = null;
        let pixPaymentId = null;
        let selectedProductImgUrl = '';

        // Upgrade Nuvemshop CDN URLs to 1024px version
        function upgradeImgUrl(url) {
            if (url.includes('mitiendanube.com') || url.includes('nuvemshop.com')) {
                return url.replace(/-\d+-\d+\.webp/, '-1024-1024.webp');
            }
            return url;
        }

        function extractImages() {
            const containersSelectors = '.js-product-slide, .product-image-column, .js-swiper-product, [data-store^="product-image-"], .product__media-wrapper, .product-gallery__media, .product__media, .product-image-main, .product-media-container, [data-media-id], .product__media-item, .product-gallery, .product-single__media, .media-gallery, [data-component="product.gallery"], .swiper-slide:not(.swiper-slide-duplicate), .slider-wrapper';
            const possibleContainers = Array.from(document.querySelectorAll(containersSelectors));
            let imgEls = [];
            possibleContainers.forEach(c => {
                if (!c.closest('#q-modal-ia')) {
                    const foundImgs = c.querySelectorAll('img');
                    imgEls.push(...Array.from(foundImgs));
                }
            });
            let uniqueImgs = [];
            imgEls.forEach(img => {
                let src = img.dataset?.src || img.getAttribute('data-src') || img.src;

                if (src && src.includes('data:image')) {
                    const parentA = img.closest('a');
                    if (parentA && parentA.href && !parentA.href.includes('javascript:')) {
                        src = (/\.(jpe?g|png|webp|gif|avif)(\?|#|$)/i.test(parentA.href) ? parentA.href : '');
                    } else if (img.getAttribute('data-srcset')) {
                        src = img.getAttribute('data-srcset').split(',')[0].trim().split(' ')[0];
                    }
                }

                if (!src || src.includes('data:image')) return;

                const lowerSrc = src.toLowerCase();
                const invalidKeywords = ['provador', 'logo', 'provoulevou', 'icon', 'play', 'video', 'transparent', 'placeholder', 'blank', 'spacer'];
                if (invalidKeywords.some(kw => lowerSrc.includes(kw))) return;

                // Filter out tiny images (1x1 pixels, spacers, etc.)
                if (img.naturalWidth > 0 && img.naturalWidth < 50) return;
                if (img.naturalHeight > 0 && img.naturalHeight < 50) return;

                let cleanSrc = src.split('?')[0].replace(/-\d+-\d+\.webp|_\d+x\d+/, '');

                // Upgrade to 1024px version
                src = upgradeImgUrl(src);

                if (!uniqueImgs.some(u => u.split('?')[0].replace(/-\d+-\d+\.webp|_\d+x\d+/, '') === cleanSrc)) {
                    uniqueImgs.push(src);
                }
            });
            if (uniqueImgs.length === 0) {
                const og = document.querySelector('meta[property="og:image"]')?.content;
                if (og) uniqueImgs.push(upgradeImgUrl(og));
            }
            return uniqueImgs.slice(0, 4);
        }

        function populateImageSelector() {
            const imgs = extractImages();
            const group = document.getElementById('q-photo-selector-group');
            if (group) group.style.display = 'none';
            selectedProductImgUrl = imgs[0] || '';
        }

        // -- Tracking de abertura do provador (session anonima) - Provou Levou --
        var WEBHOOK_OPEN_PL = 'https://n8n.segredosdodrop.com/webhook/pl-provador-open';
        function plSid() { try { var s = localStorage.getItem('pl_sid'); if (!s) { s = 's' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10); localStorage.setItem('pl_sid', s); } return s; } catch (e) { return 'nostore'; } }
        function plTrackOpen() { try { fetch(WEBHOOK_OPEN_PL, { method: 'POST', keepalive: true, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ session_id: plSid(), origin: location.origin, produto: (document.querySelector('h1.product-name, h1.product__title, .product-single__title, h1') || {}).innerText || document.title || '' }) }).catch(function () {}); } catch (e) {} }
        function plTrackProved(rawPhone) { try { var d = (rawPhone || '').replace(/\D/g, ''); if (d.length > 11 && d.slice(0, 2) === '55') d = d.slice(2); fetch(WEBHOOK_OPEN_PL, { method: 'POST', keepalive: true, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ session_id: plSid(), proved: true, telefone_cliente: d || null }) }).catch(function () {}); } catch (e) {} }
        // ── Detecção de rosto: foto do óculos no rosto vira a referência principal ──
        // Roda no navegador (FaceDetector nativo do Chromium; fallback MediaPipe via CDN).
        // Varre a galeria do produto (extractImages) e coleta as fotos com rosto. Fallback
        // seguro: se nada detectar ou der erro, mantém as fotos default — sem regressão.
        var faceDetectPromise = null, _faceUrls = [], _faceDet = null, _faceDetTried = false;
        async function getFaceDetector() {
            if (_faceDetTried) return _faceDet;
            _faceDetTried = true;
            try {
                if ('FaceDetector' in window) { _faceDet = { native: new window.FaceDetector({ fastMode: true, maxDetectedFaces: 1 }) }; return _faceDet; }
            } catch (e) {}
            try {
                var vision = await import('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.18/vision_bundle.mjs');
                var fileset = await vision.FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.18/wasm');
                var det = await vision.FaceDetector.createFromOptions(fileset, {
                    baseOptions: { modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite' },
                    runningMode: 'IMAGE'
                });
                _faceDet = { mp: det };
            } catch (e) { _faceDet = null; }
            return _faceDet;
        }
        function _plLoadCorsImg(url) {
            return new Promise(function (resolve) {
                var img = new Image();
                img.crossOrigin = 'anonymous';
                img.onload = function () { resolve(img); };
                img.onerror = function () { resolve(null); };
                img.src = url;
            });
        }
        async function _plImgHasFace(det, img) {
            try {
                if (det.native) { var f = await det.native.detect(img); return !!(f && f.length); }
                if (det.mp) { var r = det.mp.detect(img); return !!(r && r.detections && r.detections.length); }
            } catch (e) {}
            return false;
        }
        async function _plDetectFaces(urls) {
            if (!urls || !urls.length) return _faceUrls;
            var det = await getFaceDetector();
            if (!det) return _faceUrls;
            for (var i = 0; i < urls.length && _faceUrls.length < 4; i++) {
                var img = await _plLoadCorsImg(urls[i]);
                if (!img) continue;
                if (await _plImgHasFace(det, img)) _faceUrls.push(urls[i]);
            }
            return _faceUrls;
        }
        function startFaceDetect() {
            if (faceDetectPromise) return faceDetectPromise;
            var _urls = [];
            try { if (typeof extractImages === 'function') _urls = extractImages().slice(0, 12); } catch (e) {}
            faceDetectPromise = _plDetectFaces(_urls).then(function (arr) {
                if (arr && arr.length) { try { console.log('[PL] fotos no rosto detectadas:', arr.length); } catch (e) {} }
                return arr;
            }).catch(function () { return _faceUrls; });
            return faceDetectPromise;
        }

        function openModal() {
            try { startFaceDetect(); } catch (e) {}
            plTrackOpen();
            // Lazy-load Phosphor Icons na primeira abertura
            if (!window.phosphorIconsLoaded) {
                var ph = document.createElement('script');
                ph.src = 'https://unpkg.com/@phosphor-icons/web';
                document.head.appendChild(ph);
                window.phosphorIconsLoaded = true;
            }
            modal.style.display = 'flex';
            lockBodyScroll();
            // Mostra contador imediatamente (só por IP) ao abrir o modal
            if (typeof _checkProvasRestantes === 'function') _checkProvasRestantes();
        }


        function closeModal() {
            modal.style.display = 'none';
            unlockBodyScroll();
            try { stopFakeBuy(); } catch (e) {}
        
            // --- volta pra tela inicial ao fechar (pos-prova) + limpa input p/ 2a foto enviar ---
            try {
                var _qsr = document.getElementById('q-step-result'); if (_qsr) _qsr.style.display = 'none';
                var _qsp = (typeof photoStep !== 'undefined' && photoStep) ? photoStep : document.getElementById('q-step-photo');
                if (_qsp) _qsp.style.display = 'flex';
                var _qcard = document.querySelector('.q-card-ia'); if (_qcard) _qcard.classList.remove('is-result');
                if (typeof userPhoto !== 'undefined') userPhoto = null;
                if (typeof pixPaymentId !== 'undefined') pixPaymentId = null;
                if (typeof preImg !== 'undefined' && preImg) preImg.style.display = 'none';
                if (typeof facePlaceholder !== 'undefined' && facePlaceholder) facePlaceholder.style.display = 'flex';
                try { if (typeof cameraInput !== 'undefined' && cameraInput) cameraInput.value = ''; if (typeof galleryInput !== 'undefined' && galleryInput) galleryInput.value = ''; } catch (e) {}
                if (typeof checkFields === 'function') checkFields();
            } catch (e) {}
        }


        function applyProduct(product) {
            currentProduct = product;
        }


        openBtn.onclick = (e) => {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            const prodName = document.querySelector('h1.product__title,.product-single__title,h1')?.innerText || document.title;
            applyProduct(detectProduct(prodName));
            populateImageSelector();
            openModal();
        };


        closeBtn.onclick = () => closeModal();
        if (backBtn) backBtn.onclick = () => closeModal();


        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });


        if (retryBtn) retryBtn.onclick = () => {
            try { if (typeof cameraInput !== 'undefined' && cameraInput) cameraInput.value = ''; if (typeof galleryInput !== 'undefined' && galleryInput) galleryInput.value = ''; } catch (e) {}
            document.getElementById('q-step-result').style.display = 'none';
            photoStep.style.display = 'flex';
            document.querySelector('.q-card-ia').classList.remove('is-result');
            userPhoto = null;
            pixPaymentId = null;
            preImg.style.display = 'none';
            if (facePlaceholder) facePlaceholder.style.display = 'flex';
            checkFields();
        };

        // Camera / gallery buttons
        document.getElementById('q-btn-camera').onclick = function() { cameraInput.click(); };
        document.getElementById('q-btn-gallery').onclick = function() { galleryInput.click(); };
        document.getElementById('q-face-frame').onclick = function() { galleryInput.click(); };

        function loadRelatedProducts() {
            var grid = document.getElementById('q-related-grid');
            var section = document.getElementById('q-related-products');
            if (!grid || !section) return;

            var items = document.querySelectorAll('.js-swiper-related .js-item-product');
            if (!items.length) items = document.querySelectorAll('.js-item-product');
            var products = [];

            items.forEach(function(item) {
                if (products.length >= 3) return;
                var container = item.querySelector('[data-variants]');
                if (!container) return;
                try {
                    var variants = JSON.parse(container.getAttribute('data-variants'));
                    if (!variants || !variants.length) return;
                    var v = variants[0];
                    var imgRaw = v.image_url || '';
                    var img = imgRaw ? 'https:' + imgRaw.replace(/\\/g, '').replace('-1024-1024.webp', '-480-0.webp') : '';
                    var price = v.price_short || '';
                    // Name from img alt (Nuvemshop sets it reliably)
                    var imgEl = item.querySelector('img[alt]');
                    var name = imgEl ? imgEl.getAttribute('alt').trim() : '';
                    // Link from any anchor pointing to /produtos/
                    var linkEl = item.querySelector('a[href*="/produtos/"]');
                    var link = linkEl ? linkEl.getAttribute('href') : '';
                    if (img && (name || price)) {
                        products.push({ name: name, img: img, price: price, link: link });
                    }
                } catch(e) {}
            });

            if (!products.length) return;

            while (grid.firstChild) grid.removeChild(grid.firstChild);
            products.forEach(function(p) {
                var a = document.createElement('a');
                a.className = 'q-related-card';
                a.href = p.link || '#';
                a.target = '_blank';
                var img = document.createElement('img');
                img.src = p.img;
                img.alt = p.name;
                img.loading = 'lazy';
                var nameEl = document.createElement('span');
                nameEl.className = 'q-related-card-name';
                nameEl.textContent = p.name;
                a.appendChild(img);
                a.appendChild(nameEl);
                grid.appendChild(a);
            });
            section.style.display = 'block';
        }

        // ── Barra de progresso simulada (não há evento real de progresso do backend).
        // Desacelera perto de 92% e se auto-encerra sozinha quando a tela de loading
        // for escondida (sucesso, erro ou limite) — não precisa de hook em cada saída. ──
        var _qProgressTimer = null;
        function startLoadingProgress() {
            if (_qProgressTimer) { clearInterval(_qProgressTimer); _qProgressTimer = null; }
            var lb = document.getElementById('q-loading-box');
            var bar = lb ? lb.querySelector('.q-loading-bar > div') : null;
            if (!lb || !bar) return;
            bar.style.transition = 'none';
            bar.style.transform = 'scaleX(0)';
            void bar.offsetWidth;
            bar.style.transition = 'transform 0.3s ease-out';
            var progress = 0;
            _qProgressTimer = setInterval(function () {
                if (lb.style.display !== 'flex') { clearInterval(_qProgressTimer); _qProgressTimer = null; return; }
                var remaining = 92 - progress;
                progress += Math.max(remaining * 0.06, 0.15);
                if (progress > 92) progress = 92;
                bar.style.transform = 'scaleX(' + (progress / 100) + ')';
            }, 200);
        }

        function showError() {
            var lb = document.getElementById('q-loading-box');
            var su = photoStep;
            var se = document.getElementById('q-step-error');
            if (lb) lb.style.display = 'none';
            if (su) su.style.display = 'none';
            if (se) se.style.display = 'flex';
        }
        var _eb = document.getElementById('q-error-back'); if (_eb) _eb.onclick = function() { closeModal(); };



        phoneInput.addEventListener('input', function (e) {
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
            checkPhoneStep();
        });
        // ── Contador de provas restantes (debounced) ──
        let _provasDebounce;
        async function _checkProvasRestantes() {
            const _els = document.querySelectorAll('.q-provas-msg');
            if (!_els.length) return;
            const nums = phoneInput.value.replace(/\D/g, '');
            const phoneOk = isValidBRPhone(nums);
            // Phone vazio/incompleto → manda '0' pra pegar só o ip_count.
            const phone = phoneOk ? '55' + nums : '0';
            try {
                const r = await fetch(WEBHOOK_CHECK_LIMIT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ phone })
                });
                const d = await r.json();
                const used = Math.max(d.phone_count || 0, d.ip_count || 0, d.count || 0);
                const restantes = Math.max(0, 3 - used);
                if (restantes > 0) {
                    const _txt = restantes + (restantes === 1 ? ' prova restante hoje' : ' provas restantes hoje');
                    _els.forEach(el => { el.textContent = _txt; el.classList.remove('is-warn'); });
                } else {
                    _els.forEach(el => { el.textContent = 'Limite de 3 provas atingido — volte amanhã pra provar mais.'; el.classList.add('is-warn'); });
                }
            } catch(_) { _els.forEach(el => { el.textContent = ''; el.classList.remove('is-warn'); }); }
        }
        phoneInput.addEventListener('input', () => {
            clearTimeout(_provasDebounce);
            _provasDebounce = setTimeout(_checkProvasRestantes, 600);
        });



        function flashError(targetEl, hintMsg) {
            var hint = document.getElementById('q-validation-hint');
            if (hint) {
                hint.textContent = '\u26A0\uFE0F ' + hintMsg;
                hint.classList.add('is-visible');
            }
            if (targetEl) {
                targetEl.classList.add('is-error', 'q-shake');
                setTimeout(function(){ targetEl.classList.remove('q-shake'); }, 600);
                try { targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (_) {}
                if (targetEl.focus) setTimeout(function(){ targetEl.focus(); }, 350);
            }
        }
        function checkPhoneStep() {
            const nums = phoneInput.value.replace(/\D/g, '');
            const phoneOk = isValidBRPhone(nums);
            document.getElementById('q-phone-error').style.display = (phoneInput.value.length > 0 && !phoneOk) ? 'block' : 'none';
            phoneInput.style.borderColor = (phoneInput.value.length > 0 && !phoneOk) ? '#ef4444' : 'var(--q-border)';
            checkFields();
        }

        function checkFields() {
            const nums = phoneInput.value.replace(/\D/g, '');
            const phoneOk = isValidBRPhone(nums);
            /* aggressive validation: botão sempre clicável */
        }

        document.getElementById('q-accept-terms').onchange = checkFields;

        function handlePhotoSelected(file) {
            if (!file) return;
            userPhoto = file;
            const rd = new FileReader();
            rd.onload = ev => {
                preImg.src = ev.target.result;
                preImg.style.display = 'block';
                if (facePlaceholder) facePlaceholder.style.display = 'none';
                checkFields();
            };
            rd.readAsDataURL(file);
        }

        cameraInput.onchange  = (e) => handlePhotoSelected(e.target.files[0]);
        galleryInput.onchange = (e) => handlePhotoSelected(e.target.files[0]);


        function resizeImage(fileOrBlob, maxSize) {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => {
                    let w = img.width, h = img.height;
                    if (w <= maxSize && h <= maxSize) { resolve(fileOrBlob); return; }
                    if (w > h) { h = Math.round(h * maxSize / w); w = maxSize; }
                    else { w = Math.round(w * maxSize / h); h = maxSize; }
                    const c = document.createElement('canvas');
                    c.width = w; c.height = h;
                    c.getContext('2d').drawImage(img, 0, 0, w, h);
                    c.toBlob(b => resolve(b), 'image/jpeg', 0.95);
                };
                const url = URL.createObjectURL(fileOrBlob instanceof Blob ? fileOrBlob : new Blob([fileOrBlob]));
                img.src = url;
            });
        }

        // ── PIX: polling e controle ──
        let pixPollingTimer = null;

        function stopPixPolling() {
            if (pixPollingTimer) { clearInterval(pixPollingTimer); pixPollingTimer = null; }
        }

        function showPixScreen() {
            uploadStep.style.display = 'none';
            document.getElementById('q-step-pix').style.display = 'block';
            document.getElementById('q-pix-status-msg').textContent = 'Aguardando pagamento...';
            document.getElementById('q-pix-status-msg').className = 'q-pix-status q-pix-waiting';
        }

        function showDailyLimitReached() {
            // Esconde tudo
            uploadStep.style.display = 'none';
            const stepsToHide = ['q-step-pix', 'q-step-result', 'q-step-error', 'q-loading-box'];
            stepsToHide.forEach(id => { const el = document.getElementById(id); if (el) el.style.display = 'none'; });

            // Reusa ou cria container
            let msg = document.getElementById('q-daily-limit-msg');
            if (!msg) {
                msg = document.createElement('div');
                msg.id = 'q-daily-limit-msg';
                msg.style.cssText = 'display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:60px 30px;gap:18px;';

                const icon = document.createElement('div');
                icon.textContent = '⏰';
                icon.style.cssText = 'font-size:56px;line-height:1;';

                const title = document.createElement('h2');
                title.textContent = 'Limite diário atingido';
                title.style.cssText = 'margin:0;font-size:18px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#1a1a1a;';

                const desc = document.createElement('p');
                desc.textContent = 'Você já usou suas 3 provas grátis de hoje. Volte amanhã pra experimentar mais óculos.';
                desc.style.cssText = 'margin:0;font-size:14px;color:#666;letter-spacing:0.3px;line-height:1.6;max-width:320px;';

                const btn = document.createElement('button');
                btn.className = 'q-btn-outline';
                btn.textContent = 'Voltar ao Produto';
                btn.style.cssText = 'margin-top:12px;min-width:200px;';
                btn.addEventListener('click', () => closeModal());

                msg.appendChild(icon);
                msg.appendChild(title);
                msg.appendChild(desc);
                msg.appendChild(btn);

                const card = document.querySelector('.q-card-ia .q-content-scroll') || document.querySelector('.q-card-ia') || document.body;
                card.appendChild(msg);
            }
            msg.style.display = 'flex';
        }

        function hidePixScreen() {
            stopPixPolling();
            document.getElementById('q-step-pix').style.display = 'none';
        }

        // ── Reaproveitamento de PIX pendente ──
        // Evita criar um novo QR a cada abertura do modal: se há PIX pendente do
        // mesmo telefone gerado há menos de 25min, reaproveita e continua polando.
        const _PIX_LS_KEY = 'pl_pix_pending_v1';
        const _PIX_TTL_MS = 25 * 60 * 1000; // 25 min (PIX MP expira em 30min)
        function _pixLoadPending(phone) {
            try {
                const raw = localStorage.getItem(_PIX_LS_KEY);
                if (!raw) return null;
                const arr = JSON.parse(raw);
                const now = Date.now();
                const valid = arr.filter(p => p.phone === phone && (now - p.ts) < _PIX_TTL_MS);
                return valid[0] || null;
            } catch(_) { return null; }
        }
        function _pixSavePending(phone, payment_id, qr_code, qr_code_base64) {
            try {
                const raw = localStorage.getItem(_PIX_LS_KEY);
                let arr = [];
                try { arr = raw ? JSON.parse(raw) : []; } catch(_) {}
                // Limpa expirados
                const now = Date.now();
                arr = arr.filter(p => (now - p.ts) < _PIX_TTL_MS && p.phone !== phone);
                arr.push({ phone, payment_id, qr_code, qr_code_base64, ts: now });
                localStorage.setItem(_PIX_LS_KEY, JSON.stringify(arr));
            } catch(_) {}
        }
        function _pixClearPending(phone) {
            try {
                const raw = localStorage.getItem(_PIX_LS_KEY);
                if (!raw) return;
                let arr = JSON.parse(raw);
                arr = arr.filter(p => p.phone !== phone);
                localStorage.setItem(_PIX_LS_KEY, JSON.stringify(arr));
            } catch(_) {}
        }

        async function createPixAndPoll() {
            /* PIX_DESATIVADO: prova extra via PIX removida - mostra so mensagem de volte amanha. */
            try {
                var _ph = document.getElementById('q-step-photo'); if (_ph) _ph.style.display = 'none';
                var _lb = document.getElementById('q-loading-box'); if (_lb) _lb.style.display = 'none';
                var _pix = document.getElementById('q-step-pix');
                if (_pix) { _pix.style.display = 'block'; _pix.innerHTML = '<h2>Limite de hoje atingido</h2><p class="q-pix-subtitle" style="text-align:center;">Voc&ecirc; j&aacute; usou suas provas de hoje.<br>Volte amanh&atilde; para experimentar mais &oacute;culos! &#128522;</p>'; }
            } catch (e) {}
            return;
            showPixScreen();
            const phone = '55' + phoneInput.value.replace(/\D/g, '');
            try {
                let pix;
                const pending = _pixLoadPending(phone);
                if (pending) {
                    // Reaproveita PIX pendente
                    pix = { payment_id: pending.payment_id, qr_code: pending.qr_code, qr_code_base64: pending.qr_code_base64 };
                } else {
                    const resp = await fetch(WEBHOOK_PIX, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: 'cliente@provoulevou.com.br', phone, loja: 'maxilook', origin: location.origin })
                    });
                    pix = await resp.json();
                    if (!pix.payment_id || !pix.qr_code) throw new Error('PIX inválido');
                    _pixSavePending(phone, pix.payment_id, pix.qr_code, pix.qr_code_base64);
                }

                document.getElementById('q-pix-qr-img').src = 'data:image/png;base64,' + pix.qr_code_base64;
                document.getElementById('q-pix-code').value = pix.qr_code;

                // Polling a cada 3s por até 5min
                let attempts = 0;
                pixPollingTimer = setInterval(async () => {
                    attempts++;
                    if (attempts > 100) { stopPixPolling(); return; }
                    try {
                        const sr = await fetch(WEBHOOK_PIX_STATUS + '?payment_id=' + pix.payment_id);
                        const st = await sr.json();
                        if (st.status === 'approved') {
                            stopPixPolling();
                            _pixClearPending(phone);
                            document.getElementById('q-pix-status-msg').textContent = 'Pagamento confirmado!';
                            document.getElementById('q-pix-status-msg').className = 'q-pix-status q-pix-approved';
                            setTimeout(() => {
                                hidePixScreen();
                                pixPaymentId = pix.payment_id;
                                runGeneration();
                            }, 1200);
                        }
                    } catch (_) {}
                }, 3000);
            } catch (e) {
                hidePixScreen();
                uploadStep.style.display = 'block';
                showError();
            }
        }

        // Botão copiar PIX
        document.getElementById('q-pix-copy-btn').onclick = () => {
            const code = document.getElementById('q-pix-code').value;
            navigator.clipboard.writeText(code).then(() => {
                document.getElementById('q-pix-copy-btn').textContent = 'Copiado!';
                setTimeout(() => { document.getElementById('q-pix-copy-btn').textContent = 'Copiar'; }, 2000);
            });
        };

        // Botão cancelar PIX
        document.getElementById('q-pix-cancel').onclick = () => {
            hidePixScreen();
            uploadStep.style.display = 'block';
        };

        // ── GERAÇÃO PRINCIPAL ──
        async function runGeneration() {

            if (runGeneration._busy) return;

            runGeneration._busy = true;

            try {
                const keyToUse = window.PROVOU_LEVOU_API_KEY;
                if (!keyToUse || keyToUse.includes("COLOQUE_A_CHAVE_AQUI")) {
                    showError();
                    return;
                }

                const prodImg = selectedProductImgUrl || (document.querySelector('meta[property="og:image"]')?.content || '');
                const prodName = document.querySelector('h1.product__title,.product-single__title,h1')?.innerText || document.title;

                uploadStep.style.display = 'none';
                document.getElementById('q-loading-box').style.display = 'flex';
                startLoadingProgress();

                try {
                    // Guard: re-valida telefone antes de submeter (evita whatsapp vazio)
                    const _finalNums = (phoneInput.value || '').replace(/\D/g, '');
                    if (typeof isValidBRPhone === 'function' && !isValidBRPhone(_finalNums)) {
                        try { document.getElementById('q-loading-box').style.display = 'none'; } catch(_) {}
                        try { uploadStep.style.display = 'block'; } catch(_) {}
                        try { genBtn.disabled = false; } catch(_) {}
                        try { phoneInput.focus(); } catch(_) {}
                        return;
                    }
const fd = new FormData();
                    fd.append('person_image', await toJpeg(userPhoto), 'person.jpg');
                    fd.append('whatsapp', '55' + phoneInput.value.replace(/\D/g, ''));
                    fd.append('phone_raw', phoneInput.value);
                    fd.append('product_name', prodName);
                    fd.append('product_url', window.location.href);
                    fd.append('product_type', currentProduct.category);
                    fd.append('product_fit', currentProduct.fit);
                    fd.append('api_key', keyToUse);
                    if (pixPaymentId) fd.append('pix_payment_id', pixPaymentId);

                    if (currentProduct.category === 'top') {
                        fd.append('height', '');
                        fd.append('weight', '');
                    } else {
                        fd.append('height', '');
                        fd.append('weight', '');
                        fd.append('cintura', '');
                        fd.append('quadril', '');
                    }

                    // Coleta até 4 fotos do produto: 1ª como binary (compat), 2ª-4ª como base64 text.
                    // 1ª = prodImg (escolhida pelo cliente ou default); demais = extractImages() exceto a 1ª.
                    let allProdImgs = [];
                    if (prodImg) allProdImgs.push(prodImg);
                    try {
                        if (typeof extractImages === 'function') {
                            const extra = extractImages();
                            for (const u of extra) {
                                const cleanU = String(u || '').split('?')[0];
                                if (!allProdImgs.some(p => String(p).split('?')[0] === cleanU)) {
                                    allProdImgs.push(u);
                                }
                            }
                        }
                    } catch (_) {}
                    // Detecção de rosto: manda 1 foto no rosto como PRINCIPAL (o gerador usa pra
                    // calibrar a proporção/tamanho do óculos) + as fotos de fundo branco (packshot),
                    // que mostram os detalhes da armação. Assim garante proporção E detalhe.
                    // Sem rosto detectado → mantém as fotos default (fallback, sem regressão).
                    try {
                        if (faceDetectPromise) { await Promise.race([faceDetectPromise, new Promise(function (r) { setTimeout(r, 4000); })]); }
                        if (_faceUrls && _faceUrls.length) {
                            var _key = function (u) { return String(u || '').split('?')[0]; };
                            var _faceKeys = {};
                            _faceUrls.forEach(function (u) { _faceKeys[_key(u)] = 1; });
                            var _packshots = allProdImgs.filter(function (u) { return !_faceKeys[_key(u)]; });
                            var _mix = [];
                            var _add = function (u) { if (u && !_mix.some(function (x) { return _key(x) === _key(u); })) _mix.push(u); };
                            _add(_faceUrls[0]);
                            _packshots.forEach(_add);
                            _faceUrls.slice(1).forEach(_add);
                            allProdImgs.forEach(_add);
                            allProdImgs = _mix;
                        }
                    } catch (e) {}
                    allProdImgs = allProdImgs.slice(0, 4);
                    console.log('[PL Maxilook] Enviando', allProdImgs.length, 'fotos do produto');
                    let _primaryDone = false, _slot = 1;
                    for (let _pi = 0; _pi < allProdImgs.length; _pi++) {
                        try {
                            const _b = await fetch(allProdImgs[_pi]).then(r => r.blob());
                            if (!_b || !/^image\//i.test(_b.type)) continue; // pula HTML/nao-imagem -> evita 400 do gerador (ALTA DEMANDA)
                            if (!_primaryDone) {
                                fd.append('product_image', _b, 'product.jpg'); _primaryDone = true;
                            } else {
                                _slot++;
                                const _b64 = await new Promise((resolve, reject) => {
                                    const _r = new FileReader();
                                    _r.onloadend = () => resolve(_r.result.split(',')[1]);
                                    _r.onerror = reject;
                                    _r.readAsDataURL(_b);
                                });
                                fd.append('product_image_' + _slot + '_b64', _b64);
                            }
                        } catch (_) { }
                    }

                    calculateFinalSize();

                    const res = await fetch(WEBHOOK_PROVA, { method: 'POST', body: fd });

                    const contentType = res.headers.get("content-type") || "";
                    if (contentType.includes("application/json")) {
                        const data = await res.json();
                        if (data.error) {
                            document.getElementById('q-loading-box').style.display = 'none';
                            photoStep.style.display = 'flex';
                            if (data.error === "Chave invalida, vencida ou inativa." || data.error.includes("vencida ou inativa")) {
                                showError();
                            } else {
                                alert(data.error);
                            }
                            return;
                        }
                    }

                    if (res.ok) {
                        const blob = await res.blob();
                        document.getElementById('q-loading-box').style.display = 'none';
                        document.getElementById('q-final-view-img').src = URL.createObjectURL(blob);
                        document.querySelector('.q-card-ia').classList.add('is-result');
                        plTrackProved((document.getElementById('q-phone') || document.getElementById('mc-phone') || document.querySelector('input[type=tel]') || {}).value);
                        document.getElementById('q-step-result').style.display = 'flex';
                        populateBuyCta();
                        if (typeof _checkProvasRestantes === 'function') _checkProvasRestantes();
                    } else if (res.status === 401 || res.status === 403) {
                        document.getElementById('q-loading-box').style.display = 'none';
                        photoStep.style.display = 'flex';
                        showError();
                    } else { throw new Error(); }
                } catch (e) {
                    document.getElementById('q-loading-box').style.display = 'none';
                    photoStep.style.display = 'flex';
                    showError();
                }
        

            } finally {

                runGeneration._busy = false;

            }
        }

        

        genBtn.onclick = async () => {
            // Validação agressiva (UI feedback)
            var _vNums = (phoneInput.value || '').replace(/\D/g, '');
            var _vPhoneOk = isValidBRPhone(_vNums);
            var _vFaceFrame = document.getElementById('q-face-frame');
            var _vTerms = document.getElementById('q-accept-terms');
            if (!_vPhoneOk) { flashError(phoneInput, 'Preencha seu WhatsApp para continuar'); return; }
            if (!userPhoto) { flashError(_vFaceFrame, 'Envie ou tire sua foto para continuar'); return; }
            if (_vTerms && !_vTerms.checked) { flashError(document.querySelector('.q-terms-row'), 'Aceite os termos para continuar'); return; }
            var _vHint = document.getElementById('q-validation-hint');
            if (_vHint) _vHint.classList.remove('is-visible');
            phoneInput.classList.remove('is-error');
            if (_vFaceFrame) _vFaceFrame.classList.remove('is-error');

            if (!userPhoto) return;
            const _gNums = (phoneInput.value || '').replace(/\D/g, '');
            const _gPhoneOk = (_gNums.length === 10 || _gNums.length === 11) && /^[1-9][1-9]/.test(_gNums) && (_gNums.length === 10 || _gNums[2] === '9');
            if (!_gPhoneOk) { phoneInput.focus(); return; }

            const phone = '55' + phoneInput.value.replace(/\D/g, '');
            genBtn.disabled = true;

            // Feedback imediato: mostra a animacao na hora; o check de limite roda enquanto ela ja aparece.
            try { uploadStep.style.display = 'none'; } catch (_) {}
            try { document.getElementById('q-loading-box').style.display = 'flex';
 startLoadingProgress(); } catch (_) {}


            try {
                const resp = await fetch(WEBHOOK_CHECK_LIMIT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ phone })
                });
                const data = await resp.json();
                if (data.limited) {
            try { document.getElementById('q-loading-box').style.display = 'none'; } catch (_) {}
                    genBtn.disabled = false;
                    showDailyLimitReached();
                    return;
                }
            } catch (_) {
                // se o check falhar, deixa gerar (evita bloquear por erro de rede)
            }

            genBtn.disabled = false;
            runGeneration();
        };
    }

    // ─── EXECUTA APENAS EM PÁGINAS DE PRODUTO ────────────────────────────────────
    const isProductPage = window.location.pathname.includes('/products/') || window.location.pathname.includes('/product/') || window.location.pathname.includes('/produtos/') || window.location.pathname.includes('/produto/') || window.location.pathname.includes('/p/') || window.location.pathname.includes('preview.html') || document.querySelector('meta[property="og:type"][content="product"]');

    if (isProductPage) {
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
        else init();
    }

})();

/* ================= ESCOLHER LENTES (engine + controlador) ================= */
/* ==========================================================================
   ESCOLHER LENTES — regras da ótica + catálogo real da loja

   As REGRAS são da Maxilook. Cada faixa diz que grau o laboratório atende
   pronto e quais lentes servem, por tratamento escolhido.

   ORDEM IMPORTA: vale a PRIMEIRA faixa em que o grau couber (esférico E
   cilíndrico). Por isso as faixas vão da mais barata/comum para a mais
   especial — quem cabe na 1.56 não paga policarbonato nem 1.67.

     #  faixa               esférico          cilíndrico   material
     1  padrão              -4,00 a +4,00     até 2,00     resina 1.56
     2  astigmatismo        -4,00 a +4,00     até 4,00     resina p/ astig.
     3  policarbonato       -5,00 a +5,00     até 2,00     policarbonato 1.59
     4  poli astigmatismo   -5,00 a +5,00     até 4,00     poli p/ astig.
     5  finas               -8,00 a +6,00     até 2,00     resina 1.67
     6  super finas        -12,00 a +6,00     até 2,00     resina 1.74
     7  multifocal          -4,00 a +4,00     até 4,00     multifocal 1.49

   A faixa 7 so vale para visao 'multifocal'; as outras, para 'simples'.

   ATENÇÃO: as faixas 5 e 6 são ASSIMÉTRICAS (vão mais fundo no negativo que
   no positivo), por isso o limite é com sinal — não dá para usar módulo.

   Fora de todas, ou tratamento que não existe na faixa:
   não indicamos. A ótica monta sob medida e chama no WhatsApp.
   Melhor não vender do que vender errado.

   Preço, foto e variantId vêm da API da Nuvemshop (gera_lentes.py).
   Loja: Ótica Maxilook (7085367) · catálogo de 18/07/2026
   ========================================================================== */

const LENTES = [
  { id: '314902021', variantId: '1394843279', preco: 99.00, visao: 'simples', astig: false, blue: false, foto: false, ar: false, material: 'Resina 1.49',
    nome: "Par de Lentes Básicas Monofocais 1.49 Simples",
    img: 'https://acdn-us.mitiendanube.com/stores/007/085/367/products/b8720750ff397acab175f66ac1ec099d-ac6fa6b1f930a426ad17665862938442-1024-1024.png' },
  { id: '314902025', variantId: '1394843293', preco: 129.00, visao: 'simples', astig: false, blue: false, foto: false, ar: false, material: 'Policarbonato 1.59',
    nome: "Par de Lentes Monofocais Policarbonato 1.59 Incolor",
    img: 'https://acdn-us.mitiendanube.com/stores/007/085/367/products/82e4eaaf994f0739da9fb920f4b9488c-76324b8fcb97f508c917665862962082-1024-1024.png' },
  { id: '316444407', variantId: '1402072714', preco: 129.00, visao: 'simples', astig: false, blue: false, foto: false, ar: true, material: 'Resina',
    nome: "Par de Lentes Monofocais com Antirreflexo",
    img: 'https://acdn-us.mitiendanube.com/stores/007/085/367/products/lentes-3bd8157aaf4b7b7e6517677169905182-1024-1024.png' },
  { id: '314902019', variantId: '1394843261', preco: 199.00, visao: 'simples', astig: false, blue: true, foto: false, ar: true, material: 'Resina',
    nome: "Par de Lentes Monofocais com Antirreflexo e Filtro de Luz Azul",
    img: 'https://acdn-us.mitiendanube.com/stores/007/085/367/products/a582a00d3cea56eb6681744f5df73075-a9b0745ce3fbdac06317665862911781-1024-1024.png' },
  { id: '337827069', variantId: '1501636642', preco: 199.00, visao: 'simples', astig: true, blue: false, foto: false, ar: true, material: 'Resina',
    nome: "Par de Lentes Monofocais com Antirreflexo Para Astigmatismo",
    img: 'https://acdn-us.mitiendanube.com/stores/007/085/367/products/lentes-37e3ff589a4cc7932817765306975313-1024-1024.png' },
  { id: '314902090', variantId: '1394843592', preco: 229.00, visao: 'simples', astig: false, blue: false, foto: false, ar: true, material: 'Policarbonato 1.59',
    nome: "Par de Lentes Monofocais Policarbonato 1.59 com Antirreflexo",
    img: 'https://acdn-us.mitiendanube.com/stores/007/085/367/products/88e4fb851dcf0220d5364effe678a109-14d23cdb36d1d19d4517665863352021-1024-1024.png' },
  { id: '332987251', variantId: '1481022455', preco: 249.00, visao: 'simples', astig: false, blue: false, foto: true, ar: true, material: 'Resina',
    nome: "Par de Lentes Monofocais Fotocromáticas com Antirreflexo",
    img: 'https://acdn-us.mitiendanube.com/stores/007/085/367/products/lentes-85578699c51593636f17740368397056-1024-1024.png' },
  { id: '314902030', variantId: '1394843312', preco: 269.00, visao: 'simples', astig: false, blue: true, foto: false, ar: true, material: 'Policarbonato 1.59',
    nome: "Par de Lentes Monofocais Policarbonato 1.59 com Antirreflexo + Anti Blue",
    img: 'https://acdn-us.mitiendanube.com/stores/007/085/367/products/7a598bb30d8f2c69255ac008f4361a42-939c63a6b1cf03d55317665862987033-1024-1024.png' },
  { id: '339014487', variantId: '1506792037', preco: 279.00, visao: 'simples', astig: true, blue: true, foto: false, ar: true, material: 'Resina',
    nome: "Par de Lentes Monofocais Anti Blue com Antirreflexo Para Astigmatismo",
    img: 'https://acdn-us.mitiendanube.com/stores/007/085/367/products/lentes-ef3e75b613513ec7e017765406647142-1024-1024.png' },
  { id: '339016108', variantId: '1506796380', preco: 279.00, visao: 'simples', astig: false, blue: false, foto: false, ar: false, material: 'Resina 1.49',
    nome: "Par de Lentes Monofocais 1.49 com Coloração",
    img: 'https://acdn-us.mitiendanube.com/stores/007/085/367/products/b8720750ff397acab175f66ac1ec099d-db1799dd1e0c85ac9b17765412817028-1024-1024.png' },
  { id: '314902055', variantId: '1394843394', preco: 359.00, visao: 'multifocal', astig: false, blue: false, foto: false, ar: false, material: 'Resina 1.49',
    nome: "Par de Lentes Básicas Multifocais 1.49 Básicas",
    img: 'https://acdn-us.mitiendanube.com/stores/007/085/367/products/598edcb5f934d82024fe88f6cb716dec-b109146f1408e0f37417665863115205-1024-1024.png' },
  { id: '339012891', variantId: '1506789048', preco: 379.00, visao: 'simples', astig: true, blue: false, foto: false, ar: true, material: 'Policarbonato',
    nome: "Par de Lentes Monofocais em Policarbonato com Antirreflexo Para Astigmatismo",
    img: 'https://acdn-us.mitiendanube.com/stores/007/085/367/products/lentes-75774b6ca49d7ae64317765402503463-1024-1024.png' },
  { id: '314902058', variantId: '1394843416', preco: 429.00, visao: 'multifocal', astig: false, blue: false, foto: false, ar: true, material: 'Resina',
    nome: "Par de Lentes Multifocais com Antirreflexo",
    img: 'https://acdn-us.mitiendanube.com/stores/007/085/367/products/7347a339b4fb1bb1ae9eea52598fbd9d-ba7d27f7650e1391be17665863141874-1024-1024.png' },
  { id: '339075492', variantId: '1506994245', preco: 459.00, visao: 'simples', astig: false, blue: true, foto: true, ar: true, material: 'Resina',
    nome: "Par de Lentes Monofocais Fotocromáticas Anti Blue com Antirreflexo",
    img: 'https://acdn-us.mitiendanube.com/stores/007/085/367/products/lentes-6c1c35ad074dedfd0417766075290673-1024-1024.png' },
  { id: '314902033', variantId: '1394843333', preco: 499.00, visao: 'simples', astig: false, blue: false, foto: false, ar: true, material: 'Resina 1.67',
    nome: "Par de Lentes Monofocais Finas 1.67 com Antirreflexo",
    img: 'https://acdn-us.mitiendanube.com/stores/007/085/367/products/c6acbfb4202858febf09c4f1564dd3f3-57f25ec4f2894d49dc17665863011590-1024-1024.png' },
  { id: '339013853', variantId: '1506790764', preco: 499.00, visao: 'simples', astig: true, blue: true, foto: false, ar: true, material: 'Policarbonato',
    nome: "Par de Lentes Monofocais em Policarbonato Anti Blue com Antirreflexo Para Astigmatismo",
    img: 'https://acdn-us.mitiendanube.com/stores/007/085/367/products/lentes-59cba298e5b7cbaadc17765404984171-1024-1024.png' },
  { id: '314902038', variantId: '1394843351', preco: 599.00, visao: 'simples', astig: false, blue: true, foto: false, ar: true, material: 'Resina 1.67',
    nome: "Par de Lentes Monofocais Finas 1.67 com Antirreflexo + Anti Blue",
    img: 'https://acdn-us.mitiendanube.com/stores/007/085/367/products/bffc1487950bd438b6c159acd7281ae5-c2cb963d16918e178c17665863035746-1024-1024.png' },
  { id: '314902067', variantId: '1394843443', preco: 599.00, visao: 'multifocal', astig: false, blue: true, foto: false, ar: true, material: 'Resina',
    nome: "Par de Lentes Multifocais com Antirreflexo e Filtro de Luz Azul",
    img: 'https://acdn-us.mitiendanube.com/stores/007/085/367/products/926c5f17668b9f4529d95fa8010e0918-d2f717fc83813a9d5e17665863166633-1024-1024.png' },
  { id: '332085529', variantId: '1477754416', preco: 599.00, visao: 'simples', astig: false, blue: true, foto: true, ar: true, material: 'Policarbonato 1.59',
    nome: "Par de Lentes Monofocais Policarbonato 1.59 Fotossensível com Antirreflexo + Anti Blue",
    img: 'https://acdn-us.mitiendanube.com/stores/007/085/367/products/lentes-9dfb2e7042f2989a6017737642894358-1024-1024.png' },
  { id: '314902042', variantId: '1394843363', preco: 999.00, visao: 'simples', astig: false, blue: false, foto: false, ar: true, material: 'Resina 1.74',
    nome: "Par de Lentes Monofocais Super Finas 1.74 com Antirreflexo",
    img: 'https://acdn-us.mitiendanube.com/stores/007/085/367/products/d73ba502a7c113c71cbf003cdf2c9beb-bb3bb10e4dcc1e3a1c17665863062169-1024-1024.png' },
  { id: '314902045', variantId: '1394843373', preco: 1399.00, visao: 'simples', astig: false, blue: true, foto: false, ar: true, material: 'Resina 1.74',
    nome: "Par de Lentes Monofocais Super Finas 1.74 com Antirreflexo + Anti Blue",
    img: 'https://acdn-us.mitiendanube.com/stores/007/085/367/products/b2469a1ba286035bdb983625ed0c6a28-7594fd160dcc83d13917665863090289-1024-1024.png' },
];

const FAIXAS = [
  {
    nome: 'padrão', material: 'resina 1.56',
    visao: 'simples',
    esfMin: -4.00, esfMax: 4.00, cilMax: 2.00,
    lentes: {
      nenhum:             '314902021',  // Básicas 1.49 Simples              R$ 99
      antirreflexo:       '316444407',  // Básicas 1.56 c/ AR                R$ 129
      blue:               '314902019',  // Básicas 1.56 AR + Anti Blue       R$ 199
      fotocromatica:      '332987251',  // Fotocromáticas c/ AR              R$ 249
      fotocromatica_blue: '339075492',  // Fotocromáticas Anti Blue c/ AR    R$ 459
    }
  },
  {
    nome: 'astigmatismo', material: 'resina para astigmatismo',
    visao: 'simples',
    esfMin: -4.00, esfMax: 4.00, cilMax: 4.00,
    lentes: {
      antirreflexo:       '337827069',  // AR Para Astigmatismo              R$ 199
      blue:               '339014487',  // Anti Blue AR Para Astigmatismo    R$ 279
    }
  },
  {
    nome: 'policarbonato', material: 'policarbonato 1.59',
    visao: 'simples',
    esfMin: -5.00, esfMax: 5.00, cilMax: 2.00,
    lentes: {
      nenhum:             '314902025',  // Poli 1.59 Incolor                 R$ 129
      antirreflexo:       '314902090',  // Poli 1.59 c/ AR                   R$ 229
      blue:               '314902030',  // Poli 1.59 AR + Anti Blue          R$ 269
      fotocromatica_blue: '332085529',  // Poli 1.59 Fotossensível AR+Blue   R$ 599
    }
  },
  {
    nome: 'policarbonato astigmatismo', material: 'policarbonato para astigmatismo',
    visao: 'simples',
    esfMin: -5.00, esfMax: 5.00, cilMax: 4.00,
    lentes: {
      antirreflexo: '339012891',  // Poli c/ AR Para Astigmatismo            R$ 379
      blue:         '339013853',  // Poli Anti Blue AR Para Astigmatismo     R$ 499
    }
  },
  {
    nome: 'finas', material: 'resina 1.67',
    visao: 'simples',
    esfMin: -8.00, esfMax: 6.00, cilMax: 2.00,
    lentes: {
      antirreflexo: '314902033',  // Finas 1.67 c/ AR                        R$ 499
      blue:         '314902038',  // Finas 1.67 AR + Anti Blue               R$ 599
    }
  },
  {
    nome: 'super finas', material: 'resina 1.74',
    visao: 'simples',
    esfMin: -12.00, esfMax: 6.00, cilMax: 2.00,
    lentes: {
      antirreflexo: '314902042',  // Super Finas 1.74 c/ AR                  R$ 999
      blue:         '314902045',  // Super Finas 1.74 AR + Anti Blue         R$ 1399
    }
  },
  {
    nome: 'multifocal', material: 'multifocal 1.49',
    visao: 'multifocal',
    esfMin: -4.00, esfMax: 4.00, cilMax: 4.00,
    lentes: {
      nenhum:       '314902055',  // Básicas Multifocais 1.49               R$ 359
      antirreflexo: '314902058',  // Multifocais c/ Antirreflexo            R$ 429
      blue:         '314902067',  // Multifocais AR + Filtro de Luz Azul    R$ 599
      // fotocromática multifocal nao existe no catalogo
      // a Basica 1.49 (R$ 359) fica de fora: nao tem antirreflexo
    }
  },
];

/* --------------------------------------------------------------------------
   A receita serve para UMA coisa: achar a faixa. Não escolhemos material,
   índice nem espessura — isso é do laboratório.
-------------------------------------------------------------------------- */

/** Pior olho: maior módulo, PRESERVANDO o sinal (as faixas são assimétricas). */
function piorOlho(a, b) { return Math.abs(a) >= Math.abs(b) ? a : b; }

/** Esférico com sinal, cilíndrico em módulo. Sem receita = zerado. */
function grau(receita) {
  if (!receita) return { esf: 0, cil: 0 };
  return {
    esf: piorOlho(Number(receita.odEsf) || 0, Number(receita.oeEsf) || 0),
    cil: Math.max(Math.abs(Number(receita.odCil) || 0), Math.abs(Number(receita.oeCil) || 0))
  };
}

const cabe = (g, f, visao) =>
  f.visao === visao && g.esf >= f.esfMin && g.esf <= f.esfMax && g.cil <= f.cilMax;

/**
 * @param {{visao:string, trat:string, receita:object|null}} e
 * @returns {{lente, porque, temAstig, faixa}}                      indicação
 *        | {fora:'multifocal'|'esferico'|'cilindrico'|'tratamento'}  → ótica
 */
function recomendar(e) {
  // "Sem grau" (descanso) usa as faixas de monofocal.
  const visao = e.visao === 'descanso' ? 'simples' : e.visao;
  const g = grau(e.receita);

  // Primeira faixa da mesma visao que couber no esférico E no cilíndrico.
  const doTipo = FAIXAS.filter(f => f.visao === visao);
  const faixa = doTipo.find(f => cabe(g, f, visao));
  if (!faixa) {
    // Explica qual dos dois estourou: se alguma faixa aceita esse esférico,
    // então quem está fora é o cilíndrico.
    const esfOk = doTipo.some(f => g.esf >= f.esfMin && g.esf <= f.esfMax);
    return esfOk ? { fora: 'cilindrico', valor: g.cil }
                 : { fora: 'esferico', valor: g.esf };
  }

  const id = faixa.lentes[e.trat];
  // O tratamento pode não existir na faixa (ex.: fotocromática com
  // astigmatismo alto). É falta de produto pronto, não grau fora.
  if (!id) return { fora: 'tratamento', faixa: faixa.nome };

  const lente = LENTES.find(l => l.id === id);
  if (!lente) return { fora: 'sem_produto' };

  return { lente, temAstig: g.cil > 0, faixa: faixa.nome, porque: porque(e.trat, g) };
}

/** Explica com base na escolha e no grau — sem prometer o que é da ótica. */
function porque(trat, g) {
  const p = [];
  if (trat === 'fotocromatica' || trat === 'fotocromatica_blue')
    p.push('escurece no sol e clareia dentro de casa');
  else if (trat === 'nenhum') p.push('sem tratamento, a opção mais em conta');
  else p.push('com antirreflexo');
  if (trat === 'blue' || trat === 'fotocromatica_blue')
    p.push('filtra a luz azul das telas');
  if (g.cil > 0) p.push('e corrige o seu astigmatismo');
  return 'Seu grau está na faixa que a gente monta pronto. Esta lente vem '
       + p.join(', ') + '.';
}

if (typeof window !== 'undefined') {
  window.LENTES = LENTES; window.FAIXAS = FAIXAS; window.recomendar = recomendar;
}
if (typeof module !== 'undefined') {
  module.exports = { LENTES, FAIXAS, recomendar, grau };
}

/* =====================================================================
   ESCOLHER LENTES — controlador de PRODUCAO (injetado no widget-maxilook.js)
   Aditivo: nao toca no provador existente. Aparece como um botao a mais
   na tela de resultado. Rastreia cada passo em pl-lentes-step.

   PILOTO (order bump do Cashing ainda ligado): o botao final adiciona
   SO A ARMACAO (mesmo POST /comprar/ do widget). A lente recomendada e
   registrada, mas nao vai pro carrinho ainda — senao dobraria com o bump.
   Quando a Jam desligar o bump, troca FASE_CARRINHO_LENTE para true.
   ===================================================================== */
(function () {
    if (window.__PL_LENTES_LOADED__) return;
    window.__PL_LENTES_LOADED__ = true;

    var FASE_CARRINHO_LENTE = true;    // o order bump nao auto-adiciona (testado) -> pode add a lente
    var WEBHOOK_RECEITA = 'https://n8n.segredosdodrop.com/webhook/pl-ler-receita';
    var WEBHOOK_STEP = 'https://n8n.segredosdodrop.com/webhook/pl-lentes-step';

    var $ = function (s) { return document.querySelector(s); };
    var $$ = function (s) { return [].slice.call(document.querySelectorAll(s)); };
    var brl = function (v) { return 'R$ ' + Number(v).toFixed(2).replace('.', ','); };

    var st = { visao: null, trat: null, receita: null, lente: null, ultimo: 'abriu' };

    /* ---------- rastreamento (fire-and-forget) ---------- */
    function plSid() {
        try {
            var s = localStorage.getItem('pl_sid');
            if (!s) { s = 's' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10); localStorage.setItem('pl_sid', s); }
            return s;
        } catch (e) { return 'nostore'; }
    }
    function track(step, detail) {
        st.ultimo = step;
        try {
            var tel = (document.getElementById('q-phone') || {}).value || '';
            var prod = (document.getElementById('q-result-prodname') || {}).textContent
                || (document.querySelector('h1.product-title,h1.product-detail-info-name,h1') || {}).innerText
                || document.title || '';
            fetch(WEBHOOK_STEP, {
                method: 'POST', keepalive: true, headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    session_id: plSid(), origin: location.origin, telefone: tel,
                    step: step, produto: (prod || '').trim().slice(0, 180), detail: detail || {}
                })
            }).catch(function () { });
        } catch (e) { }
    }

    /* ---------- armacao (lida da tela de resultado real) ---------- */
    function armacao() {
        var nome = (document.getElementById('q-result-prodname') || {}).textContent
            || (document.querySelector('h1.product-title,h1.product-detail-info-name,h1') || {}).innerText || 'Armação';
        var precoTxt = (document.getElementById('q-result-prodprice') || {}).textContent || '';
        var m = precoTxt.match(/[\d.,]+/);
        var preco = m ? Number(m[0].replace(/\./g, '').replace(',', '.')) : 0;
        return { nome: (nome || '').trim(), preco: preco };
    }

    /* ---------- navegacao entre telas do fluxo ---------- */
    var TELAS = ['q-step-lentes', 'q-step-receita', 'q-step-upload', 'q-step-lente-final'];
    function ir(id) {
        // esconde as telas do fluxo E a tela de resultado do provador
        TELAS.forEach(function (t) { var el = document.getElementById(t); if (el) el.style.display = 'none'; });
        var res = document.getElementById('q-step-result'); if (res) res.style.display = 'none';
        var alvo = document.getElementById(id);
        if (alvo) alvo.style.display = 'flex';
        var sc = $('.q-content-scroll'); if (sc) sc.scrollTop = 0;
    }
    function voltarResultado() {
        TELAS.forEach(function (t) { var el = document.getElementById(t); if (el) el.style.display = 'none'; });
        var res = document.getElementById('q-step-result'); if (res) res.style.display = 'flex';
    }

    /* ---------- selects da receita ---------- */
    function faixa(de, ate, passo) {
        var o = ['<option value="">—</option>'];
        for (var v = de; v <= ate + 0.001; v += passo) {
            var s = (v > 0 ? '+' : '') + v.toFixed(2).replace('.', ',');
            o.push('<option value="' + v.toFixed(2) + '">' + s + '</option>');
        }
        return o.join('');
    }
    function popular() {
        $$('[data-r$="Esf"]').forEach(function (s) { s.innerHTML = faixa(-12, 7, 0.25); });
        $$('[data-r$="Cil"]').forEach(function (s) { s.innerHTML = faixa(-6, 0, 0.25); s.value = '0.00'; });
        $$('[data-r="odEixo"],[data-r="oeEixo"]').forEach(function (s) {
            var o = ['<option value="">—</option>'];
            for (var v = 0; v <= 180; v++) o.push('<option value="' + v + '">' + v + '°</option>');
            s.innerHTML = o.join('');
        });
        var ad = $('[data-r="adicao"]'); if (ad) ad.innerHTML = faixa(0.75, 3.50, 0.25);
    }
    function mostrarAdicao() { var b = $('#q-bloco-adicao'); if (b) b.hidden = (st.visao !== 'multifocal'); }
    function limparReceita() { $$('[data-r]').forEach(function (s) { s.value = /Cil$/.test(s.dataset.r) ? '0.00' : ''; }); }
    function avisar(msg) { var el = $('#q-aviso-campo'); el.textContent = msg; el.hidden = false; el.scrollIntoView({ block: 'nearest' }); }

    function lerCampos() {
        var g = function (k) { var el = $('[data-r="' + k + '"]'); return el && el.value !== '' ? Number(el.value) : null; };
        var r = { odEsf: g('odEsf'), odCil: g('odCil'), odEixo: g('odEixo'), oeEsf: g('oeEsf'), oeCil: g('oeCil'), oeEixo: g('oeEixo') };
        if (r.odEsf === null || r.oeEsf === null) return { falta: 'esferico' };
        r.odCil = r.odCil || 0; r.oeCil = r.oeCil || 0;
        if (st.visao === 'multifocal') { r.adicao = g('adicao'); if (r.adicao === null) return { falta: 'adicao' }; }
        return { receita: r };
    }

    var TRAT_LABEL = { antirreflexo: 'Antirreflexo', blue: 'Antirreflexo + luz azul', fotocromatica: 'Fotocromática', fotocromatica_blue: 'Fotocromática + luz azul', nenhum: 'Sem tratamento' };
    var MOTIVO = {
        multifocal: 'Lente multifocal a gente monta sob medida pra cada pessoa.',
        esferico: 'Seu grau está acima do que deixamos pronto no site.',
        cilindrico: 'Seu astigmatismo está acima do que deixamos pronto no site.',
        tratamento: 'Esse tratamento a gente não deixa pronto pro seu grau.',
        sem_produto: 'Essa combinação a gente monta sob medida.'
    };

    function resumoDoGrau() {
        var r = st.receita; if (!r) return '';
        var s = function (v) { return (v > 0 ? '+' : '') + Number(v).toFixed(2).replace('.', ','); };
        var olho = function (esf, cil, eixo) { return s(esf) + (Number(cil) ? ' ' + s(cil) + (eixo != null ? ' ' + eixo + '&deg;' : '') : ''); };
        return '<div class="q-grau-anotado"><b>o que a ótica recebeu</b>' +
            '<span>OD ' + olho(r.odEsf, r.odCil, r.odEixo) + '</span>' +
            '<span>OE ' + olho(r.oeEsf, r.oeCil, r.oeEixo) + '</span>' +
            (r.adicao != null ? '<span>Adição ' + s(r.adicao) + '</span>' : '') + '</div>';
    }

    function pintarCard(l, porque) {
        $('#q-card-lente').innerHTML =
            (l.img ? '<img class="q-lente-foto" src="' + l.img + '" alt="" decoding="async">' : '') +
            '<div class="q-card-lente-nome">' + l.nome + '</div>' +
            '<div class="q-card-lente-mat">' + l.material + '</div>' +
            '<div class="q-card-lente-preco">' + brl(l.preco) + '</div>' +
            '<div class="q-card-lente-parc">ou 6x de ' + brl(l.preco / 6) + ' sem juros</div>' +
            (porque ? '<div class="q-card-lente-pq"><b>por que essa lente</b>' + porque + '</div>' : '') +
            '<div class="q-disclaimer">Indicação com base no que você escolheu, ' +
            '<strong>conferida pela nossa ótica</strong> antes da montagem.</div>';
    }

    function mostrarLente(rec) {
        if (!rec || rec.fora) {
            st.lente = null;
            $('#q-card-lente').innerHTML =
                '<div class="q-card-lente-nome">Sua lente sai sob medida</div>' +
                '<div class="q-card-lente-mat">' + (MOTIVO[rec && rec.fora] || MOTIVO.sem_produto) + '</div>' +
                '<div class="q-card-lente-pq"><b>o que acontece agora</b>' +
                'Leve a armação — <strong>seu grau já está anotado aqui</strong>. ' +
                'A nossa ótica te chama no WhatsApp com o valor da sua lente, sem custo a mais pela consulta.</div>' +
                resumoDoGrau();
            $('#q-resumo-lente').textContent = '';
            $('#q-add-lente').textContent = 'LEVAR A ARMAÇÃO E FALAR COM A ÓTICA';
            var so1 = $('#q-so-armacao'); if (so1) so1.style.display = 'none';   // sem lente: um botao so
            track('recomendou', { fora: (rec && rec.fora) || 'sem_produto', visao: st.visao, trat: st.trat });
        } else {
            st.lente = rec.lente;
            pintarCard(rec.lente, rec.porque);
            var tipo = ({ simples: 'Visão simples', multifocal: 'Multifocal', descanso: 'Sem grau' })[st.visao];
            $('#q-resumo-lente').innerHTML = 'Você escolheu: ' + tipo + ' &middot; ' + (TRAT_LABEL[st.trat] || '—') +
                (rec.temAstig ? ' &middot; <strong>com astigmatismo</strong>' : '');
            $('#q-add-lente').textContent = FASE_CARRINHO_LENTE ? 'COMPRAR ARMAÇÃO + LENTE' : 'COMPRAR ARMAÇÃO';
            var so2 = $('#q-so-armacao'); if (so2) so2.style.display = FASE_CARRINHO_LENTE ? 'flex' : 'none';
            track('recomendou', { lente: rec.lente.nome, preco: rec.lente.preco, faixa: rec.faixa, visao: st.visao, trat: st.trat });
        }
        $('#q-form-receita').hidden = true;
        $('#q-resultado-lente').hidden = false;
        $('#q-lente-titulo').textContent = 'Sua lente indicada';
        ir('q-step-lente-final');
    }

    function recomendarAgora() {
        mostrarLente(window.recomendar({ visao: st.visao, trat: st.trat, receita: st.receita }));
    }

    function abrirFormReceita(titulo, banner) {
        $('#q-form-receita').hidden = false;
        $('#q-aviso-campo').hidden = true;
        mostrarAdicao();
        $('#q-resultado-lente').hidden = true;
        $('#q-lente-titulo').textContent = titulo;
        var b = $('#q-banner-ia');
        if (banner) { b.hidden = false; b.innerHTML = banner; } else { b.hidden = true; }
        ir('q-step-lente-final');
    }

    /* ---------- adiciona SO A ARMACAO ao carrinho (mesmo POST do widget) ---------- */
    function getProductForm() {
        var f = document.querySelector('form[action*="carrinho"], form[action*="comprar"], form.js-product-form, form[data-store="product-form"]');
        if (f && f.querySelector('input[name="add_to_cart"]')) return f;
        var inp = document.querySelector('input[name="add_to_cart"]');
        return inp ? inp.closest('form') : null;
    }
    function comprarArmacao() {
        var src = getProductForm();
        if (src) {
            var clone = document.createElement('form');
            clone.method = 'post';
            clone.action = src.getAttribute('action') || '/comprar/';
            clone.style.display = 'none';
            src.querySelectorAll('input, select, textarea').forEach(function (el) {
                if (!el.name) return;
                if ((el.type === 'checkbox' || el.type === 'radio') && !el.checked) return;
                var h = document.createElement('input');
                h.type = 'hidden'; h.name = el.name; h.value = el.value;
                clone.appendChild(h);
            });
            if (!clone.querySelector('[name="quantity"]')) {
                var q = document.createElement('input'); q.type = 'hidden'; q.name = 'quantity'; q.value = '1'; clone.appendChild(q);
            }
            document.body.appendChild(clone); clone.submit(); return true;
        }
        var sb = document.querySelector('.js-addtocart, .btn-add-to-cart, [data-component="product.add-to-cart"]');
        if (sb) { try { sb.click(); return true; } catch (e) { } }
        return false;
    }

    /* ---------- cliques do fluxo ---------- */
    document.addEventListener('click', function (e) {
        var t = e.target.closest('[data-ir],[data-visao],[data-trat],[data-receita],[data-carrinho],' +
            '#q-btn-escolher-lentes,#q-abrir-arquivo,#q-ver-lente,#q-add-lente');
        if (!t) return;

        if (t.id === 'q-btn-escolher-lentes') { e.preventDefault(); track('abriu', {}); ir('q-step-lentes'); return; }
        if (t.dataset.ir) { e.preventDefault(); if (t.dataset.ir === 'q-step-result') voltarResultado(); else ir(t.dataset.ir); return; }

        if (t.dataset.visao) {
            e.preventDefault(); st.visao = t.dataset.visao; track('visao', { visao: st.visao });
            if (st.visao === 'descanso') { st.trat = 'blue'; st.receita = null; recomendarAgora(); }
            else ir('q-step-receita');
            return;
        }
        if (t.dataset.trat) { e.preventDefault(); st.trat = t.dataset.trat; track('tratamento', { visao: st.visao, trat: st.trat }); ir('q-step-upload'); return; }

        if (t.id === 'q-abrir-arquivo') { e.preventDefault(); track('receita_metodo', { metodo: 'enviar' }); $('#q-arquivo').click(); return; }
        if (t.dataset.receita === 'digitar') { e.preventDefault(); track('receita_metodo', { metodo: 'digitar' }); limparReceita(); abrirFormReceita('Digite sua receita', null); return; }

        if (t.id === 'q-ver-lente') {
            e.preventDefault();
            var r = lerCampos();
            if (r.falta === 'esferico') { avisar('Preencha o esférico dos dois olhos.'); return; }
            if (r.falta === 'adicao') { avisar('Preencha a adição — ela é o grau de perto da multifocal.'); return; }
            st.receita = r.receita; recomendarAgora(); return;
        }

        if (t.dataset.carrinho === 'sem') { e.preventDefault(); track('so_armacao', { visao: st.visao }); comprarArmacao(); return; }

        if (t.id === 'q-add-lente') {
            e.preventDefault();
            if (st.lente && FASE_CARRINHO_LENTE) {
                track('carrinho', { lente: st.lente.nome, preco: st.lente.preco, fase: 'armacao_mais_lente' });
                comprarComLente(st.lente);   // adiciona armação + lente
            } else {
                // fora da faixa (sem lente) ou fase desligada: só a armação
                track('so_armacao', { visao: st.visao, motivo: 'sem_lente' });
                comprarArmacao();
            }
            return;
        }
    });

    /* Adiciona a LENTE (product id) e a ARMAÇÃO ao carrinho, e leva pro carrinho.
       add_to_cart usa o PRODUCT id (nao o variant) — validado na loja. */
    function comprarComLente(lente) {
        var body = 'add_to_cart=' + encodeURIComponent(lente.id) + '&quantity=1';
        // primeiro a lente (fetch, sem sair da pagina); depois a armação (form, redireciona pro carrinho)
        fetch('/comprar/', {
            method: 'POST', credentials: 'same-origin',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body
        }).then(function () { comprarArmacao(); })
          .catch(function () { comprarArmacao(); });   // se a lente falhar, ao menos leva a armação
    }

    /* ---------- leitura REAL da receita (n8n -> Gemini vision) ---------- */
    function encaixar(sel, valor) {
        if (!sel || valor == null) return;
        var opts = [].slice.call(sel.options).map(function (o) { return o.value; }).filter(function (v) { return v !== ''; });
        var melhor = opts[0], dif = Infinity;
        opts.forEach(function (o) { var d = Math.abs(Number(o) - Number(valor)); if (d < dif) { dif = d; melhor = o; } });
        sel.value = melhor;
    }

    function wireArquivo() {
        var inp = $('#q-arquivo'); if (!inp) return;
        inp.addEventListener('change', function (e) { var f = e.target.files && e.target.files[0]; if (f) lerReceitaDoArquivo(f); });
    }

    function lerReceitaDoArquivo(file) {
        $('#q-erro-leitura').hidden = true;
        $('#q-lendo').hidden = false;
        $('#q-arq-nome').textContent = file.name;
        var th = $('#q-thumb');
        if (/^image\//.test(file.type)) { th.src = URL.createObjectURL(file); th.hidden = false; th.onload = function () { URL.revokeObjectURL(th.src); }; }
        else { th.hidden = true; }

        var fr = new FileReader();
        fr.onload = function () {
            var b64 = String(fr.result).split(',')[1];
            fetch(WEBHOOK_RECEITA, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ image: b64, mime: file.type || 'image/png' }) })
                .then(function (resp) { return resp.json(); })
                .then(function (r) {
                    if (!r.ok) { track('receita_lida', { ok: false, erro: r.erro }); falhaLeitura(r.erro === 'nao_e_receita' ? 'Não identifiquei uma receita nessa imagem.' : 'Não consegui ler sua receita.'); return; }
                    var d = r.dados;
                    encaixar($('[data-r="odEsf"]'), d.odEsf); encaixar($('[data-r="oeEsf"]'), d.oeEsf);
                    encaixar($('[data-r="odCil"]'), d.odCil); encaixar($('[data-r="oeCil"]'), d.oeCil);
                    if (d.adicao != null) encaixar($('[data-r="adicao"]'), d.adicao);
                    if (d.odEixo != null) $('[data-r="odEixo"]').value = String(Math.round(d.odEixo));
                    if (d.oeEixo != null) $('[data-r="oeEixo"]').value = String(Math.round(d.oeEixo));
                    $('#q-lendo').hidden = true;
                    track('receita_lida', { ok: true, confianca: d.confianca });
                    abrirFormReceita('Confira sua receita', d.confianca === 'baixa'
                        ? '&#9888;&#65039; A imagem ficou difícil de ler. <strong>Confira cada número com atenção.</strong>'
                        : '&#10024; Preenchemos com o que lemos na sua receita. <strong>Confira e corrija se precisar.</strong>');
                })
                .catch(function () { track('receita_lida', { ok: false, erro: 'conexao' }); falhaLeitura('A leitura falhou — pode ser a conexão.'); });
        };
        fr.onerror = function () { falhaLeitura('Não consegui abrir o arquivo.'); };
        fr.readAsDataURL(file);
    }

    function falhaLeitura(msg) {
        $('#q-lendo').hidden = true;
        var box = $('#q-erro-leitura');
        box.innerHTML = msg + ' Tente outra foto ou <a data-receita="digitar">digite os dados</a>.';
        box.hidden = false;
    }

    /* ---------- mostra ESCOLHER LENTES quando a tela de resultado aparece ---------- */
    function revelarBotao() {
        var buy = document.getElementById('q-btn-buy-now');
        var lentes = document.getElementById('q-btn-escolher-lentes');
        if (!buy || !lentes) return;
        var visivel = buy.style.display && buy.style.display !== 'none';
        lentes.style.display = visivel ? 'flex' : 'none';
    }

    /* ---------- init ---------- */
    function init() {
        popular();
        wireArquivo();
        // observa o botao de compra do provador pra espelhar a visibilidade
        var buy = document.getElementById('q-btn-buy-now');
        if (buy) {
            var obs = new MutationObserver(revelarBotao);
            obs.observe(buy, { attributes: true, attributeFilter: ['style'] });
            revelarBotao();
        }
        // 'saiu' quando fecham o provador no meio do fluxo
        var close = document.getElementById('q-close-btn');
        if (close) close.addEventListener('click', function () {
            if (st.ultimo && st.ultimo !== 'abriu' && st.ultimo !== 'carrinho' && st.ultimo !== 'so_armacao')
                track('saiu', { ultimo_step: st.ultimo });
        });
    }

    // espera o provador montar as telas de lente (injetadas no html do widget)
    var _tentativas = 0;
    function bootstrap() {
        if (document.getElementById('q-btn-escolher-lentes') && document.getElementById('q-arquivo')) { init(); return; }
        if (_tentativas++ > 60) return;   // ~9s de tolerancia
        setTimeout(bootstrap, 150);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bootstrap);
    else bootstrap();
})();
