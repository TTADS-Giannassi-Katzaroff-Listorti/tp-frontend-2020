/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/StoreProvider";
import CreateModal from "./CreateModal";
import Prize from "../../models/Prize";
const PrizeForm = ({
  onSave,
  savedPrize,
}: {
  onSave: (prize: Prize) => void;
  savedPrize?: Prize;
}) => {
  const [prize, setPrize] = React.useState<Prize>(savedPrize || {});
  const onChange = (key: keyof Prize) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPrize({ ...prize, [key]: event.target.value });
  };
  React.useEffect(() => {
    if (savedPrize) setPrize(savedPrize);
  }, [savedPrize]);
  return (
    <div sx={{ display: "flex", flexDirection: "column", mt: "10px" }}>
      <div
        sx={{
          display: "grid",
          gridTemplateColumns: "max-content 1fr",
          alignItems: "center",
          columnGap: "10px",
          rowGap: "20px",
        }}
      >
        <label>Nombre</label>
        <input type="text" value={prize.name} onChange={onChange("name")} />
        <label>Precio en puntos</label>
        <input
          type="text"
          value={prize.pointPrice}
          onChange={onChange("pointPrice")}
        />
        <label>Descripción</label>
        <input
          type="text"
          value={prize.description}
          onChange={onChange("description")}
        />
        <label>URL de Imágen</label>
        <input type="text" value={prize.image} onChange={onChange("image")} />
      </div>
      <div
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          borderTop: "1px solid #ccc",
          mt: 20,
          pt: 20,
        }}
      >
        <button onClick={() => onSave(prize)}>Guardar</button>
      </div>
    </div>
  );
};
export default PrizeForm;
