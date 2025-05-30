import Image from "next/image";
import React from "react";
import img from "@/assets/more-pictures.png";

function MorePictures() {
  return (
    <div>
      <Image src={img} alt="More Pictures" className="w-full" />
    </div>
  );
}

export default MorePictures;
