import { useRef } from 'react';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import {
    ConstructorElement,
    DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { moveIngredientsInConstructor } from '../../services/reducers/ingredients';
import { useAppDispatch } from '../../services/hooks';
import { BurgerConstructorIngredientProps } from './types';

export const BurgerConstructorIngredient = ({
    ingredient,
    handleClose,
    index,
}: BurgerConstructorIngredientProps) => {
    const dispatch = useAppDispatch();

    const ref = useRef<HTMLDivElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
            const dragIndex = (item as any).index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            const clientOffset = monitor.getClientOffset();

            const hoverClientY =
                (clientOffset as XYCoord).y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            // Смена мест ингредиентов
            dispatch(
                moveIngredientsInConstructor({
                    movedIngredientIndex: dragIndex,
                    targetIngredientIndex: hoverIndex,
                }),
            );

            (item as any).index = hoverIndex;
        },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [{ isDragging }, drag] = useDrag({
        type: 'burgetConstructorIngredient',
        item: () => {
            return { ingredient, index };
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    return (
        <div ref={ref}>
            <DragIcon type='primary' />
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image_mobile}
                handleClose={handleClose}
                extraClass='ml-2 mb-4'
            />
        </div>
    );
};
