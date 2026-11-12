// Pure-JS Browser & Node Excel Formula Sandbox Evaluator for DC45-EU Live Spreadsheets
(function (root) {
  'use strict';

  function colToIndex(col) {
    let n = 0;
    const u = String(col || '').toUpperCase();
    for (let i = 0; i < u.length; i += 1) {
      n = n * 26 + (u.charCodeAt(i) - 64);
    }
    return n;
  }

  function indexToCol(idx) {
    let n = idx;
    let s = '';
    while (n > 0) {
      const rem = (n - 1) % 26;
      s = String.fromCharCode(65 + rem) + s;
      n = Math.floor((n - 1) / 26);
    }
    return s;
  }

  function parseInputLiteral(text) {
    if (typeof text === 'number') return text;
    if (typeof text === 'boolean') return text;
    const raw = String(text ?? '').trim();
    if (raw === '') return '';
    if (/^true$/i.test(raw)) return true;
    if (/^false$/i.test(raw)) return false;
    if (/^-?[\d,]+\.?\d*%$/.test(raw)) {
      const num = parseFloat(raw.replace(/[,%]/g, ''));
      return Number.isFinite(num) ? num / 100 : raw;
    }
    const cleanNum = raw.replace(/^EUR\s*/i, '').replace(/,/g, '').trim();
    if (/^-?\d+(\.\d+)?$/.test(cleanNum)) {
      const num = parseFloat(cleanNum);
      if (Number.isFinite(num)) return num;
    }
    return raw;
  }

  function toNum(v) {
    if (v === null || v === undefined || v === '') return 0;
    if (typeof v === 'boolean') return v ? 1 : 0;
    if (typeof v === 'number') return Number.isFinite(v) ? v : 0;
    const parsed = parseInputLiteral(String(v));
    return typeof parsed === 'number' ? parsed : 0;
  }

  function isTruthy(v) {
    if (typeof v === 'boolean') return v;
    if (typeof v === 'number') return v !== 0 && Number.isFinite(v);
    const s = String(v ?? '').trim().toUpperCase();
    return s !== '' && s !== 'FALSE' && s !== '0';
  }

  function formatValue(val, numFmt, fallbackDisplay) {
    if (val === null || val === undefined || val === '') return '';
    if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
    if (typeof val === 'number') {
      if (!Number.isFinite(val)) return '#NUM!';
      const v = Math.abs(val) < 1e-9 ? 0 : val;
      const fmt = numFmt || '';
      if (fmt.includes('%')) {
        const decs = fmt.includes('.00') ? 2 : (fmt.includes('.0') ? 1 : 0);
        return `${(v * 100).toFixed(decs)}%`;
      }
      if (fmt.includes('EUR') || fmt.includes('\u20ac') || fmt.includes('#,##0')) {
        const prefix = (fmt.includes('EUR') || fmt.includes('\u20ac')) ? 'EUR ' : '';
        let decs = 0;
        if (fmt.includes('.000')) decs = 3;
        else if (fmt.includes('.00')) decs = 2;
        else if (fmt.includes('.0')) decs = 1;
        return prefix + v.toLocaleString('en-US', { minimumFractionDigits: decs, maximumFractionDigits: decs });
      }
      if (fmt.includes('0.000')) return v.toFixed(3);
      if (fmt.includes('0.00')) return v.toFixed(2);
      if (fmt.includes('0.0')) return v.toFixed(1);
      if (Number.isInteger(v)) {
        return Math.abs(v) >= 1000 ? v.toLocaleString('en-US') : String(v);
      }
      return v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    return String(val || fallbackDisplay || '');
  }

  function matchCriteria(val, crit) {
    let c = String(crit ?? '').trim();
    if (c.startsWith('"') && c.endsWith('"')) c = c.slice(1, -1);
    if (c.startsWith('<>')) return String(val ?? '') !== c.slice(2);
    if (c.startsWith('>=')) return toNum(val) >= toNum(c.slice(2));
    if (c.startsWith('<=')) return toNum(val) <= toNum(c.slice(2));
    if (c.startsWith('>')) return toNum(val) > toNum(c.slice(1));
    if (c.startsWith('<')) return toNum(val) < toNum(c.slice(1));
    if (c.startsWith('=')) c = c.slice(1);
    if (typeof val === 'number' && /^-?\d+(\.\d+)?$/.test(c)) {
      return Math.abs(val - parseFloat(c)) < 1e-9;
    }
    return String(val ?? '').trim().toLowerCase() === c.toLowerCase();
  }

  function calcIrr(values) {
    if (!values.length || !(values.some(x => x > 0) && values.some(x => x < 0))) {
      return '#NUM!';
    }
    let lo = -0.95;
    let hi = 2.0;
    for (let it = 0; it < 90; it += 1) {
      const mid = (lo + hi) / 2.0;
      let npv = 0;
      for (let i = 0; i < values.length; i += 1) {
        npv += values[i] / Math.pow(1.0 + mid, i);
      }
      if (npv > 0) lo = mid;
      else hi = mid;
    }
    return (lo + hi) / 2.0;
  }

  function tokenizeFormula(expr) {
    const tokens = [];
    let i = 0;
    const s = String(expr || '');
    while (i < s.length) {
      const ch = s[i];
      if (/\s/.test(ch)) { i += 1; continue; }
      if (ch === '"') {
        let j = i + 1;
        let out = '';
        while (j < s.length) {
          if (s[j] === '"' && s[j + 1] === '"') {
            out += '"';
            j += 2;
          } else if (s[j] === '"') {
            j += 1;
            break;
          } else {
            out += s[j];
            j += 1;
          }
        }
        tokens.push({ t: 'str', v: out });
        i = j;
        continue;
      }
      if (ch === "'") {
        // Quoted sheet name e.g. '3. Milestones & Budget'!$A$6:$A$15
        let j = i + 1;
        let sh = '';
        while (j < s.length && s[j] !== "'") {
          sh += s[j];
          j += 1;
        }
        if (s[j] === "'" && s[j + 1] === '!') {
          j += 2;
          const rest = s.slice(j).match(/^\$?([A-Za-z]{1,3})\$?(\d+)(?::\$?([A-Za-z]{1,3})\$?(\d+))?/);
          if (rest) {
            if (rest[3]) {
              tokens.push({ t: 'range', sheet: sh, c1: rest[1], r1: Number(rest[2]), c2: rest[3], r2: Number(rest[4]) });
            } else {
              tokens.push({ t: 'cell', sheet: sh, c: rest[1], r: Number(rest[2]) });
            }
            i = j + rest[0].length;
            continue;
          }
        }
      }
      if (/[0-9]/.test(ch) || (ch === '.' && /[0-9]/.test(s[i + 1] || ''))) {
        const m = s.slice(i).match(/^\d+(?:\.\d+)?%?/);
        const raw = m[0];
        const v = raw.endsWith('%') ? parseFloat(raw.slice(0, -1)) / 100 : parseFloat(raw);
        tokens.push({ t: 'num', v });
        i += raw.length;
        continue;
      }
      // Sheet!Cell or Sheet!Range or bare Range/Cell or Function/Ident
      const rngOrCell = s.slice(i).match(/^(?:([A-Za-z0-9_]+)!)?\$?([A-Za-z]{1,3})\$?(\d+)(?::\$?([A-Za-z]{1,3})\$?(\d+))?(?![A-Za-z0-9_])/);
      if (rngOrCell && !(i > 0 && /[A-Za-z0-9_]/.test(s[i - 1]))) {
        const sh = rngOrCell[1] || null;
        if (rngOrCell[4]) {
          tokens.push({ t: 'range', sheet: sh, c1: rngOrCell[2], r1: Number(rngOrCell[3]), c2: rngOrCell[4], r2: Number(rngOrCell[5]) });
        } else {
          tokens.push({ t: 'cell', sheet: sh, c: rngOrCell[2], r: Number(rngOrCell[3]) });
        }
        i += rngOrCell[0].length;
        continue;
      }
      if (/[A-Za-z_]/.test(ch)) {
        const m = s.slice(i).match(/^[A-Za-z_][A-Za-z0-9_.]*/);
        const id = m[0];
        const up = id.toUpperCase();
        if (s[i + id.length] === '(') {
          tokens.push({ t: 'fn', v: up });
        } else if (up === 'TRUE' || up === 'FALSE') {
          tokens.push({ t: 'bool', v: up === 'TRUE' });
        } else {
          tokens.push({ t: 'ident', v: up });
        }
        i += id.length;
        continue;
      }
      const two = s.slice(i, i + 2);
      if (two === '<>' || two === '>=' || two === '<=') {
        tokens.push({ t: 'op', v: two });
        i += 2;
        continue;
      }
      if ('+-*/^=<>()&,'.includes(ch)) {
        tokens.push({ t: ch === '(' || ch === ')' || ch === ',' ? ch : 'op', v: ch });
        i += 1;
        continue;
      }
      i += 1;
    }
    return tokens;
  }

  /**
   * Evaluate workbook with optional user overrides:
   * overrides = { "SheetName!D5": "5", ... }
   * Returns { results: { sheetName: { COORD: { rawVal, displayVal, kind, recalced } } } }
   */
  function evaluateWorkbook(wbObj, overrides) {
    const sheets = (wbObj && wbObj.sheets) || [];
    const sheetMap = {};
    const ov = overrides || {};

    sheets.forEach(sh => {
      const cells = {};
      (sh.rows || []).forEach(row => {
        row.forEach(cell => {
          if (cell.coord) {
            cells[cell.coord.toUpperCase()] = cell;
          }
        });
      });
      sheetMap[sh.name] = cells;
    });

    const cache = {};
    const visiting = new Set();

    function resolveCellObj(sheetName, coord) {
      const shCells = sheetMap[sheetName];
      if (!shCells) return null;
      return shCells[coord.toUpperCase()] || null;
    }

    function expandRangeValues(sheetName, tok) {
      const sh = tok.sheet || sheetName;
      const c1 = colToIndex(tok.c1);
      const c2 = colToIndex(tok.c2);
      const loC = Math.min(c1, c2);
      const hiC = Math.max(c1, c2);
      const loR = Math.min(tok.r1, tok.r2);
      const hiR = Math.max(tok.r1, tok.r2);
      const vals = [];
      for (let r = loR; r <= hiR; r += 1) {
        for (let c = loC; c <= hiC; c += 1) {
          vals.push(evalCell(sh, `${indexToCol(c)}${r}`));
        }
      }
      return vals;
    }

    function runExpr(sheetName, exprText) {
      const tokens = tokenizeFormula(exprText);
      let pos = 0;

      function peek() { return tokens[pos] || null; }
      function next() { return tokens[pos++] || null; }

      function parseArgRawList() {
        // Parse comma-separated expressions inside fn( ... ) while keeping single range tokens intact if standalone
        const args = [];
        if (peek() && peek().t === ')') {
          next();
          return args;
        }
        while (pos < tokens.length) {
          // Peek if argument is a single range followed by ',' or ')'
          const p0 = tokens[pos];
          const p1 = tokens[pos + 1];
          if (p0 && p0.t === 'range' && (!p1 || p1.t === ',' || p1.t === ')')) {
            next();
            args.push({ isRange: true, rangeTok: p0 });
          } else {
            args.push({ isRange: false, val: parseCompare() });
          }
          const sep = peek();
          if (sep && sep.t === ',') {
            next();
          } else {
            break;
          }
        }
        if (peek() && peek().t === ')') next();
        return args;
      }

      function argValues(arg) {
        if (arg.isRange) return expandRangeValues(sheetName, arg.rangeTok);
        return [arg.val];
      }

      function callFn(name, rawArgs) {
        const valsFrom = idx => (rawArgs[idx] ? argValues(rawArgs[idx]) : []);
        const scalar = idx => (rawArgs[idx] ? (rawArgs[idx].isRange ? argValues(rawArgs[idx])[0] : rawArgs[idx].val) : '');

        if (name === 'SUM') {
          let tot = 0;
          rawArgs.forEach(a => argValues(a).forEach(v => {
            if (typeof v === 'number' && Number.isFinite(v)) tot += v;
          }));
          return tot;
        }
        if (name === 'SUMPRODUCT') {
          const lists = rawArgs.map(a => argValues(a));
          if (!lists.length) return 0;
          const len = Math.min(...lists.map(l => l.length));
          let tot = 0;
          for (let i = 0; i < len; i += 1) {
            let prod = 1;
            for (let k = 0; k < lists.length; k += 1) {
              prod *= toNum(lists[k][i]);
            }
            tot += prod;
          }
          return tot;
        }
        if (name === 'AVERAGE') {
          const nums = [];
          rawArgs.forEach(a => argValues(a).forEach(v => {
            if (typeof v === 'number' && Number.isFinite(v)) nums.push(v);
          }));
          return nums.length ? nums.reduce((s, x) => s + x, 0) / nums.length : 0;
        }
        if (name === 'MIN') {
          const nums = [];
          rawArgs.forEach(a => argValues(a).forEach(v => {
            if (typeof v === 'number' && Number.isFinite(v)) nums.push(v);
          }));
          return nums.length ? Math.min(...nums) : 0;
        }
        if (name === 'MAX') {
          const nums = [];
          rawArgs.forEach(a => argValues(a).forEach(v => {
            if (typeof v === 'number' && Number.isFinite(v)) nums.push(v);
          }));
          return nums.length ? Math.max(...nums) : 0;
        }
        if (name === 'COUNTA') {
          let cnt = 0;
          rawArgs.forEach(a => argValues(a).forEach(v => {
            if (v !== null && v !== undefined && String(v) !== '') cnt += 1;
          }));
          return cnt;
        }
        if (name === 'COUNTIF') {
          const rng = valsFrom(0);
          const crit = scalar(1);
          return rng.filter(v => matchCriteria(v, crit)).length;
        }
        if (name === 'COUNTIFS') {
          if (rawArgs.length < 2) return 0;
          const pairs = [];
          for (let i = 0; i + 1 < rawArgs.length; i += 2) {
            pairs.push([valsFrom(i), scalar(i + 1)]);
          }
          const n = pairs[0][0].length;
          let cnt = 0;
          for (let r = 0; r < n; r += 1) {
            let ok = true;
            for (let p = 0; p < pairs.length; p += 1) {
              if (!matchCriteria(pairs[p][0][r], pairs[p][1])) { ok = false; break; }
            }
            if (ok) cnt += 1;
          }
          return cnt;
        }
        if (name === 'SUMIF') {
          const critRng = valsFrom(0);
          const crit = scalar(1);
          const sumRng = rawArgs.length > 2 ? valsFrom(2) : critRng;
          let tot = 0;
          for (let i = 0; i < critRng.length; i += 1) {
            if (matchCriteria(critRng[i], crit)) tot += toNum(sumRng[i]);
          }
          return tot;
        }
        if (name === 'IF') {
          return isTruthy(scalar(0)) ? (rawArgs.length > 1 ? scalar(1) : true) : (rawArgs.length > 2 ? scalar(2) : false);
        }
        if (name === 'AND') {
          return rawArgs.every(a => isTruthy(a.isRange ? argValues(a)[0] : a.val));
        }
        if (name === 'OR') {
          return rawArgs.some(a => isTruthy(a.isRange ? argValues(a)[0] : a.val));
        }
        if (name === 'IFERROR') {
          const v = scalar(0);
          const bad = v === null || v === undefined || (typeof v === 'string' && v.startsWith('#')) || (typeof v === 'number' && !Number.isFinite(v));
          return bad ? scalar(1) : v;
        }
        if (name === 'LEFT') {
          const s = String(scalar(0) ?? '');
          const n = rawArgs.length > 1 ? Math.max(0, Math.floor(toNum(scalar(1)))) : 1;
          return s.slice(0, n);
        }
        if (name === 'NPV') {
          const rate = toNum(scalar(0));
          const cfs = [];
          for (let i = 1; i < rawArgs.length; i += 1) {
            valsFrom(i).forEach(v => cfs.push(toNum(v)));
          }
          let tot = 0;
          for (let i = 0; i < cfs.length; i += 1) {
            tot += cfs[i] / Math.pow(1.0 + rate, i + 1);
          }
          return tot;
        }
        if (name === 'IRR') {
          const vals = [];
          rawArgs.forEach(a => argValues(a).forEach(v => vals.push(toNum(v))));
          return calcIrr(vals);
        }
        return '';
      }

      function parseCompare() {
        let left = parseConcat();
        while (peek() && peek().t === 'op' && ['=', '<>', '>=', '<=', '>', '<'].includes(peek().v)) {
          const op = next().v;
          const right = parseConcat();
          const lStr = String(left ?? '').trim().toLowerCase();
          const rStr = String(right ?? '').trim().toLowerCase();
          if (op === '=') {
            left = (typeof left === 'number' || typeof right === 'number') ? (toNum(left) === toNum(right)) : (lStr === rStr);
          } else if (op === '<>') {
            left = (typeof left === 'number' || typeof right === 'number') ? (toNum(left) !== toNum(right)) : (lStr !== rStr);
          } else if (op === '>=') left = toNum(left) >= toNum(right);
          else if (op === '<=') left = toNum(left) <= toNum(right);
          else if (op === '>') left = toNum(left) > toNum(right);
          else if (op === '<') left = toNum(left) < toNum(right);
        }
        return left;
      }

      function parseConcat() {
        let left = parseAddSub();
        while (peek() && peek().t === 'op' && peek().v === '&') {
          next();
          const right = parseAddSub();
          left = String(left ?? '') + String(right ?? '');
        }
        return left;
      }

      function parseAddSub() {
        let left = parseMulDiv();
        while (peek() && peek().t === 'op' && (peek().v === '+' || peek().v === '-')) {
          const op = next().v;
          const right = parseMulDiv();
          left = op === '+' ? toNum(left) + toNum(right) : toNum(left) - toNum(right);
        }
        return left;
      }

      function parseMulDiv() {
        let left = parsePow();
        while (peek() && peek().t === 'op' && (peek().v === '*' || peek().v === '/')) {
          const op = next().v;
          const right = parsePow();
          if (op === '*') left = toNum(left) * toNum(right);
          else {
            const d = toNum(right);
            left = d === 0 ? '#DIV/0!' : toNum(left) / d;
          }
        }
        return left;
      }

      function parsePow() {
        let left = parseUnary();
        while (peek() && peek().t === 'op' && peek().v === '^') {
          next();
          const right = parseUnary();
          left = Math.pow(toNum(left), toNum(right));
        }
        return left;
      }

      function parseUnary() {
        if (peek() && peek().t === 'op' && (peek().v === '-' || peek().v === '+')) {
          const op = next().v;
          const v = parseUnary();
          return op === '-' ? -toNum(v) : toNum(v);
        }
        return parsePrimary();
      }

      function parsePrimary() {
        const tok = peek();
        if (!tok) return 0;
        if (tok.t === 'num' || tok.t === 'str' || tok.t === 'bool') {
          next();
          return tok.v;
        }
        if (tok.t === 'cell') {
          next();
          return evalCell(tok.sheet || sheetName, `${tok.c}${tok.r}`);
        }
        if (tok.t === 'range') {
          next();
          return expandRangeValues(sheetName, tok)[0] ?? 0;
        }
        if (tok.t === 'fn') {
          next();
          if (peek() && peek().t === '(') next();
          const args = parseArgRawList();
          return callFn(tok.v, args);
        }
        if (tok.t === '(') {
          next();
          const v = parseCompare();
          if (peek() && peek().t === ')') next();
          return v;
        }
        next();
        return 0;
      }

      return parseCompare();
    }

    function evalCell(sheetName, coord) {
      const cUpper = String(coord || '').toUpperCase();
      const fullKey = `${sheetName}!${cUpper}`;
      if (Object.prototype.hasOwnProperty.call(cache, fullKey)) {
        return cache[fullKey];
      }
      if (visiting.has(fullKey)) return 0;
      visiting.add(fullKey);

      let res;
      if (Object.prototype.hasOwnProperty.call(ov, fullKey)) {
        res = parseInputLiteral(ov[fullKey]);
      } else {
        const cell = resolveCellObj(sheetName, cUpper);
        if (!cell) {
          res = '';
        } else if (cell.f && cell.f.startsWith('=')) {
          res = runExpr(sheetName, cell.f.slice(1));
        } else if (Object.prototype.hasOwnProperty.call(cell, 'raw')) {
          res = cell.raw;
        } else {
          res = parseInputLiteral(cell.v);
        }
      }

      visiting.delete(fullKey);
      cache[fullKey] = res;
      return res;
    }

    const hasOverrides = Object.keys(ov).length > 0;
    const out = {};
    sheets.forEach(sh => {
      const shOut = {};
      (sh.rows || []).forEach(row => {
        row.forEach(cell => {
          if (!cell.coord) return;
          const fullKey = `${sh.name}!${cell.coord.toUpperCase()}`;
          const isOverridden = Object.prototype.hasOwnProperty.call(ov, fullKey);
          const isFormula = Boolean(cell.f && cell.f.startsWith('='));
          if (!hasOverrides && !isOverridden) {
            shOut[cell.coord] = {
              rawVal: Object.prototype.hasOwnProperty.call(cell, 'raw') ? cell.raw : parseInputLiteral(cell.v),
              displayVal: cell.v,
              recalced: false,
            };
          } else if (isOverridden || isFormula) {
            const val = evalCell(sh.name, cell.coord);
            const disp = formatValue(val, cell.fmt || '', cell.v);
            shOut[cell.coord] = {
              rawVal: val,
              displayVal: disp,
              recalced: isFormula && disp !== cell.v,
            };
          } else {
            shOut[cell.coord] = {
              rawVal: Object.prototype.hasOwnProperty.call(cell, 'raw') ? cell.raw : parseInputLiteral(cell.v),
              displayVal: cell.v,
              recalced: false,
            };
          }
        });
      });
      out[sh.name] = shOut;
    });

    return { hasOverrides, sheets: out };
  }

  root.DC45_EXCEL_SANDBOX = {
    evaluateWorkbook,
    parseInputLiteral,
    formatValue,
    colToIndex,
    indexToCol,
  };
})(typeof window !== 'undefined' ? window : globalThis);
