import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export const BurgerConstructorIngredient = ({text, price, thumbnail, handleClose, index}) => {

    // dispatch(
    //     moveIngredientsInConstructor({
    //         movedIngredientIndex: dragIndex,
    //         targetIngredientIndex: hoverIndex,
    //     })
    // );
    return (
        <div>
            <DragIcon type="primary" />
            <ConstructorElement
                text={text}
                price={price}
                thumbnail={thumbnail}
                handleClose={handleClose}
                extraClass="ml-2 mb-4"
            />
        </div>
    );
};


            