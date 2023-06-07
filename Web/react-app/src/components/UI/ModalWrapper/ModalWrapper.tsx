import classes from "./ModalWrapper.module.css";

interface ModalProps {
    children: JSX.Element;
    isVisible: boolean;
    setIsVisible: any;
}

const Modal = ({
    children,
    isVisible,
    setIsVisible,
}: ModalProps): JSX.Element => {
    const modalBehaviorClasses = [classes.modal];

    if (isVisible) modalBehaviorClasses.push(classes.active);

    return (
        <div
            className={modalBehaviorClasses.join(" ")}
            onMouseDown={() => {
                setIsVisible(false);
            }}
        >
            <div
                className={classes.modalContent}
                onMouseDown={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;
