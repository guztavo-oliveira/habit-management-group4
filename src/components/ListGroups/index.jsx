import { useEffect, useState } from "react";
import { useGroup } from "../../providers/JsonGroups";
import CardGroups, { RenderOneGroup } from "../CardGroups";
import { Container } from "./styles";
import api from "../../services/api";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import { ModalDialog } from "../ModalDialog";
import { TextField } from "@mui/material";
import { useAuth } from "../../providers/AuthContext";
import { set } from "react-hook-form";

const ListGroups = () => {
  const { myGroups, updateGroup } = useGroup();
  const { tokenBearer } = useAuth();
  const [fechar, setFechar] = useState(false)
  const [groups, setGroups] = useState([]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(true);
  const [showAllGroups, setShowAllGroups] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [alvo, setAlvo] = useState("");
  const getGroups = () => {
    api.get("/groups/").then((resp) => setGroups(resp.data));
  };
  useEffect(() => {
    updateGroup();
    getGroups();
  }, []);

  const getNextPage = () => {
    if (groups.next) {
      axios.get(groups.next).then((resp) => {
        setGroups({
          count: resp.data.count,
          next: resp.data.next,
          previous: resp.data.previous,
          results: [...groups.results, ...resp.data.results],
        });
        setShow(true);
      });
    } else {
      setShow(false);
    }
  };
  const criarGrupo = () => {
    if(!(!!name && !!category && !!description)){
      setFechar(false)
      return toast.error("Adcione todas a informaçoes para criar!")
    }
    const data = {
      name,
      category,
      description,
    };
    api
      .post("/groups/", data, tokenBearer)
      .then(() => {
        updateGroup();
        toast("Grupo criado com sucesso");
        setFechar("fechar");
        setName("");
        setCategory("");
        setDescription("")
      })
      .catch(() => {toast("Adcione todas a informaçoes para criar!");setFechar(false)});
  };

  return (
    <Container>
      {!!!alvo && (
        <div>
          <input
            value={search}
            type="text"
            placeholder="Pesquisar grupos"
            onChange={(evt) => setSearch(evt.target.value)}
          />
          <span onClick={() => setSearch("")}>X</span>
          <ModalDialog
            ele="Criar um Grupo"
            msgButton={["Criar um Grupo","Cancelar"]}
            callback={criarGrupo}
            fechar={fechar}
            darkBlue
          >
            <TextField
              id="outlined-basic"
              label="Name group"
              type="text"
              variant="outlined"
              sx={{ marginTop: 5 }}
              fullWidth
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="description"
              type="text"
              variant="outlined"
              sx={{ marginTop: 5 }}
              fullWidth
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="category"
              type="text"
              variant="outlined"
              sx={{ marginTop: 5 }}
              fullWidth
              onChange={(e) => setCategory(e.target.value)}
            />
          </ModalDialog>
          <button onClick={() => setShowAllGroups(!showAllGroups)}>
            {showAllGroups ? "Mostrar meus grupos" : "Mostrar todos os grupos"}
          </button>
        </div>
      )}

      {showAllGroups ? (
        <div className="containerPesquisa" >
          <InfiniteScroll
            
            dataLength={
              groups.results.length
            }
            next={() => {
              getNextPage();
              console.log("carregou mais");
            }}
            height={400}
            hasMore={show}
            loader={<CircularProgress />}
            
          >
            {!!search ? (
              <>
                {groups.results
                  .filter((ele) =>
                    ele.name
                      .toLocaleLowerCase()
                      .includes(search.trim().toLocaleLowerCase())
                  )
                  .map((ele, ind) => (
                    <CardGroups
                      props={ele}
                      updateGroup={updateGroup}
                      key={ind}
                    />
                  ))}
              </>
            ) : (
              <>
                {groups.results.map((ele, ind) => (
                  <CardGroups group={ele} updateGroup={updateGroup} key={ind} />
                ))}
              </>
            )}
          </InfiniteScroll>
        </div>
      ) : (
        <ul>
          {!!search ? (
            <>
              {myGroups
                .filter((ele) =>
                  ele.name
                    .toLocaleLowerCase()
                    .includes(search.trim().toLocaleLowerCase())
                )
                .map((ele, ind) => (
                  <CardGroups group={ele} updateGroup={updateGroup} key={ind} />
                ))}
            </>
          ) : (
            <>
              {!!alvo ? (
                <RenderOneGroup group={alvo} setAlvo={setAlvo} />
              ) : (
                <>
                  {myGroups.map((ele, ind) => (
                    <CardGroups
                      setAlvo={setAlvo}
                      group={ele}
                      updateGroup={updateGroup}
                      key={ind}
                    />
                  ))}
                </>
              )}
            </>
          )}
        </ul>
      )}
    </Container>
  );
};
export default ListGroups;
