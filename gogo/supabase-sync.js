// DC36-EU Supabase PostgREST Sync & Learning History Engine
(function (window) {
  'use strict';

  const SUPABASE_URL = 'https://nkkwegvplpozirrjcxsn.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_M498sjl9nh6TldXl2zpR0A_-aRKakCU';
  const TIMEOUT_MS = 8000;

  function buildHeaders(extra) {
    const h = {
      'apikey': SUPABASE_KEY,
      'Content-Type': 'application/json'
    };
    if (SUPABASE_KEY.indexOf('sb_') !== 0) {
      h['Authorization'] = 'Bearer ' + SUPABASE_KEY;
    }
    if (extra) {
      Object.assign(h, extra);
    }
    return h;
  }

  async function requestJson(path, options) {
    const ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timer = ctrl ? setTimeout(() => ctrl.abort(), TIMEOUT_MS) : null;
    try {
      const res = await fetch(SUPABASE_URL + '/rest/v1/' + path, {
        ...(options || {}),
        signal: ctrl ? ctrl.signal : undefined
      });
      if (timer) clearTimeout(timer);
      const text = await res.text();
      let payload = null;
      try {
        payload = text ? JSON.parse(text) : null;
      } catch {
        payload = text;
      }
      return { ok: res.ok, status: res.status, data: payload };
    } catch (err) {
      if (timer) clearTimeout(timer);
      return { ok: false, status: 0, error: String(err) };
    }
  }

  function isMissingSchemaError(resp) {
    if (!resp || resp.ok) return false;
    if (resp.status === 404) return true;
    const msg = JSON.stringify(resp.data || resp.error || '');
    return msg.includes('PGRST205') || msg.includes('does not exist') || msg.includes('Could not find the table');
  }

  const DC36_Supabase = {
    url: SUPABASE_URL,

    async checkConnection() {
      const res = await requestJson('dc_learning_modules?select=module_id&limit=1', {
        method: 'GET',
        headers: buildHeaders()
      });
      if (res.ok) {
        return { state: 'connected', detail: 'Connected to Supabase Postgres' };
      }
      if (isMissingSchemaError(res)) {
        return { state: 'schema_missing', detail: 'Supabase reachable; run supabase/dc36_learning_schema.sql in SQL Editor' };
      }
      return { state: 'offline', detail: `Offline / error (${res.status || 'network'})` };
    },

    async pullAll(profileId) {
      const pid = encodeURIComponent(profileId);
      const headers = buildHeaders();
      const [mods, port, iq, hist] = await Promise.all([
        requestJson(`dc_learning_modules?profile_id=eq.${pid}&select=*`, { method: 'GET', headers }),
        requestJson(`dc_learning_portfolio?profile_id=eq.${pid}&select=*`, { method: 'GET', headers }),
        requestJson(`dc_learning_interviews?profile_id=eq.${pid}&select=*`, { method: 'GET', headers }),
        requestJson(`dc_learning_history?profile_id=eq.${pid}&order=created_at.desc&limit=400`, { method: 'GET', headers })
      ]);

      if (!mods.ok) {
        if (isMissingSchemaError(mods)) {
          return { ok: false, reason: 'schema_missing' };
        }
        return { ok: false, reason: 'network_error', status: mods.status };
      }

      return {
        ok: true,
        modules: Array.isArray(mods.data) ? mods.data : [],
        portfolio: Array.isArray(port.data) ? port.data : [],
        interviews: Array.isArray(iq.data) ? iq.data : [],
        history: Array.isArray(hist.data) ? hist.data : []
      };
    },

    async upsertModules(rows) {
      if (!rows || !rows.length) return { ok: true };
      return requestJson('dc_learning_modules?on_conflict=profile_id,module_id', {
        method: 'POST',
        headers: buildHeaders({ 'Prefer': 'resolution=merge-duplicates,return=minimal' }),
        body: JSON.stringify(rows)
      });
    },

    async upsertPortfolio(rows) {
      if (!rows || !rows.length) return { ok: true };
      return requestJson('dc_learning_portfolio?on_conflict=profile_id,item_id', {
        method: 'POST',
        headers: buildHeaders({ 'Prefer': 'resolution=merge-duplicates,return=minimal' }),
        body: JSON.stringify(rows)
      });
    },

    async upsertInterviews(rows) {
      if (!rows || !rows.length) return { ok: true };
      return requestJson('dc_learning_interviews?on_conflict=profile_id,qa_id', {
        method: 'POST',
        headers: buildHeaders({ 'Prefer': 'resolution=merge-duplicates,return=minimal' }),
        body: JSON.stringify(rows)
      });
    },

    async appendHistory(row) {
      return requestJson('dc_learning_history', {
        method: 'POST',
        headers: buildHeaders({ 'Prefer': 'return=representation' }),
        body: JSON.stringify(row)
      });
    }
  };

  window.DC36_Supabase = DC36_Supabase;
})(window);
