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
    termsandconditions:"",
    description: "",
  };

  const [eventform, setEventForm] = useState(defaulteventform);

  /* =========================================================
     HANDLE SUBMIT
  ========================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();
    const str = eventform.termsandconditions
      .split("\n")
      .map((s)=>s.trim())
      .filter((s)=>s.length>0);
    eventform.termsandconditions = str;
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
  
    data.append("termsandconditions",JSON.stringify(eventform.termsandconditions));

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
    if(name === "termsandconditions"){
      const str = eventform.termsandconditions
      .split("\n")
      .map((s)=>s.trim())
      .filter((s)=>s.length>0);
    console.log("HEHEHEHEHEHEEHHE "+str);
    }
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
    <div className="w-full flex justify-center">
      <div className="w-8/10 bg-(--secondaryColor)/50 darkMode:bg-(--primaryColor)/60 my-2 rounded-2xl pb-5">
        <div className="text-5xl font-bold text-center py-7.5">
          Create Event
        </div>

        <div className="createeventform mx-50 p-5">
          <form className="flex flex-col text-xl" onSubmit={handleSubmit}>
            {/* TITLE */}

            <label className="font-semibold">Title*</label>

            <input
              type="text"
              className="border mt-1 p-2.5 w-full mb-2.5 rounded-xl text-black"
              value={eventform.title}
              name="title"
              onChange={handleChange}
              placeholder="Event Name"
              required
            />

            {/* CATEGORY + LANGUAGE */}

            <div className="flex flex-row">
              <div className="flex flex-col my-2.5">
                <label>Category*</label>

                <select
                  className="border p-2.5 mt-1 rounded-xl w-50 text-black"
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

              <div className="flex flex-col my-2.5 ml-5">
                <label>language*</label>

                <select
                  className="border p-2.5 mt-1 rounded-xl w-50 text-black"
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

            <div className="flex flex-row">
              <div className="flex flex-col my-2.5">
                <label>state*</label>

                <input
                  type="text"
                  className="border p-2.5 mt-1 rounded-xl text-black"
                  name="state"
                  value={eventform.state}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col my-2.5 ml-7.5">
                <label>city*</label>

                <input
                  type="text"
                  className="border p-2.5 mt-1 rounded-xl text-black"
                  name="city"
                  value={eventform.city}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* DATE + TIME */}

            <div className="start-timings">
              <label>Event starts at*</label>

              <div className="flex flex-row gap-x-2.5">
                <input
                  type="date"
                  value={eventform.date}
                  name="date"
                  className="border p-2.5 my-2.5 rounded-xl text-black"
                  onChange={handleChange}
                  required
                />

                <input
                  type="time"
                  value={eventform.time}
                  name="time"
                  className="border p-2.5 my-2.5 rounded-xl text-black"
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  value={eventform.duration}
                  name="duration"
                  className="border p-2.5 my-2.5 rounded-xl text-black"
                  onChange={handleChange}
                  placeholder="duration"
                  required
                />
              </div>
            </div>

            {/* COVER IMAGE */}

            <label>upload cover image*</label>

            <div className="coverimage-upload h-37.5 w-100 my-2.5 relative bg-gray-100 flex flex-col justify-center items-center border-2 border-dotted rounded-xl">
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
                  <img src={coverImageurl} className="h-full w-full" />

                  <button
                    type="button"
                    className="absolute top-0 right-0 border-2 bg-amber-50"
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



            <div className="grid grid-cols-3 gap-5 my-2.5">
              <div className="flex flex-col">
                <label>Event Type*</label>

                <select
                  className="border p-2.5 mt-1 rounded-xl text-black w-full"
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
                <label>Price of ticket Rs*</label>

                <input
                  type="number"
                  className={`border p-2.5 mt-1 rounded-xl text-black w-full ${eventform.eventType === "free" ? "bg-gray-200 cursor-not-allowed" : ""
                    }`}
                  name="price"
                  value={eventform.eventType === "free" ? 0 : eventform.price}
                  onChange={handleChange}
                  disabled={eventform.eventType === "free"}
                  required
                />
              </div>

              <div className="flex flex-col">
                <label>Total tickets*</label>

                <input
                  type="number"
                  value={eventform.totaltickets}
                  name="totaltickets"
                  className="border p-2.5 mt-1 rounded-xl text-black w-full"
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

            <div className="flex flex-col my-2.5">
              <label className="font-semibold">Need Volunteers?</label>

              <select
                className="border p-2.5 mt-1 rounded-xl text-black"
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
              <div className="flex flex-col my-2.5">
                <label className="font-semibold">
                  Number of Volunteers Required
                </label>

                <input
                  type="number"
                  min={1}
                  name="volunteersRequiredCount"
                  value={eventform.volunteersRequiredCount}
                  onChange={handleChange}
                  className="border p-2.5 mt-1 rounded-xl text-black"
                />
              </div>
            )}

            <label>Terms and Conditions (seperate sentences please)</label>

            <textarea
              rows={3}
              maxLength={300}
              value={eventform.termsandconditions}
              name="termsandconditions"
              className="border text-xl p-2.5 w-full my-2.5 rounded-xl text-black"
              onChange={handleChange}
            />
            {/* DESCRIPTION */}

            <label>Description*</label>

            <textarea
              rows={3}
              maxLength={300}
              value={eventform.description}
              name="description"
              className="border text-xl p-2.5 w-full my-2.5 rounded-xl text-black"
              onChange={handleChange}
              required
            />

            {/* SUBMIT */}

            <button
              type="submit"
              className="bg-violet-500 text-white p-2.5 w-full rounded-xl"
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