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
import { ReactComponent as EditIcon } from "../../images/pencil.svg";
import { ReactComponent as RemoveIcon } from "../../images/trash.svg";
import PrizeItem from "./PrizeItem";
import SearchBar from "../SearchBar";

const GamePanel = () => {
  const prizesState = useSelector((state: RootState) => state.prizes);
  const dispatch = useDispatch();
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [showUpdateModal, setShowUpdateModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showDetailModal, setShowDetailModal] = React.useState(false);
  const [activePrize, setActivePrize] = React.useState<Prize>({});

  const [search, setSearch] = React.useState("");
  React.useEffect(() => {
    dispatch(Actions.refreshPrizes(search));
    const refreshInterval = setInterval(
      () => dispatch(Actions.refreshPrizes(search)),
      5000
    );
    return () => clearInterval(refreshInterval);
  }, [search]);

  React.useEffect(() => {
    dispatch(Actions.refreshPrizes(search));
  }, [
    showCreateModal,
    showUpdateModal,
    showDeleteModal,
    showDeleteModal,
    search,
  ]);
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
        icons={
          <React.Fragment>
            <span
              title={"Editar"}
              onClick={(event) => {
                setShowDetailModal(false);
                setActivePrize(activePrize);
                setShowUpdateModal(true);
              }}
              sx={{ mr: "10px", mt: "3px" }}
            >
              <EditIcon />
            </span>
            <span
              title={"Eliminar"}
              onClick={(event) => {
                setShowDetailModal(false);
                setActivePrize(activePrize);
                setShowDeleteModal(true);
              }}
              sx={{ mr: "6px", mt: "3px" }}
            >
              <RemoveIcon />
            </span>
          </React.Fragment>
        }
      />
      <div
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          padding: "10px",
          borderBottom: "1px solid #ccc",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: "800px",
          }}
        >
          <button
            sx={{ height: "42px" }}
            onClick={() => setShowCreateModal(true)}
          >
            Crear Premio
          </button>
          <SearchBar
            sx={{
              flexGrow: 1,
              ml: "10px",
              position: "relative",
            }}
            search={search}
            setSearch={setSearch}
          />
        </div>
      </div>
      <div
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          sx={{
            py: "10px",
            display: "grid",
            gridTemplateColumns: [
              "1fr",
              "1fr 1fr",
              "1fr 1fr 1fr",
              "1fr 1fr 1fr 1fr",
            ],
            width: "100%",
            maxWidth: "800px",
            gap: "10px",
          }}
        >
          {prizesState.prizes?.map((prize) => (
            <PrizeItem
              key={prize.id}
              prize={prize}
              onClick={() => {
                setActivePrize(prize);
                setShowDetailModal(true);
              }}
              onEdit={() => {
                setActivePrize(prize);
                setShowUpdateModal(true);
              }}
              onRemove={() => {
                setActivePrize(prize);
                setShowDeleteModal(true);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default GamePanel;
