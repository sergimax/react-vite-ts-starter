import { AppHeader } from "../../components/app-header";
import { useAppSelector } from "../../services/hooks";
import { activePageSelector } from "../../services/reducers/pages";

export const Login = () => {
    const activePage = useAppSelector(activePageSelector);

    return <>
        <AppHeader activePage={activePage} />
        <h1>login</h1>
    </>;
};
