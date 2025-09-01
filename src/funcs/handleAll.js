import "/src/styles/style.css";

export const handleAll = (id1, id2, target1, toggle, e) => {
  const element1 = document.getElementById(id1);
  const element2 = document.getElementById(id2);

  if (e.target.value === target1) {
    element1.classList.toggle(toggle);
    element2.classList.remove(toggle);
  } else {
    element2.classList.toggle(toggle);
    element1.classList.remove(toggle);
  }
}

export const handleAll2 = (id1, ids, target, toggle, e) => {
  const element1 = document.getElementById(id1);

  if(e.target.value === target) {
    element1.classList.toggle(toggle);
  } 

  ids.forEach((id) => {
    const element = document.getElementById(id);
    if (id !== id1) {
      element.classList.remove(toggle);
    }
  })
}