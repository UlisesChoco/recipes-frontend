import { CreateRecipeForm } from "../components/CreateRecipeForm";

export function CreateRecipe() {
    return (
        <section aria-labelledby="create-recipe-title">
            <header>
                <h1 id="create-recipe-title">Crear nueva receta</h1>
                <p>
                    Completa el formulario con los datos de tu receta e ingredientes. Todos los campos son
                    obligatorios. Debes agregar al menos un ingrediente.
                </p>
            </header>

            <CreateRecipeForm />
        </section>
    );
}