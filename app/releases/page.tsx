"use client";

import {
  getReleaseDetails,
  getReleases,
  getTrackId,
} from "@/hooks/getDataBeatport";
import { Release } from "@/types/types";
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

  // useEffect(() => {
  //   async function fetchReleases() {
  //     setIsLoading(true);
  //     try {
  //       const releasesData: Release[] = await getReleases(labelId, page);
  //       // setReleases(releasesData);
  //       const detailedReleases : ReleaseDetail[] = await Promise.all(
  //         releasesData.map(async (release) => {
  //           const details = await getReleaseDetails(release.id);
  //           return details;
  //         })
  //       );
  //       const combinedReleases = [...releasesData,...detailedReleases ];
  //       console.log(combinedReleases);
  //       setReleases(combinedReleases);
  //     } catch (error) {
  //       console.error('Error fetching releases:', error);
  //     }
  //     setIsLoading(false);
  //   }

  //   fetchReleases();
  // }, [page]);

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
            };
          })
        );
        setReleases(releasesWithDetails);

        // const tracksData = await Promise.all(
        //   releasesWithDetails
        //     .map(async (release) => {
        //       if (release.track_count > 0) {
        //         const trackId = release.url.split("/").pop();
        //         const track = await getTrackId(parseInt(trackId!));
        //         return { releaseId: release.id, track };
        //       }
        //     })
        //     .filter(Boolean)
        // );
        // const trackMap = tracksData.reduce((acc, curr) => {
        //   acc[curr!.releaseId] = curr!.track;
        //   return acc;
        // }, {} as { [key: number]: Track });
        // setTracks(trackMap);
      } catch (error) {
        console.error("Error fetching releases:", error);
      }
    }

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
          {releases.map((release) => {
            // if (!releaseOrDetail) return null;
            // const release = releaseOrDetail as Release;
            // const detail = releaseOrDetail as ReleaseDetail;
            return (
              <div
                key={release.id}
                className="bg-gray-800 rounded-lg shadow-md overflow-hidden relative 
              hover:scale-105 transition-all ease-in-out duration-500 border border-black/50 
              h-[750px]"
              >
                {release.image && (
                  <img
                    src={release.image.uri}
                    alt={release.name}
                    className="w-full h-auto object-cover 
                  rounded-t-lg"
                  />
                )}
                <div className="p-4">
                  <h2 className="text-red-500 text-2xl mb-2">{release.name}</h2>
                </div>
                <div className="text-white">
                  {release.price.display}
                  <audio src={release.sample_url} controls></audio>
                  {/* <AudioPlayerComponent source={release.sample_url} /> */}
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
