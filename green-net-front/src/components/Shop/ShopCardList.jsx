import {ShopCard} from "./ShopCard";

export const ShopCardList = (props) => {
    return (
       <div className="shop-card-list">
           {
               props.itemsArr.map(el => {
                   return <ShopCard key={el.id} item={el} onAdd={props.onAdd} userCoins={props.userCoins}/>
               })
           }
       </div>
    )

}