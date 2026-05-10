import React, { useEffect, useState } from "react";
import {
  Pencil,
  X,
  Star,
  Calendar,
  Users,
  Award,
  Zap,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import { useParams } from "react-router-dom";

/* ── Google Fonts injection ── */
if (typeof document !== "undefined" && !document.getElementById("pp-fonts")) {
  const link = document.createElement("link");
  link.id = "pp-fonts";
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;1,9..144,400&family=Geist:wght@300;400;500;600&display=swap";
  document.head.appendChild(link);
}

/* ── Injected styles (animations + scoped classes) ── */
if (typeof document !== "undefined" && !document.getElementById("pp-styles")) {
  const style = document.createElement("style");
  style.id = "pp-styles";
  style.textContent = `
    .pp-serif  { font-family: 'Fraunces', Georgia, serif; }
    .pp-sans   { font-family: 'Geist', system-ui, sans-serif; }

    @keyframes pp-up   { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
    @keyframes pp-fade { from { opacity:0; } to { opacity:1; } }
    @keyframes pp-glow {
      0%,100% { box-shadow:0 0 0 3px rgba(171,35,255,0.18),0 0 20px rgba(171,35,255,0.12); }
      50%      { box-shadow:0 0 0 3px rgba(171,35,255,0.30),0 0 32px rgba(171,35,255,0.22); }
    }

    .pp-up   { animation: pp-up   0.55s cubic-bezier(0.22,1,0.36,1) both; }
    .pp-fade { animation: pp-fade 0.25s ease both; }
    .pp-d1 { animation-delay:0.05s; }
    .pp-d2 { animation-delay:0.12s; }
    .pp-d3 { animation-delay:0.19s; }

    /* cards */
    .pp-card {
      background: var(--bg, #ffffff);
      border: 1px solid rgba(0,0,0,0.07);
      box-shadow: 0 2px 16px rgba(0,0,0,0.06);
      transition: border-color .3s, box-shadow .3s;
    }
    .pp-card:hover {
      border-color: rgba(171,35,255,0.15);
      box-shadow: 0 16px 56px rgba(171,35,255,0.10);
    }

    /* stat tiles */
    .pp-stat {
      background: rgba(171,35,255,0.04);
      border: 1px solid rgba(171,35,255,0.09);
      transition: all .25s cubic-bezier(0.22,1,0.36,1);
      cursor: default;
    }
    .pp-stat:hover {
      background: rgba(171,35,255,0.09);
      border-color: rgba(171,35,255,0.35);
      transform: translateY(-4px);
      box-shadow: 0 10px 32px rgba(171,35,255,0.12);
    }
    .pp-stat:hover .pp-stat-num { color: var(--primary-color, #ab23ff); }

    /* skill chips */
    .pp-chip {
      background: rgba(171,35,255,0.06);
      border: 1px solid rgba(171,35,255,0.14);
      color: rgba(171,35,255,0.75);
      transition: all .18s;
    }
    .pp-chip:hover {
      background: rgba(171,35,255,0.13);
      border-color: rgba(171,35,255,0.40);
      color: var(--primary-color, #ab23ff);
    }

    /* tabs */
    .pp-tab-on  {
      background: linear-gradient(135deg, var(--primary-color, #ab23ff), #c94dff);
      color: #fff;
      box-shadow: 0 2px 16px rgba(171,35,255,0.30);
    }
    .pp-tab-off {
      background: rgba(171,35,255,0.04);
      color: rgba(0,0,0,0.40);
      border: 1px solid rgba(171,35,255,0.09);
    }
    .pp-tab-off:hover {
      background: rgba(171,35,255,0.08);
      color: var(--primary-color, #ab23ff);
    }

    /* event rows */
    .pp-event {
      background: rgba(171,35,255,0.03);
      border: 1px solid rgba(171,35,255,0.08);
      transition: all .22s cubic-bezier(0.22,1,0.36,1);
    }
    .pp-event:hover {
      background: rgba(171,35,255,0.07);
      border-color: rgba(171,35,255,0.18);
      transform: translateX(5px);
    }
    .pp-event:hover .pp-arrow { opacity:1; transform:translateX(0); }
    .pp-arrow { opacity:0; transform:translateX(-5px); transition:all .2s; color: rgba(171,35,255,0.35); }

    /* avatar */
    .pp-avatar { animation: pp-glow 3.5s ease-in-out infinite; }

    /* form controls */
    .pp-input, .pp-textarea {
      background: rgba(171,35,255,0.04);
      border: 1px solid rgba(171,35,255,0.15);
      color: var(--fg, #1a1a2e);
      font-family: 'Geist', system-ui, sans-serif;
      transition: border-color .2s, box-shadow .2s;
    }
    .pp-input::placeholder, .pp-textarea::placeholder {
      color: rgba(171,35,255,0.35);
    }
    .pp-input:focus, .pp-textarea:focus {
      outline: none;
      border-color: rgba(171,35,255,0.55);
      box-shadow: 0 0 0 3px rgba(171,35,255,0.10);
    }
    .pp-textarea { resize: none; }
    .pp-btn-green {
      background: linear-gradient(135deg, var(--primary-color, #ab23ff), #c94dff);
      color: #fff;
      font-family: 'Geist', system-ui, sans-serif;
      font-weight: 600;
      transition: all .2s;
    }
    .pp-btn-green:hover {
      box-shadow: 0 4px 20px rgba(171,35,255,0.35);
      transform: translateY(-1px);
    }

    .pp-edit-btn {
      background: rgba(171,35,255,0.06);
      border: 1px solid rgba(171,35,255,0.12);
      color: rgba(171,35,255,0.45);
      transition: all .18s;
    }
    .pp-edit-btn:hover {
      background: rgba(171,35,255,0.12);
      border-color: rgba(171,35,255,0.40);
      color: var(--primary-color, #ab23ff);
    }

    .pp-divider {
      height:1px;
      background: linear-gradient(90deg, transparent, rgba(171,35,255,0.12), transparent);
    }
    .pp-accent-line {
      height:2px;
      background: linear-gradient(90deg, var(--primary-color, #ab23ff), #c94dff, transparent);
      border-radius:99px;
    }
    .pp-label {
      font-size:0.68rem;
      font-weight:600;
      letter-spacing:0.14em;
      text-transform:uppercase;
      color: var(--primary-color, #ab23ff);
      opacity: 0.75;
    }
  `;
  document.head.appendChild(style);
}

/* ── stat icon lookup ── */
const STAT_ICONS = {
  participated: <Users size={14} />,
  organized: <Award size={14} />,
  volunteered: <Zap size={14} />,
};

/* ══════════════════════════════════════════════
   PROFILE PAGE
══════════════════════════════════════════════ */
function ProfilePage() {
  const { username } = useParams();

  const loggedInUser = localStorage.getItem("name");

  const [activeHistoryTab, setActiveHistoryTab] = useState("participated");

  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);

  /* ---------------- EDIT STATES ---------------- */

  const [editBio, setEditBio] = useState(false);
  const [editSkills, setEditSkills] = useState(false);
  const [editEducation, setEditEducation] = useState(false);

  const [tempBio, setTempBio] = useState("");
  const [tempEducation, setTempEducation] = useState("");
  const [newSkill, setNewSkill] = useState("");

  /* ---------------- FETCH PROFILE ---------------- */

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/user/u/${username}`);

        const data = await response.json();
        console.log(data);

        setProfile(data);

        setTempBio(data.bio || "");
        setTempEducation(data.education || "");
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  /* ---------------- LOADING ---------------- */

  if (loading) {
    return (
      <div className="p-6" style={{ color: "var(--primary-color, #ab23ff)" }}>
        <span
          className="pp-sans text-xs tracking-widest uppercase animate-pulse"
          style={{ color: "rgba(171,35,255,0.55)" }}
        >
          Loading profile…
        </span>
      </div>
    );
  }

  if (!profile) {
    return <div className="p-6 text-red-500">Profile not found</div>;
  }

  /* ---------------- OWNER CHECK ---------------- */

  const isOwner = loggedInUser === profile.username;

  /* ---------------- UPDATE PROFILE API ---------------- */

  const updateProfile = async (updatedFields) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`/userinfo/update`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(updatedFields),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setProfile((prev) => ({
        ...prev,
        ...data.profile,
      }));

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  /* ---------------- SAVE BIO ---------------- */

  const saveBio = async () => {
    const success = await updateProfile({ bio: tempBio });
    if (success) setEditBio(false);
  };

  /* ---------------- SAVE EDUCATION ---------------- */

  const saveEducation = async () => {
    const success = await updateProfile({ education: tempEducation });
    if (success) setEditEducation(false);
  };

  /* ---------------- ADD SKILL ---------------- */

  const addSkill = async () => {
    if (!newSkill.trim()) return;

    const updatedSkills = [...profile.skills, newSkill];

    const success = await updateProfile({ skills: updatedSkills });

    if (success) {
      setProfile((prev) => ({ ...prev, skills: updatedSkills }));
      setNewSkill("");
    }
  };

  /* ---------------- REMOVE SKILL ---------------- */

  const removeSkill = async (skill) => {
    const updatedSkills = profile.skills.filter((s) => s !== skill);

    const success = await updateProfile({ skills: updatedSkills });

    if (success) {
      setProfile((prev) => ({ ...prev, skills: updatedSkills }));
    }
  };

  const initials = (profile.username || "??").slice(0, 2).toUpperCase();

  /* ─────────────────────────────────────────
     RENDER
  ───────────────────────────────────────── */
  return (
    <div
      className="space-y-8 flex flex-col flex-1 justify-center items-center pt-8 pb-10"
      style={{ background: "var(--bg-back, #f5f3ff)" }}
    >
      {/* ================= SECTION 1 ================= */}
      <div className="pp-card pp-sans rounded-2xl w-full max-w-2xl pp-up pp-d1 overflow-hidden">
        {/* top accent stripe */}
        <div className="pp-accent-line" />

        <div className="p-7 space-y-6">
          {/* identity row */}
          <div className="flex items-center gap-5">
            {/* avatar */}
            <div
              className="pp-avatar shrink-0 rounded-full flex items-center justify-center pp-serif"
              style={{
                width: 66,
                height: 66,
                background:
                  "linear-gradient(135deg, var(--primary-color, #ab23ff) 0%, #c94dff 100%)",
                color: "#fff",
                fontSize: 24,
                fontWeight: 600,
              }}
            >
              {initials}
            </div>

            <div>
              <h1
                className="pp-serif leading-tight"
                style={{
                  fontSize: "1.85rem",
                  color: "var(--fg, #1a1a2e)",
                  letterSpacing: "-0.025em",
                  fontWeight: 600,
                }}
              >
                {profile.username}
              </h1>
              <p
                className="pp-sans text-sm mt-0.5"
                style={{
                  color: "rgba(171,35,255,0.45)",
                  letterSpacing: "0.025em",
                }}
              >
                {profile.email}
              </p>
            </div>
          </div>

          {/* ABOUT */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="pp-label">About</span>
              {isOwner && (
                <button
                  className="pp-edit-btn w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer"
                  onClick={() => setEditBio(true)}
                >
                  <Pencil size={13} />
                </button>
              )}
            </div>

            {editBio ? (
              <div className="space-y-3 pp-fade">
                <textarea
                  value={tempBio}
                  onChange={(e) => setTempBio(e.target.value)}
                  rows={4}
                  placeholder="Write something about yourself…"
                  className="pp-textarea w-full p-3 rounded-xl text-sm"
                />
                <button
                  onClick={saveBio}
                  className="pp-btn-green px-5 py-2 rounded-full text-xs tracking-wide"
                >
                  Save changes
                </button>
              </div>
            ) : (
              <p
                className="pp-sans text-sm leading-relaxed"
                style={{
                  color: profile.bio
                    ? "var(--fg, #1a1a2e)"
                    : "rgba(171,35,255,0.30)",
                  fontStyle: profile.bio ? "normal" : "italic",
                  opacity: profile.bio ? 0.75 : 1,
                }}
              >
                {profile.bio || "No bio added yet."}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ================= SECTION 2 ================= */}
      <div className="pp-card pp-sans rounded-2xl w-full max-w-2xl pp-up pp-d2 p-7 space-y-6">
        {/* STATS */}
        <div>
          <p className="pp-label mb-4">Activity</p>
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(profile.stats).map(([key, value]) => (
              <div key={key} className="pp-stat rounded-xl p-4 text-center">
                <div
                  className="mx-auto mb-2.5 rounded-lg flex items-center justify-center"
                  style={{
                    width: 30,
                    height: 30,
                    background: "rgba(171,35,255,0.10)",
                    color: "var(--primary-color, #ab23ff)",
                  }}
                >
                  {STAT_ICONS[key] || <Zap size={14} />}
                </div>
                <p
                  className="pp-stat-num pp-serif transition-colors duration-200"
                  style={{
                    fontSize: "1.6rem",
                    color: "var(--fg, #1a1a2e)",
                    lineHeight: 1,
                  }}
                >
                  {value}
                </p>
                <p
                  className="pp-sans capitalize mt-1"
                  style={{
                    fontSize: "0.68rem",
                    letterSpacing: "0.09em",
                    color: "rgba(171,35,255,0.45)",
                  }}
                >
                  {key}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="pp-divider" />

        {/* SKILLS */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="pp-label">Skills</span>
            {isOwner && (
              <button
                className="pp-edit-btn w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer"
                onClick={() => setEditSkills(!editSkills)}
              >
                <Pencil size={13} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {profile.skills.length > 0 ? (
              profile.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="pp-chip flex items-center px-3 py-1.5 rounded-full text-xs font-medium"
                >
                  {skill}
                  {editSkills && (
                    <X
                      size={12}
                      className="ml-2 cursor-pointer opacity-50 hover:opacity-100 hover:text-red-400 transition-all"
                      onClick={() => removeSkill(skill)}
                    />
                  )}
                </div>
              ))
            ) : (
              <p
                className="text-xs italic"
                style={{ color: "rgba(171,35,255,0.30)" }}
              >
                No skills listed yet.
              </p>
            )}
          </div>

          {editSkills && (
            <div className="mt-3 flex gap-2 pp-fade">
              <input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addSkill()}
                className="pp-input flex-1 px-4 py-2 rounded-full text-xs"
                placeholder="Add skill"
              />
              <button
                onClick={addSkill}
                className="pp-btn-green px-4 py-2 rounded-full text-xs"
              >
                Add
              </button>
            </div>
          )}
        </div>

        <div className="pp-divider" />

        {/* EDUCATION */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="pp-label">Education</span>
            {isOwner && (
              <button
                className="pp-edit-btn w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer"
                onClick={() => setEditEducation(true)}
              >
                <Pencil size={13} />
              </button>
            )}
          </div>

          {editEducation ? (
            <div className="space-y-3 pp-fade">
              <input
                value={tempEducation}
                onChange={(e) => setTempEducation(e.target.value)}
                placeholder="e.g. B.Sc. Computer Science, MIT"
                className="pp-input w-full px-4 py-2.5 rounded-xl text-sm"
              />
              <button
                onClick={saveEducation}
                className="pp-btn-green px-5 py-2 rounded-full text-xs tracking-wide"
              >
                Save changes
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div
                className="shrink-0 rounded-xl flex items-center justify-center"
                style={{
                  width: 36,
                  height: 36,
                  background: "rgba(171,35,255,0.08)",
                  color: "var(--primary-color, #ab23ff)",
                }}
              >
                <BookOpen size={15} />
              </div>
              <p
                className="pp-sans text-sm"
                style={{
                  color: profile.education
                    ? "var(--fg, #1a1a2e)"
                    : "rgba(171,35,255,0.30)",
                  fontStyle: profile.education ? "normal" : "italic",
                  opacity: profile.education ? 0.75 : 1,
                }}
              >
                {profile.education || "No education info added yet."}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ================= EVENT HISTORY ================= */}
      <div className="pp-card pp-sans rounded-2xl w-full max-w-2xl pp-up pp-d3 p-7 space-y-6">
        <p className="pp-label">Event History</p>

        {/* TABS */}
        <div
          className="flex gap-1.5 p-1 rounded-xl"
          style={{
            background: "rgba(171,35,255,0.04)",
            border: "1px solid rgba(171,35,255,0.08)",
          }}
        >
          {["participated", "organized", "volunteered"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveHistoryTab(tab)}
              className={`flex-1 py-2 px-3 rounded-[9px] text-xs font-semibold transition-all duration-200 cursor-pointer pp-sans ${
                activeHistoryTab === tab ? "pp-tab-on" : "pp-tab-off"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* ACTIVE TAB */}
        <EventSection
          title={activeHistoryTab}
          data={profile.history[activeHistoryTab]}
          showRating={activeHistoryTab === "volunteered"}
        />
      </div>
    </div>
  );
}

/* ================= EVENT SECTION ================= */

const EventSection = ({ title, data, showRating }) => {
  if (!data || data.length === 0) {
    return (
      <div
        className="pp-sans text-center py-10 text-sm"
        style={{ color: "rgba(171,35,255,0.30)" }}
      >
        <div className="text-3xl mb-2 opacity-30">📭</div>
        No {title} events yet.
      </div>
    );
  }

  return (
    <div className="grid gap-2.5">
      {data.map((event, i) => (
        <div
          key={event.id}
          className="pp-event rounded-xl px-5 py-4 flex items-center justify-between gap-3 pp-fade"
          style={{ animationDelay: `${i * 0.05}s` }}
        >
          {/* status dot */}
          <div
            className="shrink-0 rounded-full"
            style={{
              width: 7,
              height: 7,
              background: "var(--primary-color, #ab23ff)",
              opacity: 0.45,
            }}
          />

          {/* info */}
          <div className="flex-1 min-w-0">
            <h4
              className="pp-sans text-sm font-medium truncate"
              style={{ color: "var(--fg, #1a1a2e)", opacity: 0.78 }}
            >
              {event.title}
            </h4>
            {!showRating && (
              <div
                className="flex items-center gap-1.5 mt-0.5"
                style={{ color: "rgba(171,35,255,0.40)", fontSize: 11 }}
              >
                <Calendar size={11} />
                <span>{event.date}</span>
              </div>
            )}
          </div>

          {/* rating badge */}
          {showRating && (
            <div
              className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold shrink-0"
              style={{
                background: "rgba(171,35,255,0.10)",
                color: "var(--primary-color, #ab23ff)",
              }}
            >
              <Star size={11} fill="currentColor" />
              {event.rating}
            </div>
          )}

          {/* chevron */}
          <ChevronRight size={14} className="pp-arrow shrink-0" />
        </div>
      ))}
    </div>
  );
};

export default ProfilePage;
