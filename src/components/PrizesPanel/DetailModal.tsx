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
  icons,
}: {
  prize: Prize;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  icons: React.ReactNode;
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
      icons={icons}
    >
      {activePrize && (
        <div
          sx={{
            mt: "10px",
            display: "grid",
            gridTemplateColumns: ["1fr", "1fr 1fr"],
            gap: "10px",
          }}
        >
          <div
            sx={{
              width: "100%",
              position: "relative",
              "&:after": {
                content: '""',
                display: "block",
                pb: "100%",
              },
            }}
          >
            <img
              src={activePrize.image}
              sx={{
                position: "absolute",
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
          </div>
          <div>
            <div>
              <strong>Nombre:</strong> {activePrize.name}
            </div>
            <div>
              <strong>Precio:</strong> {activePrize.pointPrice} puntos
            </div>
            <div>
              <strong>Descripción:</strong> {activePrize.description}
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};
export default DetailModal;
