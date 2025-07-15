"use client";
import { Property } from "../../types";
import Image from "next/image";
import React, { useRef } from "react";
import placeholder from "@/assets/placeholder.jpg";
import { IconButton, Box, Flex } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Skeleton } from "@/components/ui/skeleton";

interface MorePicturesProps {
  property: Property;
}

function MorePictures({ property }: MorePicturesProps) {
  const images = property.images?.filter(img => !img.isPrimary) || [];
  const scrollRef = useRef<HTMLDivElement>(null);
  const showArrows = images.length > 3;

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8; // scroll by 80% of container width
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 lg:px-16 py-12">
      {images.length > 0 ? (
        <Box position="relative" py={4}>
          {showArrows && (
            <IconButton
              aria-label="Scroll left"
              icon={<FaChevronLeft size={24} />}
              onClick={() => scroll("left")}
              position="absolute"
              left={0}
              top="50%"
              transform="translateY(-50%)"
              zIndex={2}
              variant="ghost"
              size="lg"
              display={{ base: "none", md: "flex" }}
            />
          )}
          <Flex
            ref={scrollRef}
            direction="row"
            overflowX="auto"
            className="hide-scrollbar"
            gap={4}
            style={{ scrollBehavior: "smooth" }}
          >
            {images.map((img, idx) => (
              <Box
                key={idx}
                minW={{ base: "180px", md: "250px" }}
                maxW={{ base: "220px", md: "280px" }}
                h={{ base: "180px", md: "220px" }}
                borderRadius="md"
                overflow="hidden"
                boxShadow="sm"
                flexShrink={0}
                bg="gray.100"
              >
                <Image
                  src={img?.imageUrl || placeholder}
                  alt={`More picture ${idx + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  width={400}
                  height={300}
                />
              </Box>
            ))}
          </Flex>
          {showArrows && (
            <IconButton
              aria-label="Scroll right"
              icon={<FaChevronRight size={24} />}
              onClick={() => scroll("right")}
              position="absolute"
              right={0}
              top="50%"
              transform="translateY(-50%)"
              zIndex={2}
              variant="ghost"
              size="lg"
              display={{ base: "none", md: "flex" }}
            />
          )}
        </Box>
      ) : (
        <Image
          src={placeholder}
          alt="More Pictures"
          className="w-full"
          width={1200}
          height={800}
        />
      )}
      <style jsx global>{`
        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default MorePictures;
