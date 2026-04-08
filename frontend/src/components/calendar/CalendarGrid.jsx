import { WEEKDAYS, dateKey, getMonthMeta, normalizeRange } from "../../utils/calendar";

export default function CalendarGrid({
  year,
  month,
  todayKey,
  selectedStart,
  selectedEnd,
  noteDates,
  onSelectDay,
}) {
  const { totalDays, offset } = getMonthMeta(year, month);
  const range = normalizeRange(selectedStart, selectedEnd);

  const isSelected = (dayKey) => dayKey === range.start || dayKey === range.end;
  const isInRange = (dayKey) =>
    range.start && range.end && dayKey > range.start && dayKey < range.end;

  return (
    <section className="calendar-grid">
      <div className="calendar-grid__weekdays">
        {WEEKDAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="calendar-grid__days">
        {Array.from({ length: offset }).map((_, index) => (
          <span key={`empty-${index}`} className="calendar-grid__empty" />
        ))}

        {Array.from({ length: totalDays }, (_, index) => {
          const day = index + 1;
          const dayKey = dateKey(year, month, day);
          const classes = [
            "day-cell",
            isSelected(dayKey) && "day-cell--selected",
            isInRange(dayKey) && "day-cell--range",
            todayKey === dayKey && "day-cell--today",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <button
              key={dayKey}
              type="button"
              className={classes}
              onClick={() => onSelectDay(dayKey)}
            >
              <span>{day}</span>
              {noteDates.has(dayKey) && <i className="day-cell__dot" />}
            </button>
          );
        })}
      </div>
    </section>
  );
}
