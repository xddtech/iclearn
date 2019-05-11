export class ElementDraggable {
   dragElement: HTMLElement;
   pos1 = 0;
   pos2 = 0;
   pos3 = 0;
   pos4 = 0;

   constructor(private elementId: string, private config: any) {
      this.dragElement = document.getElementById(elementId);
      if (this.dragElement) {
        this.setDraggable();
      } else {
         console.error('not able to find drag element ' + elementId);
      }
   }

   setDraggable() {
      this.dragElement.onmousedown = this.dragMouseDown;
   }

   dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      this.pos3 = e.clientX;
      this.pos4 = e.clientY;
      this.dragElement.onmouseup = this.closeDragElement;
      // call a function whenever the cursor moves:
      this.dragElement.onmousemove = this.elementDrag;
   }

   elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      this.pos1 = this.pos3 - e.clientX;
      this.pos2 = this.pos4 - e.clientY;
      this.pos3 = e.clientX;
      this.pos4 = e.clientY;
      // set the element's new position:
      this.dragElement.style.top = (this.dragElement.offsetTop - this.pos2) + "px";
      this.dragElement.style.left = (this.dragElement.offsetLeft - this.pos1) + "px";
   }

   closeDragElement() {
      // stop moving when mouse button is released:
      this.dragElement.onmouseup = null;
      this.dragElement.onmousemove = null;
   }
}