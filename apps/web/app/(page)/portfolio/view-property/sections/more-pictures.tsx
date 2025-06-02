import Image from "next/image";
import React from "react";
import more from "@/assets/portfolio/more.webp"


function MorePictures() {
  return (
    <div>
      <Image
        src={more}
        alt="More Pictures"
        className="w-full"
        width={1200}
        height={800}
      />
    </div>
  );
}

export default MorePictures;
