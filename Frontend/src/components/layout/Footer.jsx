import { Instagram, Mail, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <div className=" ml-50  relative z-20">
      <div className="w-full py-12 bg-gray-200 flex justify-center items-top flex-col">
        <div className="w-2/6 ml-auto mr-auto flex justify-around items-center mb-8">
          <Youtube />
          <Instagram />
          <Twitter />
          <Mail />
        </div>
        <div className="ml-auto mr-auto text-center">
          This webpage is part of a project made by students, all the rights that are required may not have been acquired
          <br /> EventApp Project
        </div>
      </div>
    </div>
  );
};
export default Footer;
