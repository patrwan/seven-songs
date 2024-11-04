'use client'

import { useEffect, useRef, useState } from "react";

import { toPng } from 'html-to-image';

import { IArtist } from "@/app/types/types";

export default function TopArtist() {

    const [topArtists, setTopArtists] = useState([]);

    const elementRef = useRef(null);

    async function getTopArtists() {
        const accessToken = localStorage.getItem('access_token');

        const response = await fetch('https://api.spotify.com/v1/me/top/artists?limit=7&time_range=short_term', {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        });

        const data = await response.json();

        setTopArtists(data.items)
    }

    /*const htmlToImageConvert = () => 
        if (elementRef.current === null) {
            return
        }

        toPng(elementRef.current, { cacheBust: false, width: 520, height: 1080, backgroundColor: "black" })
            .then((dataUrl) => {
                const link = document.createElement("a");
                link.download = "top_artist.png";
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => {
                console.log(err);
            });
    };
*/  
    useEffect(() => {
        getTopArtists();
    }, [])

    return (
        <div className="w-96 flex-1 flex flex-col p-2 items-center ">
            <p className="text-sm text-green-400">Descargar lista</p>
            <div ref={elementRef} className="w-96 flex-1 flex flex-col p-2 items-center" >
                <h1
                    className=" h1 sm:w-full mb-2  rounded-m text-lg text-white text-center"
                    onClick={() => { }}><span className="text-green-400">Pato</span> top 7 artistas del último mes
                </h1>


                {topArtists.map((artist: IArtist, index) => {
                    const image = artist.images[0].url
                    return (
                        <div className={`bg-transparent w-full flex mb-4 shadow-md shadow-black rounded-xl`} key={artist.id}>
                            { }
                            <div className="bg-cover flex w-full rounded-xl" style={{ backgroundImage: `url('${image}')` }}>
                                <div className="w-full rounded-xl bg-black flex items-center justify-center text-lg p-2 bg-opacity-85 hover:bg-opacity-40 cursor-pointer">
                                    <div className=" p-2">
                                        <p className="text-green-400 font-bold text-4xl h1">{index + 1}</p>
                                    </div>
                                    <div className="w-1/2 min-h-28  flex items-center justify-center text-lg p-2 bg-opacity-75 hover:bg-opacity-40 cursor-pointer">
                                        <p className="text-green-400 font-bold text-center ">{artist.name}</p>
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

//https://api.spotify.com/v1/me/top/artists?limit=1