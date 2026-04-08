export default function NotesPanel({
  selectionLabel,
  monthMemo,
  onMonthMemoChange,
  draftNote,
  onDraftNoteChange,
  onAddNote,
  notes,
  onRemoveNote,
}) {
  return (
    <aside className="notes-panel">
      <div className="notes-panel__block">
        <p className="notes-panel__label">Selected range</p>
        <div className="notes-panel__chip">{selectionLabel}</div>
      </div>

      <div className="notes-panel__block">
        <label className="notes-panel__label" htmlFor="month-memo">
          Month memo
        </label>
        <textarea
          id="month-memo"
          rows="3"
          value={monthMemo}
          onChange={(event) => onMonthMemoChange(event.target.value)}
          placeholder="Plan the month, meetings, or important reminders..."
        />
      </div>

      <div className="notes-panel__block">
        <label className="notes-panel__label" htmlFor="range-note">
          Note for selected date or range
        </label>
        <textarea
          id="range-note"
          rows="3"
          value={draftNote}
          onChange={(event) => onDraftNoteChange(event.target.value)}
          placeholder="Write a note and attach it to the current selection..."
        />
        <button type="button" className="notes-panel__add" onClick={onAddNote}>
          Save note
        </button>
      </div>

      <div className="notes-panel__list">
        <p className="notes-panel__label">Saved notes</p>

        {notes.length === 0 ? (
          <p className="notes-panel__empty">No notes added for this month yet.</p>
        ) : (
          notes.map((note) => (
            <article key={note.id} className="note-card">
              <div>
                <p className="note-card__range">{note.label}</p>
                <p className="note-card__text">{note.text}</p>
              </div>
              <button type="button" onClick={() => onRemoveNote(note.id)}>
                Remove
              </button>
            </article>
          ))
        )}
      </div>
    </aside>
  );
}
