'use client'

import { useEffect, useRef, useState } from "react";

import { ITrack } from "@/app/types/types";

import { toPng } from 'html-to-image';

export default function TopTracks() {

    const [topTracks, setTopTracks] = useState([]);

    const elementRef = useRef(null);

    async function getTopTracks() {
        const accessToken = localStorage.getItem('access_token');

        const response = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=7&time_range=short_term', {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        });

        const data = await response.json();

        setTopTracks(data.items)
    }

    const htmlToImageConvert = () => {
        if (elementRef.current === null) {
            return
        }

        toPng(elementRef.current, { cacheBust: false, width: 1080, height: 1920, backgroundColor: "#3a3a3a" })
            .then((dataUrl) => {
                const link = document.createElement("a");
                link.download = "top_tracks.png";
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getTopTracks();
    }, [])

    return (
        <div className="w-full flex-1 flex flex-col p-2 items-center font-bold">
            <div className="flex w-full space-x-4 justify-center my-4">
                <button className="text-sm text-green-400 bg-neutral-800 p-2 rounded-md uppercase hover:bg-neutral-600" onClick={() => htmlToImageConvert()}>Compartir lista</button>
                <button className="text-sm text-green-400 bg-neutral-800 p-2 rounded-md uppercase hover:bg-neutral-600" onClick={() => {}}>Generar guesser</button>
            </div>

            <div ref={elementRef} className="flex flex-col p-2 items-center justify-center" >
                <h1
                    className=" h1 sm:w-full mb-2  rounded-m text-lg text-white text-center"
                    onClick={() => { }}>
                </h1>


                {topTracks.map((track: ITrack, index) => {
                    const artists = track.artists
                    const image = track.album.images[0].url
                    return (
                        <div className={`bg-transparent w-full flex mb-4 shadow-md shadow-black rounded-xl`} key={track.id}>
                            { }
                            <div className="bg-cover flex w-full rounded-xl" style={{ backgroundImage: `url('${image}')` }}>
                                <div className="w-full rounded-xl bg-black flex items-center justify-center text-lg p-2 bg-opacity-85 hover:bg-opacity-40 cursor-pointer">
                                    <div className=" p-2">
                                        <p className="text-green-400 font-bold text-4xl h1">{index + 1}</p>
                                    </div>
                                    <div className="w-full min-h-28  flex flex-col  justify-center text-lg p-2 bg-opacity-75 hover:bg-opacity-40 cursor-pointer">
                                        <p className="text-green-400 font-bold  ">{track.name}</p>
                                        {artists.map(artist => (<p className="font-bold  text-white text-sm" key={artist.id}>{artist.name}</p>))}
                                    </div>
                                    <div className="w-1/2 min-h-16  flex flex-col items-center justify-center text-base bg-opacity-75 hover:bg-opacity-50 ">
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>


    );
}

