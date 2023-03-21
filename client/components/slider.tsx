export function Slider() {
  function handleSwipe() {
    // swipe left should bring across an edit window for that pantry item, with a new component that contains the edit form.
    //swipe right should prompt the user to confirm they want to delete the item.
  }

  return (
    <div className="container" id="fridge-item-container">
      <ul>
        <div className="swipe-container" id="" onTouchEnd={handleSwipe}>
          <div className="action left">
            <i className="fa-solid fa-trash"></i>
          </div>
          <div className="swipe-element">
            <li className="" id="">
              <span className="item-qty"></span>
              <div>
                <a href="/pantry/{}/edit">
                  <span className="pantryBtn" id="edit">
                    Edit
                  </span>
                </a>{' '}
                |{' '}
                <span className="pantryBtn" id="delete">
                  Delete
                </span>
              </div>
            </li>
          </div>
          <div className="action right">
            <i className="fa-solid fa-pen"></i>
          </div>
        </div>
      </ul>
    </div>
  )
}
