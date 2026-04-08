import { useEffect, useMemo, useState } from "react";
import {
  MONTHS,
  dateKey,
  formatRange,
  monthKey,
  normalizeRange,
} from "../../utils/calendar";
import CalendarGrid from "./CalendarGrid";
import HeroArtwork from "./HeroArtwork";
import NotesPanel from "./NotesPanel";
import "./wall-calendar.css";

const STORAGE_KEY = "wall-calendar-vite";

function readStorage() {
  if (typeof window === "undefined") return { monthMemos: {}, notesByMonth: {} };

  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY)) ?? {
      monthMemos: {},
      notesByMonth: {},
    };
  } catch {
    return { monthMemos: {}, notesByMonth: {} };
  }
}

export default function WallCalendar() {
  const today = new Date();
  const [view, setView] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });
  const [selection, setSelection] = useState({ start: null, end: null });
  const [draftNote, setDraftNote] = useState("");
  const [monthMemos, setMonthMemos] = useState(() => readStorage().monthMemos || {});
  const [notesByMonth, setNotesByMonth] = useState(() => readStorage().notesByMonth || {});

  const activeMonthKey = monthKey(view.year, view.month);
  const selectionRange = normalizeRange(selection.start, selection.end);
  const todayKey = dateKey(today.getFullYear(), today.getMonth(), today.getDate());
  const notes = notesByMonth[activeMonthKey] || [];
  const noteDates = useMemo(
    () => new Set(notes.map((note) => note.start)),
    [notes]
  );

  useEffect(() => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ monthMemos, notesByMonth })
    );
  }, [monthMemos, notesByMonth]);

  function changeMonth(direction) {
    const next = new Date(view.year, view.month + direction, 1);
    setView({ year: next.getFullYear(), month: next.getMonth() });
    setSelection({ start: null, end: null });
    setDraftNote("");
  }

  function handleDaySelect(dayKey) {
    setSelection((current) => {
      if (!current.start || current.end) return { start: dayKey, end: null };
      if (current.start === dayKey) return { start: null, end: null };
      return { start: current.start, end: dayKey };
    });
  }

  function addNote() {
    const text = draftNote.trim();
    if (!selectionRange.start || !text) return;

    const newNote = {
      id: `${Date.now()}`,
      start: selectionRange.start,
      end: selectionRange.end,
      label: formatRange(selection.start, selection.end),
      text,
    };

    setNotesByMonth((current) => ({
      ...current,
      [activeMonthKey]: [...(current[activeMonthKey] || []), newNote],
    }));
    setDraftNote("");
  }

  function removeNote(noteId) {
    setNotesByMonth((current) => ({
      ...current,
      [activeMonthKey]: (current[activeMonthKey] || []).filter(
        (note) => note.id !== noteId
      ),
    }));
  }

  return (
    <section className="wall-calendar">
      <div className="wall-calendar__sheet">
        <div className="wall-calendar__binder" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, index) => (
            <span key={index} />
          ))}
        </div>

        <div className="wall-calendar__layout">
          <div className="wall-calendar__calendar">
            <HeroArtwork monthLabel={MONTHS[view.month]} year={view.year} />

            <div className="calendar-toolbar">
              <button type="button" onClick={() => changeMonth(-1)}>
                Previous
              </button>
              <h2>
                {MONTHS[view.month]} {view.year}
              </h2>
              <button type="button" onClick={() => changeMonth(1)}>
                Next
              </button>
            </div>

            <CalendarGrid
              year={view.year}
              month={view.month}
              todayKey={todayKey}
              selectedStart={selection.start}
              selectedEnd={selection.end}
              noteDates={noteDates}
              onSelectDay={handleDaySelect}
            />
          </div>

          <NotesPanel
            selectionLabel={formatRange(selection.start, selection.end)}
            monthMemo={monthMemos[activeMonthKey] || ""}
            onMonthMemoChange={(value) =>
              setMonthMemos((current) => ({ ...current, [activeMonthKey]: value }))
            }
            draftNote={draftNote}
            onDraftNoteChange={setDraftNote}
            onAddNote={addNote}
            notes={notes}
            onRemoveNote={removeNote}
          />
        </div>
      </div>
    </section>
  );
}
