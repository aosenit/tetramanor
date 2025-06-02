import React from "react";
import Image from "next/image";
import Pagination from "./Pagination";
import two from "@/assets/blog/two.webp"
export default function SingleBlog() {
  return (
    <div>
      <div className="space-y-10">
        <div className="h-full overflow-y-auto  rounded-md">
          <Image
            src={two}
            alt="queen"
            className="w-full object-cover"
            width={1000}
            height={1000}
          />
          <div className="space-y-4 py-12">
            <h5 className="text-xl font-semibold">Equity-Based Model</h5>
            <p className="text-black text-justify leading-relaxed">
              Lorem ipsum dolor sit amet consectetur. Ut felis fermentum gravida
              amet netus. Pretium risus quis vulputate sed egestas massa. Lacus
              et tincidunt orci habitant nisl cras feugiat luctus porttitor. Et
              felis luctus nunc sed nec nec sed lectus et. Sem elit est non
              fringilla a. Vitae ut cras vivamus orci sed scelerisque ipsum
              volutpat. Sem nulla dui nunc nunc. Enim sodales suscipit cras
              quis. Sed et a vitae rutrum pellentesque fermentum consequat
              fermentum odio. Urna pharetra ornare amet id. Quam odio tortor
              dapibus vel. Nec nunc pulvinar amet rhoncus turpis volutpat auctor
              eget. Sodales varius nec eget quisque. Auctor tortor lorem sed dui
              quam platea. Lorem ipsum dolor sit amet consectetur. Ut felis
              fermentum gravida amet netus. Pretium risus quis vulputate sed
              egestas massa. Lacus et tincidunt orci habitant nisl cras feugiat
              luctus porttitor. Et felis luctus nunc sed nec nec sed lectus et.
              Sem elit est non fringilla a. Vitae ut cras vivamus orci sed
              scelerisque ipsum volutpat.
            </p>
          </div>
          <div className="space-y-4 py-12">
            <h5 className="text-xl font-semibold">Equity-Based Model</h5>
            <p className="text-black text-justify leading-relaxed">
              Lorem ipsum dolor sit amet consectetur. Ut felis fermentum gravida
              amet netus. Pretium risus quis vulputate sed egestas massa. Lacus
              et tincidunt orci habitant nisl cras feugiat luctus porttitor. Et
              felis luctus nunc sed nec nec sed lectus et. Sem elit est non
              fringilla a. Vitae ut cras vivamus orci sed scelerisque ipsum
              volutpat. Sem nulla dui nunc nunc. Enim sodales suscipit cras
              quis. Sed et a vitae rutrum pellentesque fermentum consequat
              fermentum odio. Urna pharetra ornare amet id. Quam odio tortor
              dapibus vel. Nec nunc pulvinar amet rhoncus turpis volutpat auctor
              eget. Sodales varius nec eget quisque. Auctor tortor lorem sed dui
              quam platea. Lorem ipsum dolor sit amet consectetur. Ut felis
              fermentum gravida amet netus. Pretium risus quis vulputate sed
              egestas massa. Lacus et tincidunt orci habitant nisl cras feugiat
              luctus porttitor. Et felis luctus nunc sed nec nec sed lectus et.
              Sem elit est non fringilla a. Vitae ut cras vivamus orci sed
              scelerisque ipsum volutpat.
            </p>
          </div>
        </div>
      </div>
      <div className="">
        <Pagination />
      </div>
    </div>
  );
}
