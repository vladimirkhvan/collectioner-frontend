import axios from 'axios';

export const postImage = async (formData) => {
    const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`,
        formData,
    );
    return data.secureUrl;
};
