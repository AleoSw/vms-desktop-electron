import DefaultImage from "../../../assets/images/option-image.svg"
import "./DefaultOption.css"

function DefaultOption() {
    return (
        <section className="mainImage">
            <img className="defaultImage" src={DefaultImage} />
            <h3 className="titleImage">Selecciona una opcion</h3>
        </section>
    )
}

export default DefaultOption;