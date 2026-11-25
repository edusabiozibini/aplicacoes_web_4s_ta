import { Image } from './image.resource'

class ImageService {
    baseURL: string = 'http://localhost:8080/v1/images';

    async buscar(query: string = "", extension: string = "") : Promise<Image[]>{
        const params = new URLSearchParams({ query, extension });
        const response = await fetch(`${this.baseURL}?${params}`);

        if (!response.ok) {
            throw new Error(`Erro ao buscar imagens: ${response.status}`);
        }
        return await response.json();
    }
}

export const useImageService = () => new ImageService();
