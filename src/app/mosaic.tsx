"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
interface ImageData {
  src: string;
  alt: string;
  id: string;
}

interface ImageMosaicProps {
  imageUri: string;
  className?: string;
  maxImages?: number;
  layout?: "grid" | "masonry" | "collage";
  showOverflow?: boolean;
  onClick?: (image: ImageData) => void;
}

// Individual image component with fallback
const MosaicImage: React.FC<{
  image: ImageData;
  className?: string;
  onClick?: (image: ImageData) => void;
}> = ({ image, className, onClick }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={image.src}
        alt={image.alt}
        className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
      />
    </div>
  );
};

export function parseSpotifyMosaicUri(mosaicUri: string): ImageData[] {
  // Validate input format
  if (!mosaicUri.startsWith("spotify:mosaic:")) {
    throw new Error(
      "Invalid Spotify mosaic URI format. Expected format: spotify:mosaic:hash1:hash2:..."
    );
  }

  // Split the URI and extract image hashes
  const parts = mosaicUri.split(":");

  // Remove 'spotify' and 'mosaic' parts, keep only the hash parts
  const imageHashes = parts.slice(2);

  if (imageHashes.length === 0) {
    throw new Error("No image hashes found in mosaic URI");
  }

  // Convert each hash to ImageData object
  return imageHashes.map((hash, index) => ({
    id: (index + 1).toString(),
    src: `https://i.scdn.co/image/${hash}`,
    alt: `Album ${index + 1}`,
  }));
}

// Main mosaic component
export const ImageMosaic: React.FC<ImageMosaicProps> = ({
  imageUri,
  className = "",
  maxImages = 9,
  layout = "grid",
  showOverflow = true,
  onClick,
}) => {
  const images = parseSpotifyMosaicUri(imageUri);
  const displayImages = images.slice(0, maxImages);
  const overflowCount = images.length - maxImages;

  const handleImageClick = (image: ImageData) => {
    // setSelectedImage(image);
    // onClick?.(image);
  };

  console.log("images", images);

  const getLayoutClasses = () => {
    switch (layout) {
      case "masonry":
        return "columns-3 gap-4 space-y-4";
      case "collage":
        return "grid grid-cols-4 grid-rows-3 gap-2";
      default:
        return "grid grid-cols-3 gap-4";
    }
  };

  const getImageClasses = (index: number, total: number) => {
    if (layout === "collage") {
      // Create interesting collage layout
      if (total >= 6) {
        switch (index) {
          case 0:
            return "col-span-2 row-span-2 rounded-lg";
          case 1:
            return "col-span-1 row-span-1 rounded-lg";
          case 2:
            return "col-span-1 row-span-1 rounded-lg";
          case 3:
            return "col-span-1 row-span-1 rounded-lg";
          case 4:
            return "col-span-2 row-span-1 rounded-lg";
          case 5:
            return "col-span-1 row-span-1 rounded-lg";
          default:
            return "col-span-1 row-span-1 rounded-lg";
        }
      }
    }

    if (layout === "masonry") {
      return "break-inside-avoid rounded-lg";
    }

    return "aspect-square rounded-lg";
  };

  return (
    <div className={`${className}`}>
      <div className={getLayoutClasses()}>
        {displayImages.map((image, index) => (
          <div key={image.id} className="relative">
            <MosaicImage
              image={image}
              className={getImageClasses(index, displayImages.length)}
            />

            {/* Overflow indicator on last image */}
            {showOverflow &&
              overflowCount > 0 &&
              index === displayImages.length - 1 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg">
                  <span className="text-white font-bold text-xl">
                    +{overflowCount}
                  </span>
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};
