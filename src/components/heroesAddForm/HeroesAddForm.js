// import { useHttp } from "../../hooks/http.hook";
// import { useState } from "react";
import { useSelector } from "react-redux"; // deleted useDispatch
import { v4 as uuidv4 } from "uuid";


import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from "formik";
import * as Yup from "yup";

import store from "../../store";
import { selectAll } from "../heroesFilters/filtersSlice";
// import { heroCreated } from "../heroesList/heroesSlice";
import { useCreateHeroMutation } from "../../api/apiSlice";

import "./heroesAddForm.scss";

const HeroesAddForm = () => {
  const [createHero, {isLoading, isError}] = useCreateHeroMutation();

  const { filtersLoadingStatus } = useSelector((state) => state.filters);
  const filters = selectAll(store.getState());
  // const [error, setError] = useState(false);
  // const dispatch = useDispatch();
  // const { request } = useHttp();

  const onSubmitHandler = (values) => {
    const newHero = {
      id: uuidv4(),
      name: values.name,
      description: values.description,
      element: values.element,
    };

    // request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
    //   .then(dispatch(heroCreated(newHero)))
    //   .catch((error) => {
    //     console.log("Error when adding a hero", error);
    //     setError(true);
    //   });
    createHero(newHero).unwrap();
  };

  const renderFilters = (filters, status) => {
    if (isLoading) {
      return <option>Loading elements</option>;
    } else if (isError) {
      return <option>Loading error</option>;
    }

    if (filters && filters.length > 0) {
      return filters.map(({ name, label }) => {
        // eslint-disable-next-line
        if (name === "all") return;

        return (
          <option key={name} value={name}>
            {label}
          </option>
        );
      });
    }
  };

  const View = isError ? ( //error replaced by isError
    <div className="alert alert-danger mt-2">
      {"Error adding a hero. Please try again later."}
    </div>
  ) : (
    <button type="submit" className="btn btn-primary">
      Create
    </button>
  );

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        element: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("Required field"),
        description: Yup.string().required("Required field"),
        element: Yup.string()
          .oneOf(["fire", "water", "wind", "earth"], "Choose an element")
          .required("Required field"),
      })}
      onSubmit={(values, { resetForm }) => {
        if (!isError) { //error replaced by isError
          onSubmitHandler(values);
          resetForm();
        }
      }}
    >
      <Form className="border p-4 shadow-lg rounded">
        <div className="mb-3">
          <label htmlFor="name" className="form-label fs-4">
            Name of the new hero
          </label>
          <Field
            type="text"
            name="name"
            className="form-control"
            id="name"
            placeholder="What's my name?"
          />
          <FormikErrorMessage className="error" name="name" component="div" />
        </div>
        <div className="mb-3">
          <label htmlFor="text" className="form-label fs-4">
            Description
          </label>
          <Field
            type="text"
            name="description"
            as="textarea"
            className="form-control"
            id="description"
            placeholder="What can I do?"
            style={{ height: "130px" }}
          />
          <FormikErrorMessage
            className="error"
            name="description"
            component="div"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="element" className="form-label">
            Choose the hero's element
          </label>
          <Field
            className="form-select"
            id="element"
            name="element"
            as="select"
          >
            <option>I master the element...</option>
            {renderFilters(filters, filtersLoadingStatus)}
          </Field>
          <FormikErrorMessage
            className="error"
            name="element"
            component="div"
          />
        </div>
        {View}
      </Form>
    </Formik>
  );
};

export default HeroesAddForm;

// <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
//     <div className="mb-3">
//         <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
//         <input
//             required
//             type="text"
//             name="name"
//             className="form-control"
//             id="name"
//             placeholder="Как меня зовут?"
//             value={heroName}
//             onChange={(e) => setHeroName(e.target.value)}
//             />
//     </div>

//     <div className="mb-3">
//         <label htmlFor="text" className="form-label fs-4">Описание</label>
//         <textarea
//             required
//             name="text"
//             className="form-control"
//             id="text"
//             placeholder="Что я умею?"
//             value={heroDescr}
//             onChange={(e) => setHeroDescr(e.target.value)}
//             style={{"height": '130px'}}
//             />
//     </div>

//     <div className="mb-3">
//         <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
//         <select
//             required
//             className="form-select"
//             id="element"
//             name="element"
//             value={heroElement}
//             onChange={(e) => setHeroElement(e.target.value)}
//             >
//             <option >Я владею элементом...</option>
//             <option value="fire">Огонь</option>
//             <option value="water">Вода</option>
//             <option value="wind">Ветер</option>
//             <option value="earth">Земля</option>
//         </select>
//     </div>

//     <button type="submit" className="btn btn-primary">Создать</button>
// </form>
