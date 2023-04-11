"use client";

import Image from "next/image";
import useSWR from "swr";
import fetchImages from "@/lib/fetchImages";

type ImageType = {
    name: string;
    url: string;
};

function Images() {
    const {
        data: images,
        isLoading,
        mutate: refreshImages,
        isValidating,
    } = useSWR("images", fetchImages, {
        revalidateOnFocus: false,
    });

    return (
        <div>
            <button
                className="fixed bottom-10 right-10 z-20 rounded-md bg-violet-400/90 px-5 py-3 font-bold text-white hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400"
                onClick={() => refreshImages(images)}
            >
                {!isLoading && isValidating ? "Refreshing..." : "Refresh Images"}
            </button>

            {isLoading && (
                <p className="animate-pulse pb-7 text-center font-extralight">
                    Loading <span className="text-violet-400">AI</span> Generated Images...
                </p>
            )}

            <div className="grid grid-cols-1 gap-4 px-0 md:grid-cols-2 md:px-10 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {images?.imageUrls?.map((image: ImageType, i: number) => (
                    <div
                        key={image.name}
                        className={`relative cursor-help transition-transform duration-200 ease-in-out hover:scale-[103%] ${
                            i === 0 && "md:col-span-2 md:row-span-2"
                        }`}
                    >
                        {/* create a white div that when hovered it appears */}
                        <div className="absolute z-10 flex h-full w-full items-center justify-center bg-white opacity-0 transition-opacity duration-200 hover:opacity-80">
                            <p className="p-5 text-center text-lg font-light">
                                {/* This removes the Timestamp and File extension */}
                                {image.name.split("_").shift()?.toString().split(".").shift()}
                            </p>
                        </div>
                        <Image
                            src={image.url}
                            alt={image.name}
                            height={800}
                            width={800}
                            className="-z-10 w-full rounded-sm shadow-2xl drop-shadow-lg"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Images;
