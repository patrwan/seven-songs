'use client'

import { useEffect } from "react";
import axios from 'axios';
import { useRouter } from "next/navigation";



export default function Home() {

  const router = useRouter()

  
  async function login() {
    window.location.replace("http://localhost:3000/api/login")
  }


  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const spotifyCode = urlParams.get("code")

    if (spotifyCode) {
      authUser(spotifyCode)
    }
  }, [])

  const authUser = (spotifyCode: string) => {
    try {
      const searchParams = new URLSearchParams({
        code: spotifyCode,
        grant_type: "authorization_code",
        redirect_uri: "http://localhost:3000",
      })

      axios.post("https://accounts.spotify.com/api/token", searchParams, {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + Buffer.from(process.env.NEXT_PUBLIC_CLIENT_ID + ':' + process.env.NEXT_PUBLIC_CLIENT_SECRET).toString('base64')
        },
      }).then(res => {
        localStorage.setItem('access_token', res.data.access_token)
        router.replace('/main')
        
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col items-center justify-items-center place-content-center min-h-screen bg-zinc-800">
     
        {/*<Image className="rounded-full top-0 fixed z-0" src="/pastel_green.svg" width={600} height={600} alt="background-image"/>*/}
        <p className="text-4xl h1 text-green-400">Seven Songs</p>
        <p className="m-6 text-white">Top 7 de Spotify</p>
        <button
          className="z-10 uppercase bg-green-700 p-4 hover:bg-green-400 font-semibold hover:text-black"
          onClick={() => login()}
        >
          Entrar con Spotify
        </button>
      <footer className="fixed bottom-0 p-6 flex gap-6 flex-wrap items-center justify-center text-green-800 text-opacity-40 font-semibold">
        Developed by @patr.wan
      </footer>
    </div>
  );
}
