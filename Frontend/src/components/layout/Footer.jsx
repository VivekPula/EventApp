import { Instagram, Mail, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <div className=" ml-50 relative z-20">
      <div className="w-full h-30 bg-gray-400 flex justify-center items-top flex-col">
        <div className="w-2/6 ml-auto mr-auto flex justify-around items-center mb-4">
          <Youtube />
          <Instagram />
          <Twitter />
          <Mail />
        </div>
        <div className="ml-auto mr-auto text-center">
          this is a web page created using react maybe all rights aren't
          reserved.
          <br /> so yeah thats some info
        </div>
      </div>
    </div>
  );
};
export default Footer;
