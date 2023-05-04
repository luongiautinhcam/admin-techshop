import React from "react";
import { Modal } from "antd";

const CustomModal = (props) => {
  const { open, hideModal, performAction, title } = props;
  return (
    <Modal
      title="Modal"
      open={open}
      onOk={performAction}
      onCancel={hideModal}
      okText="Đồng ý"
      cancelText="Huỷ bỏ"
    >
      <p>{title}</p>
    </Modal>
  );
};

export default CustomModal;
