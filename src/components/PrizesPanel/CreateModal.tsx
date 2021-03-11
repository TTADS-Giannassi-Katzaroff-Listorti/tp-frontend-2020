/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/StoreProvider";
import Modal from "../Modal";
import PrizeForm from "./PrizeForm";
import Prize from "../../models/Prize";
import Actions from "../../store/actions";
const CreateModal = ({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch();

  const onSave = (prize: Prize) => {
    dispatch(Actions.addPrize(prize));
    setVisible(false);
  };
  return (
    <Modal
      sx={{ maxWidth: "500px" }}
      title="Crear Premio"
      visible={visible}
      setVisible={setVisible}
    >
      <PrizeForm onSave={onSave} />
    </Modal>
  );
};
export default CreateModal;
