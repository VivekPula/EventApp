import React from "react";

function VolunteerApplications({ applications, eventId, refreshData }) {
  /* =========================================================
     APPROVE VOLUNTEER
  ========================================================= */

  const approveVolunteer = async (registrationId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `/userevent/volunteer/approve/${registrationId}`,
        {
          method: "PUT",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to approve volunteer");

        return;
      }

      alert("Volunteer approved");

      refreshData();
    } catch (e) {
      console.log(e);

      alert("Error approving volunteer");
    }
  };

  /* =========================================================
     REJECT VOLUNTEER
  ========================================================= */

  const rejectVolunteer = async (registrationId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`/userevent/volunteer/reject/${registrationId}`, {
        method: "PUT",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to reject volunteer");

        return;
      }

      alert("Volunteer rejected");

      refreshData();
    } catch (e) {
      console.log(e);

      alert("Error rejecting volunteer");
    }
  };

  /* =========================================================
     STATUS STYLING
  ========================================================= */

  const getStatusStyle = (status) => {
    if (status === "approved") {
      return "bg-green-100 text-green-700";
    }

    if (status === "rejected") {
      return "bg-red-100 text-red-700";
    }

    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 w-full">
      {/* HEADER */}

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Volunteer Applications
        </h2>

        <p className="text-sm text-gray-500">
          Total Applications : {applications.length}
        </p>
      </div>

      {/* TABLE */}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-[var(--primaryColor)]/10 text-gray-700">
              <th className="px-4 py-3 text-left font-semibold">
                Registration ID
              </th>

              <th className="px-4 py-3 text-left font-semibold">Username</th>

              <th className="px-4 py-3 text-left font-semibold">Email</th>

              <th className="px-4 py-3 text-left font-semibold">Applied At</th>

              <th className="px-4 py-3 text-left font-semibold">Status</th>

              <th className="px-4 py-3 text-left font-semibold">Rating</th>

              <th className="px-4 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {applications.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-10 text-gray-500">
                  No volunteer applications yet
                </td>
              </tr>
            ) : (
              applications.map((item, index) => {
                return (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    {/* REGISTRATION ID */}

                    <td className="px-4 py-3 font-medium text-gray-800">
                      {item.registrationId.slice(-8)}
                    </td>

                    {/* USERNAME */}

                    <td className="px-4 py-3 font-medium text-gray-800">
                      {item.username}
                    </td>

                    {/* EMAIL */}

                    <td className="px-4 py-3 text-gray-700">{item.email}</td>

                    {/* APPLIED TIME */}

                    <td className="px-4 py-3 text-gray-600">
                      {item.registeredAt
                        ? item.registeredAt.slice(0, 10) +
                          ", " +
                          item.registeredAt.slice(11, 19)
                        : "NA"}
                    </td>

                    {/* STATUS */}

                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(item.status)}`}
                      >
                        {item.status}
                      </span>
                    </td>

                    {/* RATING */}

                    <td className="px-4 py-3 text-gray-700">{"Not rated"}</td>

                    {/* ACTIONS */}

                    <td className="px-4 py-3">
                      {item.status === "pending" ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              approveVolunteer(item.registrationId)
                            }
                            className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-xs"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() => rejectVolunteer(item.registrationId)}
                            className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 text-xs"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-500 text-xs">
                          No actions available
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VolunteerApplications;
