import { Styles } from "../interfaces/Styles";
import StyleClasses from "./enums/StyleClasses";

class SliderFactory {
  constructor() {}

  createSliderStyle(style: Styles): string {
    return `
      ${StyleClasses.slider} {
        display: flex;
        gap: ${style.gap}vmin;
        position: absolute;
        left: 0;
      }

       ${StyleClasses.sliderSlideImage} {
        width: ${style.imageWidth}vmin;
        height: ${style.imageHeight}vmin;
        object-fit: cover;
        object-position: 100% center;
      }
    `;
  }

  createSliderTemplate(images: string[]): string {
    return `
        <div class="${StyleClasses._slider}">
          ${images
            .map(
              (image) =>
                `<img class="${StyleClasses._image}" src="${image}" draggable="false" alt="slide" />`
            )
            .join("")}
        </div>
        `;
  }
}

export default SliderFactory;
