import { useContext, useEffect} from "react";
import "./CategoryPage.scss";
import { useLocation, useSearchParams } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import { Filters } from "../../types/sortFilters";
import { BreadCrumb } from "../../components/BreadCrumb";
import { BigSectionsHeader } from "../../components/BigSectionsHeader";
import { Filter } from "../../components/Filter";
import { PetsList } from "../../components/PetsList";
import { Pagination } from "../../components/Pagination";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import * as animalActions from "../../features/animalSlice";
import { Loader } from "../../components/Loader";

export const CategoryPage = () => {
  const { setFilters, setIsLoading, isLoading } = useContext(GlobalContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const dispatch = useAppDispatch();
  const { cats, catsCount, dogs, dogsCount, pets, petsCount, loading } = useAppSelector(
    (state) => state.animals
  );

  const fetchApi = () => {
    if (location.pathname === "/pets/cats") {
      dispatch(animalActions.fetchCats(location.search.toString()));
    } else if (location.pathname === "/pets/dogs") {
      dispatch(animalActions.fetchDogs(location.search.toString()));
    } else {
      dispatch(animalActions.fetchAnimals(location.search.toString()));
    }
  };

  const { petsList, count } = (() => {
    if (location.pathname === "/pets/cats") {
      return { petsList: cats, count: catsCount };
    } else if (location.pathname === "/pets/dogs") {
      return { petsList: dogs, count: dogsCount };
    } else {
      return { petsList: pets, count: petsCount };
    }
  })();

  const numOfPages = Math.ceil(count / 9);

  const updateSearchParams = (newFilters: Partial<Filters>) => {
    const updatedSearchParams = new URLSearchParams(searchParams);

    Object.keys(newFilters).forEach((key) => {
      const value = newFilters[key as keyof Filters];

      if (value === undefined || (Array.isArray(value) && value.length === 0)) {
        updatedSearchParams.delete(key);
      } else if (typeof value === "boolean") {
        if (value) {
          updatedSearchParams.set(key, value.toString());
        } else {
          updatedSearchParams.delete(key);
        }
      } else {
        updatedSearchParams.set(key, value.toString());
      }
    });

    setSearchParams(updatedSearchParams);
  };

  useEffect(() => {
    const newSearchParams = new URLSearchParams(location.search);
    if (!newSearchParams.has("page")) {
      newSearchParams.set("page", "1");
    }
    setFilters({
      sex: searchParams.get("sex")?.split(",") || [],
      size: searchParams.get("size")?.split(",") || [],
      age: searchParams.get("age")?.split(",") || [],
      sterilized: searchParams.get("sterilized") === "true",
      vaccinated: searchParams.get("vaccinated") === "true",
      page: searchParams.get("page"),
    });

    if (location.search !== newSearchParams.toString()) {
      setSearchParams(newSearchParams.toString());
    }
  }, [location.pathname, location.search, setSearchParams, setFilters]);

   useEffect(() => {
    setIsLoading(true);
    fetchApi();
    const delayPromise = new Promise((resolve) => setTimeout(resolve, 1000));
    Promise.all([delayPromise]).finally(() => setIsLoading(false));
   }, [location.pathname, location.search, dispatch]); 
  

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="page">
          <BreadCrumb />
          <BigSectionsHeader text={["Супер", "Друзі"]} />
          <Filter updateSearchParams={updateSearchParams} />
          <PetsList pets={petsList} />
          <Pagination
            numOfPages={numOfPages}
            updateSearchParams={updateSearchParams}
          />
        </div>
      )}
    </>
  );
};
