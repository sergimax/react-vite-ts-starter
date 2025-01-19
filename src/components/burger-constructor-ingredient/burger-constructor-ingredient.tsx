import {
    ConstructorElement,
    DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { moveIngredientsInConstructor } from '../../services/reducers/ingredients';
import { useAppDispatch } from '../../services/hooks';

export const BurgerConstructorIngredient = ({
    ingredient,
    handleClose,
    index,
}) => {
    const dispatch = useAppDispatch();

    const ref = useRef<HTMLDivElement>(null);
    const [{ handlerId }, drop] = useDrop({
        accept: 'burgetConstructorIngredient',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            // Determine mouse position
            const clientOffset = monitor.getClientOffset();

            // Get pixels to the top
            const hoverClientY =
                (clientOffset as XYCoord).y - hoverBoundingRect.top;

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            // Time to actually perform the action
            console.log(dragIndex, hoverIndex);

            // moveCard(dragIndex, hoverIndex)

            dispatch(
                moveIngredientsInConstructor({
                    movedIngredientIndex: dragIndex,
                    targetIngredientIndex: hoverIndex,
                })
            );

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: 'burgetConstructorIngredient',
        item: () => {
            return { ingredient, index };
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    return (
        <div ref={ref}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image_mobile}
                handleClose={handleClose}
                extraClass="ml-2 mb-4"
            />
        </div>
    );
};
