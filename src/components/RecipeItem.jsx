import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFetch } from './hook/useFetch';
import { BsPerson, BsClock } from 'react-icons/bs';
import { GiKnifeFork } from 'react-icons/gi';
import { TiTick } from 'react-icons/ti';
import { CgSpinner } from 'react-icons/cg';

const RecipeItem = ({ favouriteHandler, savedItems }) => {
    const [itemSavedStatus, setItemSavedStatus] = useState(null);
    const { id } = useParams();
    const { data: recipe, loading, error } = useFetch(id);

    const timeFormatter = (time) => {
        if (!time) return;

        if (!String(time).includes('.')) {
            return time + 'h';
        }
        const splittedDuration = String(time).split('.');
        const hour = splittedDuration[0] + 'h';
        const splitterMinutes = '.' + splittedDuration[1];
        const minutes = +splitterMinutes * 60 + 'min';
        return hour + minutes;
    };
    useEffect(() => {
        if (!recipe) return;

        setItemSavedStatus(savedItems.some((item) => item.id === recipe.id));
    }, [recipe]);

    return (
        <div className="recipeItem container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 py-20">
            <div className="left">
                <div className="recipe-image overflow-hidden flex justify-center items-center lg:h-96 rounded-xl ">
                    <img
                        src={recipe.image_url}
                        alt={recipe.title}
                        className="w-full block rounded-xl hover:scale-105 duration-300"
                    />
                </div>
                <div className="ings mt-10">
                    <h2 className="text-2xl lg:text-4xl flex items-center gap-3 font-medium mb-5">
                        <span className="text-rose-500">
                            <GiKnifeFork />
                        </span>{' '}
                        Ingredients:
                    </h2>
                    <hr className="border-rose-100" />
                    <ul className="flex flex-col gap-2">
                        {recipe?.ingredients?.map((ing, i) => (
                            <li key={i} className="leading-loose">
                                <TiTick className="inline-block" />
                                {ing.quantity}
                                {ing.unit} {ing.description}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="right flex flex-col gap-5">
                <span className="publisher uppercase tracking-widest font-semibold text-sky-400">
                    {recipe?.publisher}
                </span>
                <h2 className="title text-5xl">{recipe?.title}</h2>
                <div className="servings-cooking-time flex gap-5 uppercase tracking-widest font-semibold text-rose-500">
                    <div className="servings">
                        Servings: {recipe?.servings} people
                    </div>
                    <div className="cooking-time">
                        Cooking time:{' '}
                        {recipe?.cooking_time < 60
                            ? String(recipe?.cooking_time) + 'min'
                            : timeFormatter(recipe.cooking_time / 60)}
                    </div>
                </div>
                <div className="btns flex gap-5 items-center ">
                    <button
                        onClick={() => favouriteHandler(recipe?.id)}
                        className={`bg-gradient-to-br p-3 px-4 rounded-lg text-sm uppercase font-medium tracking-wider mt-2 inline-block shadow-md hover:shadow-lg  duration-300 ${
                            itemSavedStatus
                                ? 'from-orange-400 to-orange-600 text-orange-50 shadow-orange-200 hover:shadow-orange-300'
                                : 'from-sky-400 to-sky-600 text-sky-50 shadow-sky-200 hover:shadow-sky-300'
                        }`}
                    >
                        {itemSavedStatus
                            ? '- Remove from favourites'
                            : '+ Save as favourite'}
                    </button>
                    <a
                        href={recipe?.source_url}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-gradient-to-br from-purple-400 to-purple-600 text-purple-50 p-3 px-4 rounded-lg text-sm uppercase font-medium tracking-wider mt-2 inline-block shadow-md hover:shadow-lg hover: shadow-purple-300 duration-300"
                    >
                        Get directions
                    </a>
                    <Link
                        to="/"
                        className="bg-gradient-to-br from-rose-400 to-rose-600 text-rose-50 p-3 px-4 rounded-lg text-sm uppercase font-medium tracking-wider mt-2 inline-block shadow-md  hover:shadow-lg hover: shadow-rose-300 duration-300"
                    >
                        Back to home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RecipeItem;
