import { useEffect, useLayoutEffect, useState } from "react";
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
import SelectInput from "../SelectInput";
import { useCategoryOptions } from "../../providers/CategoryOptions";

const ListGroups = () => {
  const { categoryOptions } = useCategoryOptions();

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
        if (resp.data.next === null) {
          setShow(false);
        } else {
          setPode(true);
          setShow(true);
        }
      });
    }
    if (groups.next === null) {
      setShow(false);
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
        return false;
      });
  };
  useEffect(() => {
    if (!!groups.next && groups.previous !== groups.next && !!search && pode) {
      getNextPage();
    }
  }, [groups, search, pode]);
  // console.log(fechar);

  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }

  function ShowWindowDimensions(props) {
    return useWindowSize();
  }

  const [width] = ShowWindowDimensions();


  return (
    <Container>
      {!!alvo ? (
        <RenderOneGroup group={alvo} setAlvo={setAlvo} />
      ) : (
        <div className="headerPesquisaGroups">
          <div className="containerCriarGrupo">
            <h1>{showAllGroups ? "Buscando novos grupos" : "Seus grupos"}</h1>
            <ModalDialog
              ele={<Button darkBlue>Criar grupo</Button>}
              // msgButton={{ atualizar: "Criar um Grupo", cancelar: "Cancelar" }}
              // callback={criarGrupo}
              setFechar={setFechar}
              fechar={fechar}
              darkBlue
            >
              <ModalCriarGrupo>
                <h2>Criar um grupo novo</h2>
                <div className="bodyModalCriarGrupo">
                  <TextField
                    className="inputCriarGrupo"
                    id="outlined-basic"
                    label="Name group"
                    type="text"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setName(e.target.value)}
                  />
                  <TextField
                    className="inputCriarGrupo"
                    id="outlined-basic"
                    label="description"
                    type="text"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <TextField
                    className="inputCriarGrupo"
                    id="outlined-basic"
                    label="category"
                    type="text"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <span className="containerCriarGrupoButtons">
                    <Button
                      darkBlue
                      onClick={() => criarGrupo()}
                      children="Atualizar"
                    />
                    <Button red onClick={() => setFechar("fechar")}>
                      Cancelar
                    </Button>
                  </span>
                </div>
              </ModalCriarGrupo>
            </ModalDialog>
            {width >= 800 &&  <Button green onClick={() => setShowAllGroups(!showAllGroups)}>
              {showAllGroups ? "Meus grupos" : "Buscar mais grupos"}
            </Button>}
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="Pesquisar grupos"
              value={search}
              type="search"
              variant="outlined"
              // sx={{ marginTop: 5 }}
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
            next={getNextPage}
            height={500}
            hasMore={show}
            loader={<CircularProgress />}
            className="scrollInfinite"
          >
            {!!search ? (
              <>
                {groups.results.filter(
                  (ele) =>
                    ele.name
                      .toLocaleLowerCase()
                      .includes(search.trim().toLocaleLowerCase()) ||
                    ele.category
                      .toLocaleLowerCase()
                      .includes(search.trim().toLocaleLowerCase())
                ).length > 0 ? (
                  groups.results
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
                    ))
                ) : (
                  <>{!show && <h3>Não foi possivel encontrar o grupo</h3>}</>
                )}
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
        <>
          {!!search ? (
            <ul className="meusGrupos">
              {myGroups
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
                  <CardGroups group={ele} updateGroup={updateGroup} key={ind} />
                ))}
            </ul>
          ) : (
            <>
              {!!!alvo && (
                <ul className="meusGrupos">
                  {myGroups.map((ele, ind) => (
                    <CardGroups
                      setAlvo={setAlvo}
                      group={ele}
                      updateGroup={updateGroup}
                      key={ind}
                    />
                  ))}
                </ul>
              )}
            </>
          )}
        </>
      )}
    </Container>
  );
};
export default ListGroups;
