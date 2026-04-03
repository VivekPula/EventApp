import React, { useState, useRef } from "react";
import uploadimage from "../assets/uploadimage.png"
function HostNewPage() {

  const [coverImageurl, setCoverImageUrl] = useState(null)
  const [coverImage, setCoverImage] = useState(null)

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
    description: ""
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
      HandleCoverImgRemove()
      alert(`the form is ${result.msg}`)
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
    <div className=" bg-gray-100 w-[100%] ">
      <div className="text-5xl font-bold  text-center py-[30px]">create event </div>
      <div className="createeventform mx-[200px]  p-[20px] bg-white ">
        <form className='flex flex-col text-xl' onSubmit={handleSubmit}>
          <label >Title* </label>
          <input type="text" className="border-1 p-[10px] w-[100%] mb-[10px] bg-gray-100 rounded-[5px]" value={eventform.title} name="title" onChange={handleChange} placeholder="en name" required></input>

          <div className="flex flex-row">
            <div className="flex flex-col my-[10px]">
              <label >Category* </label>

              <select className="border-1 p-[10px]  bg-gray-100 rounded-[5px] w-[200px]" name='category' value={eventform.category} onChange={handleChange} required>
                <option value="">select</option>
                <option value="tech">tech</option>
                <option value="cultural">cultural</option>
                <option value="art">art</option>
                <option value="medical">medical</option>
                <option value="music">music</option>
                <option value="dance">dance</option>
                <option value="business">business</option>
                <option value="pharma">pharma</option>
              </select>
            </div>

            <div className="flex flex-col my-[10px] ml-[20px]">
              <label  >language* </label>
              <select className="border-1 p-[10px]   bg-gray-100 rounded-[5px]  w-[200px]" name='language' value={eventform.language} onChange={handleChange} required>
                <option value="">select</option>
                <option value="english">english</option>
                <option value="telugu">telugu</option>
                <option value="hindi">hindi</option>
              </select>
            </div>
          </div>


          <div className="flex flex-row ">
            <div className="flex flex-col my-[10px]">
              <label>state* </label>
              <input type='text' className="border-1 p-[10px] bg-gray-100 rounded-[5px]" name="state" value={eventform.state} onChange={handleChange} required ></input>
            </div>

            <div className="flex flex-col my-[10px] ml-[30px]">
              <label>city* </label>
              <input type='text' className="border-1 p-[10px] bg-gray-100 rounded-[5px] " name="city" value={eventform.city} onChange={handleChange} required ></input>
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
            <div className="flex flex-row gap-x-[10px]">
              <input type="date" value={eventform.date} name="date" className="border-1 p-[10px] my-[10px]  mr-[10px]  bg-gray-100 rounded-[5px]" onChange={handleChange} required ></input>
              <input type="time" value={eventform.time} name="time" className="border-1 p-[10px] my-[10px]  bg-gray-100 rounded-[5px]" onChange={handleChange} placeholder="time" required></input>
              <input type="text" value={eventform.duration} name="duration" className="border-1 p-[10px] my-[10px]  bg-gray-100 rounded-[5px]" onChange={handleChange} placeholder="duration" required></input>
            </div>
          </div>





          <label>upload cover image* </label>

          <div className="coverimage-upload h-[150px] w-[400px]  my-[10px] relative  flex flex-col justify-center items-center border-2 border-dotted  bg-gray-100 rounded-[5px]">
            {coverImage === null ? (<>
              < img src={uploadimage} className="h-[50px] w-[50px]" ></img>
              <label htmlFor="selectcover" className="text-blue-400 cursor-pointer">choose Image* </label></>)
              : (<>
                <img src={coverImageurl} className="h-[100%] w-[100%] " ></img>
                <button className="absolute top-0 right-0 border-2 bg-amber-50 " onClick={HandleCoverImgRemove}>❌</button>
              </>)}
            <input type="file" accept="image/*" id="selectcover" className="hidden " onChange={HandleCoverImg}></input>
          </div>



          <div className="flex flex-row ">
            <div className="flex flex-col my-[10px]">
              <label>Price of ticket Rs* </label>
              <input type='number' className="border-1 p-[10px]  bg-gray-100 rounded-[5px] " name="price" value={eventform.price} onChange={handleChange} required ></input>
            </div>

            <div className="flex flex-col m-[10px]">
              <label>Total tickets* </label>
              <input type='number' value={eventform.totaltickets} name="totaltickets" className="border-1 p-[10px]  bg-gray-100 rounded-[5px] " onChange={handleChange} required ></input>
            </div>
          </div>

          <label>Description* </label>
          <textarea rows={3} maxLength={300} value={eventform.description} name="description" className="border-1 text-xl p-[10px] w-[100%] my-[10px]  bg-gray-100 rounded-[5px]" onChange={handleChange} required></textarea>


          <button type="submit" className="bg-violet-500 text-white p-[10px] w-[100%]  ">submit</button>
        </form>
      </div>



    </div >
  )
}

export default HostNewPage;
