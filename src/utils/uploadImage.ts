import { postImage } from './postImage';

export const uploadImage = async (file: File) => {
    if (file === null) {
        return null;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);

    return await postImage(formData);
};
