import {InventoryCard} from "./InventoryCard";

export const InventoryCardList = (props) => {
    return (
        <div className="shop-card-list">
            {
                props.itemsArr.sort((a, b) => a.validityDate < b.validityDate ? 1 : -1).map(el => {
                    return <InventoryCard key={el.id} item={el}/>
                })
            }
        </div>
    )

}