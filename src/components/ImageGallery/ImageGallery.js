import React from "react";
import { Gallery, Layout } from './ImageGallery.styled'
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem'


export const ImageGallery = ({ images, onClick }) => {
  return (
    <Layout>
        <Gallery>
        {images.map(({id, webformatURL, tags, largeImageURL}) => (
            <ImageGalleryItem key={id} url={webformatURL} tags={tags} largeImage={largeImageURL} onClick={() => onClick(id)}/>
        ))}
        
        </Gallery>
    </Layout>
  )
}

