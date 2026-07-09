import React, { useState, useEffect } from "react";
import uploadimage from "../assets/uploadimage.png";

function HostNewPage() {
  const [coverImageurl, setCoverImageUrl] = useState(null);

  const [coverImage, setCoverImage] = useState(null);

  const [user_id, setUserId] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("id");

    setUserId(id);

    console.log(id);
  }, []);

  const defaulteventform = {
    title: "",
    category: "",
    language: "",
    state: "",
    city: "",
    date: "",
    time: "",
    duration: "",
    eventType: "paid",
    price: 0,
    totaltickets: 0,

    volunteersEnabled: false,
    volunteersRequiredCount: 0,

    description: "",
  };

  const [eventform, setEventForm] = useState(defaulteventform);

  /* =========================================================
     HANDLE SUBMIT
  ========================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("title", eventform.title);

    data.append("category", eventform.category);

    data.append("language", eventform.language);

    data.append("state", eventform.state);

    data.append("city", eventform.city);

    data.append("date", eventform.date);

    data.append("time", eventform.time);

    data.append("duration", eventform.duration);
    data.append("eventType", eventform.eventType);

    // data.append("price", eventform.price);
    data.append("price", eventform.eventType === "free" ? 0 : eventform.price);

    data.append("totaltickets", eventform.totaltickets);

    data.append("volunteersEnabled", eventform.volunteersEnabled);

    data.append("volunteersRequiredCount", eventform.volunteersRequiredCount);

    data.append("description", eventform.description);

    data.append("coverImage", coverImage);

    data.append("user_id", user_id);

    try {
      /* ---------------- CREATE EVENT ---------------- */

      const res = await fetch("/api/createevent", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      const result = await res.json();

      /* ---------------- REGISTER ORGANIZER ---------------- */

      const token = localStorage.getItem("token");

      await fetch("/userevent/register", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          eventId: result.event._id,
          role: "Organizer",
        }),
      });

      /* ---------------- RESET ---------------- */

      setEventForm(defaulteventform);

      HandleCoverImgRemove();

      alert(`the form is ${result.msg}`);

      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };

  /* =========================================================
     HANDLE COVER IMAGE
  ========================================================= */

  const HandleCoverImg = (e) => {
    try {
      const file = e.target.files[0];

      setCoverImage(file);

      const imagePath = URL.createObjectURL(file);

      setCoverImageUrl(imagePath);

      e.target.value = null;
    } catch (e) {
      console.log(e);

      console.log("image not selected");
    }
  };

  /* =========================================================
     HANDLE CHANGE
  ========================================================= */

  // const handleChange = (e) => {
  //   setEventForm({
  //     ...eventform,

  //     [e.target.name]:
  //       e.target.type === "number" ? Number(e.target.value) : e.target.value,
  //   });
  // };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (name === "eventType") {
      setEventForm({
        ...eventform,
        eventType: value,
        price: value === "free" ? 0 : eventform.price,
      });
      return;
    }

    setEventForm({
      ...eventform,
      [name]: type === "number" ? Number(value) : value,
    });
  };
  /* =========================================================
     REMOVE COVER IMAGE
  ========================================================= */

  const HandleCoverImgRemove = () => {
    setCoverImage(null);

    setCoverImageUrl(null);
  };

  console.log(eventform);

  return (
    <div className="w-full flex justify-center px-4">
      <div className="w-9/10 bg-(--secondaryColor)/50 darkMode:bg-(--primaryColor)/60 my-6 rounded-2xl pb-8 shadow-sm">
        <div className="text-5xl font-bold text-center py-7.5 text-(--primaryColor) darkMode:text-(--secondaryColor)">
          Create Event
        </div>

        <div className="createeventform mx-50 p-8 bg-white darkMode:bg-(--primaryColor)/40 rounded-2xl">
          <form className="flex flex-col text-xl gap-y-1" onSubmit={handleSubmit}>
            {/* TITLE */}

            <label className="font-semibold mb-1">Title*</label>

            <input
              type="text"
              className="border border-gray-200 mt-1 p-3 w-full mb-4 rounded-xl text-black bg-gray-50"
              value={eventform.title}
              name="title"
              onChange={handleChange}
              placeholder="Event Name"
              required
            />

            {/* CATEGORY + LANGUAGE */}

            <div className="flex flex-row gap-x-6">
              <div className="flex flex-col mb-4">
                <label className="mb-1">Category*</label>

                <select
                  className="border border-gray-200 p-3 mt-1 rounded-xl w-50 text-black bg-gray-50"
                  name="category"
                  value={eventform.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">select</option>

                  <option value="Tech">Tech</option>

                  <option value="Cultural">Cultural</option>

                  <option value="Art">Art</option>

                  <option value="Medical">Medical</option>

                  <option value="Music">Music</option>

                  <option value="Dance">Dance</option>

                  <option value="Business">Business</option>

                  <option value="Pharma">Pharma</option>

                  <option value="Games">Games</option>

                  <option value="Other">Other</option>

                  <option value="Nature">Nature</option>
                </select>
              </div>

              <div className="flex flex-col mb-4">
                <label className="mb-1">language*</label>

                <select
                  className="border border-gray-200 p-3 mt-1 rounded-xl w-50 text-black bg-gray-50"
                  name="language"
                  value={eventform.language}
                  onChange={handleChange}
                  required
                >
                  <option value="">select</option>

                  <option value="English">English</option>

                  <option value="Telugu">Telugu</option>

                  <option value="Hindi">Hindi</option>

                  <option value="Tamil">Tamil</option>
                </select>
              </div>
            </div>

            {/* LOCATION */}

            <div className="flex flex-row gap-x-7.5">
              <div className="flex flex-col mb-4">
                <label className="mb-1">state*</label>

                <input
                  type="text"
                  className="border border-gray-200 p-3 mt-1 rounded-xl text-black bg-gray-50"
                  name="state"
                  value={eventform.state}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col mb-4">
                <label className="mb-1">city*</label>

                <input
                  type="text"
                  className="border border-gray-200 p-3 mt-1 rounded-xl text-black bg-gray-50"
                  name="city"
                  value={eventform.city}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* DATE + TIME */}

            <div className="start-timings mb-4">
              <label className="mb-1 block">Event starts at*</label>

              <div className="flex flex-row gap-x-5">
                <input
                  type="date"
                  value={eventform.date}
                  name="date"
                  className="border border-gray-200 p-3 mt-1 rounded-xl text-black bg-gray-50"
                  onChange={handleChange}
                  required
                />

                <input
                  type="time"
                  value={eventform.time}
                  name="time"
                  className="border border-gray-200 p-3 mt-1 rounded-xl text-black bg-gray-50"
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  value={eventform.duration}
                  name="duration"
                  className="border border-gray-200 p-3 mt-1 rounded-xl text-black bg-gray-50"
                  onChange={handleChange}
                  placeholder="duration"
                  required
                />
              </div>
            </div>

            {/* COVER IMAGE */}

            <label className="mb-1">upload cover image*</label>

            <div className="coverimage-upload h-37.5 w-100 mb-4 relative bg-gray-50 flex flex-col justify-center items-center gap-2 border-2 border-dotted border-gray-300 rounded-xl overflow-hidden">
              {coverImage === null ? (
                <>
                  <img src={uploadimage} className="h-12.5 w-12.5" />

                  <label
                    htmlFor="selectcover"
                    className="text-blue-400 cursor-pointer"
                  >
                    choose Image*
                  </label>
                </>
              ) : (
                <>
                  <img src={coverImageurl} className="h-full w-full object-cover" />

                  <button
                    type="button"
                    className="absolute top-2 right-2 border border-gray-200 bg-white rounded-full h-8 w-8 flex items-center justify-center shadow-sm"
                    onClick={HandleCoverImgRemove}
                  >
                    ❌
                  </button>
                </>
              )}

              <input
                type="file"
                accept="image/*"
                id="selectcover"
                className="hidden"
                onChange={HandleCoverImg}
              />
            </div>

            {/* PRICE + TICKETS */}



            <div className="grid grid-cols-3 gap-5 mb-4">
              <div className="flex flex-col">
                <label className="mb-1">Event Type*</label>

                <select
                  className="border border-gray-200 p-3 mt-1 rounded-xl text-black w-full bg-gray-50"
                  name="eventType"
                  value={eventform.eventType}
                  onChange={handleChange}
                  required
                >
                  <option value="paid">Paid</option>
                  <option value="free">Free</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="mb-1">Price of ticket Rs*</label>

                <input
                  type="number"
                  className={`border border-gray-200 p-3 mt-1 rounded-xl text-black w-full ${eventform.eventType === "free" ? "bg-gray-200 cursor-not-allowed" : "bg-gray-50"
                    }`}
                  name="price"
                  value={eventform.eventType === "free" ? 0 : eventform.price}
                  onChange={handleChange}
                  disabled={eventform.eventType === "free"}
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1">Total tickets*</label>

                <input
                  type="number"
                  value={eventform.totaltickets}
                  name="totaltickets"
                  className="border border-gray-200 p-3 mt-1 rounded-xl text-black w-full bg-gray-50"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* <div className="flex flex-row">
              <div className="flex flex-col my-2.5">
                <label>Price of ticket Rs*</label>

                <input
                  type="number"
                  className="border p-2.5 mt-1 rounded-xl text-black"
                  name="price"
                  value={eventform.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col m-2.5">
                <label>Total tickets*</label>

                <input
                  type="number"
                  value={eventform.totaltickets}
                  name="totaltickets"
                  className="border p-2.5 mt-1 rounded-xl text-black"
                  onChange={handleChange}
                  required
                />
              </div>
            </div> */}

            {/* VOLUNTEERS */}

            <div className="flex flex-col mb-4">
              <label className="font-semibold mb-1">Need Volunteers?</label>

              <select
                className="border border-gray-200 p-3 mt-1 rounded-xl text-black bg-gray-50"
                value={eventform.volunteersEnabled}
                onChange={(e) =>
                  setEventForm({
                    ...eventform,

                    volunteersEnabled: e.target.value === "true",
                  })
                }
              >
                <option value={false}>No</option>

                <option value={true}>Yes</option>
              </select>
            </div>

            {eventform.volunteersEnabled && (
              <div className="flex flex-col mb-4">
                <label className="font-semibold mb-1">
                  Number of Volunteers Required
                </label>

                <input
                  type="number"
                  min={1}
                  name="volunteersRequiredCount"
                  value={eventform.volunteersRequiredCount}
                  onChange={handleChange}
                  className="border border-gray-200 p-3 mt-1 rounded-xl text-black bg-gray-50"
                />
              </div>
            )}

            {/* DESCRIPTION */}

            <label className="mb-1">Description*</label>

            <textarea
              rows={3}
              maxLength={300}
              value={eventform.description}
              name="description"
              className="border border-gray-200 text-xl p-3 w-full mb-4 rounded-xl text-black bg-gray-50"
              onChange={handleChange}
              required
            />

            {/* SUBMIT */}

            <button
              type="submit"
              className="bg-violet-500 text-white p-3 w-full rounded-xl font-medium"
            >
              submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HostNewPage;