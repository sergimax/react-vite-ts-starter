export type ImageContainerProps = {
    src: string;
    /**
     * Индекс изображения в массиве изображений.
     *
     * Используется для рассчета сдвига и позиции по оси Z
     */
    index?: number;
};
