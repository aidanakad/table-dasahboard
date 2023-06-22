import {FC} from "react";
import {Modal} from "antd";

const ModalWrapper:FC = ({children, isOpen, setOpen, title}) => {
    return (
        <Modal
            footer={null}
            title={title}
            width="700px"
            open={isOpen}
            onCancel={setOpen}
        >
            {children}
        </Modal>
    );
};

export default ModalWrapper;