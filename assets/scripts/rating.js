export function rating(rating) {

    const newRating = Math.round(rating * 0.5);
  for(let i; i<= newRating ;i++){
    console.log("value of i",i);
  }
    return `<span class="fa fa-star ${newRating >= 1 && 'checked'}"></span>
            <span class="fa fa-star ${newRating >= 2 && 'checked'}"></span>
            <span class="fa fa-star ${newRating >= 3 && 'checked'}"></span>
            <span class="fa fa-star ${newRating >= 4 && 'checked'}"></span>
            <span class="fa fa-star ${newRating >= 5 && 'checked'}"></span>


            <style>
            .checked {
              color: red;
            }
            </style>`
}
