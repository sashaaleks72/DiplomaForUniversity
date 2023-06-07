import ISelectTuple from "../../../models/ISelectTuple";
import ResetIcon from "../../../images/rotate-right-solid.svg";

interface CustomSelectProps {
    selectOptions: ISelectTuple[];
    defaultValue?: string;
    value: any;
    setValue: any;
    className?: string;
    size?: number;
    isResetBtn?: boolean;
    style?: object;
}

const CustomSelect = ({
    selectOptions,
    value,
    setValue,
    defaultValue,
    className,
    size,
    isResetBtn,
    style,
}: CustomSelectProps): JSX.Element => {
    return (
        <div style={style} className={[className, "d-flex"].join(" ")}>
            <select value={value} onChange={(e) => setValue(e.target.value)} className="form-select" size={size}>
                {defaultValue && (
                    <option disabled value="">
                        {defaultValue}
                    </option>
                )}
                {selectOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.title}
                    </option>
                ))}
            </select>
            {isResetBtn && (
                <div className="btn border-0">
                    <img src={ResetIcon} height={25} onClick={() => setValue("")} />
                </div>
            )}
        </div>
    );
};

export default CustomSelect;
