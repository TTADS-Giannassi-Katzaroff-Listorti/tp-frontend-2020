/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/StoreProvider";
import CreateModal from "./CreateModal";
import Prize from "../../models/Prize";
import UpdateModal from "./UpdateModal";
import DeleteModal from "./DeleteModal";
import DetailModal from "./DetailModal";
import Actions from "../../store/actions";
const GamePanel = () => {
  const prizesState = useSelector((state: RootState) => state.prizes);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(Actions.refreshPrizes());
    const refreshInterval = setInterval(
      () => dispatch(Actions.refreshPrizes()),
      5000
    );
    return () => clearInterval(refreshInterval);
  }, []);
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [showUpdateModal, setShowUpdateModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showDetailModal, setShowDetailModal] = React.useState(false);
  const [activePrize, setActivePrize] = React.useState<Prize>({});

  const [search, setSearch] = React.useState("");
  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  React.useEffect(() => {
    dispatch(Actions.refreshPrizes(search));
  }, [showCreateModal, showUpdateModal, showDeleteModal, search]);
  return (
    <div sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <CreateModal visible={showCreateModal} setVisible={setShowCreateModal} />
      <UpdateModal
        visible={showUpdateModal}
        setVisible={setShowUpdateModal}
        prize={activePrize}
      />
      <DeleteModal
        visible={showDeleteModal}
        setVisible={setShowDeleteModal}
        prize={activePrize}
      />
      <DetailModal
        visible={showDetailModal}
        setVisible={setShowDetailModal}
        prize={activePrize}
      />
      <div onClick={() => setShowCreateModal(true)}>Nuevo</div>
      <input value={search} onChange={onSearchChange} />
      {prizesState.prizes?.map((prize) => (
        <div sx={{ display: "flex" }}>
          <div
            onClick={() => {
              setActivePrize(prize);
              setShowDetailModal(true);
            }}
          >
            {prize.name}
          </div>
          <div
            onClick={() => {
              setActivePrize(prize);
              setShowUpdateModal(true);
            }}
            sx={{ ml: "5px" }}
          >
            Editar
          </div>
          <div
            onClick={() => {
              setActivePrize(prize);
              setShowDeleteModal(true);
            }}
            sx={{ ml: "5px" }}
          >
            Borrar
          </div>
        </div>
      ))}
    </div>
  );
};
export default GamePanel;
