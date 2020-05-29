const Drag = (function (document) {
  let _targetItems = "";
  let _targetZones = "";

  function Drag(targetItems, targetZones) {
    _targetItems = targetItems;
    _targetZones = targetZones;
    _init();
  }

  const setHighLight = (hasHigh) => {
    const zones = document.querySelectorAll(_targetZones);
    zones.forEach((zone) =>
      hasHigh
        ? zone.classList.add("highlight")
        : zone.classList.remove("highlight")
    );
  };

  // handle itens
  function dragStart() {
    setHighLight(true);
  }

  function dragging() {
    this.classList.add("is-dragging");
  }

  function dragEnd() {
    setHighLight(false);
    this.classList.remove("is-dragging");
  }

  // handler zones
  function dragEnter() {
    // empty
  }

  function onDrop() {
    this.classList.remove("is-current-zone");
  }

  function dragOver(event) {
    event.preventDefault();
    this.classList.add("is-current-zone");
    const card = document.querySelector(".is-dragging");
    if (card) this.appendChild(card);
  }

  function dragLeave() {
    this.classList.remove("is-current-zone");
  }

  const _init = () => {
    _initCards(_targetItems);
    _initDropzones(_targetZones);
  };

  const _initCards = (targetItems) => {
    const cards = document.querySelectorAll(targetItems);
    cards.forEach((card) => {
      card.addEventListener("dragstart", dragStart);
      card.addEventListener("drag", dragging);
      card.addEventListener("dragend", dragEnd);
    });

    Drag.prototype.items = cards;
  };

  const _initDropzones = (targetZones) => {
    const zones = document.querySelectorAll(targetZones);

    zones.forEach((zone) => {
      zone.addEventListener("dragenter", dragEnter);
      zone.addEventListener("dragover", dragOver);
      zone.addEventListener("dragleave", dragLeave);
      zone.addEventListener("drop", onDrop);
    });
  };

  return Drag;
})(document);
