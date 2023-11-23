import { useHttp } from "../../hooks/http.hook";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

import { fetchHeroes } from "../../actions";
import { heroDeleted } from "./heroesSlice";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";

const HeroesList = () => {
  const filteredHeroesSelector = createSelector(
    (state) => state.filters.activeFilter,
    (state) => state.heroes.heroes,
    (filter, heroes) => {
      if (filter === "all") {
        return heroes;
      } else {
        return heroes.filter(item => item.element === filter);
      }
    }
  )

  // const filteredHeroes = useSelector(state => {
  //   if (state.filters.activeFilter === "all") {
  //     return state.heroes.heroes;
  //   } else {
  //     return state.heroes.heroes.filter(item => item.element === state.filters.activeFilter)
  //   }
  // })
  const filteredHeroes = useSelector(filteredHeroesSelector);
  const { heroesLoadingStatus } = useSelector((state) => state.heroes.heroesLoadingStatus);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(fetchHeroes(request));

    // eslint-disable-next-line
  }, []);

  const onDelete = useCallback(
    (id) => {
      request(`http://localhost:3001/heroes/${id}`, "DELETE")
        .then(dispatch(heroDeleted(id)))
        .catch((err) => console.log(err));
        // eslint-disable-next-line  
    }, [request]
  );

  if (heroesLoadingStatus === "loading") {
    return <Spinner />;
  } else if (heroesLoadingStatus === "error") {
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
