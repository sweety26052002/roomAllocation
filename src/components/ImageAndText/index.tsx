/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./index.module.scss";
interface ImageAndTextProps {
  image: string;
  text: string;
  additionalClassName?: string;
  additionalTextClassName?: string;
  handleContainerClick?: () => void;
  handleImageClick?: () => void;
  className?: string;
  hoverImage?: string;
}
const ImageAndText: React.FC<ImageAndTextProps> = ({
  image,
  text,
  additionalClassName,
  additionalTextClassName,
  handleContainerClick,
  handleImageClick,
  hoverImage,
}) => {
  const [currentImage, setCurrentImage] = useState(image);
  return (
    <div
      onClick={handleContainerClick}
      className={`${styles.container} ${additionalClassName}`}
    >
      <img
        onClick={handleImageClick}
        src={currentImage}
        alt="image"
        onMouseEnter={() => hoverImage && setCurrentImage(hoverImage)}
        onMouseLeave={() => setCurrentImage(image)}
      />
      {text === "Partially Allotted" ? (
        <p className={`${styles.text} ${additionalTextClassName}`}>
          Partially Occupied Rooms
        </p>
      ) : text === "Allotted" ? (
        <p className={`${styles.text} ${additionalTextClassName}`}>
          Occupied Rooms
        </p>
      ) : text === "Available" ? (
        <p className={`${styles.text} ${additionalTextClassName}`}>
          Available Rooms
        </p>
      ) : (
        <p className={`${styles.text} ${additionalTextClassName}`}>{text}</p>
      )}
    </div>
  );
};
export default ImageAndText;
