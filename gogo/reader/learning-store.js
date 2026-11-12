// Shared Learning Accelerators Store (SM-2 Spaced Repetition, Feynman Notes, What-If Sandbox, Acronym Prefs)
(function (root) {
  'use strict';

  const EXTRAS_KEY = 'dc45_learning_extras_v1';
  const DAY_MS = 24 * 3600 * 1000;

  function loadExtras() {
    try {
      const raw = JSON.parse(localStorage.getItem(EXTRAS_KEY) || '{}');
      return {
        acronymHighlight: raw.acronymHighlight !== false,
        interactiveSandbox: raw.interactiveSandbox !== false,
        srs: raw.srs && typeof raw.srs === 'object' ? raw.srs : {},
        notes: raw.notes && typeof raw.notes === 'object' ? raw.notes : {},
        sandbox: raw.sandbox && typeof raw.sandbox === 'object' ? raw.sandbox : {},
      };
    } catch {
      return {
        acronymHighlight: true,
        interactiveSandbox: true,
        srs: {},
        notes: {},
        sandbox: {},
      };
    }
  }

  function saveExtras(next) {
    try {
      localStorage.setItem(EXTRAS_KEY, JSON.stringify(next));
    } catch {
      // Ignore storage quota issues
    }
    return next;
  }

  /**
   * SM-2 inspired scheduler:
   * rating 0 = Again (<10m), 1 = Hard (1d+), 2 = Good (1d -> 3d -> n*ease), 3 = Easy (4d -> n*ease*1.3)
   */
  function gradeSrsCard(prevState, rating, nowMs) {
    const now = typeof nowMs === 'number' ? nowMs : Date.now();
    const cur = prevState && typeof prevState === 'object' ? prevState : {};
    let ease = typeof cur.ease === 'number' ? cur.ease : 2.5;
    let reps = typeof cur.reps === 'number' ? cur.reps : 0;
    let intervalDays = typeof cur.intervalDays === 'number' ? cur.intervalDays : 0;

    if (rating === 0) {
      reps = 0;
      intervalDays = 0;
      ease = Math.max(1.3, ease - 0.2);
      return {
        ease: Number(ease.toFixed(2)),
        reps,
        intervalDays,
        dueAt: now + 10 * 60 * 1000,
        lastRatedAt: now,
        lastRating: 0,
      };
    }

    if (rating === 1) {
      reps = Math.max(1, reps);
      intervalDays = reps <= 1 ? 1 : Math.max(1, Math.round(intervalDays * 1.2));
      ease = Math.max(1.3, ease - 0.15);
    } else if (rating === 2) {
      reps += 1;
      if (reps === 1) intervalDays = 1;
      else if (reps === 2) intervalDays = 3;
      else intervalDays = Math.max(1, Math.round(intervalDays * ease));
    } else {
      reps += 1;
      if (reps === 1) intervalDays = 4;
      else if (reps === 2) intervalDays = 7;
      else intervalDays = Math.max(2, Math.round(intervalDays * ease * 1.3));
      ease = Math.min(3.2, ease + 0.15);
    }

    return {
      ease: Number(ease.toFixed(2)),
      reps,
      intervalDays,
      dueAt: now + intervalDays * DAY_MS,
      lastRatedAt: now,
      lastRating: rating,
    };
  }

  function isCardDue(cardState, nowMs) {
    const now = typeof nowMs === 'number' ? nowMs : Date.now();
    if (!cardState || !cardState.dueAt) return true;
    return Number(cardState.dueAt) <= now;
  }

  function formatDueLabel(cardState, nowMs) {
    const now = typeof nowMs === 'number' ? nowMs : Date.now();
    if (!cardState || !cardState.dueAt) return 'New Card (Due)';
    const diff = Number(cardState.dueAt) - now;
    if (diff <= 0) return 'Due Now';
    const mins = Math.round(diff / 60000);
    if (mins < 60) return `Next in ${mins}m`;
    const hrs = Math.round(diff / 3600000);
    if (hrs < 36) return `Next in ${hrs}h`;
    const days = Math.round(diff / DAY_MS);
    return `Next in ${days}d`;
  }

  root.DC45_LEARNING_STORE = {
    EXTRAS_KEY,
    loadExtras,
    saveExtras,
    gradeSrsCard,
    isCardDue,
    formatDueLabel,
  };
})(typeof window !== 'undefined' ? window : globalThis);
