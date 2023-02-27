abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  hostElement: T;
  element: U;

  constructor(
    private templateString: string,
    public hostElementId: string,
    public sliderId: string,
    private insertAtStart: boolean
  ) {
    this.hostElement = document.getElementById(this.hostElementId)! as T;
    const renderElement = document.createElement("div");
    renderElement.id = this.sliderId;
    renderElement.innerHTML = this.templateString;
    this.element = renderElement.firstElementChild as U;

    // removes any duplicate elements before rendering new one
    this.hostElement
      .querySelectorAll("#" + this.hostElementId)
      .forEach((el) => {
        el.remove();
      });
    this.attach(this.insertAtStart);
  }

  private attach(insertAtStart: boolean) {
    if (insertAtStart) {
      this.hostElement.insertAdjacentElement("afterbegin", this.element);
    } else {
      this.hostElement.insertAdjacentElement("beforeend", this.element);
    }
  }

  protected abstract configure(): void;
}

export default Component;
