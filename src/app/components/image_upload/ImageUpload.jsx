"use client";

import { useState } from 'react';
import { UploadDropzone } from '../utils/uploadthing';
import { imageRemove } from '@/app/actions/imageRemove';

 
 
function ImageUpload() {
    const [imgUrl, setImgUrl] = useState(null);
    const [imgKey, setImgKey] = useState (null);
    const [saveImg, setSaveImg] = useState (true);

    const handleRemove = async() => {
        const res = await imageRemove (imgKey);
        if (res.success) {
            alert ("Файл успешно удален!");
            setImgUrl(true);
            setImgKey();
            setSaveImg(true);
        }
        else {
            setSaveImg(true);
            alert ("Файл не был удален. Попробуйте еще раз.");
        }
    }

  
    return (
        <>
        {(saveImg) &&
            <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                console.log("res[0].key: ", res[0].key);
                setImgUrl (res[0].url);
                setImgKey (res[0].key);
                setSaveImg (false);
                alert("Файл загружен");
                }}
                onUploadError={(error) => {
                alert(`Ошибка загрузки файла. Размер не должен превышать 12Мб. ${error}`);
                }}
            />
        }
        {(!saveImg) &&
            <div className='img-prev '>
                <img src={imgUrl}  loading="lazy" alt="image cooking recipes upload" className='object-cover h-auto w-full' />                
                <button onClick={handleRemove}>Удалить фото</button>
            </div>
        }
      </>
  );
}

export default ImageUpload;