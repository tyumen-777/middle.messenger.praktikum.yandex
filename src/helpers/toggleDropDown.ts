export const toggleDropDown = (event: Event, dropdownId: string) => {
  const dropdown = document.getElementById(dropdownId);
  if (!dropdown) return;
  if (event.currentTarget instanceof HTMLElement) {
    const { top, left, height } = event.currentTarget.getBoundingClientRect();
    dropdown.style.top = `${top + height}px`;
    dropdown.style.left = `${left - 200}px`;
  }
  dropdown.classList.toggle('dropdown__closed');
};
