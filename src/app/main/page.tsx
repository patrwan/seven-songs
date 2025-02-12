'use client'

import { useEffect, useState } from "react";

import { IProfile } from '@/app/types/types';
import TopTracks from "@/components/topTracks/TopTracks";
//import TopArtist from "@/components/topArtist/TopArtist";
import Link from "next/link";

export default function MainPage() {

  const [profile, setProfile] = useState<IProfile>({ display_name: "", images: [] });

  async function getProfile() {
    const accessToken = localStorage.getItem('access_token');

    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    });

    const data = await response.json();
    //console.log(data)
    setProfile(data)
  }

  useEffect(() => {
    getProfile()
  }, [])

  return (
    <main className="flex flex-col bg-zinc-950 container m-auto ">
      <div className="px-20 flex h-32 w-full p-2 items-center  bg-neutral-950 border-b-2 border-zinc-800 mb-32 sm:mb-28">
        {<img className="left-1/2 sm:left-80 rounded-full border-2 absolute top-20 -translate-x-1/2" src={profile?.images[0]?.url} height={32} width={128} />}
        <p className="left-1/2 sm:left-80 absolute top-32  text-center text-xl text-white h1 mt-24 -translate-x-1/2"><span className="text-green-400 font-bold text-4xl">{profile.display_name}</span> </p>

      </div>



      <div className="flex md:flex-row flex-col items-center">
        <TopTracks />
      </div>


      <footer className="bg-green-400 p-6 items-center text-center text-black">
        <div className="p-2">
          <Link className="font-bold" href="/privacy">Política de privacidad</Link>
        </div>
        <p className="text-slate-950 font-semibold text-opacity-50">2024 - developed by @patrwan - SS 1.0</p>

      </footer>
    </main>

  );
}