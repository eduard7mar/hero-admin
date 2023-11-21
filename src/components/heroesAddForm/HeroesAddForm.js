import { useHttp } from '../../hooks/http.hook';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import {Formik, Form, Field, ErrorMessage as FormikErrorMessage} from "formik";
import * as Yup from "yup";

import { heroCreated } from '../../actions';
import "./heroesAddForm.scss";

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const { request } = useHttp();

    const onSubmitHandler = (values) => {

        const newHero = {
            id: uuidv4(),
            name: values.name,
            description: values.description,
            element: values.element
        }

        request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
            .then(dispatch(heroCreated(newHero)))
            .catch(error => {console.log("Ошибка при добавлении героя", error)
            setError(true);
        });
    }

    const View = error ? <div className='alert alert-danger mt-2'>{"Ошибка при добавлении героя. Пожалуйста, попробуйте познее."}</div>
        : <button type="submit" className="btn btn-primary">Создать</button>

    return (
        <Formik
            initialValues={{ 
                name: "",
                description: "",
                element: ""
            }}
            validationSchema={Yup.object({
                name: Yup.string().required("Required field"),
                description: Yup.string().required("Required field"),
                element: Yup.string().oneOf(['fire', 'water', 'wind', 'earth'], 'Choose an element').required('Required field')
            })}
            onSubmit={(values, { resetForm }) => {
                if (!error) {
                    onSubmitHandler(values);
                    resetForm();
                }
            }}
        >
        <Form className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <Field 
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    />
                <FormikErrorMessage className="error" name="name" component="div" />
            </div>
            <div className="mb-3">
             <label htmlFor="text" className="form-label fs-4">Описание</label>
                <Field
                    type="text"
                    name="description" 
                    as="textarea"
                    className="form-control" 
                    id="description" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                />
                <FormikErrorMessage className="error" name="description" component="div" />
            </div>
            <div className="mb-3">
                 <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                 <Field 
                    className="form-select" 
                    id="element" 
                    name="element"
                    as="select"
                    >
                    <option >Я владею элементом...</option>
                    <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option>
                </Field>
                <FormikErrorMessage className="error" name="element" component="div" />
            </div>
            {View}
        </Form>
      </Formik>
    )
}

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