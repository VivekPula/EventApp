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

/* ── ONLY animations kept ── */
if (typeof document !== "undefined" && !document.getElementById("pp-styles")) {
  const style = document.createElement("style");

  style.id = "pp-styles";

  style.textContent = `
    @keyframes pp-up {
      from {
        opacity:0;
        transform:translateY(20px);
      }

      to {
        opacity:1;
        transform:translateY(0);
      }
    }

    @keyframes pp-fade {
      from { opacity:0; }
      to { opacity:1; }
    }

    @keyframes pp-glow {
      0%,100% {
        box-shadow:
          0 0 0 3px rgba(171,35,255,0.18),
          0 0 20px rgba(171,35,255,0.12);
      }

      50% {
        box-shadow:
          0 0 0 3px rgba(171,35,255,0.30),
          0 0 32px rgba(171,35,255,0.22);
      }
    }

    .pp-up {
      animation: pp-up 0.55s cubic-bezier(0.22,1,0.36,1) both;
    }

    .pp-fade {
      animation: pp-fade 0.25s ease both;
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

function ProfilePage() {
  const { username } = useParams();

  const loggedInUser = localStorage.getItem("name");

  const [activeHistoryTab, setActiveHistoryTab] = useState("participated");

  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);

  const [editBio, setEditBio] = useState(false);
  const [editSkills, setEditSkills] = useState(false);
  const [editEducation, setEditEducation] = useState(false);

  const [tempBio, setTempBio] = useState("");
  const [tempEducation, setTempEducation] = useState("");
  const [newSkill, setNewSkill] = useState("");

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

  if (loading) {
    return (
      <div className="p-6" style={{ color: "var(--primaryColor)" }}>
        <span
          className="animate-pulse font-['Geist'] text-xs uppercase tracking-widest"
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

  const isOwner = loggedInUser === profile.username;

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

  const saveBio = async () => {
    const success = await updateProfile({ bio: tempBio });

    if (success) setEditBio(false);
  };

  const saveEducation = async () => {
    const success = await updateProfile({
      education: tempEducation,
    });

    if (success) setEditEducation(false);
  };

  const addSkill = async () => {
    if (!newSkill.trim()) return;

    const updatedSkills = [...profile.skills, newSkill];

    const success = await updateProfile({
      skills: updatedSkills,
    });

    if (success) {
      setProfile((prev) => ({
        ...prev,
        skills: updatedSkills,
      }));

      setNewSkill("");
    }
  };

  const removeSkill = async (skill) => {
    const updatedSkills = profile.skills.filter((s) => s !== skill);

    const success = await updateProfile({
      skills: updatedSkills,
    });

    if (success) {
      setProfile((prev) => ({
        ...prev,
        skills: updatedSkills,
      }));
    }
  };

  const initials = (profile.username || "??").slice(0, 2).toUpperCase();

  return (
    <div
      className="flex flex-1 flex-col items-center justify-center space-y-8 pt-8 pb-10"
      style={{ background: "var(--bg-back, #f5f3ff)" }}
    >
      {/* ================= SECTION 1 ================= */}
      <div
        className="pp-up w-full max-w-2xl overflow-hidden rounded-2xl border bg-white font-['Geist'] transition-all duration-300 hover:border-[rgba(171,35,255,0.15)] hover:shadow-[0_16px_56px_rgba(171,35,255,0.10)]"
        style={{
          borderColor: "rgba(0,0,0,0.07)",
          boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
        }}
      >
        {/* accent line */}
        <div className="h-[2px] rounded-full bg-[linear-gradient(90deg,var(--primaryColor),#c94dff,transparent)]" />

        <div className="space-y-6 p-7">
          {/* identity row */}
          <div className="flex items-center gap-5">
            {/* avatar */}
            <div
              className="flex shrink-0 items-center justify-center rounded-full font-['Fraunces'] animate-[pp-glow_3.5s_ease-in-out_infinite]"
              style={{
                width: 66,
                height: 66,
                background:
                  "linear-gradient(135deg, var(--primaryColor) 0%, #c94dff 100%)",
                color: "#fff",
                fontSize: 24,
                fontWeight: 600,
              }}
            >
              {initials}
            </div>

            <div>
              <h1
                className="font-['Fraunces'] leading-tight"
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
                className="mt-0.5 font-['Geist'] text-sm"
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
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[var(--primaryColor)] opacity-75">
                About
              </span>

              {isOwner && (
                <button
                  className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border border-[rgba(171,35,255,0.12)] bg-[rgba(171,35,255,0.06)] text-[rgba(171,35,255,0.45)] transition-all duration-200 hover:border-[rgba(171,35,255,0.40)] hover:bg-[rgba(171,35,255,0.12)] hover:text-[var(--primaryColor)]"
                  onClick={() => setEditBio(true)}
                >
                  <Pencil size={13} />
                </button>
              )}
            </div>

            {editBio ? (
              <div className="pp-fade space-y-3">
                <textarea
                  value={tempBio}
                  onChange={(e) => setTempBio(e.target.value)}
                  rows={4}
                  placeholder="Write something about yourself…"
                  className="w-full resize-none rounded-xl border border-[rgba(171,35,255,0.15)] bg-(--tertiary-color) p-3 font-['Geist'] text-sm text-[var(--fg,#1a1a2e)] transition-all duration-200 placeholder:text-[rgba(171,35,255,0.35)] focus:border-[rgba(171,35,255,0.55)] focus:outline-none focus:ring-4 focus:ring-[rgba(171,35,255,0.10)]"
                />

                <button
                  onClick={saveBio}
                  className="rounded-full bg-[linear-gradient(135deg,var(--primaryColor),#c94dff)] px-5 py-2 font-['Geist'] text-xs font-semibold tracking-wide text-white transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_4px_20px_rgba(171,35,255,0.35)]"
                >
                  Save changes
                </button>
              </div>
            ) : (
              <p
                className="font-['Geist'] text-sm leading-relaxed"
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
      <div
        className="pp-up w-full max-w-2xl space-y-6 rounded-2xl border bg-white p-7 font-['Geist'] transition-all duration-300 hover:border-[rgba(171,35,255,0.15)] hover:shadow-[0_16px_56px_rgba(171,35,255,0.10)]"
        style={{
          borderColor: "rgba(0,0,0,0.07)",
          boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
        }}
      >
        {/* STATS */}
        <div>
          <p className="mb-4 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[var(--primaryColor)] opacity-75">
            Activity
          </p>

          <div className="grid grid-cols-3 gap-3">
            {Object.entries(profile.stats).map(([key, value]) => (
              <div
                key={key}
                className="cursor-default rounded-xl border border-[rgba(171,35,255,0.09)] p-4 text-center transition-all duration-200 hover:-translate-y-1 hover:border-[rgba(171,35,255,0.35)]  hover:shadow-[0_10px_32px_rgba(171,35,255,0.12)]"
              >
                <div
                  className="mx-auto mb-2.5 flex items-center justify-center rounded-lg text-(--primaryColor)"
                  style={{
                    width: 30,
                    height: 30,
                    background: "rgba(171,35,255,0.10)",
                  }}
                >
                  {STAT_ICONS[key] || <Zap size={14} />}
                </div>

                <p
                  className="font-['Fraunces'] transition-colors duration-200"
                  style={{
                    fontSize: "1.6rem",
                    color: "var(--fg, #1a1a2e)",
                    lineHeight: 1,
                  }}
                >
                  {value}
                </p>

                <p
                  className="mt-1 font-['Geist'] capitalize text-black/70"
                  style={{
                    fontSize: "0.68rem",
                    letterSpacing: "0.09em",
                  }}
                >
                  {key}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-[linear-gradient(90deg,transparent,rgba(171,35,255,0.12),transparent)]" />

        {/* SKILLS */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[var(--primaryColor)] opacity-75">
              Skills
            </span>

            {isOwner && (
              <button
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border border-[rgba(171,35,255,0.12)] bg-[rgba(171,35,255,0.06)] text-[rgba(171,35,255,0.45)] transition-all duration-200 hover:border-[rgba(171,35,255,0.40)] hover:bg-[rgba(171,35,255,0.12)] hover:text-[var(--primaryColor)]"
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
                  className="flex items-center rounded-full border border-[rgba(171,35,255,0.14)] bg-white px-3 py-1.5 text-xs font-medium text-black/70 transition-all duration-200 hover:border-[rgba(171,35,255,0.40)] hover:bg-[rgba(171,35,255,0.13)] hover:text-[var(--primaryColor)]"
                >
                  {skill}

                  {editSkills && (
                    <X
                      size={12}
                      className="ml-2 cursor-pointer opacity-50 transition-all hover:text-red-400 hover:opacity-100"
                      onClick={() => removeSkill(skill)}
                    />
                  )}
                </div>
              ))
            ) : (
              <p
                className="text-xs italic"
                style={{ color: "--tertiaryColor" }}
              >
                No skills listed yet.
              </p>
            )}
          </div>

          {editSkills && (
            <div className="pp-fade mt-3 flex gap-2">
              <input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addSkill()}
                className="flex-1 rounded-full border border-[rgba(171,35,255,0.15)] bg-(--tertiary-color) px-4 py-2 font-['Geist'] text-xs text-[var(--fg,#1a1a2e)] transition-all duration-200 placeholder:text-[rgba(171,35,255,0.35)] focus:border-[rgba(171,35,255,0.55)] focus:outline-none focus:ring-4 focus:ring-[rgba(171,35,255,0.10)]"
                placeholder="Add skill"
              />

              <button
                onClick={addSkill}
                className="rounded-full bg-[linear-gradient(135deg,var(--primaryColor),#c94dff)] px-4 py-2 font-['Geist'] text-xs font-semibold text-white transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_4px_20px_rgba(171,35,255,0.35)]"
              >
                Add
              </button>
            </div>
          )}
        </div>

        <div className="h-px bg-[linear-gradient(90deg,transparent,rgba(171,35,255,0.12),transparent)]" />

        {/* EDUCATION */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[var(--primaryColor)] opacity-75">
              Education
            </span>

            {isOwner && (
              <button
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border border-[rgba(171,35,255,0.12)] bg-[rgba(171,35,255,0.06)] text-[rgba(171,35,255,0.45)] transition-all duration-200 hover:border-[rgba(171,35,255,0.40)] hover:bg-[rgba(171,35,255,0.12)] hover:text-[var(--primaryColor)]"
                onClick={() => setEditEducation(true)}
              >
                <Pencil size={13} />
              </button>
            )}
          </div>

          {editEducation ? (
            <div className="pp-fade space-y-3">
              <input
                value={tempEducation}
                onChange={(e) => setTempEducation(e.target.value)}
                placeholder="e.g. B.Sc. Computer Science, MIT"
                className="w-full rounded-xl border border-[rgba(171,35,255,0.15)] bg-(--tertiary-color) px-4 py-2.5 font-['Geist'] text-sm text-[var(--fg,#1a1a2e)] transition-all duration-200 placeholder:text-[rgba(171,35,255,0.35)] focus:border-[rgba(171,35,255,0.55)] focus:outline-none focus:ring-4 focus:ring-[rgba(171,35,255,0.10)]"
              />

              <button
                onClick={saveEducation}
                className="rounded-full bg-[linear-gradient(135deg,var(--primaryColor),#c94dff)] px-5 py-2 font-['Geist'] text-xs font-semibold tracking-wide text-white transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_4px_20px_rgba(171,35,255,0.35)]"
              >
                Save changes
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div
                className="flex shrink-0 items-center justify-center rounded-xl"
                style={{
                  width: 36,
                  height: 36,
                  background: "rgba(171,35,255,0.08)",
                  color: "var(--primaryColor)",
                }}
              >
                <BookOpen size={15} />
              </div>

              <p
                className="font-['Geist'] text-sm"
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
      <div
        className="pp-up w-full max-w-2xl space-y-6 rounded-2xl border bg-white p-7 font-['Geist'] transition-all duration-300 hover:border-[rgba(171,35,255,0.15)] hover:shadow-[0_16px_56px_rgba(171,35,255,0.10)]"
        style={{
          borderColor: "rgba(0,0,0,0.07)",
          boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
        }}
      >
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[var(--primaryColor)] opacity-75">
          Event History
        </p>

        {/* tabs */}
        <div
          className="flex gap-1.5 rounded-xl p-1 bg-(--secondaryColor)/20"
          style={{
            border: "1px solid rgba(171,35,255,0.08)",
          }}
        >
          {["participated", "organized", "volunteered"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveHistoryTab(tab)}
              className={`flex-1 rounded-[9px] px-3 py-2 text-xs font-semibold transition-all duration-200 ${
                activeHistoryTab === tab
                  ? "bg-[linear-gradient(135deg,var(--primaryColor),#c94dff)] text-white shadow-[0_2px_16px_rgba(171,35,255,0.30)]"
                  : "border border-[rgba(171,35,255,0.09)] bg-(--tertiary-color) text-black/40 hover:bg-[rgba(171,35,255,0.08)] hover:text-[var(--primaryColor)]"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

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
        className="py-10 text-center font-['Geist'] text-sm"
        style={{ color: "rgba(171,35,255,0.30)" }}
      >
        <div className="mb-2 text-3xl opacity-30">📭</div>
        No {title} events yet.
      </div>
    );
  }

  return (
    <div className="grid gap-2.5">
      {data.map((event, i) => (
        <div
          key={event.id}
          className="group pp-fade flex items-center justify-between gap-3 rounded-xl border border-(--primaryColor)/25 px-5 py-4 transition-all duration-200 hover:translate-x-[5px] hover:border-[rgba(171,35,255,0.18)] hover:bg-[rgba(171,35,255,0.07)]"
          style={{ animationDelay: `${i * 0.05}s` }}
        >
          {/* status dot */}
          <div
            className="shrink-0 rounded-full"
            style={{
              width: 7,
              height: 7,
              background: "var(--primaryColor)",
              opacity: 0.45,
            }}
          />

          {/* info */}
          <div className="min-w-0 flex-1">
            <h4
              className="truncate font-['Geist'] text-sm font-medium"
              style={{
                color: "var(--fg, #1a1a2e)",
                opacity: 0.78,
              }}
            >
              {event.title}
            </h4>

            {!showRating && (
              <div
                className="mt-0.5 flex items-center gap-1.5"
                style={{
                  color: "rgba(171,35,255,0.40)",
                  fontSize: 11,
                }}
              >
                <Calendar size={11} />

                <span>{event.date}</span>
              </div>
            )}
          </div>

          {/* rating */}
          {showRating && (
            <div
              className="flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
              style={{
                background: "rgba(171,35,255,0.10)",
                color: "var(--primaryColor)",
              }}
            >
              <Star size={11} fill="currentColor" />

              {event.rating}
            </div>
          )}

          {/* arrow */}
          <ChevronRight
            size={14}
            className="shrink-0 translate-x-[-5px] text-[rgba(171,35,255,0.35)] opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
          />
        </div>
      ))}
    </div>
  );
};

export default ProfilePage;
