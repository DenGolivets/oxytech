'use client'

import React, { CSSProperties } from "react";
import BounceLoader from "react-spinners/BounceLoader";
import { getArtistDetails, getReleases } from '@/hooks/getDataBeatport';
import { Artist, Release } from '@/types/types';
import { useEffect, useState } from 'react';
import Link from "next/link";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

type Props = {}

function ArtistsPage({}: Props) {

  const [artists, setArtists] = useState<Artist[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const labelId = 33556;

  useEffect(() => {
    async function fetchArtists() {
      setIsLoading(true);
      try {
        const releases: Release[] = await getReleases(labelId, page);
        const artistIds = new Set<number>();
        
        // Собираем уникальные ID артистов из релизов
        releases.forEach((release) => {
          release.artists.forEach((artist) => artistIds.add(artist.id));
        });

        // Получаем подробную информацию о каждом артисте
        const artistPromises = Array.from(artistIds).map((id) => getArtistDetails(id));
        const artistsDetails = await Promise.all(artistPromises);

        setArtists(artistsDetails);
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
      setIsLoading(false);
    }

    fetchArtists();
  }, [page]);

  return (
    <div className="p-10 bg-black">
      {isLoading? (
        <div className='h-screen flex items-center justify-center'>
          <BounceLoader
            color='red'
            cssOverride={override}
            size={150}
            loading={true}
            speedMultiplier={1}
            aria-label="Loading Spinner"
            data-testid='loader'
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {artists.map((artist) => (
            <Link href={`https://www.beatport.com/artist/${artist.slug}/${artist.id}`} target="a_blank">
              <div key={artist.id} className="bg-gray-800 rounded-lg shadow-md overflow-hidden relative 
              cursor-pointer hover:scale-105 transition-all ease-in-out duration-500 border border-black/50
              h-[470px]">
                  {artist.image && (
                    <img src={artist.image.uri} alt={artist.name} className="w-full h-auto object-cover rounded-t-lg" />
                  )}
                <div className="p-4">
                  <h2 className="text-red-500 text-2xl mb-2">
                    {artist.name}
                  </h2>
                  {artist.biography?.slice(0, 10) && (
                    <p className="text-gray-300 text-sm">{artist.biography.slice(0, 250)}...</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
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
  )
}

export default ArtistsPage