import React, { useState } from "react";
import { Pencil, X } from "lucide-react";

function ProfilePage() {
  const loggedInUser = "someone ";
  const [activeHistoryTab, setActiveHistoryTab] = useState("participated");

  const [profile, setProfile] = useState({
    username: "someone",
    email: "someone@example.com",
    bio: "I like participating, organizing and volunteering in events.",
    skills: ["React", "Node.js", "MongoDB"],
    education: "B.Tech in Computer Science",
    stats: {
      participated: 5,
      organized: 2,
      volunteered: 4,
    },
    history: {
      participated: [
        { id: 1, title: "Hackathon", date: "Jan 2025" },
        { id: 2, title: "AI Workshop", date: "Feb 2025" },
      ],
      organized: [{ id: 3, title: "Tech Fest", date: "Mar 2025" }],
      volunteered: [{ id: 4, title: "Startup Meetup", rating: 4.5 }],
    },
  });

  const isOwner = loggedInUser === profile.username;

  /* ---------------- EDIT STATES ---------------- */
  const [editBio, setEditBio] = useState(false);
  const [editSkills, setEditSkills] = useState(false);
  const [editEducation, setEditEducation] = useState(false);

  const [tempBio, setTempBio] = useState(profile.bio);
  const [tempEducation, setTempEducation] = useState(profile.education);
  const [newSkill, setNewSkill] = useState("");

  /* ---------------- HANDLERS ---------------- */

  const saveBio = () => {
    setProfile({ ...profile, bio: tempBio });
    setEditBio(false);
  };

  const saveEducation = () => {
    setProfile({ ...profile, education: tempEducation });
    setEditEducation(false);
  };

  const addSkill = () => {
    if (!newSkill.trim()) return;
    setProfile({
      ...profile,
      skills: [...profile.skills, newSkill],
    });
    setNewSkill("");
  };

  const removeSkill = (skill) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter((s) => s !== skill),
    });
  };

  return (
    <div className="p-6 space-y-8">
      {/* ================= SECTION 1 ================= */}
      <div className="p-6 rounded-2xl border space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-(--accentColor)">
            {profile.username}
          </h1>
          <p className="text-(--accentColor)/70">{profile.email}</p>
        </div>

        {/* ABOUT */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-(--accentColor)">About</h2>

            {isOwner && (
              <Pencil
                size={18}
                className="cursor-pointer"
                onClick={() => setEditBio(true)}
              />
            )}
          </div>

          {editBio ? (
            <div className="space-y-2">
              <textarea
                value={tempBio}
                onChange={(e) => setTempBio(e.target.value)}
                className="w-full p-2 rounded border"
              />
              <button
                onClick={saveBio}
                className="px-3 py-1 rounded bg-(--secondaryColor)"
              >
                Save
              </button>
            </div>
          ) : (
            <p className="text-(--accentColor)/80">{profile.bio}</p>
          )}
        </div>
      </div>
      {/* ================= SECTION 2 ================= */}
      <div className="p-6 rounded-2xl border space-y-6">
        {/* STATS */}
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(profile.stats).map(([key, value]) => (
            <div key={key} className="p-4 rounded-xl text-center border">
              <p className="text-xl font-bold text-(--accentColor)">{value}</p>
              <p className="text-(--accentColor)/70 capitalize">{key}</p>
            </div>
          ))}
        </div>

        {/* SKILLS */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-(--accentColor)">Skills</h2>

            {isOwner && (
              <Pencil
                size={18}
                className="cursor-pointer"
                onClick={() => setEditSkills(!editSkills)}
              />
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, idx) => (
              <div
                key={idx}
                className="flex items-center px-3 py-1 rounded-xl border"
              >
                {skill}

                {editSkills && (
                  <X
                    size={14}
                    className="ml-2 cursor-pointer"
                    onClick={() => removeSkill(skill)}
                  />
                )}
              </div>
            ))}
          </div>

          {editSkills && (
            <div className="mt-3 flex gap-2">
              <input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="p-2 rounded border"
                placeholder="Add skill"
              />
              <button
                onClick={addSkill}
                className="px-3 py-1 rounded bg-(--secondaryColor)"
              >
                Add
              </button>
            </div>
          )}
        </div>

        {/* EDUCATION */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-(--accentColor)">Education</h2>

            {isOwner && (
              <Pencil
                size={18}
                className="cursor-pointer"
                onClick={() => setEditEducation(true)}
              />
            )}
          </div>

          {editEducation ? (
            <div className="space-y-2">
              <input
                value={tempEducation}
                onChange={(e) => setTempEducation(e.target.value)}
                className="p-2 rounded border w-full"
              />
              <button
                onClick={saveEducation}
                className="px-3 py-1 rounded bg-(--secondaryColor)"
              >
                Save
              </button>
            </div>
          ) : (
            <p className="text-(--accentColor)/80">{profile.education}</p>
          )}
        </div>
      </div>
      {/* /* ================= SECTION 3: EVENT HISTORY (TABS) ================= */}
      <div className="p-6 rounded-2xl border space-y-6">
        <h2 className="font-semibold text-(--accentColor)">Event History</h2>

        {/* TABS */}
        <div className="flex gap-3">
          {["participated", "organized", "volunteered"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveHistoryTab(tab)}
              className={`px-4 py-1 rounded-xl text-sm font-medium transition ${
                activeHistoryTab === tab
                  ? "bg-(--secondaryColor) text-(--accentColor)"
                  : "border text-(--accentColor)/70"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* ACTIVE TAB CONTENT */}
        <EventSection
          title={activeHistoryTab}
          data={profile.history[activeHistoryTab]}
          showRating={activeHistoryTab === "volunteered"}
        />
      </div>
    </div>
  );
}

/* ---------------- EVENT CARDS (LIKE BEFORE STYLE) ---------------- */

const EventSection = ({ title, data, showRating }) => {
  return (
    <div>
      <h3 className="mb-3 font-medium text-(--accentColor)">{title}</h3>

      <div className="grid gap-3">
        {data.map((event) => (
          <div
            key={event.id}
            className="p-4 rounded-xl border flex justify-between items-center hover:shadow-sm transition"
          >
            <div>
              <h4 className="font-semibold text-(--accentColor)">
                {event.title}
              </h4>

              {!showRating && (
                <p className="text-sm text-(--accentColor)/70">{event.date}</p>
              )}
            </div>

            {showRating && (
              <span className="text-(--accentColor)">⭐ {event.rating}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
