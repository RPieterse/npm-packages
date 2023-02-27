import Component from "./components/Component";
import SliderDataSet from "./components/enums/SliderDataSet";
import SliderFactory from "./components/SliderFactory";
import { Styles, defaultStyles } from "./interfaces/Styles";

const slider: SliderFactory = new SliderFactory();

class FancySlider extends Component<HTMLDivElement, HTMLDivElement> {
  private styles: Styles;
  constructor(
    public hostElementId: string,
    public sliderId: string,
    images: string[],
    styles?: Styles,
    private maxScroll?: number
  ) {
    super(slider.createSliderTemplate(images), hostElementId, sliderId, true);
    this.styles = { ...defaultStyles, ...styles };
    if (!this.maxScroll) {
      this.maxScroll = -50;
    }
    this.configure();
  }

  protected configure() {
    // setup slider style
    const styleSheet = document.createElement("style");
    styleSheet.innerHTML = slider.createSliderStyle(this.styles);
    document.querySelector("head")!.append(styleSheet);

    // setup host element
    this.hostElement.style.position = "relative";
    this.hostElement.dataset[SliderDataSet.mouseDownAt] = "0";
    this.hostElement.dataset[SliderDataSet.percentage] = "0";
    this.hostElement.dataset[SliderDataSet.prevPercentage] = "0";

    document.onmousedown = (event) => this.handleOnMouseDown(event);

    document.onmouseup = () => this.handleOnMouseUp();

    this.element.onmousemove = (event) => this.handleOnMouseMove(event);

    this.element.onwheel = (event) => this.handleOnWheel(event);
  }

  /**
   * Handle mouse down event on the slider.
   * @param event - Mouse event.
   */
  private handleOnMouseDown(event: MouseEvent) {
    this.hostElement.dataset[SliderDataSet.mouseDownAt] =
      event.clientX.toString();
  }

  // This function sets the mouseDownAt data attribute to 0 when the user releases the mouse button. It also sets the prevPercentage data attribute to the percentage data attribute.
  private handleOnMouseUp() {
    this.hostElement.dataset[SliderDataSet.mouseDownAt] = "0";
    this.hostElement.dataset[SliderDataSet.prevPercentage] =
      this.hostElement.dataset[SliderDataSet.percentage]!;
  }

  private handleOnMouseMove(event: MouseEvent) {
    if (this.hostElement.dataset[SliderDataSet.mouseDownAt] == "0") return;

    const mouseDelta =
      parseFloat(this.hostElement.dataset[SliderDataSet.mouseDownAt]!) -
      event.clientX;
    const maxDelta = this.element.clientWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100;
    let nextPercentage =
      parseFloat(this.hostElement.dataset[SliderDataSet.prevPercentage]!) +
      percentage;

    nextPercentage = Math.min(nextPercentage, 0);
    nextPercentage = Math.max(nextPercentage, this.maxScroll!);

    this.hostElement.dataset[SliderDataSet.percentage] =
      nextPercentage.toString();

    this.animateElement(nextPercentage);
    this.animateImages(nextPercentage);
  }

  /**
   * Animate the element to the next percentage.
   * @param nextPercentage The percentage of the screen to move the element to.
   */
  private animateElement(nextPercentage: number) {
    this.element.animate(
      {
        transform: `translateX(${nextPercentage}%)`,
      },
      { duration: 1200, fill: "forwards" }
    );
  }

  // This function animates images by changing their object position in the x axis.
  // This is done by adding the nextPercentage to 100 and setting the object position to that value.
  private animateImages(nextPercentage: number) {
    this.element.querySelectorAll("img").forEach((img) => {
      img.animate(
        {
          objectPosition: `${100 + nextPercentage}% center`,
        },
        { duration: 1200, fill: "forwards" }
      );
    });
  }

  // Prevents the user from using the mouse wheel to zoom in or out.
  private handleOnWheel(event: Event) {
    event.preventDefault();
  }
}

// example usage
// new FancySlider("fancy-slider", "slider", [
//   "https://cdn.pixabay.com/photo/2018/01/15/19/45/sunset-3084651_960_720.jpg",
//   "https://cdn.pixabay.com/photo/2013/07/18/20/26/sea-164989_960_720.jpg",
//   "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg",
//   "https://cdn.pixabay.com/photo/2015/10/30/20/13/sunrise-1014712_960_720.jpg",
//   "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg",
//   "https://cdn.pixabay.com/photo/2013/07/18/20/26/sea-164989_960_720.jpg",
// ]);

export default FancySlider;
