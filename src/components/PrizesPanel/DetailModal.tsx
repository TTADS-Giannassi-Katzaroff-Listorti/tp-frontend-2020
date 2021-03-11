/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/StoreProvider";
import Modal from "../Modal";
import PrizeForm from "./PrizeForm";
import Prize from "../../models/Prize";
import Actions from "../../store/actions";
const DetailModal = ({
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

  return (
    <Modal
      sx={{ maxWidth: "500px" }}
      title={`Detalle Premio ${prize.id}`}
      visible={visible}
      setVisible={setVisible}
    >
      {activePrize && (
        <div>
          <div>Nombre: {activePrize.name}</div>
          <div>Precio: {activePrize.pointPrice} puntos</div>
          <div>Descripción: {activePrize.description}</div>
          <img
            sx={{ width: "100px", height: "100px", objectFit: "cover" }}
            src={activePrize.image}
          />
        </div>
      )}
    </Modal>
  );
};
export default DetailModal;
