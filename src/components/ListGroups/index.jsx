import { useEffect, useState } from "react";
import { useGroup } from "../../providers/JsonGroups";
import CardGroups from "../CardGroups";
import { Container } from "./styles";
import api from "../../services/api";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';

const ListGroups = () => {
  const { myGroups, updateGroup } = useGroup();
  const [groups, setGroups] = useState([]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(true);
  const getGroups = () => {
    api.get("/groups/").then((resp) => setGroups(resp.data));
  };
  useEffect(() => {
    updateGroup();
    getGroups();
  }, []);

  const getNextPage = () => {
    if (!!groups.next) {
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
  // const groupFilter = groups.results.filter((ele) =>
  //   ele.name.toLocaleLowerCase().includes(search)
  // );
  console.log(groups);
  return (
    <Container>
      <input
        type="text"
        placeholder="Pesquisar grupos"
        onChange={(evt) =>
          setSearch(evt.target.value.trim().toLocaleLowerCase())
        }
      />
      <button onClick={getNextPage}>trazer mais</button>
      {!!search ? (
        <div className="containerPesquisa">
          {/* {show && <span>carregando...</span>} */}
          <InfiniteScroll
            style={{overflow:"hidden"}}
            dataLength={
              groups.results.filter((ele) =>
                ele.name.toLocaleLowerCase().includes(search)
              ).length
            }
            next={() => {
              getNextPage();
              console.log("carregou mais");
            }}
            loader={ <CircularProgress/>}
            hasMore={true}
            // loader={<h4>Loading...</h4>}
          >
            {groups.results
              .filter((ele) => ele.name.toLocaleLowerCase().includes(search))
              .map((ele, ind) => (
                <CardGroups props={ele} updateGroup={updateGroup} key={ind} />
              ))}
              {/* {show && <CircularProgress color="secondary" />} */}
          </InfiniteScroll>
        </div>
      ) : (
        <ul>
          {myGroups.map((ele, ind) => (
            <CardGroups props={ele} updateGroup={updateGroup} key={ind} />
          ))}
        </ul>
      )}
    </Container>
  );
};
export default ListGroups;
