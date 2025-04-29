import { useAtom } from "jotai";
import { statistic } from "../atoms/atoms";

export const useDataFlow = () => {
    const [qState, setQState] = useAtom(statistic);
    
    const updateStatistic = (type) => {
        setQState((prevState) => ({
            ...prevState,
            [type]: prevState[type] + 1,
        }));
    };
};
