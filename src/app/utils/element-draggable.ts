export class ElementDraggable {
   static dragElement: HTMLElement;
   static pos1 = 0;
   static pos2 = 0;
   static pos3 = 0;
   static pos4 = 0;

   constructor(private elementId: string, private config: any) {
    ElementDraggable.dragElement = document.getElementById(elementId);
      if (ElementDraggable.dragElement) {
        ElementDraggable.setDraggable();
      } else {
         console.error('not able to find drag element ' + elementId);
      }
   }

   static setDraggable() {
    ElementDraggable.dragElement.onmousedown = ElementDraggable.dragMouseDown;
   }

   static dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      ElementDraggable.pos3 = e.clientX;
      ElementDraggable.pos4 = e.clientY;
      ElementDraggable.dragElement.onmouseup = ElementDraggable.closeDragElement;
      // call a function whenever the cursor moves:
      ElementDraggable.dragElement.onmousemove = ElementDraggable.elementDrag;
   }

   static elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      ElementDraggable.pos1 = ElementDraggable.pos3 - e.clientX;
      ElementDraggable.pos2 = ElementDraggable.pos4 - e.clientY;
      ElementDraggable.pos3 = e.clientX;
      ElementDraggable.pos4 = e.clientY;
      // set the element's new position:
      ElementDraggable.dragElement.style.top = (ElementDraggable.dragElement.offsetTop - ElementDraggable.pos2) + "px";
      ElementDraggable.dragElement.style.left = (ElementDraggable.dragElement.offsetLeft - ElementDraggable.pos1) + "px";
   }

   static closeDragElement() {
      // stop moving when mouse button is released:
      ElementDraggable.dragElement.onmouseup = null;
      ElementDraggable.dragElement.onmousemove = null;
   }
}