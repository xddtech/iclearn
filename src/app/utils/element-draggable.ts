export class ElementDraggable {
   static dragElements = {};
   static mpos1 = {x: 0, y: 0};
   static mpos2 = {x: 0, y: 0};
   static isDragging = false;

   static register(elementId: string, config: any) {
      var elem = document.getElementById(elementId);
      if (elem) {
         elem.onmousedown = ElementDraggable.dragMouseDown
         ElementDraggable.dragElements[elementId] = elem;
      } else {
         console.error('not able to find drag element ' + elementId);
      }
   }

   static getTargetElement(mevent: MouseEvent): HTMLElement {
      const target = mevent.currentTarget as any;
      var key = target.id;
      var elem = ElementDraggable.dragElements[key];
      if ( !elem ) {
        console.warn('cannot find drag target at ' + key);
        return null;
      }
      return elem;
   }

   static dragMouseDown(mevent: MouseEvent) {
      //mevent = mevent || window.event;
      mevent.preventDefault();
      var elem = ElementDraggable.getTargetElement(mevent);
      if ( !elem ) {
         return;
      }
      
      var mpos2 = ElementDraggable.mpos2;
      mpos2.x = mevent.clientX;
      mpos2.y = mevent.clientY;
      elem.onmouseup = ElementDraggable.closeDragElement;
      elem.onmousemove = ElementDraggable.elementDrag;
      ElementDraggable.isDragging = true;
   }

   static elementDrag(mevent: MouseEvent) {
      if (!ElementDraggable.isDragging) {
         return;
      }
      //e = e || window.event;
      mevent.preventDefault();
      var elem = ElementDraggable.getTargetElement(mevent);
      if ( !elem ) {
         return;
      }
      // calculate the new cursor position:
      var mpos1 = ElementDraggable.mpos1;
      var mpos2 = ElementDraggable.mpos2;
      mpos1.x = mpos2.x - mevent.clientX;
      mpos1.y = mpos2.y - mevent.clientY;
      mpos2.x = mevent.clientX;
      mpos2.y = mevent.clientY;
      // set the element's new position:
      elem.style.top = (elem.offsetTop - mpos1.y) + "px";
      elem.style.left = (elem.offsetLeft - mpos1.x) + "px";
   }

   static closeDragElement(mevent: MouseEvent) {
      ElementDraggable.isDragging = false;
      //mevent = mevent || window.event;
      mevent.preventDefault();
      var elem = ElementDraggable.getTargetElement(mevent);
      if ( !elem ) {
         return;
      }
      // stop moving when mouse button is released:
      elem.onmouseup = null;
      elem.onmousemove = null;
   }
}