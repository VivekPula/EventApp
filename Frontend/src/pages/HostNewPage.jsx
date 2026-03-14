import React, { useState, useRef } from "react";
import uploadimage from "../assets/uploadimage.png"
function HostNewPage() {

  const [title, setTitle] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [area, setArea] = useState('')
  const [street, setStreet] = useState('')

  const [category, setCategory] = useState('tech')
  const [startdate, setStartDate] = useState("")
  const [starttime, setStartTime] = useState("")
  //location usestate is not added 
  const [description, setDescription] = useState("")
  const [ticketprice, setTicketPrice] = useState(0)
  const [tickets, setTickets] = useState(0)
  const [enddate, setEndDate] = useState("")
  const [endtime, setEndTime] = useState("")
  const [coverImage, setCoverImage] = useState(null)


  const handleSubmit = (e) => {
    alert("form submitted");
  }



  const HandleCoverImg = (e) => {
    try {
      const file = e.target.files[0]
      const imagePath = URL.createObjectURL(file)
      setCoverImage(imagePath)
      // console.log(file);
      // console.log(imagePath);
      e.target.value = null
    }
    catch (e) {
      console.log(e);
      console.log("image not selected");
    }

  }

  const HandleCoverImgRemove = (e) => {
    setCoverImage(null)
  }




  return (
    <div className=" bg-gray-100 ">
      <div className="text-5xl font-bold  text-center py-[30px]">create event </div>
      <div className="createeventform mx-[200px]  p-[20px] bg-white ">
        <form className='flex flex-col text-xl' onSubmit={handleSubmit}>
          <label >Title* </label>
          <input type="text" className="border-1 p-[10px] w-[100%] bg-gray-100 rounded-[5px]" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="en name" required></input>

          <div className="flex flex-row ">
            <div className="flex flex-col my-[10px]">
              <label>state* </label>
              <input type='text' className="border-1 p-[10px] bg-gray-100 rounded-[5px]" value={state} onChange={(e)=>setState(e.target.value)}  required ></input>
            </div>

            <div className="flex flex-col my-[10px] ml-[30px]">
              <label>city* </label>
              <input type='text' className="border-1 p-[10px] bg-gray-100 rounded-[5px] " value={city} onChange={(e)=>setCity(e.target.value)} required ></input>
            </div>

          </div>
          <div className="flex flex-row">
            <div className="flex flex-col my-[10px]">
              <label>area* </label>
              <input type='text' className="border-1 p-[10px] bg-gray-100 rounded-[5px]" value={area} onChange={(e)=>setArea(e.target.value)} required ></input>
            </div>

            <div className="flex flex-col m-[10px]  ml-[30px]">
              <label>street address* </label>
              <input type='text' className="border-1 p-[10px]  bg-gray-100 rounded-[5px] " value={street} onChange={(e)=>setStreet(e.target.value)}></input>
            </div>

          </div>

          <div className="event-timings flex flex-row">
            <div className="start-timings">
              <label>Event starts at* </label>
              <div className="flex flex-row">
                <input type="date" value={startdate} className="border-1 p-[10px] my-[10px]  mr-[10px]  bg-gray-100 rounded-[5px]" onChange={(e) => setStartDate(e.target.value)}></input>
                <input type="time" value={starttime} className="border-1 p-[10px] my-[10px]  bg-gray-100 rounded-[5px]" onChange={(e) => setStartTime(e.target.value)}></input>
              </div>
            </div>

            <div className="end-timings ml-[50px] ">
              <label>Event ends at* </label>
              <div className="flex flex-row">
                <input type="date" value={enddate} className="border-1 p-[10px] my-[10px]  mr-[10px]  bg-gray-100 rounded-[5px]" onChange={(e) => setEndDate(e.target.value)}></input>
                <input type="time" value={endtime} className="border-1 p-[10px] my-[10px]  bg-gray-100 rounded-[5px]" onChange={(e) => setEndTime(e.target.value)}></input>
              </div>
            </div>

          </div>


          <label>upload cover image* </label>

          <div className="coverimage-upload h-[150px] w-[400px]  my-[10px] relative  flex flex-col justify-center items-center border-2 border-dotted  bg-gray-100 rounded-[5px]">
            {coverImage === null ? (<>
              < img src={uploadimage} className="h-[50px] w-[50px]" ></img>
              <label htmlFor="selectcover" className="text-blue-400">choose Image* </label></>)
              : (<>
                <img src={coverImage} className="h-[100%] w-[100%] " ></img>
                <button className="absolute top-0 right-0 border-2 bg-amber-50 " onClick={HandleCoverImgRemove}>❌</button>
              </>)}
            <input type="file" accept="image/*" id="selectcover" className="hidden " onChange={HandleCoverImg}></input>
          </div>



          <div className="flex flex-row ">
            <div className="flex flex-col my-[10px]">
              <label>Price of ticket Rs* </label>
              <input type='number' className="border-1 p-[10px]  bg-gray-100 rounded-[5px] " onChange={(e) => setTicketPrice(e.target.value)} required ></input>
            </div>

            <div className="flex flex-col m-[10px]">
              <label>Total tickets* </label>
              <input type='number' className="border-1 p-[10px]  bg-gray-100 rounded-[5px] " onChange={(e) => setTickets(e.target.value)} required ></input>
            </div>

          </div>

          <label>Description* </label>
          <textarea rows={3} maxLength={300} className="border-1 text-xl p-[10px] w-[100%] my-[10px]  bg-gray-100 rounded-[5px]" onChange={((e) => setDescription(e.target.value))}></textarea>


          <button type="submit" className="bg-violet-500 text-white p-[10px] w-[200px] ">submit</button>
        </form>
      </div>

      <p>{state} {city} {area} {street}</p>

    </div >
  )
}

export default HostNewPage;
