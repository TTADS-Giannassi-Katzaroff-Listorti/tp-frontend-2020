/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/StoreProvider";
import Modal from "../Modal";
import Prize from "../../models/Prize";
import Actions from "../../store/actions";
const DeleteModal = ({
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

  const onDelete = () => {
    if (activePrize) dispatch(Actions.deletePrize(activePrize));
    setVisible(false);
    dispatch(Actions.clearActivePrize());
  };
  const onCancel = () => setVisible(false);

  return (
    <Modal
      sx={{ maxWidth: "500px" }}
      title={`¿Desea elimiar el premio ${prize.id}`}
      visible={visible}
      setVisible={setVisible}
    >
      {activePrize && (
        <div
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            pt: 10,
          }}
        >
          <button sx={{ mr: "10px" }} onClick={() => onDelete()}>
            Eliminar
          </button>
          <button onClick={() => onCancel()}>Cancelar</button>
        </div>
      )}
    </Modal>
  );
};
export default DeleteModal;
