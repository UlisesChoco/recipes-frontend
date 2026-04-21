import type { CreateRecipeFormValues } from "../service/create-recipe.types";

type FormErrors = {
    title?: string;
    description?: string;
    imageFile?: string;
};

type CreateRecipeFormFieldsProps = {
    values: CreateRecipeFormValues;
    errors: FormErrors;
    onChangeTitle: (value: string) => void;
    onChangeDescription: (value: string) => void;
    onChangeImage: (file: File | null) => void;
    imageRequired?: boolean;
    currentImageName?: string;
    currentImageLabel?: string;
};

export function CreateRecipeFormFields({
    values,
    errors,
    onChangeTitle,
    onChangeDescription,
    onChangeImage,
    imageRequired = true,
    currentImageName,
    currentImageLabel = "Imagen actual",
}: CreateRecipeFormFieldsProps) {
    return (
        <fieldset>
            <legend>Datos de la receta</legend>

            <div>
                <label htmlFor="create-recipe-title">Titulo</label>
                <input
                    id="create-recipe-title"
                    name="title"
                    type="text"
                    value={values.title}
                    onChange={(event) => onChangeTitle(event.target.value)}
                    required
                />
                {errors.title && <p role="alert">{errors.title}</p>}
            </div>

            <div>
                <label htmlFor="create-recipe-description">Descripcion</label>
                <textarea
                    id="create-recipe-description"
                    name="description"
                    value={values.description}
                    onChange={(event) => onChangeDescription(event.target.value)}
                    required
                />
                {errors.description && <p role="alert">{errors.description}</p>}
            </div>

            <div>
                <label htmlFor="create-recipe-image">Imagen</label>
                <input
                    id="create-recipe-image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={(event) => onChangeImage(event.target.files?.[0] ?? null)}
                    required={imageRequired}
                />
                {values.imageFile && <p>Archivo seleccionado: {values.imageFile.name}</p>}
                {!values.imageFile && currentImageName && <p>{currentImageLabel}: {currentImageName}</p>}
                {errors.imageFile && <p role="alert">{errors.imageFile}</p>}
            </div>
        </fieldset>
    );
}
