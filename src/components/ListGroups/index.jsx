import { useEffect, useState } from "react";
import { useGroup } from "../../providers/JsonGroups";
import CardGroups, { RenderOneGroup } from "../CardGroups";
import { Container, ModalCriarGrupo } from "./styles";
import api from "../../services/api";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import { ModalDialog } from "../ModalDialog";
import { TextField } from "@mui/material";
import { useAuth } from "../../providers/AuthContext";
import Button from "../Button";
const ListGroups = () => {
  const { myGroups, updateGroup } = useGroup();
  const { tokenBearer } = useAuth();
  const [fechar, setFechar] = useState(false);
  const [groups, setGroups] = useState([]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(true);
  const [showAllGroups, setShowAllGroups] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [alvo, setAlvo] = useState("");
  const [pode, setPode] = useState(true);
  const getGroups = () => {
    api.get("/groups/").then((resp) => setGroups(resp.data));
  };
  useEffect(() => {
    updateGroup();
    getGroups();
  }, []);

  const getNextPage = () => {
    setPode(false);

    if (groups.next) {
      axios.get(groups.next).then((resp) => {
        setGroups({
          count: resp.data.count,
          next: resp.data.next,
          previous: resp.data.previous,
          results: [...groups.results, ...resp.data.results],
        });
        console.log("setei true", groups.next);
        if (resp.data.next === null) {
          setShow(false);
          console.log("false dentro");
        } else {
          setPode(true);
          setShow(true);
        }
      });
    }
    if (groups.next === null) {
      setShow(false);
      console.log("false dentro");
    }
  };
  const criarGrupo = () => {
    if (!(!!name && !!category && !!description)) {
      setFechar(false);
      return toast.error("Adcione todas a informaçoes para criar!");
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
        toast.success("Grupo criado com sucesso");
        setFechar("fechar");
        setName("");
        setCategory("");
        setDescription("");
      })
      .catch(() => {
        toast("Adcione todas a informaçoes para criar!");
        setFechar(false);
      });
  };
  useEffect(() => {
    if (!!groups.next && groups.previous !== groups.next && !!search && pode) {
      getNextPage();
    }
  }, [groups, search, pode]);

  return (
    <Container>
      {!!!alvo && (
        <div className="headerPesquisaGroups">
          <div className="containerCriarGrupo">
            <h1>{showAllGroups ? "Buscando novos grupos" : "Seus grupos"}</h1>
            <ModalDialog
              // ele="Criar um Grupo"
              ele={<Button darkBlue>Criar grupo</Button>}
              msgButton={["Criar um Grupo", "Cancelar"]}
              callback={criarGrupo}
              setFechar={setFechar}
              fechar={fechar}
              darkBlue
            >
              <ModalCriarGrupo>
                <h2>Criar um grupo novo</h2>
                <TextField
                  className="inputCriarGrupo"
                  id="outlined-basic"
                  label="Name group"
                  type="text"
                  variant="outlined"
                  sx={{ marginTop: 5 }}
                  fullWidth
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  className="inputCriarGrupo"
                  id="outlined-basic"
                  label="description"
                  type="text"
                  variant="outlined"
                  sx={{ marginTop: 5 }}
                  fullWidth
                  onChange={(e) => setDescription(e.target.value)}
                />
                <TextField
                  className="inputCriarGrupo"
                  id="outlined-basic"
                  label="category"
                  type="text"
                  variant="outlined"
                  sx={{ marginTop: 5 }}
                  fullWidth
                  onChange={(e) => setCategory(e.target.value)}
                />
              </ModalCriarGrupo>
            </ModalDialog>
            <Button green  onClick={() => setShowAllGroups(!showAllGroups)}>
              {showAllGroups
                ? "Meus grupos"
                : "Buscar mais grupos"}
            </Button>
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="Pesquisar grupos"
              value={search}
              type="search"
              variant="outlined"
              sx={{ marginTop: 5 }}
              fullWidth
              onChange={(evt) => setSearch(evt.target.value)}
            />
          </div>
        </div>
      )}

      {showAllGroups ? (
        <div className="containerPesquisa">
          <InfiniteScroll
            dataLength={groups?.results.length}
            next={() => {
              getNextPage();
              console.log("carregou mais");
            }}
            height={400}
            hasMore={show}
            loader={<CircularProgress />}
            className="scrollInfinite"
          >
            {!!search ? (
              <>
                {groups.results
                  .filter(
                    (ele) =>
                      ele.name
                        .toLocaleLowerCase()
                        .includes(search.trim().toLocaleLowerCase()) ||
                      ele.category
                        .toLocaleLowerCase()
                        .includes(search.trim().toLocaleLowerCase())
                  )
                  .map((ele, ind) => (
                    <CardGroups
                      group={ele}
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
        <ul className="meusGrupos">
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
