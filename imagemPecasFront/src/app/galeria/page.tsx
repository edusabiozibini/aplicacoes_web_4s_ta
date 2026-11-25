'use client'

import { Template, ImageCard } from '@/components';
import { Image } from '@/resources/image.resource';
import { useImageService } from '@/resources/image.service';
import { useState } from 'react';
import Link from 'next/link';



export default function GaleriaPage() {
  const useService = useImageService();
  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>("");
  const [extension, setExtension] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false)


  async function searchImages(){
      //console.log("Valor digitado:", query);
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const result = await useService.buscar(query, extension);
        setImages(result);
      } catch (error) {
        console.error(error);
        setImages([]);
      } finally {
        setLoading(false);
      }
  }


  function renderImageCard(image: Image){
    return(
           <ImageCard key={image.url}
                      nome={image.name} 
                      src={image.url}
                      tamanho={image.size}
                      extension={image.extension}
                      dataUpload={image.uploadDate}
                      />
    )
  }

  function renderImageCards(){
    //return images.map(image => renderImageCard(image));
    return images.map(renderImageCard);
  }



  return (
    <Template loading={loading}>
      <section className="flex flex-col items-center justify-center my-3">
        <div className="flex space-x-4">
          <input type="text" 
          onChange={event => setQuery(event.target.value)}
          className="border px-5 py-2 rounded-lg text-gray-900"/>
          <select onChange={event => setExtension(event.target.value)} className="border px-4 py-2 rounded-lg text-gray-900">
            <option value="">All Formats</option>
            <option value="PNG">PNG</option>
            <option value="JPEG">JPEG</option>
            <option value="GIF">GIF</option>
          </select>
          <button className="bg-red-500 hover:bg-red-300 text-white px-4 rounded-lg" onClick={searchImages}>Search</button>
          <Link href="/formulario">
            <button className="bg-yellow-500 hover:bg-yellow-300 text-white px-4 rounded-lg">Add New</button>
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-8">
        {
          renderImageCards()
        }
      </section>
    </Template>
  );
}
