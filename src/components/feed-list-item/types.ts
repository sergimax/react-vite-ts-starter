import { DataForModal } from "../../types/types";
import { FeedListItemContent } from "../feed-list/types";

export type FeedListItemProps = {
    item: FeedListItemContent;
    onItemClick: (data: DataForModal) => void;
};
