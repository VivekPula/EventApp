import { useParams } from "react-router-dom";
import itemImage from "../assets/icon3.jpg";
import itemImage2 from "../assets/icon.avif";
import {
  Calendar,
  Clock,
  Grid3x2,
  Hourglass,
  IndianRupee,
  Languages,
  MapPin,
  Ticket,
  User,
} from "lucide-react";
import ImgScroll from "../components/utils/ImgScroll";
import { useEffect, useState } from "react";

const EventPage = () => {
  const params = useParams();
  let id = params.id;
  const [data, setData] = useState({});
  useEffect(() => {
    console.log(id);
    fetch(`/api/data/${id}`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);
  const imgs = [itemImage, itemImage2];
  let x = id % 2 == 0 ? "voluntary" : "Paid";
  return (
    <div className=" w-full h-full flex gap-5 mx-5 pt-4">
      <div className="flex-3 flex flex-col gap-15">
        <div className="ml-auto mr-auto h-[65vh] w-full max-w-[130vh] flex rounded-3xl overflow-clip justify-center">
          <ImgScroll imgs={imgs} />
        </div>
        <div className="ml-auto mr-auto w-15/16 ">
          <p className="text-4xl font-medium border-b pb-2 border-b-gray-200 text-(--primaryColor)/80">
            Details
          </p>
          <div className="flex flex-wrap">
            <p className="text-xl mt-2 flex-1/2 ">
              <span className="font-semibold text-(--primaryColor)">
                Conducted by :
              </span>{" "}
              by person {data.Slots}{" "}
            </p>
            <p className="text-xl mt-2 flex-1/2 ">
              <span className="font-semibold text-(--primaryColor)">
                Type :
              </span>{" "}
              {x}
            </p>
            <p className="text-xl mt-2 flex-1/2 ">
              <span className="font-semibold text-(--primaryColor)">
                Contributors :
              </span>{" "}
              {data.Slots} people
            </p>
            <p className="text-xl mt-2 flex-1/2 ">
              <span className="font-semibold text-(--primaryColor)">
                Volunteers :
              </span>{" "}
              {data.Slots} people
            </p>
            <p className="text-xl mt-2 flex-1/2 ">
              <span className="font-semibold text-(--primaryColor)">
                Availabe slots :
              </span>{" "}
              {data.Slots}{" "}
            </p>
            <p className="text-xl mt-2 flex-1/2 ">
              <span className="font-semibold text-(--primaryColor)">
                Location :
              </span>{" "}
              {data.Location} at that location
            </p>
          </div>
        </div>

        <div className="ml-auto mr-auto w-15/16  ">
          <p className="text-4xl font-medium border-b pb-2 border-b-gray-300 text-(--primaryColor)/80">
            Description
          </p>
          <p className="text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
            architecto nemo nulla magni hic pariatur illo, quidem veritatis.
            Nihil aut repellat est, nostrum magni unde aperiam ducimus
            reprehenderit a expedita? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quisquam non atque voluptatum aliquam officia,
            itaque, error dolor aliquid ratione laudantium ducimus ullam porro
            consequatur? Laboriosam culpa optio doloremque amet. Inventore?
          </p>
        </div>
        <div className="ml-auto mr-auto w-15/16  ">
          <p className="text-4xl font-medium border-b pb-2 border-b-gray-300 text-(--primaryColor)/80">
            Terms and Conditions
          </p>
          <div className="text-xl">
            <ul className="list-disc pl-6">
              <li>Dont do that</li>
              <li>Dont bring that</li>
              <li>Dont throw that</li>
              <li>Dont something that</li>
            </ul>
          </div>
        </div>
        <div className="ml-auto mr-auto w-15/16">
          <p className="text-4xl font-medium border-b pb-2 border-b-gray-300 mb-1 text-(--primaryColor)/80">
            Organised by
          </p>
          <div className="flex flex-col gap-4 w-full text-xl">
            <div className="flex   gap-6">
              <User className="h-[20vh] w-[20vh] bg-gray-300 rounded-2xl text-gray-600" />
              <div className="mt-2">
                <p>Name</p>
                <p>Info</p>
                <p>Other info</p>
              </div>
            </div>
            <div className="flex   gap-6">
              <User className="h-[20vh] w-[20vh] bg-gray-300 rounded-2xl text-gray-600" />
              <div className="mt-2">
                <p>Name</p>
                <p>Info</p>
                <p>Other info</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className=" sticky top-24 p-2  rounded-2xl bg-(--primaryColor)/10 darkMode:bg-(--accentColor)/60">
          <p className="text-5xl font-medium border-b pb-2 border-b-gray-200 text-center text-(--primaryColor)/80 darkMode:text-(--secondaryColor)">
            {data.title}
          </p>
          <div className="flex flex-col gap-5 mt-4 ml-4 text-xl">
            <p className="flex gap-2 items-center">
              {" "}
              <Calendar className="text-(--accentColor) darkMode:text-(--exColor)/80" />{" "}
              : Date
            </p>
            <p className="flex gap-2 items-center">
              {" "}
              <Clock className="text-(--accentColor) darkMode:text-(--exColor)/80" />{" "}
              : {data.Slots} pm
            </p>
            <p className="flex gap-2 items-center">
              {" "}
              <Hourglass className="text-(--accentColor) darkMode:text-(--exColor)/80" />{" "}
              : Duration
            </p>
            <p className="flex gap-2 items-center">
              {" "}
              <Languages className="text-(--accentColor) darkMode:text-(--exColor)/80" />{" "}
              : Languages
            </p>
            <p className="flex gap-2 items-center">
              {" "}
              <Grid3x2 className="text-(--accentColor) darkMode:text-(--exColor)/80" />{" "}
              : {data.Category}
            </p>
            <p className="flex gap-2 items-center">
              {" "}
              <MapPin className="text-(--accentColor) darkMode:text-(--exColor)/80" />{" "}
              : {data.Location}
            </p>
            <p className="flex gap-2 items-center">
              {" "}
              <Ticket className="text-(--accentColor) darkMode:text-(--exColor)/80" />{" "}
              : {data.Slots}
            </p>
          </div>
          <div className="flex items-center pl-5 pr-5 justify-between mt-5">
            <p className="flex gap-2 items-center text-2xl">
              {" "}
              <IndianRupee className="text-(--accentColor) darkMode:text-(--exColor)/80" />{" "}
              : {data.price}
            </p>
            <input
              type="button"
              className=" text-2xl bg-(--primaryColor) text-purple-50 rounded-2xl p-2"
              value="Join now!"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default EventPage;
