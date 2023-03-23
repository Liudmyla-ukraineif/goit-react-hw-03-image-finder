
export default function ImageGalleryItem ({gallery}){
  
  return (
    <ul className="ImageGallery">
      {gallery.map(item => (<li key={item.id} className="ImageGalleryItem"><img src={item.webformatURL} alt={item.tags} className="ImageGalleryItem-image" /></li>))}
    </ul>    
  );
}

// largeImageURL
// { item: { webformatURL, tags } }