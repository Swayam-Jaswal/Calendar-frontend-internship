import React, { useState, useEffect } from "react";
const THEMES = {
  ocean: {
    name: "Ocean",
    accent: "#1a73e8",
    accentHover: "#1557b0",
    accentLight: "#e8f0fe",
    sky: ["#b8d4f0", "#dbe9f8"],
    mountains: ["#8aadcf", "#5c8ab0", "#3a6d94", "#2a5070"],
    sun: "#fff9c4",
    figure: "#2a5070",
  },
  forest: {
    name: "Forest",
    accent: "#2e7d32",
    accentHover: "#1b5e20",
    accentLight: "#e8f5e9",
    sky: ["#b2dfdb", "#e0f2f1"],
    mountains: ["#80cbc4", "#4caf50", "#388e3c", "#1b5e20"],
    sun: "#fff9c4",
    figure: "#1b5e20",
  },
  desert: {
    name: "Desert",
    accent: "#e65100",
    accentHover: "#bf360c",
    accentLight: "#fff3e0",
    sky: ["#ffcc80", "#fff8f0"],
    mountains: ["#ffb74d", "#ff8a65", "#e64a19", "#bf360c"],
    sun: "#ffe082",
    figure: "#bf360c",
  },
  dusk: {
    name: "Dusk",
    accent: "#7b1fa2",
    accentHover: "#4a148c",
    accentLight: "#f3e5f5",
    sky: ["#ce93d8", "#f3e5f5"],
    mountains: ["#ba68c8", "#9c27b0", "#7b1fa2", "#4a148c"],
    sun: "#fff9c4",
    figure: "#4a148c",
  },
};
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const WEEKDAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const HOLIDAYS = new Set([
  "2026-01-01","2026-01-14","2026-01-26","2026-03-20","2026-04-02","2026-04-06",
  "2026-04-10","2026-04-14","2026-05-01","2026-08-15","2026-09-05","2026-10-02",
  "2026-10-24","2026-11-04","2026-12-25",
  "2025-01-26","2025-03-17","2025-04-10","2025-04-14","2025-08-15","2025-10-02",
  "2025-10-22","2025-11-01","2025-11-05","2025-12-25",
]);
const pad = (n) => String(n).padStart(2, "0");
const dateKey = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;
const monthKey = (y, m) => `${y}-${m}`;
const daysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
const firstDayOffset = (y, m) => (new Date(y, m, 1).getDay() + 6) % 7; 
const fmtLabel = (dk) => {
  const [y, mo, d] = dk.split("-");
  return `${SHORT[+mo - 1]} ${+d}`;
};
const fmtRange = (s, e) => {
  if (!e || s === e) return fmtLabel(s);
  const [as, ae] = s <= e ? [s, e] : [e, s];
  return `${fmtLabel(as)} – ${fmtLabel(ae)}`;
};
function HeroSVG({ theme }) {
  const { sky, mountains, sun, figure } = theme;
  return (
    <svg
      viewBox="0 0 500 220"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", display: "block" }}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="500" height="220" fill={sky[0]} />
      <ellipse cx="70" cy="50" rx="80" ry="30" fill={sky[1]} opacity="0.75" />
      <ellipse cx="420" cy="30" rx="100" ry="28" fill={sky[1]} opacity="0.65" />
      <circle cx="55" cy="32" r="22" fill={sun} opacity="0.9" />
      <circle cx="55" cy="32" r="17" fill={sun} />
      <polygon points="0,220 110,115 185,155 265,85 345,130 420,65 480,108 500,88 500,220" fill={mountains[0]} />
      <polygon points="0,220 85,155 165,182 230,132 315,168 400,102 465,148 500,128 500,220" fill={mountains[1]} />
      <polygon points="0,220 55,192 138,208 205,180 278,198 360,172 440,192 500,178 500,220" fill={mountains[2]} />
      <polygon points="0,220 0,212 75,219 155,210 235,217 320,207 405,216 500,209 500,220" fill={mountains[3]} />
      <g transform="translate(245,92)">
        <circle cx="0" cy="-19" r="5.5" fill={figure} />
        <line x1="0" y1="-13" x2="0" y2="5" stroke={figure} strokeWidth="2.8" strokeLinecap="round" />
        <line x1="0" y1="-4" x2="-9" y2="3" stroke={figure} strokeWidth="2.2" strokeLinecap="round" />
        <line x1="0" y1="-4" x2="9" y2="-1" stroke={figure} strokeWidth="2.2" strokeLinecap="round" />
        <line x1="0" y1="5" x2="-6" y2="15" stroke={figure} strokeWidth="2.2" strokeLinecap="round" />
        <line x1="0" y1="5" x2="6" y2="15" stroke={figure} strokeWidth="2.2" strokeLinecap="round" />
        <line x1="9" y1="-1" x2="18" y2="-10" stroke={figure} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="15" y1="-12" x2="22" y2="-8" stroke={figure} strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}
function SpiralBinding() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: 26,
        background: "#e0e0e0",
        borderBottom: "0.5px solid #bbb",
        padding: "0 10px",
        gap: 0,
        overflowX: "hidden",
      }}
    >
      {Array.from({ length: 26 }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 13,
            height: 19,
            border: "1.5px solid #9e9e9e",
            borderRadius: "50%",
            background: "#f5f5f5",
            flexShrink: 0,
            marginRight: 2,
          }}
        />
      ))}
    </div>
  );
}
function LegendDot({ color, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#999" }}>
      <div style={{ width: 7, height: 7, borderRadius: "50%", background: color, flexShrink: 0 }} />
      {label}
    </div>
  );
}
function NoteCard({ label, text, accentColor, onRemove }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "0.5px solid #e0e0e0",
        borderRadius: 8,
        padding: "8px 10px",
      }}
    >
      <div style={{ fontSize: 11, color: accentColor, fontWeight: 500, marginBottom: 4 }}>{label}</div>
      <div style={{ display: "flex", gap: 6, alignItems: "flex-start" }}>
        <span style={{ fontSize: 12, color: "#555", lineHeight: 1.55, flex: 1 }}>{text}</span>
        <button
          onClick={onRemove}
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: "#ccc", fontSize: 16, lineHeight: 1, flexShrink: 0, padding: 0,
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}
export default function WallCalendar() {
  const today = new Date();
  const [cur, setCur] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const [themeKey, setThemeKey] = useState("ocean");
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);
  const [notes, setNotes] = useState({});       
  const [monthNotes, setMonthNotes] = useState({}); 
  const [noteInput, setNoteInput] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [animClass, setAnimClass] = useState("");
  const theme = THEMES[themeKey];
  const acc = theme.accent;
  const accL = theme.accentLight;
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 740);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("wallcal_v1") || "{}");
      if (saved.notes) setNotes(saved.notes);
      if (saved.monthNotes) setMonthNotes(saved.monthNotes);
      if (saved.themeKey && THEMES[saved.themeKey]) setThemeKey(saved.themeKey);
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("wallcal_v1", JSON.stringify({ notes, monthNotes, themeKey }));
    } catch {}
  }, [notes, monthNotes, themeKey]);
  const navigate = (dir) => {
    const cls = dir === 1 ? "wcal-anim-left" : "wcal-anim-right";
    setAnimClass(cls);
    setTimeout(() => setAnimClass(""), 280);
    setCur(({ y, m }) => {
      m += dir;
      if (m < 0) { m = 11; y--; }
      if (m > 11) { m = 0; y++; }
      return { y, m };
    });
    setRangeStart(null);
    setRangeEnd(null);
  };
  const onDayClick = (dk) => {
    if (!rangeStart || rangeEnd) {
      setRangeStart(dk);
      setRangeEnd(null);
    } else if (dk === rangeStart) {
      setRangeStart(null);
    } else {
      setRangeEnd(dk);
    }
  };
  const getSortedRange = () => {
    if (!rangeStart) return { sd: null, ed: null };
    if (!rangeEnd || rangeStart === rangeEnd) return { sd: rangeStart, ed: rangeStart };
    return rangeStart <= rangeEnd
      ? { sd: rangeStart, ed: rangeEnd }
      : { sd: rangeEnd, ed: rangeStart };
  };
  const { sd, ed } = getSortedRange();
  const addNote = () => {
    if (!noteInput.trim() || !rangeStart) return;
    const key = sd; 
    const text = rangeEnd && rangeEnd !== rangeStart
      ? `[${fmtRange(rangeStart, rangeEnd)}] ${noteInput.trim()}`
      : noteInput.trim();
    setNotes((prev) => ({ ...prev, [key]: [...(prev[key] || []), text] }));
    setNoteInput("");
  };
  const removeNote = (k, i) => {
    setNotes((prev) => {
      const arr = [...(prev[k] || [])];
      arr.splice(i, 1);
      return { ...prev, [k]: arr };
    });
  };
  const exportNotes = () => {
    const mk = monthKey(cur.y, cur.m);
    const lines = [`=== ${MONTHS[cur.m]} ${cur.y} ===`, ""];
    if (monthNotes[mk]) lines.push(`Month memo:`, monthNotes[mk], "");
    const curPrefix = `${cur.y}-${pad(cur.m + 1)}`;
    Object.keys(notes)
      .filter((k) => k.startsWith(curPrefix) && notes[k]?.length)
      .sort()
      .forEach((k) => (notes[k] || []).forEach((n) => lines.push(`${fmtLabel(k)}: ${n}`)));
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `notes-${cur.y}-${pad(cur.m + 1)}.txt`;
    a.click();
  };
  const offset = firstDayOffset(cur.y, cur.m);
  const dim = daysInMonth(cur.y, cur.m);
  const todayKey = dateKey(today.getFullYear(), today.getMonth(), today.getDate());
  const mk = monthKey(cur.y, cur.m);
  const curPrefix = `${cur.y}-${pad(cur.m + 1)}`;
  const curNoteKeys = Object.keys(notes)
    .filter((k) => k.startsWith(curPrefix) && notes[k]?.length)
    .sort();
  const isStart = (dk) => sd && dk === sd;
  const isEnd = (dk) => ed && dk === ed && ed !== sd;
  const inRange = (dk) => sd && ed && dk > sd && dk < ed;
  const isToday = (dk) => dk === todayKey;
  const isHoliday = (dk) => HOLIDAYS.has(dk);
  const hasNote = (dk) => notes[dk]?.length > 0;
  const cellBg = (dk) => {
    if (isStart(dk) || isEnd(dk)) return acc;
    if (inRange(dk)) return accL;
    return "transparent";
  };
  const cellColor = (dow, dk) => {
    if (isStart(dk) || isEnd(dk)) return "#fff";
    if (dow >= 5) return "#d32f2f";
    if (isToday(dk)) return acc;
    return "#222";
  };
  const cellRadius = (dk) => {
    if (isStart(dk) || isEnd(dk)) return "50%";
    if (inRange(dk)) return 0;
    return "50%";
  };
  return (
    <div style={{ padding: "1rem", fontFamily: "system-ui, -apple-system, sans-serif", maxWidth: "100%", boxSizing: "border-box" }}>
      <style>{`
        @keyframes wcalLeft  { from { opacity:0; transform:translateX(20px);  } to { opacity:1; transform:translateX(0); } }
        @keyframes wcalRight { from { opacity:0; transform:translateX(-20px); } to { opacity:1; transform:translateX(0); } }
        .wcal-anim-left  { animation: wcalLeft  0.25s ease; }
        .wcal-anim-right { animation: wcalRight 0.25s ease; }
        .wcal-day:hover  { background: #f0f0f0 !important; }
        .wcal-day.sel:hover { opacity: 0.85; }
        .wcal-navbtn:hover  { background: #eeeeee !important; }
        .wcal-addbtn:hover  { opacity: 0.87; }
        .wcal-export:hover  { background: #f5f5f5 !important; }
        .wcal-thmbtn:hover  { transform: scale(1.15); }
      `}</style>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 310px",
          border: "0.5px solid #d0d0d0",
          borderRadius: 12,
          overflow: "hidden",
          background: "#fff",
          minHeight: isMobile ? "auto" : 580,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", background: "#fff" }}>
          <SpiralBinding />
          <div style={{ position: "relative", height: 220, overflow: "hidden", flexShrink: 0 }}>
            <HeroSVG theme={theme} />
            <div
              style={{
                position: "absolute", bottom: 0, right: 0,
                background: acc, color: "#fff",
                padding: "10px 24px 10px 34px",
                clipPath: "polygon(22% 0%, 100% 0%, 100% 100%, 0% 100%)",
              }}
            >
              <div style={{ fontSize: 10, opacity: 0.82, letterSpacing: 1.2 }}>{cur.y}</div>
              <div style={{ fontSize: 14, fontWeight: 500, letterSpacing: 2 }}>
                {MONTHS[cur.m].toUpperCase()}
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "10px 18px 8px", borderBottom: "0.5px solid #ebebeb",
            }}
          >
            <button
              className="wcal-navbtn"
              onClick={() => navigate(-1)}
              style={{
                background: "none", border: "0.5px solid #d0d0d0", borderRadius: 8,
                padding: "3px 12px", cursor: "pointer", fontSize: 22, color: "#555",
                lineHeight: 1, transition: "background 0.15s",
              }}
            >
              ‹
            </button>
            <span style={{ fontSize: 14, fontWeight: 500, color: "#1a1a1a" }}>
              {MONTHS[cur.m]} {cur.y}
            </span>
            <button
              className="wcal-navbtn"
              onClick={() => navigate(1)}
              style={{
                background: "none", border: "0.5px solid #d0d0d0", borderRadius: 8,
                padding: "3px 12px", cursor: "pointer", fontSize: 22, color: "#555",
                lineHeight: 1, transition: "background 0.15s",
              }}
            >
              ›
            </button>
          </div>
          <div style={{ padding: "10px 14px 14px", flex: 1 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", marginBottom: 4 }}>
              {WEEKDAYS.map((d, i) => (
                <div
                  key={d}
                  style={{
                    textAlign: "center", fontSize: 11, fontWeight: 500,
                    color: i >= 5 ? "#e53935" : "#9e9e9e", padding: "3px 0",
                  }}
                >
                  {d}
                </div>
              ))}
            </div>
            <div className={animClass} style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2 }}>
              {Array.from({ length: offset }).map((_, i) => (
                <div key={`e${i}`} style={{ aspectRatio: "1" }} />
              ))}
              {Array.from({ length: dim }).map((_, i) => {
                const d = i + 1;
                const dk = dateKey(cur.y, cur.m, d);
                const dow = (offset + i) % 7;
                const selected = isStart(dk) || isEnd(dk);
                return (
                  <div
                    key={dk}
                    className={`wcal-day${selected ? " sel" : ""}`}
                    onClick={() => onDayClick(dk)}
                    style={{
                      aspectRatio: "1",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 13, cursor: "pointer", position: "relative",
                      userSelect: "none", borderRadius: cellRadius(dk),
                      background: cellBg(dk), color: cellColor(dow, dk),
                      fontWeight: isToday(dk) ? 500 : 400,
                      transition: "background 0.12s",
                    }}
                  >
                    {d}
                    {isToday(dk) && !selected && (
                      <span
                        style={{
                          position: "absolute", bottom: 3, left: "50%",
                          transform: "translateX(-50%)", width: 4, height: 4,
                          borderRadius: "50%", background: acc,
                        }}
                      />
                    )}
                    {isHoliday(dk) && !selected && (
                      <span
                        style={{
                          position: "absolute", top: 3, right: 3,
                          width: 5, height: 5, borderRadius: "50%", background: "#ff7043",
                        }}
                      />
                    )}
                    {hasNote(dk) && !selected && (
                      <span
                        style={{
                          position: "absolute", bottom: 3, right: 3,
                          width: 4, height: 4, borderRadius: "50%", background: "#fbc02d",
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", gap: 14, marginTop: 12, flexWrap: "wrap" }}>
              <LegendDot color={acc} label="Today" />
              <LegendDot color="#ff7043" label="Holiday" />
              <LegendDot color="#fbc02d" label="Has note" />
              <LegendDot color={accL} label="In range" />
            </div>
          </div>
        </div>
        <div
          style={{
            borderLeft: isMobile ? "none" : "0.5px solid #ebebeb",
            borderTop: isMobile ? "0.5px solid #ebebeb" : "none",
            display: "flex", flexDirection: "column", background: "#fafafa",
          }}
        >
          <div
            style={{
              display: "flex", alignItems: "center", gap: 8, padding: "8px 14px",
              borderBottom: "0.5px solid #ebebeb", background: "#fff",
            }}
          >
            <span style={{ fontSize: 11, color: "#9e9e9e", fontWeight: 500 }}>Theme</span>
            {Object.entries(THEMES).map(([k, t]) => (
              <button
                key={k}
                className="wcal-thmbtn"
                onClick={() => setThemeKey(k)}
                title={t.name}
                style={{
                  width: 20, height: 20, borderRadius: "50%", background: t.accent,
                  border: themeKey === k ? "2.5px solid #1a1a1a" : "2px solid transparent",
                  cursor: "pointer", flexShrink: 0, transition: "transform 0.15s, border 0.15s",
                  outline: "none",
                }}
              />
            ))}
            <span style={{ fontSize: 11, color: "#bdbdbd" }}>{theme.name}</span>
          </div>
          <div style={{ padding: "12px 14px 8px", borderBottom: "0.5px solid #ebebeb", background: "#fff" }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: "#9e9e9e", letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 2 }}>
              Notes
            </div>
            <div style={{ fontSize: 12, color: "#bdbdbd" }}>
              {rangeStart
                ? `Selected: ${fmtRange(rangeStart, rangeEnd)}`
                : "Click a date to start selection"}
            </div>
          </div>
          <div
            style={{
              padding: "7px 14px", minHeight: 36, display: "flex", alignItems: "center",
              background: "#fff", borderBottom: "0.5px solid #ebebeb",
            }}
          >
            {rangeStart ? (
              <div
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  background: accL, color: acc, padding: "3px 10px",
                  borderRadius: 20, fontSize: 12, fontWeight: 500,
                }}
              >
                {fmtRange(rangeStart, rangeEnd)}
                <button
                  onClick={() => { setRangeStart(null); setRangeEnd(null); }}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    color: acc, fontSize: 15, lineHeight: 1, padding: "0 2px",
                  }}
                >
                  ×
                </button>
              </div>
            ) : (
              <span style={{ fontSize: 12, color: "#e0e0e0" }}>No range selected</span>
            )}
          </div>
          <div
            style={{
              margin: "10px 14px 0",
              background: "#fff", border: "0.5px solid #e0e0e0", borderRadius: 8,
            }}
          >
            <div
              style={{
                fontSize: 10, color: "#bdbdbd", padding: "7px 12px 0",
                fontWeight: 500, textTransform: "uppercase", letterSpacing: 0.5,
              }}
            >
              Month memo
            </div>
            <textarea
              value={monthNotes[mk] || ""}
              onChange={(e) => setMonthNotes((prev) => ({ ...prev, [mk]: e.target.value }))}
              placeholder={`General notes for ${MONTHS[cur.m]}...`}
              rows={2}
              style={{
                width: "100%", border: "none", background: "none", resize: "none",
                fontSize: 12, fontFamily: "inherit", color: "#555",
                padding: "5px 12px 8px", outline: "none", lineHeight: 1.55,
              }}
            />
          </div>
          <div
            style={{
              flex: 1, padding: "10px 14px", overflowY: "auto",
              display: "flex", flexDirection: "column", gap: 8, minHeight: 120,
            }}
          >
            {curNoteKeys.length === 0 ? (
              <div style={{ color: "#d0d0d0", fontSize: 12, textAlign: "center", marginTop: 18 }}>
                No date notes for this month
              </div>
            ) : (
              curNoteKeys.flatMap((k) =>
                (notes[k] || []).map((text, i) => (
                  <NoteCard
                    key={`${k}-${i}`}
                    label={fmtLabel(k)}
                    text={text}
                    accentColor={acc}
                    onRemove={() => removeNote(k, i)}
                  />
                ))
              )
            )}
          </div>
          <div
            style={{
              padding: "10px 14px", borderTop: "0.5px solid #ebebeb", background: "#fff",
            }}
          >
            <div style={{ fontSize: 11, color: "#bdbdbd", marginBottom: 6 }}>
              {rangeStart
                ? `Add note for ${fmtRange(rangeStart, rangeEnd)}`
                : "Select a date first"}
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
              <textarea
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); addNote(); }
                }}
                placeholder="Type a note... (Enter to add)"
                rows={2}
                disabled={!rangeStart}
                style={{
                  flex: 1, border: "0.5px solid #d0d0d0", borderRadius: 8,
                  padding: "7px 10px", fontSize: 12, fontFamily: "inherit",
                  resize: "none", outline: "none",
                  background: rangeStart ? "#fff" : "#f9f9f9",
                  color: "#444", lineHeight: 1.5,
                  opacity: rangeStart ? 1 : 0.6,
                }}
              />
              <button
                className="wcal-addbtn"
                onClick={addNote}
                disabled={!rangeStart || !noteInput.trim()}
                style={{
                  background: acc, color: "#fff", border: "none",
                  borderRadius: 8, padding: "0 14px", fontSize: 12,
                  cursor: rangeStart && noteInput.trim() ? "pointer" : "not-allowed",
                  opacity: rangeStart && noteInput.trim() ? 1 : 0.45,
                  height: 36, whiteSpace: "nowrap", transition: "opacity 0.15s",
                  fontFamily: "inherit",
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 8, display: "flex", justifyContent: "flex-end" }}>
        <button
          className="wcal-export"
          onClick={exportNotes}
          style={{
            fontSize: 12, color: "#9e9e9e", background: "#fff",
            border: "0.5px solid #d0d0d0", borderRadius: 6,
            padding: "5px 14px", cursor: "pointer", fontFamily: "inherit",
            transition: "background 0.15s",
          }}
        >
          Export notes (.txt)
        </button>
      </div>
    </div>
  );
}
