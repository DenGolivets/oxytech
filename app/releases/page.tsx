"use client";

import AudioPlayerTwo from "@/components/AudioPlayerComponent/AudioPlayerTwo";
import {
  getReleaseDetails,
  getReleases,
  getTrackId,
} from "@/hooks/getDataBeatport";
import { Release } from "@/types/types";
import Link from "next/link";
import { CSSProperties, useEffect, useState } from "react";
import BounceLoader from "react-spinners/BounceLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

type Props = {};

function ReleasesPage({}: Props) {
  const [releases, setReleases] = useState<Release[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const labelId = 33556;

  useEffect(() => {
    async function fetchReleases() {
      try {
        const releasesData = await getReleases(labelId, page);
        setReleases(releasesData);

        const releasesWithDetails = await Promise.all(
          releasesData.map(async (release) => {
            const detail = await getReleaseDetails(release.id);
            const track = await getTrackId(detail.tracks[0]);
            return {
              ...release,
              price: detail.price,
              tracks: detail.tracks,
              sample_url: track.sample_url,
              name_track: track.name,
            };
          })
        );
        setReleases(releasesWithDetails);
      } catch (error) {
        console.error("Error fetching releases:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReleases();
  }, [labelId, page]);

  return (
    <div className="p-10 bg-black">
      {isLoading ? (
        <div className="h-screen flex items-center justify-center">
          <BounceLoader
            color="red"
            cssOverride={override}
            size={150}
            loading={true}
            speedMultiplier={1}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {releases.map((release, index) => {

            function truncateText(text: string, maxLength: number) {
              if (text.length <= maxLength) return text;
              return `${text.slice(0, maxLength)}...`;

            }
            return (
              <div
                key={release.id}
                className="bg-gray-800 rounded-lg shadow-md overflow-hidden relative border border-black/50 
                h-[750px]"
              >
                {release.image && (
                  <img
                    src={release.image.uri}
                    alt={release.name}
                    className="w-full h-auto object-cover rounded-t-lg hover:scale-105 transition-all duration-500
                    ease-in-out"
                  />
                )}
                <div className="flex items-center justify-between -mb-6">
                  <div className="p-4 flex flex-col items-center pl-10 mt-2">
                    <h1 className="text-2xl text-red-600 font-bold">{release.artists.map((artist) => (
                      <div key={artist.id}>{artist.name}</div>
                    ))}</h1>
                    <h2 className="text-purple-600 text-xl mb-2 font-medium">
                      {truncateText(release.name, 20)}
                    </h2>
                  </div>
                  <div className="flex items-center pr-4">
                    <Link href={`https://www.beatport.com/release/${release.slug}/${release.id}`} target="a_blank">
                      <button className="flex flex-col items-center justify-center bg-[#6c6b6b]
                      px-2 py-1 rounded-lg hover:scale-110 transition-all duration-300">
                        <span className="text-[12px] text-orange-500 font-bold">Buy Now</span>
                        <span className="text-[14px] text-white/60 font-medium">{release.price.display}</span>
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="text-white">
                  <AudioPlayerTwo 
                    src={release.sample_url} 
                    name={release.name_track} 
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className="flex justify-between pt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ReleasesPage;
