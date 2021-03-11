/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/StoreProvider";
import Modal from "../Modal";
import PrizeForm from "./PrizeForm";
import Prize from "../../models/Prize";
import Actions from "../../store/actions";
import { ReactComponent as EditIcon } from "../../images/pencil.svg";
import { ReactComponent as RemoveIcon } from "../../images/trash.svg";

const PrizeItem = ({
  prize,
  onClick,
  onEdit,
  onRemove,
}: {
  prize: Prize;
  onClick: () => void;
  onEdit: () => void;
  onRemove: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      sx={{
        flexGrow: 1,
        display: "flex",
        border: "1px solid #ccc",
        padding: "10px",
        flexDirection: "column",
        transition: "0.2s",
        cursor: "pointer",
        ":hover": {
          borderColor: "#000",
        },
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
          src={prize.image}
          sx={{
            position: "absolute",
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      <div sx={{ mt: "10px", mb: "5px" }}>
        <div sx={{ fontWeight: 600 }}>{prize.name}</div>
        <div>{prize.pointPrice} puntos</div>
      </div>
    </div>
  );
};
export default PrizeItem;
