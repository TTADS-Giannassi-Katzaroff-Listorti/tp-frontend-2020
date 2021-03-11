/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/StoreProvider";
import Modal from "../Modal";
import PrizeForm from "./PrizeForm";
import Prize from "../../models/Prize";
import Actions from "../../store/actions";
const UpdateModal = ({
  prize,
  visible,
  setVisible,
}: {
  prize: Prize;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { activePrize } = useSelector((state: RootState) => state.prizes);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(Actions.getActivePrize(prize));
  }, [prize]);

  const updatePrize = (prize: Prize) => dispatch(Actions.updatePrize(prize));

  const onSave = (prize: Prize) => {
    updatePrize(prize);
    setVisible(false);
    dispatch(Actions.clearActivePrize());
  };
  return (
    <Modal
      sx={{ maxWidth: "500px" }}
      title={`Editar Premio ${prize.id}`}
      visible={visible}
      setVisible={setVisible}
    >
      <PrizeForm savedPrize={activePrize} onSave={onSave} />
    </Modal>
  );
};
export default UpdateModal;
