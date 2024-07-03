import { useState, useEffect } from 'react';

export default function ImageUploader() {
  const [imgSrc, setImgSrc] = useState('https://i.imgur.com/U7afLiO.png');
  const [imgUrl, setImgUrl] = useState('');

  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('https://api.imgur.com/3/image/', {
        method: 'POST',
        headers: {
          Authorization: 'Client-ID 6db47bd7029562d',
        },
        body: formData,
      });

      const data = await response.json();
      setImgSrc(data.data.link);
      setImgUrl(data.data.link);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  useEffect(() => {
    const fetchAlbum = async () => {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', 'Client-ID 6db47bd7029562d');

      try {
        const response = await fetch('https://api.imgur.com/3/album/ryQCmre', {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
        });
        const result = await response.text();
        console.log(result);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchAlbum();
  }, []);

  return (
    <div>
      <img
        src={imgSrc}
        id="img"
        height="200"
        width="200"
        alt="Uploaded image"
      />
      <br />
      <input type="file" id="file" onChange={handleFileChange} />
      <br />
      <strong>
        <p id="url">{imgUrl}</p>
      </strong>
    </div>
  );
}
