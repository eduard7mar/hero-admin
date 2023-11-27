// import { useHttp } from "../../hooks/http.hook";
import { useCallback, useMemo } from "react"; // deleted useEffect
import { useSelector } from "react-redux"; // deleted useDispatch

// import { heroDeleted, fetchHeroes, filteredHeroesSelector } from "./heroesSlice";
import { useGetHeroesQuery, useDeleteHeroMutation } from "../../api/apiSlice";

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";

const HeroesList = () => {

  const { 
    data: heroes = [],
    isLoading,
    isError
   } = useGetHeroesQuery();

  const [deleteHero] = useDeleteHeroMutation();

  const activeFilter = useSelector(state => state.filters.activeFilter);

  const filteredHeroes = useMemo(() => {
    const filteredHeroes = heroes.slice();
    if (activeFilter === "all") {
      return filteredHeroes;
    } else {
      return filteredHeroes.filter(item => item.element === activeFilter);
    }
  }, [heroes, activeFilter]); 

  // const filteredHeroes = useSelector(filteredHeroesSelector);
  // const { heroesLoadingStatus } = useSelector((state) => state.heroes.heroesLoadingStatus);
  // const dispatch = useDispatch();
  // const { request } = useHttp();

  // useEffect(() => {
  //   dispatch(fetchHeroes());

  //   // eslint-disable-next-line
  // }, []);

  const onDelete = useCallback(
    (id) => {
      // request(`http://localhost:3001/heroes/${id}`, "DELETE")
      //   .then(dispatch(heroDeleted(id)))
      //   .catch((err) => console.log(err));
      deleteHero(id);
        // eslint-disable-next-line  
    }, []// deleted request
  );

  // if (heroesLoadingStatus === "loading") {
  //   return <Spinner />;
  // } else if (heroesLoadingStatus === "error") {
  //   return <h5 className="text-center mt-5">Loading error</h5>;
  // }

  if (isLoading) {
    return <Spinner />;
  } else if (isError) {
    return <h5 className="text-center mt-5">Loading error</h5>;
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">No heroes yet</h5>;
    }

    return arr.map(({ id, ...props }) => {
      return <HeroesListItem onDelete={() => onDelete(id)} {...props} />;
    });
  };

  const elements = renderHeroesList(filteredHeroes);
  return <ul>{elements}</ul>;
};

export default HeroesList;
