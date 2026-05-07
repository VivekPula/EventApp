import React, { useState, useRef,useEffect } from "react";
import uploadimage from "../assets/uploadimage.png"

import { useAuth } from "../contexts/AuthContext"

function HostNewPage() {

  const [coverImageurl, setCoverImageUrl] = useState(null)
  const [coverImage, setCoverImage] = useState(null)

  const [user_id, setUserId] = useState('')

  useEffect(() => {
    const id = localStorage.getItem("id");
    setUserId(id);
    console.log(id); // correct value
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
    price: 0,
    totaltickets: 0,
    description: "",
  }

  const [eventform, setEventForm] = useState(defaulteventform)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData();
    data.append("title", eventform.title);
    data.append("category", eventform.category);
    data.append("language", eventform.language);
    data.append("state", eventform.state);
    data.append("city", eventform.city);
    data.append("date", eventform.date);
    data.append("time", eventform.time);
    data.append("duration", eventform.duration);
    data.append("price", eventform.price);
    data.append("totaltickets", eventform.totaltickets);
    data.append("description", eventform.description);
    data.append("coverImage", coverImage);
    data.append("user_id", user_id);

    try {
      const res = await fetch("/api/createevent", { //change the act url
        method: "POST",
        body: data
      });
      if (!res.ok) {
        throw new Error("Something went wrong");
      }
      const result = await res.json();
      setEventForm(defaulteventform);
      HandleCoverImgRemove();
      alert(`the form is ${result.msg}`);
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  }

  const HandleCoverImg = (e) => {
    try {
      const file = e.target.files[0]
      setCoverImage(file)
      const imagePath = URL.createObjectURL(file)
      setCoverImageUrl(imagePath)
      // console.log(file);
      // console.log(imagePath);
      e.target.value = null
    }
    catch (e) {
      console.log(e);
      console.log("image not selected");
    }
  }

  const handleChange = (e) => {
    setEventForm({ ...eventform, [e.target.name]: e.target.value })

    //works only if the input has both name and value 


  }
  const HandleCoverImgRemove = (e) => {
    setCoverImage(null)
    setCoverImageUrl(null)
  }

  // console.log(eventform.language)


  console.log(eventform);
  return (
    <div className=" w-full flex justify-center">
      <div className="w-8/10 bg-(--secondaryColor)/50 darkMode:bg-(--primaryColor)/60 my-2 rounded-2xl pb-5">
      <div className="text-5xl font-bold  text-center py-7.5">Create Event </div>
      <div className="createeventform mx-50  p-5 ">
        <form className='flex flex-col text-xl' onSubmit={handleSubmit}>
          <label className="font-semibold">Title* </label>
          <input type="text" className="border mt-1  p-2.5 w-full mb-2.5  rounded-xl text-black" value={eventform.title} name="title" onChange={handleChange} placeholder="Event Name" required></input>

          <div className="flex flex-row">
            <div className="flex flex-col my-2.5">
              <label >Category* </label>

              <select className="border p-2.5 mt-1  rounded-xl w-50 text-black" name='category' value={eventform.category} onChange={handleChange} required>
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

            <div className="flex flex-col my-2.5 ml-5 ">
              <label  >language* </label>
              <select className="border p-2.5 mt-1   rounded-xl  w-50 text-black" name='language' value={eventform.language} onChange={handleChange} required>
                <option value="">select</option>
                <option value="English">English</option>
                <option value="Telugu">Telugu</option>
                <option value="Hindi">Hindi</option>
                <option value="Tamil">Tamil</option>
              </select>
            </div>
          </div>


          <div className="flex flex-row ">
            <div className="flex flex-col my-2.5 ">
              <label>state* </label>
              <input type='text' className="border p-2.5 mt-1  rounded-xl text-black" name="state" value={eventform.state} onChange={handleChange} required ></input>
            </div>

            <div className="flex flex-col my-2.5 ml-7.5 ">
              <label>city* </label>
              <input type='text' className="border p-2.5 mt-1   rounded-xl text-black" name="city" value={eventform.city} onChange={handleChange} required ></input>
            </div>

          </div>

          {/* <div className="flex flex-row">
            <div className="flex flex-col my-[10px]">
              <label>area* </label>
              <input type='text' className="border-1 p-[10px] bg-gray-100 rounded-[5px]" value={area} onChange={(e) => setArea(e.target.value)} required ></input>
            </div>

            <div className="flex flex-col m-[10px]  ml-[30px]">
              <label>street address* </label>
              <input type='text' className="border-1 p-[10px]  bg-gray-100 rounded-[5px] " value={street} onChange={(e) => setStreet(e.target.value)}></input>
            </div>

          </div> */}


          <div className="start-timings">
            <label>Event starts at* </label>
            <div className="flex flex-row gap-x-2.5">
              <input type="date" value={eventform.date} name="date" className="border p-2.5 my-2.5  mr-2.5   rounded-xl text-black" onChange={handleChange} required ></input>
              <input type="time" value={eventform.time} name="time" className="border p-2.5 my-2.5   rounded-xl text-black" onChange={handleChange} placeholder="time" required></input>
              <input type="text" value={eventform.duration} name="duration" className="border p-2.5 my-2.5   rounded-xl text-black" onChange={handleChange} placeholder="duration" required></input>
            </div>
          </div>





          <label>upload cover image* </label>

          <div className="coverimage-upload h-37.5 w-100  my-2.5 relative bg-gray-100  flex flex-col justify-center items-center border-2 border-dotted  rounded-xl">
            {coverImage === null ? (<>
              < img src={uploadimage} className="h-12.5 w-12.5" ></img>
              <label htmlFor="selectcover" className="text-blue-400 cursor-pointer">choose Image* </label></>)
              : (<>
                <img src={coverImageurl} className="h-full w-full " ></img>
                <button className="absolute top-0 right-0 border-2 bg-amber-50 " onClick={HandleCoverImgRemove}>❌</button>
              </>)}
            <input type="file" accept="image/*" id="selectcover" className="hidden " onChange={HandleCoverImg}></input>
          </div>



          <div className="flex flex-row ">
            <div className="flex flex-col my-2.5">
              <label>Price of ticket Rs* </label>
              <input type='number' className="border p-2.5 mt-1  rounded-xl text-black" name="price" value={eventform.price} onChange={handleChange} required ></input>
            </div>

            <div className="flex flex-col m-2.5">
              <label>Total tickets* </label>
              <input type='number' value={eventform.totaltickets} name="totaltickets" className="border p-2.5 mt-1  rounded-xl text-black" onChange={handleChange} required ></input>
            </div>
          </div>

          <label>Description* </label>
          <textarea rows={3} maxLength={300} value={eventform.description} name="description" className="border text-xl p-2.5 w-full my-2.5   rounded-xl text-black" onChange={handleChange} required></textarea>


          <button type="submit" className="bg-violet-500 text-white p-2.5 w-full  rounded-xl">submit</button>
        </form>
      </div>


        </div>
    </div >
  )
}

export default HostNewPage;
