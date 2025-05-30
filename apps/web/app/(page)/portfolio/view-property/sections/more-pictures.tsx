import Image from "next/image";
import React from "react";

function MorePictures() {
  return (
    <div>
      <Image
        src="/assets/more-pictures.png"
        alt="More Pictures"
        className="w-full"
        width={1200}
        height={800}
      />
    </div>
  );
}

export default MorePictures;
