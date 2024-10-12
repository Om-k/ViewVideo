import noImage from "../assets/placeholder.webp";

const getCroppedImageUrl = (url) => {
    if (!url) return noImage;
    const target = 'upload/';
    const index = url.indexOf(target) + target.length;
    return url.slice(0, index) + 'b_black,c_pad,ar_16:9,w_1280,h_720/' + url.slice(index);
}

export default getCroppedImageUrl;

