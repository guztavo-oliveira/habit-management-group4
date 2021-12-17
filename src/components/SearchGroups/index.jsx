import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import CardGroups, { RenderOneGroup } from "../CardGroups";
import { useGroup } from "../../providers/JsonGroups";
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from "@mui/material/CircularProgress";
import api from "../../services/api";
import axios from "axios";
import { ContainerBuscar } from "./styles";
const SearchGroups = () => {
  const [search, setSearch] = useState("");
  const { updateGroup } = useGroup();
  const [groups, setGroups] = useState([]);
  const [pode, setPode] = useState(true);
  const [show, setShow] = useState(true);
  const [showAllGroups, setShowAllGroups] = useState(false);
  const [alvo, setAlvo] = useState("");
  useEffect(() => {
    updateGroup();
    api.get("/groups/").then((resp) => {
      setGroups(resp.data);
      setShowAllGroups(true);
    });
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

  useEffect(() => {
    if (!!search && pode) {
      getNextPage();
    }
  }, [groups, search, pode]);
  return (
    <ContainerBuscar>
      {!!alvo ? (
        <RenderOneGroup group={alvo} setAlvo={setAlvo} />
      ) : (
        <>
          <h2>Buscando Novos grupos</h2>
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
          {showAllGroups && (
            <div className="scrollInfiniteGroups">
              <InfiniteScroll
                dataLength={groups.results.length}
                next={getNextPage}
                height={430}
                hasMore={show}
                loader={<CircularProgress />}
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
                            setAlvo={setAlvo}
                          />
                        ))
                    ) : (
                      <>
                        {!show && <h3>Não foi possivel encontrar o grupo</h3>}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {groups?.results?.map((ele, ind) => (
                      <CardGroups
                        setAlvo={setAlvo}
                        group={ele}
                        updateGroup={updateGroup}
                        key={ind}
                      />
                    ))}
                  </>
                )}
              </InfiniteScroll>
            </div>
          )}
        </>
      )}
    </ContainerBuscar>
  );
};
export default SearchGroups;
